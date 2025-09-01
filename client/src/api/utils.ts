export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { //pft american date
    year: "numeric",
    month: "short",  
    day: "numeric",  
  });
}