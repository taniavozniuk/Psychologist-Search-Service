export type MyBokking = {
  id: number;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  // sessionId: string;
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
  userId: number;
  status: string;
};
