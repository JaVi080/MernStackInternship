// UserContext.tsx — Shared state for user profile info
//
// CONCEPT: React Context
// Context lets you share data (like the user's name) between components
// that are far apart in the component tree — WITHOUT passing props
// through every level manually.
//
// How it works:
//   1. createContext()   — creates a "channel" for the data
//   2. <Provider>        — wraps the app and PROVIDES the data to all children
//   3. useContext(ctx)   — any child component can READ the data from the channel
//
// In our case:
//   Setting.tsx WRITES the display name into context
//   Navbar.tsx  READS the display name from context

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define what data this context will hold
interface UserContextType {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

// Create the context with default values
// These defaults are only used if a component tries to use the context
// WITHOUT a Provider above it (shouldn't happen in our app)
const UserContext = createContext<UserContextType>({
  displayName: "Admin User",
  setDisplayName: () => {},
  email: "admin@trustsphere.com",
  setEmail: () => {},
});

// Provider component — wraps the app and holds the actual state
// CONCEPT: children prop — whatever JSX you put INSIDE <UserProvider>...</UserProvider>
// gets rendered in place of {children}
export function UserProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayName] = useState("Admin User");
  const [email, setEmail] = useState("admin@trustsphere.com");

  return (
    <UserContext.Provider value={{ displayName, setDisplayName, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook — a shortcut so other files can just write useUser()
// instead of import + useContext(UserContext) every time
// CONCEPT: Custom Hook — any function starting with "use" that calls other hooks
export function useUser() {
  return useContext(UserContext);
}
