// Setting.tsx — Profile / Settings Page
// Features:
//   1. Theme switching (light/dark mode)
//   2. Clear stored data
//   3. Manage preferences (notifications, language)

// CONCEPT: useState — stores the current value of each setting.
// When state changes, React re-renders the component to reflect the change.
import { useState } from "react";

// CONCEPT: useUser — our custom hook to access the shared user profile
// Whatever we change here (displayName, email) will also update in the Navbar
// because BOTH components read from the same Context.
import { useUser } from "../context/UserContext";

// Custom styles
import "./Setting.css";

const Setting = () => {
  // ── Shared state from Context ──
  // CONCEPT: Context vs local state
  // profileName and profileEmail come from Context (shared across the app)
  // darkMode, notifications, language are local state (only used here)
  const { displayName: profileName, setDisplayName: setProfileName, email: profileEmail, setEmail: setProfileEmail } = useUser();

  // ── Local state for settings that only matter on this page ──

  // CONCEPT: Boolean state — true/false toggle for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Notification preference (on/off)
  const [notifications, setNotifications] = useState(true);

  // Language preference
  const [language, setLanguage] = useState("English");

  // Success message shown after saving
  const [successMsg, setSuccessMsg] = useState("");

  // ── Handlers ──

  // Toggle dark mode on/off
  // CONCEPT: We flip the boolean using !currentValue
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, you'd apply the theme to the whole document here
    // e.g. document.body.classList.toggle('dark-theme');
  };

  // Clear all stored data (simulated)
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all stored data? This cannot be undone.")) {
      // In a real app, this would clear localStorage, sessionStorage, etc.
      localStorage.clear();
      setSuccessMsg("All stored data has been cleared!");
      // Auto-hide message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // In a real app, this would send data to a backend API
    setSuccessMsg("Settings saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="setting-page p-4">

      {/* ── Page Header ── */}
      <div className="mb-4">
        <h2 className="setting-title mb-1">Settings</h2>
        <p className="text-muted">Manage your profile and preferences</p>
      </div>

      {/* ── Success Alert ──
          CONCEPT: Conditional rendering — only show the alert when successMsg is not empty */}
      {successMsg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMsg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMsg("")}
          ></button>
        </div>
      )}

      <div className="row g-4">

        {/* ── Left Column: Profile Info ── */}
        <div className="col-12 col-lg-6">
          <div className="card setting-card shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h5 className="mb-0 fw-bold">👤 Profile Information</h5>
            </div>
            <div className="card-body">
              {/* CONCEPT: Controlled inputs — value is driven by state */}
              <div className="mb-3">
                <label className="form-label fw-medium">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary setting-save-btn"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Preferences ── */}
        <div className="col-12 col-lg-6">
          <div className="card setting-card shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h5 className="mb-0 fw-bold">⚙️ Preferences</h5>
            </div>
            <div className="card-body">

              {/* Theme Toggle */}
              {/* CONCEPT: Bootstrap form-check-switch — a toggle-style checkbox 
                  The "checked" prop is controlled by darkMode state */}
              <div className="d-flex justify-content-between align-items-center mb-4 setting-item">
                <div>
                  <h6 className="mb-0 fw-semibold">Dark Mode</h6>
                  <small className="text-muted">Switch between light and dark theme</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="darkModeSwitch"
                    checked={darkMode}
                    onChange={handleThemeToggle}
                  />
                </div>
              </div>

              {/* Notifications Toggle */}
              <div className="d-flex justify-content-between align-items-center mb-4 setting-item">
                <div>
                  <h6 className="mb-0 fw-semibold">Notifications</h6>
                  <small className="text-muted">Receive email alerts for new activity</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="notifSwitch"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                </div>
              </div>

              {/* Language Selector */}
              <div className="d-flex justify-content-between align-items-center mb-3 setting-item">
                <div>
                  <h6 className="mb-0 fw-semibold">Language</h6>
                  <small className="text-muted">Choose your preferred language</small>
                </div>
                <select
                  className="form-select w-auto"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

    

      </div>
    </div>
  );
};

export default Setting;
