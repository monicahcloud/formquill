import Logo from "@/components/brand/Logo";
import TemplatesClient from "./TemplatesClient";

export const dynamic = "force-dynamic";

export default function TemplatesPage() {
  return (
    <div>
      <header className="navbar">
        <div className="container navbar__inner">
          {/* Left: brand */}
          <div className="row">
            <div className="row">
              <Logo />
            </div>
          </div>

          {/* Center: links (now truly centered) */}
          <nav className="navbar__links navbar__center">
            <a className="navlink" href="/app">
              Dashboard
            </a>
            <a className="navlink navlink--active" href="/templates">
              Templates
            </a>
            <a className="navlink" href="/app/forms/new">
              Builder
            </a>
            <a className="navlink" href="/app/analytics">
              Analytics
            </a>
          </nav>

          {/* Right: actions */}
          <div className="row">
            <span className="badge">Pro Plan</span>
            <a className="btn btn--primary" href="/app/forms/new">
              Create
            </a>
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <header className="mb-6">
            <h1
              className="mb-1"
              style={{ fontSize: "1.875rem", fontWeight: 800 }}>
              Form Templates
            </h1>
            <p className="text-muted">
              Choose from professional templates designed for your industry
            </p>
          </header>

          <TemplatesClient />
        </div>
      </main>
    </div>
  );
}
