export interface Donation {
    _id: string; //indicate internal field or sys generated field --just a convention
    donorName: string;
    donorEmail: string;
    purpose: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface beneficiary {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    category: string;
    supportType: string;
    createdAt: string;
    updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
 createdAt: string;
updatedAt: string;
}