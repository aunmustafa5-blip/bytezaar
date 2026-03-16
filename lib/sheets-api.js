/**
 * Sheets API Client
 * This module handles communication with the Google Apps Script Web App
 * to write data back to Google Sheets (Orders, Users, Reviews, Messages).
 */

const WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // User must replace this after deploying the script

const postToSheets = async (action, data) => {
    if (WEB_APP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        console.warn('Sheets API Web App URL not configured. Data will not be saved.');
        return { success: false, message: 'API not configured' };
    }

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Apps Script requires no-cors sometimes or handles it via redirect
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, ...data }),
        });
        
        // Note: With no-cors, we can't read the response body.
        // For a more robust implementation, use a proxy or handle CORS in Apps Script.
        return { success: true }; 
    } catch (e) {
        console.error('Sheets API Error:', e);
        return { success: false, error: e.message };
    }
};

export const registerUser = (userData) => postToSheets('register_user', userData);
export const createOrder = (orderData) => postToSheets('create_order', orderData);
export const submitReview = (reviewData) => postToSheets('submit_review', reviewData);
export const sendMessage = (messageData) => postToSheets('send_message', messageData);
export const updateSettings = (settingsData) => postToSheets('update_settings', settingsData);
export const subscribeNewsletter = (email) => postToSheets('subscribe_newsletter', { email });
