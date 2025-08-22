import Link from "next/link";
import Logo from "../brand/Logo";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Brand */}
        <Link href="/" className="row" aria-label="FormQuill (Home)">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="navbar__links">
          <Link href="/templates" className="navlink">
            Templates
          </Link>
          <a href="#pricing" className="navlink">
            Pricing
          </a>
          <a href="#features" className="navlink">
            Features
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link href="/signin" className="btn btn--ghost">
            Sign In
          </Link>
          <Link href="/signup" className="btn btn--primary">
            Start Free
          </Link>
        </div>
      </div>
      <div className="hr-gradient" />
    </nav>
  );
}
