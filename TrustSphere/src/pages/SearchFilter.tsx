// SearchFilter.tsx — Search & Filter Page
// Lets users search across Donations, Beneficiaries, and Events
// and filter results by category, date, or type.

// CONCEPT: useState — stores the search term, filters, and results
import { useState } from "react";

// Import data from our mock sources
import { Donations } from "../data/donations";
import type { Donation } from "../types/donation";
import type { beneficiary } from "../types/donation";
import type { Event } from "../types/donation";

// Custom styles for this page
import "./SearchFilter.css";

// ─── Sample data for beneficiaries & events (same as their pages) ──
// In a real app, all data would come from a shared store or API.
const beneficiariesData: beneficiary[] = [
  { _id: "1", name: "Ahmed Raza", email: "ahmed@example.com", phone: "0300-1234567", address: "House 5, Gulshan, Karachi", category: "Education", supportType: "Scholarship", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { _id: "2", name: "Fatima Khan", email: "fatima@example.com", phone: "0312-9876543", address: "Street 12, Model Town, Lahore", category: "Healthcare", supportType: "Medical Aid", createdAt: "2024-02-10", updatedAt: "2024-02-10" },
  { _id: "3", name: "Usman Ali", email: "usman@example.com", phone: "0333-4567890", address: "Block C, Satellite Town, Rawalpindi", category: "Food", supportType: "Monthly Ration", createdAt: "2024-03-15", updatedAt: "2024-03-15" },
];

const eventsData: Event[] = [
  { id: 1, title: "Charity Gala Night", date: "2024-06-15", location: "Grand Ballroom, Karachi", description: "An evening of fundraising.", image: "", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: 2, title: "Blood Donation Drive", date: "2024-07-10", location: "City Hospital, Lahore", description: "Community blood donation camp.", image: "", createdAt: "2024-01-05", updatedAt: "2024-01-05" },
  { id: 3, title: "Clean Water Campaign", date: "2024-08-20", location: "Rural Areas, Sindh", description: "Providing clean drinking water.", image: "", createdAt: "2024-01-10", updatedAt: "2024-01-10" },
];

// ─── A unified search result type ──
// We combine all three data sources into a single list of "SearchResult" items.
// This makes it easy to display them together in one table.
interface SearchResult {
  id: string;
  type: "Donation" | "Beneficiary" | "Event"; // which category this result belongs to
  name: string;       // display name (donor name, beneficiary name, or event title)
  detail: string;     // extra info (purpose/amount, category, or location)
  date: string;       // creation date
  status: string;     // status badge text
}

const SearchFilter = () => {
  // ── State variables ──

  // CONCEPT: Controlled input — React owns the search text via state
  const [searchTerm, setSearchTerm] = useState("");

  // Filter: which type to show (All, Donation, Beneficiary, Event)
  const [typeFilter, setTypeFilter] = useState("All");

  // Filter: which category/purpose (All, Education, Healthcare, Food, etc.)
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filter: filter by date (empty = no date filter)
  const [dateFilter, setDateFilter] = useState("");

  // ── Build the unified results list ──
  // CONCEPT: We transform each data source into a common "SearchResult" shape
  // so everything can be searched and filtered together.

  // Turn donations into SearchResult
  const donationResults: SearchResult[] = Donations.map((d: Donation) => ({
    id: d._id,
    type: "Donation" as const,
    name: d.donorName,
    detail: `${d.purpose} — ${d.currency} ${d.amount}`,
    date: d.createdAt,
    status: d.status,
  }));

  // Turn beneficiaries into SearchResult
  const beneficiaryResults: SearchResult[] = beneficiariesData.map((b) => ({
    id: b._id,
    type: "Beneficiary" as const,
    name: b.name,
    detail: `${b.category} — ${b.supportType}`,
    date: b.createdAt,
    status: "Active",
  }));

  // Turn events into SearchResult
  const eventResults: SearchResult[] = eventsData.map((e) => ({
    id: String(e.id),
    type: "Event" as const,
    name: e.title,
    detail: e.location,
    date: e.date,
    status: "Upcoming",
  }));

  // Merge all results into one big array
  const allResults: SearchResult[] = [
    ...donationResults,
    ...beneficiaryResults,
    ...eventResults,
  ];

  // ── Apply filters ──
  // CONCEPT: .filter() — creates a new array with only the items that pass ALL conditions.
  // We chain multiple conditions using && (AND logic).
  const filteredResults = allResults.filter((item) => {
    // 1) Search term — check if name or detail contains the search text (case-insensitive)
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
      // ||
      // item.detail.toLowerCase().includes(searchTerm.toLowerCase());

    // 2) Type filter — "All" shows everything, otherwise must match the type
    const matchesType = typeFilter === "All" || item.type === typeFilter;

    // 3) Category filter — check if the detail string contains the category text
    const matchesCategory =
      categoryFilter === "All" ||
      item.detail.toLowerCase().includes(categoryFilter.toLowerCase());

    // 4) Date filter — if set, only show results from that specific date
    const matchesDate = dateFilter === "" || item.date === dateFilter;

    // Item must pass ALL conditions
    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  // ── Helper: badge color based on type ──
  const getTypeBadge = (type: string) => {
    if (type === "Donation") return "badge bg-success";
    if (type === "Beneficiary") return "badge bg-primary";
    if (type === "Event") return "badge bg-info text-dark";
    return "badge bg-secondary";
  };

  // ── Helper: badge color based on status ──
  const getStatusBadge = (status: string) => {
    if (status === "Completed") return "badge bg-success rounded-pill";
    if (status === "Pending") return "badge bg-warning rounded-pill text-dark";
    if (status === "Active") return "badge bg-primary rounded-pill";
    if (status === "Upcoming") return "badge bg-info rounded-pill text-dark";
    return "badge bg-secondary rounded-pill";
  };

  // ── Clear all filters at once ──
  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setCategoryFilter("All");
    setDateFilter("");
  };

  return (
    <div className="search-page p-4">

      {/* ── Page Header ── */}
      <div className="mb-4">
        <h2 className="search-title mb-1">Search & Filter</h2>
        <p className="text-muted">
          Find donations, beneficiaries, or events in one place
        </p>
      </div>

      {/* ── Search Bar ── */}
      {/* CONCEPT: Controlled input — value is tied to state, onChange updates it */}
      <div className="search-bar-wrapper mb-4">
        <input
          type="text"
          className="form-control form-control-lg search-input"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ── Filters Row ──
          CONCEPT: Bootstrap grid (row + col) to lay out filters side by side.
          On small screens they stack vertically (col-12), on medium+ they sit in a row. */}
      <div className="filter-card p-3 mb-4">
        <div className="row g-3 align-items-end">

          {/* Filter by Type */}
          <div className="col-12 col-md-3">
            <label className="form-label fw-medium small text-muted">Type</label>
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Donation">Donations</option>
              <option value="Beneficiary">Beneficiaries</option>
              <option value="Event">Events</option>
            </select>
          </div>

          {/* Filter by Category */}
          <div className="col-12 col-md-3">
            <label className="form-label fw-medium small text-muted">Category</label>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Food">Food</option>
              <option value="Shelter">Shelter</option>
            </select>
          </div>

          {/* Filter by Date */}
          <div className="col-12 col-md-3">
            <label className="form-label fw-medium small text-muted">Date</label>
            <input
              type="date"
              className="form-control"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Clear Filters Button */}
          <div className="col-12 col-md-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── Results Count ── */}
      <p className="text-muted mb-3">
        Showing <strong>{filteredResults.length}</strong> of{" "}
        <strong>{allResults.length}</strong> results
      </p>

      {/* ── Results Table ──
          CONCEPT: table-responsive wraps the table so it scrolls on small screens */}
      <div className="table-responsive search-table-card">
        <table className="table table-hover mb-0 align-middle">
          <thead className="search-table-head">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Name</th>
              <th>Details</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* CONCEPT: .map() renders a table row for each filtered result.
                "key" is required so React can track items efficiently. */}
            {filteredResults.map((item, index) => (
              <tr key={`${item.type}-${item.id}`}>
                <td className="text-muted">{index + 1}</td>
                <td>
                  <span className={getTypeBadge(item.type)}>{item.type}</span>
                </td>
                <td className="fw-semibold">{item.name}</td>
                <td className="text-muted">{item.detail}</td>
                <td>{item.date}</td>
                <td>
                  <span className={getStatusBadge(item.status)}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state — shown when no results match the filters */}
        {filteredResults.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p className="fs-5">No results found. Try different filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
