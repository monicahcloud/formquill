// app/templates/TemplatesClient.tsx
"use client";

import { useMemo, useState } from "react";

import {
  MARKETING_TEMPLATES as TEMPLATES,
  type MarketingTemplate,
} from "@/lib/templates/marketingTemplates";
import { createFormFromMarketingTemplate } from "@/app/(app)/app/actions/template.actions";
// import UseTemplateButton from "./UseTemplateButton";

/* -----------------------------
   Condensed filter choices
----------------------------- */
const INDUSTRY_FILTERS = [
  "All",
  "Health & Wellness",
  "Real Estate & Home",
  "Finance & Legal",
  "Education",
  "IT & SaaS",
  "Retail & E-commerce",
  "Hospitality & Travel",
  "Nonprofit & Community",
  "Government & Public Sector",
  "Media & Creative",
  "Manufacturing & Logistics",
  "Sports & Events",
] as const;

const CATEGORY_FILTERS = [
  "All",
  "Lead & Contact",
  "Intake & Onboarding",
  "Appointments & Reservations",
  "Registration & RSVP",
  "Applications & Requests",
  "Orders & Quotes",
  "Support & Issues",
  "Feedback & Surveys",
  "Donations & Payments",
  "Hiring & HR",
] as const;

/* ---------------------------------------
   Map detailed values → condensed buckets
--------------------------------------- */
// Industries
const INDUSTRY_GROUPS: Record<string, (typeof INDUSTRY_FILTERS)[number]> = {
  Healthcare: "Health & Wellness",
  Clinic: "Health & Wellness",
  "Fitness & Wellness": "Health & Wellness",
  "Beauty & Salon": "Health & Wellness",
  "Pet Services": "Health & Wellness",

  "Real Estate": "Real Estate & Home",
  Construction: "Real Estate & Home",
  "Home Services": "Real Estate & Home",

  Finance: "Finance & Legal",
  Insurance: "Finance & Legal",
  Legal: "Finance & Legal",

  Education: "Education",

  "IT / SaaS": "IT & SaaS",

  Retail: "Retail & E-commerce",
  "E-commerce": "Retail & E-commerce",

  Hospitality: "Hospitality & Travel",
  Restaurants: "Hospitality & Travel",
  "Travel & Tourism": "Hospitality & Travel",

  "Nonprofit / Charity": "Nonprofit & Community",
  Church: "Nonprofit & Community",

  Government: "Government & Public Sector",

  "Photography & Media": "Media & Creative",
  "Marketing & Agencies": "Media & Creative",

  Manufacturing: "Manufacturing & Logistics",
  Logistics: "Manufacturing & Logistics",
  Automotive: "Manufacturing & Logistics",

  "Sports & Recreation": "Sports & Events",
  "Entertainment & Events": "Sports & Events",
};

// Categories (use-cases)
const CATEGORY_GROUPS: Record<string, (typeof CATEGORY_FILTERS)[number]> = {
  "Lead Capture": "Lead & Contact",
  Contact: "Lead & Contact",
  Referral: "Lead & Contact",
  "Newsletter Signup": "Lead & Contact",
  "Subscription / Waitlist": "Lead & Contact",

  Intake: "Intake & Onboarding",
  Onboarding: "Intake & Onboarding",

  "Appointment Booking": "Appointments & Reservations",
  Reservation: "Appointments & Reservations",
  "Property Viewing": "Appointments & Reservations",

  "Event Registration": "Registration & RSVP",
  RSVP: "Registration & RSVP",

  Application: "Applications & Requests",
  "Maintenance Request": "Applications & Requests",
  "Waiver / Consent": "Applications & Requests",

  "Order / Quote Request": "Orders & Quotes",
  "Request for Proposal (RFP)": "Orders & Quotes",
  "Construction Quote": "Orders & Quotes",
  "Shipment Quote": "Orders & Quotes",

  "Support Ticket": "Support & Issues",
  "Bug Report": "Support & Issues",
  "Feature Request": "Support & Issues",
  "Warranty Claim": "Support & Issues",
  "Insurance Claim": "Support & Issues",

  "Feedback / CSAT": "Feedback & Surveys",
  "Survey / Poll": "Feedback & Surveys",
  "Public Feedback": "Feedback & Surveys",

  Donation: "Donations & Payments",

  "Job Application": "Hiring & HR",
  "Leave Request": "Hiring & HR",
};
function safeLower(s: unknown) {
  return typeof s === "string" ? s.toLowerCase() : "";
}
export default function TemplatesClient() {
  const [selectedIndustry, setSelectedIndustry] =
    useState<(typeof INDUSTRY_FILTERS)[number]>("All");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORY_FILTERS)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const normIndustry = (raw: string) => INDUSTRY_GROUPS[raw] ?? raw;
    const normCategory = (raw: string) => CATEGORY_GROUPS[raw] ?? raw;

    const q = safeLower(searchTerm);

    return (TEMPLATES as MarketingTemplate[]).filter((t) => {
      const iGroup = normIndustry(t.industry);
      const cGroup = normCategory(t.category);

      const matchesIndustry =
        selectedIndustry === "All" || iGroup === selectedIndustry;
      const matchesCategory =
        selectedCategory === "All" || cGroup === selectedCategory;

      const matchesSearch =
        !q ||
        safeLower(t.title).includes(q) ||
        safeLower(t.description).includes(q) ||
        safeLower(t.category).includes(q) ||
        safeLower(t.industry).includes(q);

      return matchesIndustry && matchesCategory && matchesSearch;
    });
  }, [selectedIndustry, selectedCategory, searchTerm]);

  return (
    <div className="tpl">
      <div className="tpl__layout">
        {/* Sidebar */}
        <aside className="tpl__sidebar">
          <div className="card">
            <div className="card__body">
              <div className="tpl__filters-title">
                <span className="tpl__filters-icon" />
                <span>Filters</span>
              </div>

              {/* Search */}
              <div className="mb-4">
                <label className="label">Search</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M21 21l-3.6-3.6" strokeWidth="2" />
                  </svg>
                  <input
                    className="input input--with-icon"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="mb-4">
                <label className="label">Industry</label>
                <div className="grid" style={{ gap: ".5rem" }}>
                  {INDUSTRY_FILTERS.map((label) => (
                    <label
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        cursor: "pointer",
                      }}>
                      <input
                        className="tpl__radio"
                        type="radio"
                        name="industry"
                        checked={selectedIndustry === label}
                        onChange={() => setSelectedIndustry(label)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Use Case */}
              <div>
                <label className="label">Use Case</label>
                <div className="grid" style={{ gap: ".5rem" }}>
                  {CATEGORY_FILTERS.map((label) => (
                    <label
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        cursor: "pointer",
                      }}>
                      <input
                        className="tpl__radio"
                        type="radio"
                        name="category"
                        checked={selectedCategory === label}
                        onChange={() => setSelectedCategory(label)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Cards */}
        <section className="tpl__cards">
          <div className="tpl__grid">
            {filtered.map((t) => (
              <article key={t.id} className="tpl-card">
                <div className="tpl-card__hero">
                  {t.featured ? (
                    <div className="tpl-card__featured">Featured</div>
                  ) : null}

                  <div>
                    <div className="tpl-card__icon">{t.icon ?? "📄"}</div>
                    <h4 className="tpl-card__title">{t.title}</h4>
                  </div>
                </div>

                <div className="tpl-card__meta">
                  <span className="badge--pill">{t.industry}</span>

                  <p className="tpl-card__desc">
                    {t.description ?? `${t.category} template`}
                  </p>

                  <div className="tpl-badges">
                    <span className="badge--pill badge--secondary">
                      {t.category}
                    </span>

                    <span className="badge--pill badge--accent">
                      {t.renderer === "chat" ? "Conversational" : "Classic"}
                    </span>

                    <span className="badge--pill badge--secondary">
                      {Array.isArray(t.fields) ? t.fields.length : 0} fields
                    </span>
                  </div>
                </div>

                <div className="tpl-card__footer">
                  <form action={createFormFromMarketingTemplate}>
                    <input type="hidden" name="templateId" value={t.id} />
                    <button className="btn btn--primary" type="submit">
                      Use Template
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="centered" style={{ padding: "4rem 0" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  className="rounded centered"
                  style={{
                    width: 64,
                    height: 64,
                    background: "hsl(var(--muted))",
                    margin: "0 auto 1rem",
                  }}>
                  🔎
                </div>
                <h3 className="mb-1">No templates found</h3>
                <p className="text-muted mb-3">
                  Try adjusting your filters or search terms
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => {
                    setSelectedIndustry("All");
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}>
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
