const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQm8kkOZgYC5yqKtKVk_S3S4tCePMiFtkrC1pSeGma7g-jdFgJdp0QaEHtY95av_W4fsgfYUZDpLtTr/pub?gid=0&single=true&output=csv';

async function fetchGoogleSheetsData() {
    console.log('Fetching products from Google Sheets...');
    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => value.trim()
        });
        
        if (parsed.errors.length > 0) {
            console.warn('Warnings during CSV parsing:', parsed.errors);
        }
        
        const products = parsed.data.map((row, index) => {
            // Provide fallback IDs if the sheet is missing them.
            const parsedId = parseInt(row.id, 10);
            
            return {
                id: isNaN(parsedId) ? (index + 1) : parsedId,
                name: row.name || 'Unnamed Product',
                category: row.category || 'Uncategorized',
                price: parseFloat(row.price) || 0.00,
                originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : null,
                image: row.image || '/images/placeholder.png',
                description: row.description || '',
                rating: parseFloat(row.rating) || 0.0,
                reviews: parseInt(row.reviews, 10) || 0,
                badge: row.badge && row.badge.toLowerCase() !== 'null' ? row.badge : null,
                inStock: row.inStock ? row.inStock.toLowerCase() === 'true' : false,
                dateAdded: row.dateAdded || new Date().toISOString().split('T')[0]
            };
        });

        // Write the data to lib/products.json
        const outputPath = path.join(__dirname, '..', 'lib', 'products.json');
        fs.writeFileSync(outputPath, JSON.stringify(products, null, 4));
        console.log(`Successfully mapped ${products.length} products to lib/products.json!`);
        
    } catch (error) {
        console.error('Error fetching or saving Google Sheets data:', error);
        // Do not crash the build if the sheet is unreachable, just warn.
        // If lib/products.json already exists, it will just use the old static copy.
        // If it doesn't exist, we'll write an empty array to prevent fatal crashes.
        const fallbackPath = path.join(__dirname, '..', 'lib', 'products.json');
        if (!fs.existsSync(fallbackPath)) {
            fs.writeFileSync(fallbackPath, JSON.stringify([], null, 4));
            console.log('Created empty fallback products.json');
        }
    }
}

fetchGoogleSheetsData();
