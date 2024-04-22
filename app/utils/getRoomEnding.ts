export const getRoomEnding = (roomsCount: number) => {
    // Отримуємо останню цифру числа
    const lastDigit = roomsCount % 10;

    // Отримуємо останні дві цифри числа
    const lastTwoDigits = roomsCount % 100;

    // Перевіряємо випадки для останньої цифри та двох останніх цифр
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "кімнат";
    } else if (lastDigit === 1) {
        return "кімната";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "кімнати";
    } else {
        return "кімнат";
    }
}