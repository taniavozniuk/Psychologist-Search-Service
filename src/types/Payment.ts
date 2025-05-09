export interface Payment {
  id?: number;
  bookingId: number;
  status: "PENDING" | "PAID" | 'CANCELED' | 'EXPIRED';
  sessionId: string;
  sessionUrl: string;
  amount: number;
}
