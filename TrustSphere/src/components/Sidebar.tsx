import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdAttachMoney, MdPeople, MdEvent, MdSettings, MdClose } from "react-icons/md";

// Defining the props this component expects
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  // useLocation is a React Router hook that gives us the current URL.
  // We use this to highlight the active menu item.
  const location = useLocation();


  const links = [
    { path: "/dashboard", name: "Dashboard", icon: <MdDashboard size={20} /> },
    { path: "/donations", name: "Donations", icon: <MdAttachMoney size={20} /> },
    { path: "/beneficiaries", name: "Beneficiaries", icon: <MdPeople size={20} /> },
    { path: "/events", name: "Events", icon: <MdEvent size={20} /> },
    { path: "/setting", name: "Setting", icon: <MdSettings size={20} /> },
  ];

  return (
    // The classes handle: 
    // 1. Dark theme background (bg-dark text-white)
    // 2. Fixed width custom transitions via CSS (sidebar-custom)
    // 3. Conditional open state for mobile responsiveness (isOpen ? 'show' : '')
    <div className={`sidebar-custom bg-success text-white d-flex flex-column ${isOpen ? 'show' : ''}`}>
      
      {/* Sidebar Header with Brand and Close Button for Mobile */}
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom border-secondary mb-2">
        <h3 className="m-0 text-white fw-bold fs-4">TrustSphere</h3>
        {/* On mobile devices, this button hides the sidebar */}
        <button className="btn btn-outline-light d-md-none border-0 p-1" onClick={toggleSidebar}>
          <MdClose size={24} />
        </button>
      </div>

      {/* Navigation Links Loop */}
      <div className="sidebar-links nav flex-column flex-grow-1 px-2 gap-1 mt-1">
        {links.map((link) => {
          // Check if the current URL matches the link's path to apply "active" styling
          const isActive = location.pathname.startsWith(link.path);
          
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                // Determine if device is mobile based on screen width
                // Automatically close the sidebar when a link is clicked on Mobile sizes
                if (window.innerWidth < 768) {
                    toggleSidebar();
                }
              }}
              // Applying dynamic classes: if active, give it a primary background color
              className={`nav-link rounded text-white d-flex align-items-center py-2 px-3 gap-3 transition-colors ${
                isActive ? 'bg-primary shadow-sm' : 'sidebar-item-hover text-white-50'
              }`}
            >
              {link.icon}
              <span className="fw-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}