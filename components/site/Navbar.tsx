import Link from "next/link";
import Logo from "../brand/Logo";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Brand */}
        <Link href="/" className="row" aria-label="FormQuill (Home)">
          <Logo
            variant="full"
            size={65} // icon size
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            gap={6}
            tighten
          />
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
          <Link
            href="/signin"
            className="btn btn--ghost transition-colors hover:!bg-cyan-500 hover:!text-white">
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
