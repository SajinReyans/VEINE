export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function unitLabel(unit: string) {
  switch (unit) {
    case "sqft":
      return "/ sq.ft";
    case "box":
      return "/ box";
    case "slab":
      return "/ slab";
    default:
      return "/ piece";
  }
}
