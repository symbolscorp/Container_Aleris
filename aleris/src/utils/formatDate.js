export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  // Handle YYYYMMDD format
  if (/^\d{8}$/.test(dateStr)) {
    const y = dateStr.slice(0, 4);
    const m = dateStr.slice(4, 6);
    const d = dateStr.slice(6, 8);
    return `${d}/${m}/${y}`;
  }
  // Handle YYYY-MM-DD or YYYY/MM/DD
  const cleaned = dateStr.replace(/\//g, "-").split(" ")[0];
  const parts = cleaned.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export const getCurrentDateFormatted = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
};

export const getCurrentDateISO = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};
