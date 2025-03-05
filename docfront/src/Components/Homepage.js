
import "./Homepage.css"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="navbar-logo">
          {/* <img src={logo} alt="DMS Logo" /> */}
        </div>
        <h1>Document Management System</h1>
      </div>
      
    </nav>
  );
};

const HomeContent = () => {
  return (
    <div className="home-content">
      <div className="hero">
        <h2>Effortless Document Management</h2>
        <p>"Securely store, organize, and share your important documents in one place."</p>
        <button className="cta-button"><a href="/dashboard">Get Started</a></button>
      </div>
      <div className="about">
        <h3>Why Choose DocuManage?</h3>
        <p>Our Document Management System simplifies file organization, retrieval, and sharing with robust security and accessibility.</p>
        <p>Upload, manage, and collaborate on documents effortlessly from anywhere, anytime.</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="document-management-page">
      <Navbar />
      <HomeContent />
    </div>
  );
};

export default HomePage;
