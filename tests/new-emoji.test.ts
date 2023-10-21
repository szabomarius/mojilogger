import { generateNewEmoji } from "../src/stateful/new-emoji";

describe('getNextEmoji function', () => {
  it('should return a string', () => {
    const emoji = generateNewEmoji();
    expect(typeof emoji).toBe('string');
  });

  it('should return different emojis when called sequentially', () => {
    const firstEmoji = generateNewEmoji();
    const secondEmoji = generateNewEmoji();
    expect(firstEmoji).not.toEqual(secondEmoji);
  });

  it('should return null when out of range', () => {
    let lastEmoji: string | null = '';
    let i = 0;
    while (i < 3125 ) {
      i++;
      lastEmoji = generateNewEmoji();
    }
    expect(lastEmoji).toBeNull();
  });
});
