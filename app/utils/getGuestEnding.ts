export const getGuestEnding = (guestsCount: number) => {
    const lastDigit = guestsCount % 10;

    const lastTwoDigits = guestsCount % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "гостей";
    } else if (lastDigit === 1) {
        return "гість";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "гостя";
    } else {
        return "гостей";
    }
}