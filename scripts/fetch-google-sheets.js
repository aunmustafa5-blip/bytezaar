const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const SHEET_ID = '1Qm8kkOZgYC5yqKtKVk_S3S4tCePMiFtkrC1pSeGma7g-jdFgJdp0QaEHtY95av_W4fsgfYUZDpLtTr';
const GIDS = {
    products: '0',
    users: '123456789', // Placeholder GIDs - User should provide these or I'll use a unified Web App
    orders: '987654321',
    reviews: '112233445',
    messages: '554433221',
    settings: '998877665'
};

const getCSVUrl = (gid) => `https://docs.google.com/spreadsheets/d/e/2PACX-${SHEET_ID}/pub?gid=${gid}&single=true&output=csv`;

async function fetchData(gid, name) {
    console.log(`Fetching ${name}...`);
    try {
        const response = await fetch(getCSVUrl(gid));
        if (!response.ok) throw new Error(`Failed to fetch ${name}`);
        const csvText = await response.text();
        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => h.trim(),
            transform: (v) => v.trim()
        });
        return parsed.data;
    } catch (e) {
        console.error(`Error fetching ${name}:`, e);
        return [];
    }
}

async function syncAllData() {
    // 1. Products
    const rawProducts = await fetchData(GIDS.products, 'products');
    const products = rawProducts.map((row, index) => ({
        id: parseInt(row.id, 10) || (index + 1),
        name: row.name || 'Unnamed Product',
        category: row.category || 'Uncategorized',
        price: parseFloat(row.price) || 0,
        originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : null,
        image: row.image || '/images/placeholder.png',
        description: row.description || '',
        rating: parseFloat(row.rating) || 0.0,
        reviews: parseInt(row.reviews, 10) || 0,
        badge: row.badge && row.badge.toLowerCase() !== 'null' ? row.badge : null,
        inStock: row.inStock ? row.inStock.toLowerCase() === 'true' : true,
        dateAdded: row.dateAdded || new Date().toISOString().split('T')[0]
    }));
    if (products.length > 0) {
        fs.writeFileSync(path.join(__dirname, '../lib/products.json'), JSON.stringify(products, null, 4));
    } else {
        console.warn('Products sync returned no data. Skipping file update.');
    }

    // 2. Users
    const rawUsers = await fetchData(GIDS.users, 'users');
    const users = rawUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role || 'customer',
        joinDate: u.joinDate
    }));
    if (users.length > 0) {
        fs.writeFileSync(path.join(__dirname, '../lib/users.json'), JSON.stringify(users, null, 4));
    }

    // 3. Orders
    const rawOrders = await fetchData(GIDS.orders, 'orders');
    const orders = rawOrders.map(o => ({
        id: o.id,
        customerEmail: o.customerEmail,
        date: o.date,
        status: o.status,
        total: parseFloat(o.total) || 0,
        paymentMethod: o.paymentMethod || 'COD',
        items: JSON.parse(o.items || '[]')
    }));
    if (orders.length > 0) {
        fs.writeFileSync(path.join(__dirname, '../lib/orders.json'), JSON.stringify(orders, null, 4));
    }

    // 4. Reviews
    const rawReviews = await fetchData(GIDS.reviews, 'reviews');
    const reviews = rawReviews.map(r => ({
        id: r.id,
        productId: parseInt(r.productId, 10),
        name: r.name,
        avatar: r.name ? r.name.charAt(0) : 'U',
        rating: parseFloat(r.rating) || 5,
        text: r.text,
        product: r.product, // product name snapshot
        date: r.date
    }));
    if (reviews.length > 0) {
        fs.writeFileSync(path.join(__dirname, '../lib/reviews.json'), JSON.stringify(reviews, null, 4));
    }

    console.log('All data synced successfully!');
}

syncAllData();
