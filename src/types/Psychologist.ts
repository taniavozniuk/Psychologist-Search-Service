export interface Psychologist {
  id: number,
  firstName: string,
  lastName: string,
  fatherName: string,
  phoneNumber: string,
  email: string,
  introduction: string,
  speciality: {
    id: number,
    name: string
  },
  sessionPrice: number,
  gender: string
}