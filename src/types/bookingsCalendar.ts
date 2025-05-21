export type BookingCalendar = {
  id?: number;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  psychologistId: number;
  userId: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";
};