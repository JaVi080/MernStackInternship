// CONCEPT: useState — React's way to store and update data inside a component.
// When state changes, React automatically re-renders (updates) the UI.
import { useState } from "react";

// Importing mock data (acts like a database for now)
import { Donations } from "../data/donations";

// TypeScript interface — defines the shape/structure of a Donation object.
// This gives us type-safety: TypeScript will warn us if we use wrong data types.
import type { Donation } from "../types/donation";

// Importing the custom CSS for the Donations page
import "./Donations.css";

const Donation_page = () => {

  // CONCEPT: useState
  // useState(initialValue) returns [currentValue, setterFunction]
  // We use it here to store the list of donations in memory (local state).
  const [donations, setDonations] = useState<Donation[]>(Donations);

  // showForm controls whether the Add/Edit form is visible
  const [showForm, setShowForm] = useState(false);

  // editingId stores the _id of the donation we are currently editing (null = adding new)
  const [editingId, setEditingId] = useState<string | null>(null);

  // formData holds the current input values in the form
  const [formData, setFormData] = useState<Donation>({
    _id: "",
    donorName: "",
    donorEmail: "",
    purpose: "",
    amount: 0,
    currency: "USD",
    paymentMethod: "",
    status: "Pending",
    createdAt: "",
    updatedAt: "",
  });

  // CONCEPT: Event Handlers
  // This function runs every time the user types in any input field.
  // e.target.name = which input field changed (matches the "name" attribute on <input>)
  // e.target.value = what the user typed
  // Spread operator "...formData" keeps all existing values, then overrides the one that changed.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CONCEPT: Form Submission
  // e.preventDefault() stops the browser from refreshing the page on form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE: map() loops every item; if the _id matches, replace it with formData
      // CONCEPT: .map() — transforms an array and returns a new one (does NOT mutate original)
      setDonations(
        donations.map((item) =>
          item._id === editingId ? { ...item, ...formData } : item
        )
      );
      setEditingId(null);
    } else {
      // CREATE: Add new donation to the existing list using spread operator
      const newDonation: Donation = {
        ...formData,
        _id: Date.now().toString(), // timestamp as unique ID (in real apps, server generates this)
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setDonations([...donations, newDonation]);
    }

    // Reset form and hide it after save
    setShowForm(false);
    setFormData({
      _id: "", donorName: "", donorEmail: "", purpose: "", amount: 0,
      currency: "USD", paymentMethod: "", status: "Pending", createdAt: "", updatedAt: "",
    });
  };

  // DELETE: .filter() returns a new array excluding the item with matching _id
  // CONCEPT: .filter() — returns only items that pass the condition (true=keep, false=remove)
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      setDonations(donations.filter((item) => item._id !== id));
    }
  };

  // EDIT: Populate the form with existing data and show the form
  const handleEdit = (donation: Donation) => {
    setEditingId(donation._id);
    setFormData(donation);
    setShowForm(true);
  };

  // Helper function: returns a Bootstrap badge color class based on the status text
  // CONCEPT: Helper functions — small reusable functions that keep JSX clean and readable
  const getStatusBadge = (status: string) => {
    if (status === "Completed") return "badge bg-success";
    if (status === "Pending") return "badge bg-warning text-dark";
    if (status === "Failed") return "badge bg-danger";
    return "badge bg-secondary"; // default fallback for any other status
  };

  return (
    // CONCEPT: className in React = same as class="" in HTML
    <div className="donations-page p-4">

      {/* --- Page Header --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="donations-title mb-0">Donations</h2>
          {/* Dynamic count from the state array */}
          <small className="text-muted">Total: {donations.length} records</small>
        </div>

        {/* Button toggles the form open/closed */}
        <button
          className="btn btn-add-donation d-flex align-items-center gap-2"
          onClick={() => {
            setEditingId(null);
            setFormData({ _id: "", donorName: "", donorEmail: "", purpose: "", amount: 0, currency: "USD", paymentMethod: "", status: "Pending", createdAt: "", updatedAt: "" });
            setShowForm(!showForm);
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Donation"}
        </button>
      </div>

      {/* --- Add / Edit Form ---
          CONCEPT: Conditional Rendering
          {showForm && <Component />} — JavaScript short-circuit evaluation.
          If showForm is true, the JSX renders. If false, nothing is rendered at all.
          Use this pattern whenever you want to show/hide something based on a boolean. */}
      {showForm && (
        <div className="donation-form-card mb-4 p-4">
          <h5 className="mb-3 fw-semibold">
            {editingId ? "Edit Donation" : "Add New Donation"}
          </h5>

          {/* CONCEPT: onSubmit on <form> — better than onClick on a button
              because it also catches "Enter" key submission automatically */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* CONCEPT: Controlled Input
                  value={formData.donorName} makes React own this input's value.
                  onChange keeps the state in sync with what the user types. */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Donor Name</label>
                <input
                  type="text" name="donorName" className="form-control"
                  placeholder="Full name" value={formData.donorName}
                  onChange={handleChange} required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Donor Email</label>
                <input
                  type="email" name="donorEmail" className="form-control"
                  placeholder="name@email.com" value={formData.donorEmail}
                  onChange={handleChange} required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-medium">Purpose</label>
                <input
                  type="text" name="purpose" className="form-control"
                  placeholder="e.g. Education" value={formData.purpose}
                  onChange={handleChange} required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-medium">Amount</label>
                <input
                  type="number" name="amount" className="form-control"
                  placeholder="0" value={formData.amount}
                  onChange={handleChange} required min={1}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-medium">Currency</label>
                <select name="currency" className="form-select" value={formData.currency} onChange={handleChange}>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>PKR</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Payment Method</label>
                <select name="paymentMethod" className="form-select" value={formData.paymentMethod} onChange={handleChange} required>
                  <option value="">-- Select Method --</option>
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Failed</option>
                </select>
              </div>

            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-save">
                {editingId ? "Update Donation" : "Save Donation"}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- Donations Table ---
          CONCEPT: Bootstrap's "table-responsive" wrapper
          Makes the table scroll horizontally on small screens instead of breaking the layout */}
      <div className="table-responsive donation-table-card">
        <table className="table table-hover mb-0 align-middle">

          <thead className="donations-table-head">
            <tr>
              <th>#</th>
              <th>Donor</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* CONCEPT: .map() for rendering a list in JSX
                React needs a unique "key" on each element in a list.
                Without it, React cannot track which item changed during re-renders. */}
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td className="text-muted">{index + 1}</td>
                <td>
                  <div className="fw-semibold">{donation.donorName}</div>
                  <small className="text-muted">{donation.donorEmail}</small>
                </td>
                <td>{donation.purpose}</td>
                <td className="fw-bold text-success">
                  {donation.currency} {donation.amount}
                </td>
                <td>{donation.paymentMethod}</td>
                <td>
                  {/* Dynamic class from helper function */}
                  <span className={getStatusBadge(donation.status)}>
                    {donation.status}
                  </span>
                </td>
                <td className="text-muted">{donation.createdAt}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-edit btn-sm" onClick={() => handleEdit(donation)}>
                      Edit
                    </button>
                    <button className="btn btn-delete btn-sm" onClick={() => handleDelete(donation._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state — shown when the donations array has zero items */}
        {donations.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p className="fs-5">No donations yet. Click "+ Add Donation" to get started!</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Donation_page;