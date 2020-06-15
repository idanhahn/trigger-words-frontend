export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  img: string;
  email: string;
  phone: string;
  chats?: any;
  numOfChats: number;
  feedback?: any;
  numOfFeedback: number;
  personalTraits?: any;
}
