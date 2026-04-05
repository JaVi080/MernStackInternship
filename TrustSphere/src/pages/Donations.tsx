import { useState } from "react"

import {Donations} from "../data/donations";

const HomePage = () => {
    const [donations, setDonations] = useState(Donations);
    const [formData, setFormData] = useState({
        donorName: "",
        donorEmail: "",
        purpose: "",
        amount: 0,
        currency: "",
        paymentMethod: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    });
    const [editingId,setEditingId] = useState<string | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
    return (
        <div className="donations">
            <div className="donations-header">
                <h1>Donations</h1>
            </div>
            <div className="donations-content">
                <p>Welcome to Donations</p>
            </div>
        </div>
    );
}
export default Donations;