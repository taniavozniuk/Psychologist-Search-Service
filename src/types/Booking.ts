export type Booking = {
  id?: number;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  psychologistId: number;
  userId: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";
  feedbackForm?: boolean;
  psychologistDto: {
    id: number;
    firstName: string;
    lastName: string;
    fatherName: string;
    phoneNumber: string;
    email: string;
    introduction: string;
    speciality: {
      id: number;
      name: string;
    };
    sessionPrice: number;
    gender: string;
    experience: number;
    languages: string;
    education: string;
    imageUrl: string;
    meetingUrl: string;
    concerns: [
      {
        id: number;
        name: string;
      }
    ];
    approaches: [
      {
        id: null;
        name: string;
      }
    ];
  };
};
