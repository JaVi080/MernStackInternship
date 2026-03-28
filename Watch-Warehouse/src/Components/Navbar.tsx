// ─────────────────────────────────────────────────────────────────────────────
// FILE: Navbar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// This is a REACT COMPONENT — a reusable piece of UI (like a LEGO block).
// It builds the top navigation bar that shows on every page of the app.
// Layout:  [Logo]  [Home | Shop | About | Contact]  [🛒 | Login | Sign Up]
// ─────────────────────────────────────────────────────────────────────────────


// ── REACT + JS CONCEPT: "import" ────────────────────────────────────────────
// `import` is a JavaScript (ES6) feature that loads code from another file.
// Here we import:
//   - React       → the core library that makes JSX (the HTML-like syntax) work
//   - useState    → a React "Hook" — lets us store and update data inside a component
//   - Link        → a React Router component — works like <a>, but WITHOUT page reload
import React, { useState } from "react";
import { Link } from "react-router-dom";


// ── TYPESCRIPT CONCEPT: "interface" ─────────────────────────────────────────
// An `interface` is a TypeScript-only feature. It does NOT exist in JavaScript.
// It defines the "shape" (blueprint) of an object — what fields it must have
// and what data type each field should be (string, number, boolean, etc.).
//
// Think of it like a form template:
//   Every nav link MUST have a `label` (string) and a `path` (string).
//   If you forget one, TypeScript will show a red error before you even run the code.
interface NavLink {
    label: string; // Text that appears on the screen, e.g. "Home"
    path: string;  // URL the link goes to, e.g. "/shop"
}


// ── JS CONCEPT: "const" + TYPESCRIPT CONCEPT: "Type Annotation" + Array ────
// `const` is JavaScript — it declares a variable that cannot be reassigned.
// `NavLink[]` is TypeScript — it means: "this is an Array of NavLink objects".
//   The [] after NavLink means "array of". So NavLink[] = array of NavLink.
//
// Putting all links in one array is a clean pattern:
//   → To add a new link, just add one line here. No need to touch JSX.
//   → To remove a link, just delete a line here.
const NAV_LINKS: NavLink[] = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
];


// ── REACT CONCEPT: "Component" definition ───────────────────────────────────
// A React component is just a JavaScript function that returns JSX.
// JSX looks like HTML but it's actually JavaScript under the hood.
//
// `React.FC` is a TypeScript type — "FC" stands for "Function Component".
//   It tells TypeScript: "this function is a React component."
//   It's optional but good practice in TypeScript projects.
//
// Arrow function `() => { }` is a modern JavaScript syntax for writing functions.
const Navbar: React.FC = () => {

    // ── REACT CONCEPT: "useState" Hook ──────────────────────────────────────
    // useState is the most important React hook for beginners to learn.
    // It lets us store a value inside the component that can change over time.
    // When the value changes, React automatically re-renders (redraws) the component.
    //
    // Syntax:  const [value, setValue] = useState(initialValue)
    //   - `menuOpen`    → the current value (true = menu is open, false = menu is closed)
    //   - `setMenuOpen` → the function we call to UPDATE the value
    //   - `useState(false)` → the starting value is `false` (menu starts closed)
    //
    // `<boolean>` is TypeScript — it tells TypeScript this state can only be true or false.
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    // ── JS CONCEPT: Arrow Function ──────────────────────────────────────────
    // This is a regular JavaScript arrow function.
    // It calls setMenuOpen to flip the value: if true → false, if false → true.
    // `prev` is the current/previous value of menuOpen (React passes it automatically).
    // `!prev` means "NOT prev" — it flips the boolean.
    const toggleMenu = () => setMenuOpen((prev) => !prev);
    console.log(toggleMenu); //fro checking what is in this 

    // ── REACT CONCEPT: JSX (return statement) ───────────────────────────────
    // Every React component MUST return JSX.
    // JSX looks like HTML but has some differences:
    //   - Use `className` instead of `class` (because `class` is a reserved JS word)
    //   - Use `{}` to write JavaScript expressions inside the HTML
    //   - Every tag must be closed: <br /> not <br>
    return (
        // `<nav>` is a semantic HTML5 element — it tells the browser "this is navigation"
        // `style={styles.nav}` is JSX syntax to apply inline CSS using a JS object
        <nav style={styles.nav}>

            {/* ── REACT ROUTER CONCEPT: <Link> ──────────────────────────────
                <Link to="/"> is from the react-router-dom library.
                It works exactly like <a href="/">, BUT without reloading the page.
                In a React SPA (Single Page App), we NEVER want full page reloads.
                That is why we always use <Link> instead of <a> for internal navigation. */}
            <Link to="/" style={styles.brand}>
                ⌚ Watch Warehouse
            </Link>

            {/* ── JS CONCEPT: Array.map() ────────────────────────────────────
                `.map()` is a built-in JavaScript array method.
                It loops over every item in NAV_LINKS and returns a new JSX element for each.
                This is how React renders lists — no need to write each link by hand!

                REACT CONCEPT: `key` prop
                React requires a unique `key` on every item inside a .map().
                It uses the key to track which items changed, and only re-renders those.
                We use `link.path` as the key because paths are always unique. */}
            <ul className="nav-links" style={styles.navList}>
                {NAV_LINKS.map((link) => (
                    <li key={link.path} style={styles.navItem}>
                        <Link to={link.path} style={styles.navLink}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* ── RIGHT SIDE: Cart icon and auth buttons ─────────────────── */}
            <div className="nav-actions" style={styles.actions}>
                <Link to="/cart" style={styles.cartIcon} aria-label="Cart">
                    🛒
                </Link>
                <Link to="/login" style={styles.btnOutline}>Login</Link>
                <Link to="/register" style={styles.btnFilled}>Sign Up</Link>
            </div>

            {/* ── REACT CONCEPT: Event Handling ──────────────────────────────
                `onClick={toggleMenu}` is how we handle click events in React.
                When the button is clicked, React calls our `toggleMenu()` function.
                This is the same as addEventListener('click', ...) in plain JavaScript,
                but written directly in JSX for cleaner code.

                JS CONCEPT: Ternary Operator  condition ? valueIfTrue : valueIfFalse
                `menuOpen ? "✕" : "☰"` means:
                  - if menuOpen is true  → show "✕" (close icon)
                  - if menuOpen is false → show "☰" (hamburger icon) */}
            <button
                className="nav-hamburger"
                style={styles.hamburger}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            {/* ── REACT CONCEPT: Conditional Rendering with && ───────────────
                In React, `{condition && <Component />}` means:
                  "Only render this JSX IF the condition is true."
                If `menuOpen` is false, React renders nothing (the menu stays hidden).
                If `menuOpen` is true, React renders the mobile menu div below.

                This is called "short-circuit evaluation" — it's a JavaScript trick.
                In JS: `false && anything` always returns false (stops immediately).
                       `true  && anything` returns the "anything" (continues). */}
            {menuOpen && (
                <div style={styles.mobileMenu}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={styles.mobileLink}
                            onClick={() => setMenuOpen(false)} // JS arrow fn: close menu when a link is clicked
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};


// ── JS CONCEPT: Object + TYPESCRIPT CONCEPT: Type Annotation ────────────────
// `styles` is a plain JavaScript object where each key holds another object of CSS properties.
// We use it like: style={styles.nav}, style={styles.brand}, etc.
//
// `Record<string, React.CSSProperties>` is TypeScript:
//   - Record<K, V> means: "an object where all keys are type K and all values are type V"
//   - `string` → the keys ("nav", "brand", etc.) are strings
//   - `React.CSSProperties` → the values must be valid CSS properties (TypeScript will
//     give you an error if you write `colour` instead of `color`, for example)
const styles: Record<string, React.CSSProperties> = {
    nav: {
        display: "flex",               // CSS Flexbox — puts children in a row
        alignItems: "center",          // Vertically centers children
        justifyContent: "space-between", // Pushes logo left, links center, buttons right
        padding: "0 2rem",
        height: "64px",
        background: "#0f0f0f",         // Dark background
        color: "#fff",
        position: "sticky",            // Stays fixed at top of screen while you scroll
        top: 0,
        zIndex: 1000,                  // Ensures navbar renders on TOP of all other elements
        flexWrap: "wrap",              // Allows wrapping on small screens
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
    },
    brand: {
        fontSize: "1.3rem",
        fontWeight: 700,
        color: "#f5c518",              // Gold colour for the brand name
        textDecoration: "none",        // Removes the default underline from links
        letterSpacing: "1px",
    },
    navList: {
        display: "flex",               // Puts list items in a horizontal row
        gap: "2rem",                   // Adds space between each link
        listStyle: "none",             // Removes the default bullet points from <ul>
        margin: 0,
        padding: 0,
    },
    navItem: {},
    navLink: {
        color: "#ccc",
        textDecoration: "none",
        fontSize: "0.95rem",
        transition: "color 0.2s",      // Smooth color change on hover (pure CSS)
    },
    actions: {
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
    },
    cartIcon: {
        fontSize: "1.4rem",
        color: "#fff",
        textDecoration: "none",
    },
    btnOutline: {
        padding: "6px 14px",
        border: "1px solid #f5c518",
        borderRadius: "6px",
        color: "#f5c518",
        textDecoration: "none",
        fontSize: "0.85rem",
    },
    btnFilled: {
        padding: "6px 14px",
        background: "#f5c518",
        borderRadius: "6px",
        color: "#000",
        textDecoration: "none",
        fontSize: "0.85rem",
        fontWeight: 600,
    },
    hamburger: {
        display: "none",               // Default hidden on desktop — CSS .nav-hamburger overrides this on mobile
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "1.6rem",
        cursor: "pointer",
    },
    mobileMenu: {
        display: "flex",
        flexDirection: "column",       // Stacks children vertically (column direction)
        width: "100%",
        background: "#1a1a1a",
        padding: "1rem 2rem",
        gap: "0.8rem",
    },
    mobileLink: {
        color: "#ccc",
        textDecoration: "none",
        fontSize: "1rem",
    },
};


// ── REACT CONCEPT: "export default" ─────────────────────────────────────────
// This makes the Navbar component available to other files.
// Without this line, no other file could import and use this component.
// In App.tsx we write: import Navbar from './Components/Navbar'
// That import only works because of this export below.
export default Navbar;
