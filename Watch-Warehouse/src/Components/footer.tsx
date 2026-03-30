
import { Link } from "react-router-dom";

const footerLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s",
};

// Custom styles for each footer section
const sectionStyle = {
    background: "rgba(30,30,30,0.85)",
    borderRadius: "12px",
    padding: "24px 18px 18px 18px",
    margin: "8px 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
    minHeight: "220px",
};

const sectionTitleStyle = {
    color: "#f5c518",
    fontWeight: 700,
    marginBottom: "24px",
    letterSpacing: "1px",
};

const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const Footer= () =>{
    return(
        // Main footer wrapper with background and padding
        <div className='footer py-5' style={{ background: "linear-gradient(90deg, #232526 0%, #414345 100%)", color: "#fff", padding: "40px 0 0 0", textAlign: "center", borderTop: "4px solid #f5c518", boxShadow: "0 -2px 12px rgba(0,0,0,0.25)" }}>
            <div className="container">
                <div className="row g-4">
                    {/* Watch Warehouse Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center" style={sectionStyle}>
                        <h3 className="footer-title" style={sectionTitleStyle}>Watch Warehouse</h3>
                        <p className="footer-text" style={{ fontSize: "1rem", marginBottom: 8 }}>Premium Timepieces, Unmatched Elegance.<br/>
                            Imported from the world's finest brands.<br/>
                            Experience luxury that transcends time with Watch Warehouse.</p>
                        <p style={{ fontSize: "0.95rem", color: "#bbb" ,marginTop:"5px"}}>123 Luxury Ave, Time City, 45678</p>
                    </div>
                    {/* Quick Links Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center" style={sectionStyle}>
                        <h3 style={sectionTitleStyle}>Quick Links</h3>
                        <ul className="list-unstyled" style={{ paddingLeft: 0, textAlign: "left", width: "100%", maxWidth: 220 }}>
                            {quickLinks.map(link => (
                                <li key={link.to} style={{ marginBottom: "10px" }}>
                                    <Link to={link.to} style={footerLinkStyle}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact Us Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center" style={sectionStyle}>
                        <h3 style={sectionTitleStyle}>Contact Us</h3>
                        <p style={{ marginBottom: 6 }}><strong>Phone:</strong> <span style={{ color: "#f5c518" }}>0346-098362</span></p>
                        <p style={{ marginBottom: 6 }}><strong>Email:</strong> <span style={{ color: "#f5c518" }}>info@watchwarehouse.com</span></p>
                        <p style={{ fontSize: "0.95rem", color: "#bbb" }}>Mon-Fri: 9am - 6pm</p>
                    </div>
                </div>
                {/* Footer Bottom Section */}
                <div className="footer-bottom text-center mt-4 pt-3 border-top" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <p style={{ color: "#aaa", fontSize: "0.95rem" }}>&copy; 2024 Watch Warehouse. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;