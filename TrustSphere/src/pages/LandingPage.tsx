// LandingPage.tsx — The first page a visitor sees (no sidebar/navbar here)
// CONCEPT: This component is mounted at "/" in App.tsx via React Router.
// It is standalone — it does NOT use the Layout component.

// Link = React Router's anchor tag. It navigates WITHOUT refreshing the page.
// A normal <a href="..."> would reload the whole page — Link prevents that.
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-wrapper">

      {/* ── Top Navbar ─────────────────────────────────── */}
      <nav className="landing-nav d-flex justify-content-between align-items-center px-4 py-3">
        <div className="landing-brand">🌍 TrustSphere</div>
        {/* Link to the donations page (inside the Layout) */}
        <Link to="/donations" className="btn btn-landing-nav">
          Go to Dashboard →
        </Link>
      </nav>

      {/* ── Hero Section ───────────────────────────────── */}
      {/* CONCEPT: A "hero" is the big featured section at the top of a landing page.
          It grabs attention and communicates the app's main purpose. */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-content">
          <span className="hero-badge mb-3 d-inline-block">✨ Trusted by 1,000+ donors</span>
          <h1 className="hero-title">
            Donate with <span className="text-highlight">Trust</span>,<br />
            Change Lives with <span className="text-highlight">Purpose</span>
          </h1>
          <p className="hero-subtitle mt-3 mb-4">
            TrustSphere connects generous donors with those who need it most —
            managing donations, events, and beneficiaries all in one place.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {/* Primary CTA — navigates to the dashboard */}
            <Link to="/donations" className="btn btn-hero-primary">
              Start Donating
            </Link>
            {/* Secondary CTA */}
            <Link to="/events" className="btn btn-hero-secondary">
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────── */}
      {/* Quick numbers build credibility */}
      <section className="stats-strip py-4">
        <div className="container-fluid">
          <div className="row text-center g-3">
            <div className="col-6 col-md-3">
              <div className="stat-number">$250K+</div>
              <div className="stat-label">Raised</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Donors</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">300+</div>
              <div className="stat-label">Beneficiaries</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">50+</div>
              <div className="stat-label">Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ──────────────────────────────── */}
      {/* CONCEPT: Repeating UI — instead of copy-pasting, map over an array.
          This keeps the code short and easy to update. */}
      <section className="features-section py-5 px-4">
        <h2 className="section-heading text-center mb-4">What We Manage</h2>
        <div className="row g-4 justify-content-center">
          {[
            { icon: "💰", title: "Donations", desc: "Track every donation — amount, status, and donor details.", link: "/donations" },
            { icon: "👥", title: "Beneficiaries", desc: "Register and manage people who receive support.", link: "/beneficiaries" },
            { icon: "📅", title: "Events", desc: "Organise charity events and campaigns easily.", link: "/events" },
          ].map((card) => (
            // key is required when using .map() to render JSX
            <div key={card.title} className="col-md-4">
              <div className="feature-card h-100 p-4 text-center">
                <div className="feature-icon mb-3">{card.icon}</div>
                <h5 className="fw-bold mb-2">{card.title}</h5>
                <p className="text-muted small mb-3">{card.desc}</p>
                <Link to={card.link} className="btn btn-feature-link btn-sm">
                  Open {card.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="landing-footer text-center py-3">
        <p className="mb-0 text-muted small">
          © 2024 TrustSphere — Built with ❤️ to make giving easy.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;