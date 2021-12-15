
export const generateNumbers = (maxNr: number): number[] =>
    Array.from({length: maxNr}, (_, i) => i + 1);
