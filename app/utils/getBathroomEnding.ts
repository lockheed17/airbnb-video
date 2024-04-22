export const getBathroomEnding = (bathroomsCount: number) => {
    if (bathroomsCount === 1) {
        return "ванна";
    } else {
        return "ванних";
    }
}