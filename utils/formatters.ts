import { TranslationKey } from '../translations';

/**
 * Formats a number as UZS currency.
 * @param amount The number to format.
 * @param t The translation function.
 * @param showSymbol Whether to show the currency symbol (e.g., "so'm"). Defaults to true.
 * @returns The formatted currency string.
 */
export const formatCurrency = (
    amount: number, 
    t: (key: TranslationKey, replacements?: Record<string, string>) => string,
    showSymbol: boolean = true
): string => {
    // Use 'fr-FR' locale to get space as a thousands separator.
    const formattedAmount = new Intl.NumberFormat('fr-FR').format(Math.round(amount));
    if (showSymbol) {
        return `${formattedAmount} ${t('currency.uzs.short')}`;
    }
    return formattedAmount;
};
