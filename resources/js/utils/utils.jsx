// utils.js

/**
 * Determines if the currency symbol should be displayed on the right of the price
 * @param {string} symbol - The currency symbol (e.g., "$", "€")
 * @return {boolean} - Whether the currency symbol should be displayed on the right
 */
const currenciesWithRightSymbols = [
    '﷼',
    '₨',
    '₪',
    '₨',
    'Ft',
    'TL',
    'ман',
    'лв',
    '₮',
    'lei',
    'zł',
    'руб',
]; // Example list, you can adjust this according to your configuration

export function currencyShouldDisplayOnRight(symbol) {
    // This is a simple check for some common currencies that display symbols on the right
    return currenciesWithRightSymbols.includes(symbol);
}

export function formatCurrency(price, symbol) {
    // This is a simple check for some common currencies that display symbols on the right
    return currencyShouldDisplayOnRight(symbol) ? `${price} ${symbol}` : `${symbol} ${price}`;
}

export function percentageChange(oldValue, newValue, precision = 1) {
    if (oldValue === 0) {
        oldValue++;
        newValue++;
    }
    let change = parseFloat((((newValue - oldValue) / oldValue) * 100).toFixed(precision));

    // Limiting the percentage change to be between 0 and 100
    change = Math.max(0, Math.min(100, change));

    return change;
}

/**
 * Converts a string to camel case format
 * @param {string} text - The input string (e.g., "monthly_plan")
 * @return {string} - The string in camel case (e.g., "Monthly Plan")
 */
export function formatCamelCase(text) {
    if (!text) return '';

    return text
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
        .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
        .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()); // Capitalize each word
}

export function displayCurrency(symbol, price, taxValue = 0, discountedPrice = null) {
    const totalPrice = price + taxValue;
    const totalDiscountedPrice = discountedPrice !== null ? discountedPrice + taxValue : null;
    const isSymbolOnRight = currencyShouldDisplayOnRight(symbol);

    if (discountedPrice !== null && discountedPrice < price) {
        // Display both original and discounted prices with formatting
        return (
            <div>
                <span style={{ textDecoration: 'line-through', color: 'red' }}>
                    {isSymbolOnRight ? `${totalPrice}${symbol}` : `${symbol}${totalPrice}`}
                </span>{' '}
                <b>
                    {isSymbolOnRight
                        ? `${totalDiscountedPrice}${symbol}`
                        : `${symbol}${totalDiscountedPrice}`}
                </b>
            </div>
        );
    }

    // Display only the price if no discount is available
    return <b>{isSymbolOnRight ? `${totalPrice}${symbol}` : `${symbol}${totalPrice}`}</b>;
}


export function fullUrl(url) {
    // This is a simple check for some common currencies that display symbols on the right
    return import.meta.env.VITE_APP_URL+"/"+url;
}
