export function formatNumber(price) {
    if (price) {
        const num = parseFloat(price);
        if (num >= 1_000_000_000) {
          return `${(num / 1_000_000_000).toFixed(1)} млрд$`;
        } else if (num >= 1_000_000) {
          return `${(num / 1_000_000).toFixed(1)} млн$`;
        } else {
          return `${num.toFixed(2)}$`;
        }
      } else {
        return "N/A";
      }
  }

  