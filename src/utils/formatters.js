/**
 * Formats a number as UZS currency with space separators
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show "so'm" (default: true)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  const formattedAmount = new Intl.NumberFormat('fr-FR').format(Math.round(amount));
  if (showSymbol) {
    return `${formattedAmount} so'm`;
  }
  return formattedAmount;
};

/**
 * Converts USD to UZS
 * @param {number} usd - Amount in USD
 * @returns {number} Amount in UZS
 */
export const usdToUzs = (usd) => {
  const USD_TO_UZS_RATE = 12650;
  return usd * USD_TO_UZS_RATE;
};

/**
 * Converts UZS to USD
 * @param {number} uzs - Amount in UZS
 * @returns {number} Amount in USD
 */
export const uzsToUsd = (uzs) => {
  const USD_TO_UZS_RATE = 12650;
  return uzs / USD_TO_UZS_RATE;
};

/**
 * Formats a date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date (e.g., "Jan 15, 2025")
 */
export const formatDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Formats duration in days to readable string
 * @param {number} days - Number of days
 * @returns {string} Formatted duration (e.g., "3 days", "1 day")
 */
export const formatDuration = (days) => {
  return days === 1 ? '1 day' : `${days} days`;
};

