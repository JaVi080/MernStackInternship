
import type { Donation } from "../types/donation";


export const Donations : Donation[] = [
    {
     _id: "1",
    donorName: "John Doe",
    donorEmail: "[EMAIL_ADDRESS]",
    purpose: "Education",
    amount: 100,
    currency:"USD",
    paymentMethod: "Credit Card",
     status: "Completed", createdAt: "2022-01-01", updatedAt: "2022-01-01" },
    {
     _id: "2",
     donorName: "Jane Smith",
     donorEmail: "[EMAIL_ADDRESS]",
     purpose: "Education",
     amount: 200,
     currency: "USD",
     paymentMethod: "PayPal",
     status: "Completed",
     createdAt: "2022-01-01",
     updatedAt: "2022-01-01" },
    { 
         _id: "3",
         donorName: "Bob Johnson",
         donorEmail: "[EMAIL_ADDRESS]",
         purpose: "Education",
         amount: 300,
         currency: "USD",
         paymentMethod: "Credit Card",
         status: "Completed",
         createdAt: "2022-01-01",
         updatedAt: "2022-01-01" },
    { 
        _id: "4",
         donorName: "Alice Williams",
         donorEmail: "[EMAIL_ADDRESS]",
         purpose: "Education",
         amount: 400,
         currency: "USD",
         paymentMethod: "PayPal",
         status: "Completed",
         createdAt: "2022-01-01",
         updatedAt: "2022-01-01" },
    { 
        _id: "5",
         donorName: "Charlie Brown",
         donorEmail: "[EMAIL_ADDRESS]",
         purpose: "Education",
         amount: 500,
         currency: "USD",
         paymentMethod: "Credit Card",
         status: "Completed",
         createdAt: "2022-01-01",
         updatedAt: "2022-01-01" },
];