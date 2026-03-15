'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products as initialProducts, orders as initialOrders, users as initialUsers, promos as initialPromos } from '@/lib/data';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Tag, Activity, Settings,
    Check, X, Info, Star, Trash2
} from 'lucide-react';

const ADMIN_TABS = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', icon: <Package size={18} /> },
    { name: 'Orders', icon: <ShoppingCart size={18} /> },
    { name: 'Users', icon: <Users size={18} /> },
    { name: 'Discounts', icon: <Tag size={18} /> },
    { name: 'Analytics', icon: <Activity size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
];

// Toast notification component
function Toast({ msg, type, onClose }) {
    if (!msg) return null;
    const bgMap = { success: 'rgba(74,222,128,0.1)', error: 'rgba(255,107,107,0.1)', info: 'rgba(96,165,250,0.1)' };
    const colorMap = { success: '#4ADE80', error: '#FF6B6B', info: '#60A5FA' };
    return (
        <div style={{
            position: 'fixed', top: '90px', right: '24px', zIndex: 2000,
            background: 'rgba(20,20,20,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid rgba(255,255,255,0.12)`,
            borderRadius: '16px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)', animation: 'fadeInDown 0.3s ease', maxWidth: '400px'
        }}>
            <span style={{ color: colorMap[type], fontWeight: '600', fontSize: '1.1rem' }}>
                {type === 'success' ? <Check size={18} color="currentColor" /> : type === 'error' ? <X size={18} color="currentColor" /> : <Info size={18} color="currentColor" />}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#E0E0E0' }}>{msg}</span>
            <button onClick={onClose} style={{ marginLeft: '12px', color: '#808080', cursor: 'pointer', border: 'none', background: 'none', padding: '4px', display: 'flex' }}><X size={16} /></button>
        </div>
    );
}

export default function AdminPage() {
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [productList, setProductList] = useState([...initialProducts]);
    const [orders, setOrders] = useState([...initialOrders]);
    const [promos, setPromos] = useState([...initialPromos]);
    const [productSearch, setProductSearch] = useState('');

    // Modal states
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showCreatePromo, setShowCreatePromo] = useState(false);
    const [showOrderDetail, setShowOrderDetail] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Form states
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Headphones', price: '', stock: '', description: '', image: '' });
    const [newPromo, setNewPromo] = useState({ code: '', type: 'percentage', value: '', status: 'Active' });
    const [settings, setSettings] = useState({ 
        storeName: 'Bytezaar', 
        storeEmail: 'admin@bytezaar.com', 
        currency: 'PKR',
        instagram: 'https://www.instagram.com/byt3zaar/',
        youtube: 'https://www.youtube.com/@starrydustproductions',
        whatsapp: '+92 326 4642243'
    });

    // Toast state
    const [toast, setToast] = useState({ message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
    };

    const handleImageUpload = (e, isEditing = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isEditing) {
                    setEditingProduct(prev => ({ ...prev, image: reader.result }));
                } else {
                    setNewProduct(prev => ({ ...prev, image: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Product actions
    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price) {
            showToast('Please fill in product name and price', 'error');
            return;
        }
        const product = {
            id: Date.now(),
            name: newProduct.name,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            originalPrice: null,
            image: newProduct.image || '/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png',
            description: newProduct.description || 'New product',
            rating: 0,
            reviews: 0,
            badge: 'New',
            inStock: true,
            dateAdded: new Date().toISOString().split('T')[0],
        };
        setProductList(prev => [product, ...prev]);
        setNewProduct({ name: '', category: 'Headphones', price: '', stock: '', description: '', image: '' });
        setShowAddProduct(false);
        showToast(`"${product.name}" added successfully!`);
    };

    const handleDeleteProduct = (id) => {
        const product = productList.find(p => p.id === id);
        setProductList(prev => prev.filter(p => p.id !== id));
        setDeleteConfirm(null);
        showToast(`"${product?.name}" deleted successfully!`);
    };

    const handleEditProduct = (product) => {
        setEditingProduct({ ...product, editPrice: product.price.toString() });
    };

    const handleSaveEdit = () => {
        if (!editingProduct.name || !editingProduct.editPrice) {
            showToast('Please fill in required fields', 'error');
            return;
        }
        setProductList(prev => prev.map(p =>
            p.id === editingProduct.id
                ? { ...p, name: editingProduct.name, category: editingProduct.category, price: parseFloat(editingProduct.editPrice), description: editingProduct.description, image: editingProduct.image || p.image }
                : p
        ));
        showToast(`"${editingProduct.name}" updated successfully!`);
        setEditingProduct(null);
    };

    // Promo actions
    const handleCreatePromo = () => {
        if (!newPromo.code || !newPromo.value) {
            showToast('Please fill in code and value', 'error');
            return;
        }
        const promo = {
            code: newPromo.code.toUpperCase(),
            discount: newPromo.type === 'percentage' ? `${newPromo.value}% off` : `$${newPromo.value} off`,
            type: newPromo.type,
            value: parseFloat(newPromo.value),
            uses: 0,
            status: 'Active',
        };
        setPromos(prev => [promo, ...prev]);
        setNewPromo({ code: '', type: 'percentage', value: '', status: 'Active' });
        setShowCreatePromo(false);
        showToast(`Promo code "${promo.code}" created!`);
    };

    const handleDeletePromo = (code) => {
        setPromos(prev => prev.filter(p => p.code !== code));
        showToast(`Promo "${code}" deleted!`);
    };

    const handleTogglePromoStatus = (code) => {
        setPromos(prev => prev.map(p =>
            p.code === code ? { ...p, status: p.status === 'Active' ? 'Expired' : 'Active' } : p
        ));
    };

    // Order actions
    const handleUpdateOrderStatus = (id, newStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
        showToast(`Order ${id} updated to "${newStatus}"`);
        setShowOrderDetail(null);
    };

    // Settings
    const handleSaveSettings = () => {
        showToast('Settings saved successfully!');
    };

    // Filtered products
    const filteredProducts = productList.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase())
    );

    const s = {
        page: { display: 'flex', minHeight: '100vh', paddingTop: '72px' },
        sidebar: { width: '260px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem', position: 'sticky', top: '72px', height: 'calc(100vh - 72px)', overflowY: 'auto', flexShrink: 0, boxShadow: '1px 0 20px rgba(0,0,0,0.3)' },
        sidebarHeader: { padding: '0 0.75rem', marginBottom: '2rem' },
        sidebarTitle: { fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#808080' },
        navItem: (active) => ({ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: active ? '600' : '400', color: active ? '#FFF' : '#808080', background: active ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent', textAlign: 'left', transition: 'all 150ms ease', backdropFilter: active ? 'blur(12px)' : 'none', boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.06)' : 'none' }),
        main: { flex: 1, padding: '2rem' },
        header: { marginBottom: '2rem' },
        summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' },
        summaryCard: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' },
        cardLabel: { fontSize: '0.75rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' },
        cardValue: { fontSize: '1.75rem', fontWeight: '700' },
        cardChange: (positive) => ({ fontSize: '0.75rem', fontWeight: '500', color: positive ? '#4ADE80' : '#FF6B6B', marginTop: '6px' }),
        tableWrapper: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' },
        tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: '12px' },
        table: { width: '100%', borderCollapse: 'collapse' },
        th: { padding: '12px 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.08)' },
        td: { padding: '14px 1.5rem', fontSize: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.05)' },
        badge: (status) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '600', background: status === 'Delivered' ? 'rgba(74,222,128,0.15)' : status === 'Shipped' ? 'rgba(96,165,250,0.15)' : 'rgba(251,191,36,0.15)', color: status === 'Delivered' ? '#4ADE80' : status === 'Shipped' ? '#60A5FA' : '#FBB724', backdropFilter: 'blur(8px)', border: '1px solid ' + (status === 'Delivered' ? 'rgba(74,222,128,0.2)' : status === 'Shipped' ? 'rgba(96,165,250,0.2)' : 'rgba(251,191,36,0.2)') }),
        addBtn: { padding: '8px 18px', background: '#FFF', color: '#000', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,255,255,0.1)' },
        actionBtn: { padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', color: '#B0B0B0', cursor: 'pointer', marginRight: '6px', transition: 'all 150ms ease' },
        modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, backdropFilter: 'blur(12px)' },
        modalContent: { background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' },
        searchInput: { padding: '8px 14px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: '#FFF', fontSize: '0.8rem', outline: 'none', width: '220px', transition: 'all 150ms ease' },
    };

    return (
        <div style={s.page}>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

            <aside style={s.sidebar}>
                <div style={s.sidebarHeader}>
                    <p style={s.sidebarTitle}>Admin Panel</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {ADMIN_TABS.map(item => (
                        <button key={item.name} style={s.navItem(activeSection === item.name)} onClick={() => setActiveSection(item.name)}>
                            <span>{item.icon}</span> {item.name}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <Link href="/login" style={{ ...s.navItem(false), color: '#FF6B6B' }}>Sign Out</Link>
                </div>
            </aside>

            <main style={s.main}>

                {/* ===== DASHBOARD ===== */}
                {activeSection === 'Dashboard' && (
                    <>
                        <div style={s.header}>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Dashboard Overview</h1>
                            <p style={{ color: '#808080', marginTop: '4px' }}>Welcome back, Admin</p>
                        </div>
                        <div style={s.summaryGrid}>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Total Revenue</p><h3 style={s.cardValue}>Rs. 48,520</h3><p style={s.cardChange(true)}>↑ 12.5% from last month</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Total Orders</p><h3 style={s.cardValue}>{orders.length.toLocaleString()}</h3><p style={s.cardChange(true)}>↑ 8.2% from last month</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Total Users</p><h3 style={s.cardValue}>3,891</h3><p style={s.cardChange(true)}>↑ 15.1% from last month</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Products</p><h3 style={s.cardValue}>{productList.length}</h3><p style={s.cardChange(false)}>↓ 2 out of stock</p></div>
                        </div>
                        <div style={s.tableWrapper}>
                            <div style={s.tableHeader}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Recent Orders</h3>
                                <button onClick={() => setActiveSection('Orders')} style={{ fontSize: '0.8rem', color: '#808080', border: 'none', background: 'none', cursor: 'pointer' }}>View All →</button>
                            </div>
                            <table style={s.table}>
                                <thead><tr><th style={s.th}>Order ID</th><th style={s.th}>Customer</th><th style={s.th}>Date</th><th style={s.th}>Status</th><th style={s.th}>Total</th></tr></thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order.id}><td style={s.td}><strong>{order.id}</strong></td><td style={s.td}>{order.customer}</td><td style={{ ...s.td, color: '#808080' }}>{order.date}</td><td style={s.td}><span style={s.badge(order.status)}>{order.status}</span></td><td style={s.td}>Rs. {order.total.toFixed(0)}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* ===== PRODUCTS ===== */}
                {activeSection === 'Products' && (
                    <>
                        <div style={{ ...s.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Products</h1>
                                <p style={{ color: '#808080', marginTop: '4px' }}>Manage your product catalog ({productList.length} total)</p>
                            </div>
                            <button style={s.addBtn} onClick={() => setShowAddProduct(true)}>+ Add Product</button>
                        </div>

                        <div style={s.tableWrapper}>
                            <div style={s.tableHeader}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>All Products</h3>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={productSearch}
                                    onChange={e => setProductSearch(e.target.value)}
                                    style={s.searchInput}
                                />
                            </div>
                            <table style={s.table}>
                                <thead><tr><th style={s.th}>Product</th><th style={s.th}>Category</th><th style={s.th}>Price</th><th style={s.th}>Rating</th><th style={s.th}>Stock</th><th style={s.th}>Actions</th></tr></thead>
                                <tbody>
                                    {filteredProducts.length === 0 ? (
                                        <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', color: '#808080', padding: '3rem' }}>No products found matching &ldquo;{productSearch}&rdquo;</td></tr>
                                    ) : (
                                        filteredProducts.map(product => (
                                            <tr key={product.id}>
                                                <td style={s.td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <img src={product.image} alt={product.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                                                        </div>
                                                        <span style={{ fontWeight: '500' }}>{product.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ ...s.td, color: '#808080' }}>{product.category}</td>
                                                <td style={s.td}>${product.price.toFixed(2)}</td>
                                                <td style={s.td}><div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="currentColor" color="#FFD700" /> {product.rating}</div></td>
                                                <td style={s.td}><span style={s.badge('Delivered')}>In Stock</span></td>
                                                <td style={s.td}>
                                                    <button style={s.actionBtn} onClick={() => handleEditProduct(product)}>Edit</button>
                                                    <button style={{ ...s.actionBtn, color: '#FF6B6B', borderColor: 'rgba(255,107,107,0.2)' }} onClick={() => setDeleteConfirm(product)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* ===== ORDERS ===== */}
                {activeSection === 'Orders' && (
                    <>
                        <div style={s.header}>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>All Orders</h1>
                            <p style={{ color: '#808080', marginTop: '4px' }}>Track and manage customer orders</p>
                        </div>
                        <div style={s.tableWrapper}>
                            <table style={s.table}>
                                <thead><tr><th style={s.th}>Order ID</th><th style={s.th}>Customer</th><th style={s.th}>Date</th><th style={s.th}>Status</th><th style={s.th}>Total</th><th style={s.th}>Actions</th></tr></thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td style={s.td}><strong>{order.id}</strong></td>
                                            <td style={s.td}>{order.customer}</td>
                                            <td style={{ ...s.td, color: '#808080' }}>{order.date}</td>
                                            <td style={s.td}><span style={s.badge(order.status)}>{order.status}</span></td>
                                            <td style={s.td}>${order.total.toFixed(2)}</td>
                                            <td style={s.td}>
                                                <button style={s.actionBtn} onClick={() => setShowOrderDetail(order)}>View</button>
                                                {order.status === 'Processing' && <button style={{ ...s.actionBtn, color: '#60A5FA', borderColor: 'rgba(96,165,250,0.2)' }} onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}>Ship</button>}
                                                {order.status === 'Shipped' && <button style={{ ...s.actionBtn, color: '#4ADE80', borderColor: 'rgba(74,222,128,0.2)' }} onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}>Deliver</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* ===== USERS ===== */}
                {activeSection === 'Users' && (
                    <>
                        <div style={s.header}><h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Users</h1><p style={{ color: '#808080', marginTop: '4px' }}>Manage registered users</p></div>
                        <div style={{ ...s.summaryGrid, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Total Users</p><h3 style={s.cardValue}>3,891</h3></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>New This Month</p><h3 style={s.cardValue}>247</h3></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Active Today</p><h3 style={s.cardValue}>89</h3></div>
                        </div>
                    </>
                )}

                {/* ===== DISCOUNTS ===== */}
                {activeSection === 'Discounts' && (
                    <>
                        <div style={{ ...s.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Discounts & Promos</h1><p style={{ color: '#808080', marginTop: '4px' }}>Create and manage promotional codes</p></div>
                            <button style={s.addBtn} onClick={() => setShowCreatePromo(true)}>+ Create Code</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {promos.map(promo => (
                                <div key={promo.code} style={s.summaryCard}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.05em' }}>{promo.code}</span>
                                        <span style={s.badge(promo.status === 'Active' ? 'Delivered' : 'Processing')}>{promo.status}</span>
                                    </div>
                                    <p style={{ color: '#808080', fontSize: '0.875rem', marginBottom: '12px' }}>{promo.discount} · {promo.uses} uses</p>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button style={s.actionBtn} onClick={() => handleTogglePromoStatus(promo.code)}>
                                            {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button style={{ ...s.actionBtn, color: '#FF6B6B', borderColor: 'rgba(255,107,107,0.2)' }} onClick={() => handleDeletePromo(promo.code)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ===== ANALYTICS ===== */}
                {activeSection === 'Analytics' && (
                    <>
                        <div style={s.header}><h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Analytics</h1><p style={{ color: '#808080', marginTop: '4px' }}>Sales performance and insights</p></div>
                        <div style={s.summaryGrid}>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Revenue (Month)</p><h3 style={s.cardValue}>$12,450</h3><p style={s.cardChange(true)}>↑ 18%</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Orders (Month)</p><h3 style={s.cardValue}>{orders.length}</h3><p style={s.cardChange(true)}>↑ 12%</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Avg. Order Value</p><h3 style={s.cardValue}>${(orders.reduce((a, o) => a + o.total, 0) / orders.length).toFixed(2)}</h3><p style={s.cardChange(false)}>↓ 3%</p></div>
                            <div style={s.summaryCard}><p style={s.cardLabel}>Conversion Rate</p><h3 style={s.cardValue}>3.2%</h3><p style={s.cardChange(true)}>↑ 0.5%</p></div>
                        </div>
                        <div style={{ ...s.summaryCard, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Revenue Breakdown</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Headphones', 'Keyboards', 'Mouse', 'Projectors', 'Accessories'].map((cat, i) => {
                                    const widths = [75, 60, 45, 30, 55];
                                    const amounts = ['$3,780', '$2,890', '$1,950', '$1,200', '$2,630'];
                                    return (
                                        <div key={cat}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#B0B0B0' }}>{cat}</span>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{amounts[i]}</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#111', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${widths[i]}%`, background: 'linear-gradient(90deg, #555, #888)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}

                {/* ===== SETTINGS ===== */}
                {activeSection === 'Settings' && (
                    <>
                        <div style={s.header}><h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Settings</h1><p style={{ color: '#808080', marginTop: '4px' }}>Manage store configuration</p></div>
                        <div style={{ ...s.summaryCard, maxWidth: '600px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Store Settings</h3>
                            <div className="form-group">
                                <label className="form-label">Store Name</label>
                                <input className="form-input" value={settings.storeName} onChange={e => setSettings(s => ({ ...s, storeName: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Store Email</label>
                                <input className="form-input" value={settings.storeEmail} onChange={e => setSettings(s => ({ ...s, storeEmail: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Currency</label>
                                <input className="form-input" value={settings.currency} onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))} />
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1.5rem' }}>Social Links</h3>
                            <div className="form-group">
                                <label className="form-label">Instagram URL</label>
                                <input className="form-input" value={settings.instagram} onChange={e => setSettings(s => ({ ...s, instagram: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">YouTube URL</label>
                                <input className="form-input" value={settings.youtube} onChange={e => setSettings(s => ({ ...s, youtube: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">WhatsApp Number</label>
                                <input className="form-input" value={settings.whatsapp} onChange={e => setSettings(s => ({ ...s, whatsapp: e.target.value }))} />
                            </div>
                            <button className="btn btn-primary" onClick={handleSaveSettings} style={{ marginTop: '1rem' }}>Save Settings</button>
                        </div>
                    </>
                )}
            </main>

            {/* ===== ADD PRODUCT MODAL ===== */}
            {showAddProduct && (
                <div style={s.modal} onClick={() => setShowAddProduct(false)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Add New Product</h2>
                            <button onClick={() => setShowAddProduct(false)} style={{ color: '#808080', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}><X size={20} /></button>
                        </div>
                        <div className="form-group"><label className="form-label">Product Name *</label><input className="form-input" placeholder="Enter product name" value={newProduct.name} onChange={e => setNewProduct(s => ({ ...s, name: e.target.value }))} /></div>
                        <div className="form-group"><label className="form-label">Category</label><select className="form-input" style={{ background: '#1A1A1A' }} value={newProduct.category} onChange={e => setNewProduct(s => ({ ...s, category: e.target.value }))}><option>Headphones</option><option>Keyboards</option><option>Mouse</option><option>Projectors</option><option>Accessories</option></select></div>
                        <div className="form-group">
                            <label className="form-label">Product Image</label>
                            {newProduct.image && <div style={{ marginBottom: '10px' }}><img src={newProduct.image} alt="Preview" style={{ maxWidth: '80px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} /></div>}
                            <input type="file" accept="image/*" className="form-input" onChange={(e) => handleImageUpload(e, false)} style={{ padding: '10px' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Price *</label><input className="form-input" placeholder="0.00" type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct(s => ({ ...s, price: e.target.value }))} /></div>
                            <div className="form-group"><label className="form-label">Stock Qty</label><input className="form-input" placeholder="0" type="number" value={newProduct.stock} onChange={e => setNewProduct(s => ({ ...s, stock: e.target.value }))} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" placeholder="Describe the product..." value={newProduct.description} onChange={e => setNewProduct(s => ({ ...s, description: e.target.value }))} /></div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setShowAddProduct(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== EDIT PRODUCT MODAL ===== */}
            {editingProduct && (
                <div style={s.modal} onClick={() => setEditingProduct(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Edit Product</h2>
                            <button onClick={() => setEditingProduct(null)} style={{ color: '#808080', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}><X size={20} /></button>
                        </div>
                        <div className="form-group"><label className="form-label">Product Name</label><input className="form-input" value={editingProduct.name} onChange={e => setEditingProduct(s => ({ ...s, name: e.target.value }))} /></div>
                        <div className="form-group"><label className="form-label">Category</label><select className="form-input" style={{ background: '#1A1A1A' }} value={editingProduct.category} onChange={e => setEditingProduct(s => ({ ...s, category: e.target.value }))}><option>Headphones</option><option>Keyboards</option><option>Mouse</option><option>Projectors</option><option>Accessories</option></select></div>
                        <div className="form-group">
                            <label className="form-label">Product Image</label>
                            {editingProduct.image && <div style={{ marginBottom: '10px' }}><img src={editingProduct.image} alt="Preview" style={{ maxWidth: '80px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} /></div>}
                            <input type="file" accept="image/*" className="form-input" onChange={(e) => handleImageUpload(e, true)} style={{ padding: '10px' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Price</label><input className="form-input" type="number" step="0.01" value={editingProduct.editPrice} onChange={e => setEditingProduct(s => ({ ...s, editPrice: e.target.value }))} /></div>
                            <div className="form-group"><label className="form-label">Rating</label><input className="form-input" type="number" step="0.1" max="5" value={editingProduct.rating} onChange={e => setEditingProduct(s => ({ ...s, rating: parseFloat(e.target.value) || 0 }))} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" value={editingProduct.description} onChange={e => setEditingProduct(s => ({ ...s, description: e.target.value }))} /></div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== DELETE CONFIRM MODAL ===== */}
            {deleteConfirm && (
                <div style={s.modal} onClick={() => setDeleteConfirm(null)}>
                    <div style={{ ...s.modalContent, maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <div style={{ marginBottom: '1rem', color: '#ff4444', display: 'flex', justifyContent: 'center' }}><Trash2 size={48} /></div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Delete Product?</h2>
                        <p style={{ color: '#808080', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Are you sure you want to delete &ldquo;{deleteConfirm.name}&rdquo;? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="btn btn-primary" style={{ background: '#FF6B6B', color: '#FFF' }} onClick={() => handleDeleteProduct(deleteConfirm.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ORDER DETAIL MODAL ===== */}
            {showOrderDetail && (
                <div style={s.modal} onClick={() => setShowOrderDetail(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Order {showOrderDetail.id}</h2>
                            <button onClick={() => setShowOrderDetail(null)} style={{ color: '#808080', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}><X size={20} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#808080', fontSize: '0.875rem' }}>Customer</span><span style={{ fontWeight: '500' }}>{showOrderDetail.customer}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#808080', fontSize: '0.875rem' }}>Date</span><span>{showOrderDetail.date}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#808080', fontSize: '0.875rem' }}>Status</span><span style={s.badge(showOrderDetail.status)}>{showOrderDetail.status}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#808080', fontSize: '0.875rem' }}>Total</span><span style={{ fontWeight: '700', fontSize: '1.1rem' }}>${showOrderDetail.total.toFixed(2)}</span></div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => handleUpdateOrderStatus(showOrderDetail.id, 'Processing')}>Mark Processing</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => handleUpdateOrderStatus(showOrderDetail.id, 'Shipped')}>Mark Shipped</button>
                            <button className="btn btn-primary btn-sm" onClick={() => handleUpdateOrderStatus(showOrderDetail.id, 'Delivered')}>Mark Delivered</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CREATE PROMO MODAL ===== */}
            {showCreatePromo && (
                <div style={s.modal} onClick={() => setShowCreatePromo(false)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Create Promo Code</h2>
                            <button onClick={() => setShowCreatePromo(false)} style={{ color: '#808080', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}><X size={20} /></button>
                        </div>
                        <div className="form-group"><label className="form-label">Promo Code *</label><input className="form-input" placeholder="e.g. SAVE20" value={newPromo.code} onChange={e => setNewPromo(s => ({ ...s, code: e.target.value }))} style={{ textTransform: 'uppercase' }} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Discount Type</label><select className="form-input" style={{ background: '#1A1A1A' }} value={newPromo.type} onChange={e => setNewPromo(s => ({ ...s, type: e.target.value }))}><option value="percentage">Percentage (%)</option><option value="fixed">Fixed ($)</option></select></div>
                            <div className="form-group"><label className="form-label">Value *</label><input className="form-input" placeholder="e.g. 20" type="number" value={newPromo.value} onChange={e => setNewPromo(s => ({ ...s, value: e.target.value }))} /></div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setShowCreatePromo(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleCreatePromo}>Create Code</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
