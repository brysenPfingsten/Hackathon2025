import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="public/seton_hall_logo.png"/>
        <span>Deepfake Awareness</span>
      </div>
      <div className="nav-links">
        <a href="#what">What Are Deepfakes?</a>
        <a href="#uses">Uses</a>
        <a href="#detect">Detection</a>
      </div>
    </nav>
  );
}