// CONCEPT: useState — stores data that can change inside a component.
// When state changes, React re-renders the component to show the new data.
import { useState } from "react";

// TypeScript interface from our types file.
// CONCEPT: TypeScript interfaces define what fields an object MUST have.
// If you forget a field or use a wrong type, TypeScript will warn you.
import type { Event } from "../types/donation";

// Custom CSS for this page
import "./Events.css";

// ─── Sample Data ───────────────────────────────────────────────
// In a real app this would come from an API/database.
// For now we hardcode it so the page shows something immediately.
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Charity Gala Night",
    date: "2024-06-15",
    location: "Grand Ballroom, Karachi",
    description: "An evening of fundraising and entertainment to support education.",
    image: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 2,
    title: "Blood Donation Drive",
    date: "2024-07-10",
    location: "City Hospital, Lahore",
    description: "Community blood donation camp to help patients in need.",
    image: "",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: 3,
    title: "Clean Water Campaign",
    date: "2024-08-20",
    location: "Rural Areas, Sindh",
    description: "Providing clean drinking water to underserved communities.",
    image: "",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
];

// ─── Component ─────────────────────────────────────────────────
// CONCEPT: Functional Component — a plain JavaScript function that returns JSX (HTML-like UI).
// This is the modern way to write React components (no class needed).
function Events() {
  // State for the events list
  const [events, setEvents] = useState<Event[]>(initialEvents);

  // State: show/hide the add-edit form
  const [showForm, setShowForm] = useState(false);

  // State: which event are we editing? null means "adding new"
  const [editingId, setEditingId] = useState<number | null>(null);

  // State: form fields (controlled inputs)
  // CONCEPT: Controlled Form — React owns the input values via state.
  // onChange keeps state synced with what the user types.
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // ── Handlers ─────────────────────────────────────────────────

  // Runs every time the user types in any input or textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Spread operator keeps all previous fields, then updates just the one that changed
    // [e.target.name] is a "computed property key" — it evaluates to the input's name attribute
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Runs when the form is submitted (Save button clicked or Enter pressed)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent browser from refreshing the page on form submit
    e.preventDefault();

    if (editingId !== null) {
      // UPDATE: replace the matching event using .map()
      // CONCEPT: .map() — loops the array and returns a NEW array (never changes the original)
      setEvents(
        events.map((ev) =>
          ev.id === editingId
            ? { ...ev, ...formData, updatedAt: new Date().toLocaleDateString() }
            : ev // keep all other events unchanged
        )
      );
      setEditingId(null);
    } else {
      // CREATE: build a new event object and add it to the list
      const newEvent: Event = {
        id: Date.now(), // unique id using current timestamp
        ...formData,
        image: "",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      // CONCEPT: Spread to add new item — [...existing, newItem]
      // We never push directly into state; we create a new array instead.
      setEvents([...events, newEvent]);
    }

    // Close form and reset fields
    setShowForm(false);
    setFormData({ title: "", date: "", location: "", description: "" });
  };

  // DELETE: remove the event that matches the given id
  // CONCEPT: .filter() — returns only items where the condition is true (id !== the deleted one)
  const handleDelete = (id: number) => {
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  // EDIT: fill the form with the event's data, then show the form
  const handleEdit = (ev: Event) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      date: ev.date,
      location: ev.location,
      description: ev.description,
    });
    setShowForm(true);
  };

  // ── Return (JSX) ──────────────────────────────────────────────
  // CONCEPT: JSX — looks like HTML but lives inside JavaScript/TypeScript.
  // Every JSX element maps to a React.createElement() call under the hood.
  return (
    <div className="events-page p-4">

      {/* ── Header Row ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="events-title mb-0">Events</h2>
          <small className="text-muted">{events.length} upcoming events</small>
        </div>

        {/* Toggle the form open/closed */}
        <button
          className="btn btn-event-add"
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", date: "", location: "", description: "" });
            setShowForm(!showForm);
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Event"}
        </button>
      </div>

      {/* ── Add / Edit Form ──
          CONCEPT: Conditional Rendering — {condition && <JSX />}
          The form only renders when showForm is true. */}
      {showForm && (
        <div className="event-form-card mb-4 p-4">
          <h5 className="mb-3 fw-semibold">
            {editingId !== null ? "Edit Event" : "Add New Event"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium">Event Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g. Charity Gala"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g. City Hall, Karachi"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-medium">Description</label>
                {/* textarea for multi-line text */}
                <textarea
                  name="description"
                  className="form-control"
                  rows={3}
                  placeholder="Brief description of the event..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-event-save">
                {editingId !== null ? "Update Event" : "Save Event"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Events Grid ──
          CONCEPT: CSS Grid via Bootstrap's row + col classes.
          "col-md-6 col-lg-4" means: full width on mobile, half on tablet, third on desktop. */}
      <div className="row g-4">
        {events.map((ev) => (
          // CONCEPT: key prop — React needs a unique key on each list item
          // to efficiently track which item changed during re-renders.
          <div key={ev.id} className="col-md-6 col-lg-4">
            <div className="event-card h-100">
              {/* Coloured banner at the top of the card */}
              <div className="event-card-banner d-flex align-items-center justify-content-center">
                <span className="event-icon">📅</span>
              </div>

              <div className="event-card-body p-3">
                <h5 className="fw-bold mb-1">{ev.title}</h5>
                <p className="text-muted mb-1 small">
                  📍 {ev.location}
                </p>
                <p className="event-date-badge mb-2">
                  🗓️ {ev.date}
                </p>
                <p className="text-muted small">{ev.description}</p>
              </div>

              {/* Card footer: edit & delete buttons */}
              <div className="event-card-footer d-flex gap-2 p-3 pt-0">
                <button
                  className="btn btn-event-edit btn-sm flex-grow-1"
                  onClick={() => handleEdit(ev)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-event-delete btn-sm flex-grow-1"
                  onClick={() => handleDelete(ev.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No events yet. Click "+ Add Event" to create one!</p>
        </div>
      )}
    </div>
  );
}

export default Events;
