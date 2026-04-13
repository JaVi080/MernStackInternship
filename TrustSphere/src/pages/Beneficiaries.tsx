// Beneficiaries page — shows people who receive support from TrustSphere
// Pattern is same as Donations: useState, CRUD, controlled form

import { useState } from "react";
import type { beneficiary } from "../types/donation"; // import the TypeScript type
import "./Beneficiaries.css";

// ─── Sample Data ───────────────────────────────────────────────
// Static list to display immediately (no backend yet)
const initialBeneficiaries: beneficiary[] = [
  {
    _id: "1",
    name: "Ahmed Raza",
    email: "ahmed@example.com",
    phone: "0300-1234567",
    address: "House 5, Gulshan, Karachi",
    category: "Education",
    supportType: "Scholarship",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    _id: "2",
    name: "Fatima Khan",
    email: "fatima@example.com",
    phone: "0312-9876543",
    address: "Street 12, Model Town, Lahore",
    category: "Healthcare",
    supportType: "Medical Aid",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    _id: "3",
    name: "Usman Ali",
    email: "usman@example.com",
    phone: "0333-4567890",
    address: "Block C, Satellite Town, Rawalpindi",
    category: "Food",
    supportType: "Monthly Ration",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
];

function Beneficiaries() {
  // CONCEPT: useState stores our data. setXxx() updates it and triggers a re-render.
  const [beneficiaries, setBeneficiaries] = useState<beneficiary[]>(initialBeneficiaries);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // formData holds what the user types in the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "Education",
    supportType: "",
  });

  // ── Handlers ─────────────────────────────────────────────────

  // CONCEPT: Computed property name [e.target.name]
  // Allows one handleChange function to work for ALL input fields.
  // Without this we'd need a separate handler per field.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop browser page refresh

    if (editingId) {
      // UPDATE — replace the matching record using .map()
      setBeneficiaries(
        beneficiaries.map((b) =>
          b._id === editingId
            ? { ...b, ...formData, updatedAt: new Date().toLocaleDateString() }
            : b
        )
      );
      setEditingId(null);
    } else {
      // CREATE — build new record and add it to the list
      const newBeneficiary: beneficiary = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
    }

    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", address: "", category: "Education", supportType: "" });
  };

  // DELETE — filter out the item with the matching _id
  const handleDelete = (_id: string) => {
    if (window.confirm("Remove this beneficiary?")) {
      setBeneficiaries(beneficiaries.filter((b) => b._id !== _id));
    }
  };

  // EDIT — populate form with existing data
  const handleEdit = (b: beneficiary) => {
    setEditingId(b._id);
    setFormData({ name: b.name, email: b.email, phone: b.phone, address: b.address, category: b.category, supportType: b.supportType });
    setShowForm(true);
  };

  // Helper: pick a badge color per category
  // CONCEPT: Helper function — keeps JSX clean by moving logic outside the return block
  const getCategoryBadge = (cat: string) => {
    if (cat === "Education")  return "badge bg-primary";
    if (cat === "Healthcare") return "badge bg-danger";
    if (cat === "Food")       return "badge bg-warning text-dark";
    return "badge bg-secondary";
  };

  return (
    <div className="beneficiaries-page p-4">

      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="ben-title mb-0">Beneficiaries</h2>
          <small className="text-muted">{beneficiaries.length} registered</small>
        </div>
        <button
          className="btn btn-ben-add"
          onClick={() => {
            setEditingId(null);
            setFormData({ name: "", email: "", phone: "", address: "", category: "Education", supportType: "" });
            setShowForm(!showForm);
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Beneficiary"}
        </button>
      </div>

      {/* ── Form (shown conditionally) ──
          CONCEPT: Conditional Rendering — {boolean && <JSX />}
          Nothing renders if showForm is false — efficient and clean. */}
      {showForm && (
        <div className="ben-form-card mb-4 p-4">
          <h5 className="mb-3 fw-semibold">
            {editingId ? "Edit Beneficiary" : "Add New Beneficiary"}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium">Full Name</label>
                <input type="text" name="name" className="form-control" placeholder="Full name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Email</label>
                <input type="email" name="email" className="form-control" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Phone</label>
                <input type="text" name="phone" className="form-control" placeholder="0300-0000000" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Category</label>
                {/* CONCEPT: <select> dropdown — still uses same onChange pattern as input */}
                <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Food</option>
                  <option>Shelter</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Support Type</label>
                <input type="text" name="supportType" className="form-control" placeholder="e.g. Scholarship" value={formData.supportType} onChange={handleChange} required />
              </div>

              <div className="col-12">
                <label className="form-label fw-medium">Address</label>
                <input type="text" name="address" className="form-control" placeholder="Full address" value={formData.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-ben-save">
                {editingId ? "Update" : "Save"}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Table ──
          CONCEPT: table-responsive div makes the table scroll horizontally on small screens */}
      <div className="table-responsive ben-table-card">
        <table className="table table-hover mb-0 align-middle">
          <thead className="ben-table-head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Support Type</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* CONCEPT: .map() to render a row for each beneficiary.
                Always add "key" — React uses it to track list items efficiently. */}
            {beneficiaries.map((b, i) => (
              <tr key={b._id}>
                <td className="text-muted">{i + 1}</td>
                <td>
                  <div className="fw-semibold">{b.name}</div>
                </td>
                <td>
                  <div>{b.email}</div>
                  <small className="text-muted">{b.phone}</small>
                </td>
                <td>
                  <span className={getCategoryBadge(b.category)}>{b.category}</span>
                </td>
                <td>{b.supportType}</td>
                <td className="text-muted small">{b.address}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-ben-edit btn-sm" onClick={() => handleEdit(b)}>Edit</button>
                    <button className="btn btn-ben-delete btn-sm" onClick={() => handleDelete(b._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {beneficiaries.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p className="fs-5">No beneficiaries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Beneficiaries;
