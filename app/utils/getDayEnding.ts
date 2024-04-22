export const getDayEnding = (daysCount: number) => {
    const lastDigit = daysCount % 10;

    const lastTwoDigits = daysCount % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "днів";
    } else if (lastDigit === 1) {
        return "день";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "дні";
    } else {
        return "днів";
    }
}