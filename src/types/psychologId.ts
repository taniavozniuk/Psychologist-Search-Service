export interface PsychologId {
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
  concerns: [{
    id: number;
    name: string;
  }];
  approaches: [{
    id: number;
    name: string;
  }];
}
