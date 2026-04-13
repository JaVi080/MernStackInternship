// App.tsx — Root component. Sets up all routes for the application.
//
// CONCEPT: React Router
// React Router lets us switch between "pages" (components) based on the URL
// WITHOUT refreshing the browser. This is called a Single Page Application (SPA).
//
// Key components:
//   BrowserRouter — wraps the whole app; reads the browser's URL
//   Routes       — container that looks through all <Route> children for a match
//   Route        — maps a URL path to a component
//   Outlet       — placeholder in Layout.tsx where child routes render

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage      from './pages/LandingPage';
import Donation_page    from './pages/Donations';
import Events           from './pages/Events';
import Beneficiaries    from './pages/Beneficiaries';
import Dashboard     from './pages/Dashboard';
import Setting       from './pages/Setting';
import SearchFilter  from './pages/SearchFilter';

// Layout wraps all dashboard pages — provides Navbar + Sidebar automatically
import Layout from './layout/Layout';

// CONCEPT: Context Provider — wraps the app so all pages can share user data
import { UserProvider } from './context/UserContext';

import './App.css';

function App() {
  return (
    // UserProvider wraps everything so Navbar and Setting can share the display name
    <UserProvider>
    <BrowserRouter>
      <Routes>

        {/* ── Public page (no Navbar/Sidebar) ── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── Dashboard pages (all wrapped inside Layout) ──
            CONCEPT: Pathless Layout Route
            <Route element={<Layout />}> has NO path of its own.
            It just wraps its children with the Layout (Navbar + Sidebar).
            Each child route has its own full path (e.g. /donations).
            React renders: Layout → <Outlet /> → the matched child page. */}
        <Route element={<Layout />}>
          <Route path="/donations"      element={<Donation_page />} />
          <Route path="/events"         element={<Events />} />
          <Route path="/beneficiaries"  element={<Beneficiaries />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/search"     element={<SearchFilter />} />
          <Route path="/setting"    element={<Setting />} />
        </Route>

      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
