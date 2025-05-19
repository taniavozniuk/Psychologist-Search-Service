export type Booking = {
  id?: number;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  psychologistId: number;
  userId: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";
  feedbackForm?: boolean;
};