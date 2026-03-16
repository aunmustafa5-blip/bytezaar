import fetchedProducts from './products.json';
import fetchedReviews from './reviews.json';
import fetchedOrders from './orders.json';
import fetchedUsers from './users.json';

// Apply the basePath to fetched product images just like we applied it to the hardcoded ones before
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const products = fetchedProducts.map(p => {
    // Check if the imported image path already has the basePath (in case it gets saved with one).
    // If not, explicitly add it so the product images load on GitHub Pages!
    if (p.image && basePath && !p.image.startsWith(basePath)) {
        p.image = `${basePath}${p.image}`;
    }
    return p;
});

const getCategoryCount = (categoryName) => {
    return products.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase()).length;
};

export const categories = [
    { id: 1, name: "Headphones", icon: "🎧", count: getCategoryCount("Headphones"), slug: "headphones", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png` },
    { id: 2, name: "Keyboards", icon: "⌨️", count: getCategoryCount("Keyboards"), slug: "keyboards", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png` },
    { id: 3, name: "Mouse", icon: "🖱️", count: getCategoryCount("Mouse"), slug: "mouse", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_a94fbd3fe8ebb5cac69422b57cdadc1bdr.png` },
    { id: 4, name: "Projectors", icon: "📽️", count: getCategoryCount("Projectors"), slug: "projectors", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/projector.png` },
    { id: 5, name: "Accessories", icon: "🔌", count: getCategoryCount("Accessories"), slug: "accessories", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_b46b0d18b6489c4993144a8845624b5ddr.png` }
];

export const reviews = fetchedReviews;

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/#categories" },
    { name: "About Us", href: "/#about" },
];

export const orders = fetchedOrders;

export const users = fetchedUsers;

export const promos = [
    { code: 'TECH20', discount: '20% off', type: 'percentage', value: 20, uses: 145, status: 'Active' },
    { code: 'NEWUSER', discount: '$15 off', type: 'fixed', value: 15, uses: 89, status: 'Active' },
    { code: 'SUMMER2026', discount: '25% off', type: 'percentage', value: 25, uses: 312, status: 'Expired' },
];
