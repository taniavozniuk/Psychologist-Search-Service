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
  concernIds: {
    id: number;
    name: string;
  };
  approachIds: {
    id: number;
    name: string;
  };
}
