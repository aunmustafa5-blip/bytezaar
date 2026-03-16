'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
    // 1. Initialize state (defaulting to empty/null for SSR safety)
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 2. Load from LocalStorage on mount (Client-side only)
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('bytezaar_cart');
            const savedUser = localStorage.getItem('bytezaar_user');

            if (savedCart) setCart(JSON.parse(savedCart));
            if (savedUser) setUser(JSON.parse(savedUser));
        } catch (e) {
            console.error('Failed to parse localStorage', e);
        }
        setIsLoaded(true);
    }, []);

    // 3. Sync to LocalStorage whenever state changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('bytezaar_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                localStorage.setItem('bytezaar_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('bytezaar_user');
            }
        }
    }, [user, isLoaded]);

    // ==== CART ACTIONS ====
    const addToCart = (product, quantity = 1) => {
        if (!user) {
            alert('Please login to add items to your cart.');
            // Usually we'd use a toast, but this is a simple guard
            window.location.href = '/login';
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // If exists, bump quantity
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            // If new, add to array
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    // ==== AUTH ACTIONS ====
    const login = (email, name, role = 'customer') => {
        setUser({ email, name, role });
    };

    const logout = () => {
        setUser(null);
    };

    // ==== UTILITIES ====
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('PKR', 'Rs.');
    };

    return (
        <StoreContext.Provider value={{
            // State
            cart,
            user,
            isLoaded,
            cartTotal,
            cartCount,

            // Actions
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            login,
            logout,
            formatPrice
        }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to use the store
export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
