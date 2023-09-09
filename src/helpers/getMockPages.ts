export function getMockPages(from: number, to: number) {
  const cardItems = [];

  for (let i = from; i < to; i++) {
    cardItems.push(`${i} Card Item`);
  }

  return cardItems;
}
