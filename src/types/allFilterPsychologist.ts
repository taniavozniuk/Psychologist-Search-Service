// type Gender = "Male" | "Female" | "Other";

export interface allFilterPsychologist {
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
  imageUrl: string;
  meetingUrl: string;
  isLiked: boolean;
  concerns: [
    {
      id: number;
      name: string;
    }
  ];
  approaches: [
    {
      id: number;
      name: string;
    }
  ];
}

// interface FilteredPsychologistResponse {
//   results: allFilterPsychologist[];
//   count: number;
// }
