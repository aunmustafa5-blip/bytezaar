/**
 * Validates a credit card number using the Luhn Algorithm.
 * @param {string} cardNumber - The card number to validate.
 * @returns {boolean} - True if the card number is valid.
 */
export const validateCardNumber = (cardNumber) => {
    // Remove all non-digit characters
    const digits = cardNumber.replace(/\D/g, '');
    
    // Check if the length is standard (13-19 digits)
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let shouldDouble = false;

    // Loop through the digits from right to left
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
};

/**
 * Validates the expiry date (MM/YY format).
 * @param {string} expiry - The expiry date string.
 * @returns {boolean} - True if the expiry date is valid and in the future.
 */
export const validateExpiry = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

    const [month, year] = expiry.split('/').map(n => parseInt(n, 10));
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
};

/**
 * Validates the CVV.
 * @param {string} cvv - The CVV string.
 * @returns {boolean} - True if CVV is 3 or 4 digits.
 */
export const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
};

/**
 * Checks if a card has enough balance for a transaction.
 * @param {string} cardNumber - The card number.
 * @param {number} amount - The amount to check.
 * @returns {object} - { success: boolean, message: string }
 */
export const checkBalance = (cardNumber, amount) => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    const card = cards.find(c => c.number === cleanNumber);

    if (!card) {
        // For simulation purposes, if card not in our list, we'll say "Invalid card for this test"
        // In a real system, you'd check with the bank API.
        return { success: false, message: "Card not recognized in our secure database." };
    }

    if (card.balance < amount) {
        return { 
            success: false, 
            message: `Insufficient balance! Your current balance is Rs. ${card.balance.toLocaleString()}, but the order total is Rs. ${amount.toLocaleString()}.` 
        };
    }

    return { success: true, message: "Transaction approved." };
};
