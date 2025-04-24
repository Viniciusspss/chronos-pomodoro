import { format } from "date-fns";

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return format(date, "dd/mm/yyyy HH:mm");
}
