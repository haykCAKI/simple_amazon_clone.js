export function formatCurrency(priceCents) {
  const dollars = (Math.round(priceCents / 100)).toFixed(2);
  return `$${dollars}`;
}

export default formatCurrency;
