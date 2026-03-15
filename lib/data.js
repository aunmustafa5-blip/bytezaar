import fetchedProducts from './products.json';

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

export const categories = [
    { id: 1, name: "Headphones", icon: "🎧", count: 24, slug: "headphones", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png` },
    { id: 2, name: "Keyboards", icon: "⌨️", count: 18, slug: "keyboards", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png` },
    { id: 3, name: "Mouse", icon: "🖱️", count: 15, slug: "mouse", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_a94fbd3fe8ebb5cac69422b57cdadc1bdr.png` },
    { id: 4, name: "Projectors", icon: "📽️", count: 8, slug: "projectors", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/projector.png` },
    { id: 5, name: "Accessories", icon: "🔌", count: 32, slug: "accessories", image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_b46b0d18b6489c4993144a8845624b5ddr.png` }
];

export const reviews = [
    {
        id: 1,
        name: "Alex Thompson",
        avatar: "AT",
        rating: 5,
        text: "The NIA Pro headphones are absolutely incredible. The noise cancellation is next level and the sound quality is pristine.",
        product: "NIA Pro Wireless Headphones",
        date: "2026-02-10"
    },
    {
        id: 2,
        name: "Sarah Mitchell",
        avatar: "SM",
        rating: 5,
        text: "Best gaming mouse I've ever used. The RGB lighting is stunning and the sensor is incredibly precise.",
        product: "Xtrike ME Gaming Mouse",
        date: "2026-02-08"
    },
    {
        id: 3,
        name: "James Wilson",
        avatar: "JW",
        rating: 4,
        text: "Love the mechanical keyboard. The typing experience is satisfying and the RGB effects are beautiful.",
        product: "MechPro 65% Mechanical Keyboard",
        date: "2026-02-05"
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        avatar: "ER",
        rating: 5,
        text: "The mini projector exceeded my expectations. Crystal clear 4K image and incredibly portable.",
        product: "CompactVision Mini Projector",
        date: "2026-01-30"
    },
    {
        id: 5,
        name: "Michael Chen",
        avatar: "MC",
        rating: 5,
        text: "Bytezaar delivers premium quality every time. The USB-C hub is built like a tank and works flawlessly.",
        product: "UltraHub USB-C Dock Station",
        date: "2026-01-28"
    },
    {
        id: 6,
        name: "Jessica Park",
        avatar: "JP",
        rating: 4,
        text: "Great sound quality from these earbuds. The ANC is impressive for this price range. Highly recommend!",
        product: "SoundPods Elite Earbuds",
        date: "2026-02-12"
    },
    {
        id: 7,
        name: "David Kumar",
        avatar: "DK",
        rating: 5,
        text: "The webcam quality is outstanding. Perfect for streaming and video calls. The ring light is a game changer.",
        product: "ClearView Pro Webcam",
        date: "2026-02-14"
    },
    {
        id: 8,
        name: "Lisa Anderson",
        avatar: "LA",
        rating: 5,
        text: "I've been shopping at Bytezaar for months. The quality and customer service are unmatched. Simply the best.",
        product: "DualSense Wireless Controller",
        date: "2026-02-03"
    }
];

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/#categories" },
    { name: "About Us", href: "/#about" },
];

export const orders = [
    { id: 'BZ-2026-101', customer: 'Alex Thompson', date: '2026-02-27', status: 'Delivered', total: 149.99 },
    { id: 'BZ-2026-102', customer: 'Sarah Mitchell', date: '2026-02-26', status: 'Shipped', total: 299.98 },
    { id: 'BZ-2026-103', customer: 'James Wilson', date: '2026-02-25', status: 'Processing', total: 79.99 },
    { id: 'BZ-2026-104', customer: 'Emily Rodriguez', date: '2026-02-25', status: 'Processing', total: 219.98 },
    { id: 'BZ-2026-105', customer: 'Michael Chen', date: '2026-02-24', status: 'Delivered', total: 89.99 },
];

export const users = [
    { id: 'USR-001', name: 'Alex Thompson', email: 'alex@example.com', role: 'Customer', joinDate: '2025-11-12' },
    { id: 'USR-002', name: 'Sarah Mitchell', email: 'sarah@example.com', role: 'Customer', joinDate: '2025-10-05' },
    { id: 'USR-003', name: 'Admin User', email: 'admin@bytezaar.com', role: 'Admin', joinDate: '2025-01-01' },
];

export const promos = [
    { code: 'TECH20', discount: '20% off', type: 'percentage', value: 20, uses: 145, status: 'Active' },
    { code: 'NEWUSER', discount: '$15 off', type: 'fixed', value: 15, uses: 89, status: 'Active' },
    { code: 'SUMMER2026', discount: '25% off', type: 'percentage', value: 25, uses: 312, status: 'Expired' },
];
