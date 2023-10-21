let currentEmojiCodePoint = 0x2600; // Start from the '☀' emoji

export function generateNewEmoji(): string | null {
  while (true) {
    // Increment the current code point for the next iteration
    currentEmojiCodePoint++;

    // Skip over ranges that don't correspond to valid emojis
    if (
      (currentEmojiCodePoint >= 0x2600 && currentEmojiCodePoint <= 0x26FF) ||
      (currentEmojiCodePoint >= 0x2700 && currentEmojiCodePoint <= 0x27BF) ||
      (currentEmojiCodePoint >= 0x2B50 && currentEmojiCodePoint <= 0x2B50) ||
      (currentEmojiCodePoint >= 0x1F004 && currentEmojiCodePoint <= 0x1F0CF) ||
      (currentEmojiCodePoint >= 0x1F300 && currentEmojiCodePoint <= 0x1F64F) ||
      (currentEmojiCodePoint >= 0x1F680 && currentEmojiCodePoint <= 0x1F6FF) ||
      (currentEmojiCodePoint >= 0x1F700 && currentEmojiCodePoint <= 0x1F77F)
    ) {
      try {
        return String.fromCodePoint(currentEmojiCodePoint)
      } catch (e) {
        return null;
      }
    }

    // End of Unicode range
    if (currentEmojiCodePoint > 0x10FFFF) {
      return null;
    }
  }
}