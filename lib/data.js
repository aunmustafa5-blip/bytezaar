export const products = [
    {
        id: 1,
        name: "NIA Pro Wireless Headphones",
        category: "Headphones",
        price: 149.99,
        originalPrice: 199.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png`,
        description: "Premium over-ear wireless headphones with active noise cancellation and 40-hour battery life.",
        rating: 4.8,
        reviews: 234,
        badge: "Best Seller",
        inStock: true,
        dateAdded: "2026-01-15"
    },
    {
        id: 2,
        name: "Xtrike ME Gaming Mouse",
        category: "Mouse",
        price: 79.99,
        originalPrice: null,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_a94fbd3fe8ebb5cac69422b57cdadc1bdr.png`,
        description: "RGB gaming mouse with 16000 DPI optical sensor and 8 programmable buttons.",
        rating: 4.6,
        reviews: 189,
        badge: "New",
        inStock: true,
        dateAdded: "2026-02-01"
    },
    {
        id: 3,
        name: "DualSense Wireless Controller",
        category: "Accessories",
        price: 69.99,
        originalPrice: 89.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_b46b0d18b6489c4993144a8845624b5ddr.png`,
        description: "Next-gen wireless controller with haptic feedback and adaptive triggers.",
        rating: 4.9,
        reviews: 512,
        badge: "Popular",
        inStock: true,
        dateAdded: "2026-01-20"
    },
    {
        id: 4,
        name: "MechPro 65% Mechanical Keyboard",
        category: "Keyboards",
        price: 129.99,
        originalPrice: 159.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png`,
        description: "Compact mechanical keyboard with RGB backlighting and hot-swappable switches.",
        rating: 4.7,
        reviews: 321,
        badge: "Featured",
        inStock: true,
        dateAdded: "2026-01-10"
    },
    {
        id: 5,
        name: "CompactVision Mini Projector",
        category: "Projectors",
        price: 299.99,
        originalPrice: 349.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/projector.png`,
        description: "Portable 4K projector with 200\" display, built-in speakers, and WiFi connectivity.",
        rating: 4.5,
        reviews: 87,
        badge: null,
        inStock: true,
        dateAdded: "2026-02-10"
    },
    {
        id: 6,
        name: "UltraHub USB-C Dock Station",
        category: "Accessories",
        price: 89.99,
        originalPrice: null,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/usbhub.png`,
        description: "10-in-1 USB-C hub with HDMI 4K, SD card reader, and 100W power delivery.",
        rating: 4.4,
        reviews: 156,
        badge: null,
        inStock: true,
        dateAdded: "2026-02-05"
    },
    {
        id: 7,
        name: "ClearView Pro Webcam",
        category: "Accessories",
        price: 119.99,
        originalPrice: 149.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/webcam.png`,
        description: "4K webcam with built-in ring light, auto-focus, and dual noise-canceling mics.",
        rating: 4.6,
        reviews: 203,
        badge: "Sale",
        inStock: true,
        dateAdded: "2026-01-25"
    },
    {
        id: 8,
        name: "SoundPods Elite Earbuds",
        category: "Headphones",
        price: 99.99,
        originalPrice: 129.99,
        image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/earbuds.png`,
        description: "True wireless earbuds with ANC, spatial audio, and 30-hour battery in case.",
        rating: 4.7,
        reviews: 445,
        badge: "Hot",
        inStock: true,
        dateAdded: "2026-02-15"
    }
];

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
