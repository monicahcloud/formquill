// app/templates/TemplatesClient.tsx
"use client";

import { useMemo, useState } from "react";

type Template = {
  id: number;
  title: string;
  category: string; // detailed use-case (e.g., "Appointment Booking")
  industry: string; // detailed sector (e.g., "Healthcare")
};

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
  // Health & Wellness
  Healthcare: "Health & Wellness",
  Clinic: "Health & Wellness",
  "Fitness & Wellness": "Health & Wellness",
  "Beauty & Salon": "Health & Wellness",
  "Pet Services": "Health & Wellness",

  // Real Estate & Home
  "Real Estate": "Real Estate & Home",
  Construction: "Real Estate & Home",
  "Home Services": "Real Estate & Home",

  // Finance & Legal
  Finance: "Finance & Legal",
  Insurance: "Finance & Legal",
  Legal: "Finance & Legal",

  // Education
  Education: "Education",

  // IT & SaaS
  "IT / SaaS": "IT & SaaS",

  // Retail & E-commerce
  Retail: "Retail & E-commerce",
  "E-commerce": "Retail & E-commerce",

  // Hospitality & Travel
  Hospitality: "Hospitality & Travel",
  Restaurants: "Hospitality & Travel",
  "Travel & Tourism": "Hospitality & Travel",

  // Nonprofit & Community
  "Nonprofit / Charity": "Nonprofit & Community",
  Church: "Nonprofit & Community",

  // Government & Public Sector
  Government: "Government & Public Sector",

  // Media & Creative
  "Photography & Media": "Media & Creative",
  "Marketing & Agencies": "Media & Creative",

  // Manufacturing & Logistics
  Manufacturing: "Manufacturing & Logistics",
  Logistics: "Manufacturing & Logistics",
  Automotive: "Manufacturing & Logistics",

  // Sports & Events
  "Sports & Recreation": "Sports & Events",
  "Entertainment & Events": "Sports & Events",
};

// Categories (use-cases)
const CATEGORY_GROUPS: Record<string, (typeof CATEGORY_FILTERS)[number]> = {
  // Lead & Contact
  "Lead Capture": "Lead & Contact",
  Contact: "Lead & Contact",
  Referral: "Lead & Contact",
  "Newsletter Signup": "Lead & Contact",
  "Subscription / Waitlist": "Lead & Contact",

  // Intake & Onboarding
  Intake: "Intake & Onboarding",
  Onboarding: "Intake & Onboarding",

  // Appointments & Reservations
  "Appointment Booking": "Appointments & Reservations",
  Reservation: "Appointments & Reservations",
  "Property Viewing": "Appointments & Reservations",

  // Registration & RSVP
  "Event Registration": "Registration & RSVP",
  RSVP: "Registration & RSVP",

  // Applications & Requests
  Application: "Applications & Requests",
  "Maintenance Request": "Applications & Requests",
  "Waiver / Consent": "Applications & Requests",

  // Orders & Quotes
  "Order / Quote Request": "Orders & Quotes",
  "Request for Proposal (RFP)": "Orders & Quotes",
  "Construction Quote": "Orders & Quotes",
  "Shipment Quote": "Orders & Quotes",

  // Support & Issues
  "Support Ticket": "Support & Issues",
  "Bug Report": "Support & Issues",
  "Feature Request": "Support & Issues",
  "Warranty Claim": "Support & Issues",
  "Insurance Claim": "Support & Issues",

  // Feedback & Surveys
  "Feedback / CSAT": "Feedback & Surveys",
  "Survey / Poll": "Feedback & Surveys",
  "Public Feedback": "Feedback & Surveys",

  // Donations & Payments
  Donation: "Donations & Payments",

  // Hiring & HR
  "Job Application": "Hiring & HR",
  "Leave Request": "Hiring & HR",
};

/* -----------------------------
   Your full templates list
----------------------------- */
const TEMPLATES: Template[] = [
  // Education
  {
    id: 1,
    title: "Student Enrollment",
    category: "Event Registration",
    industry: "Education",
  },
  {
    id: 2,
    title: "Course Feedback Survey",
    category: "Survey / Poll",
    industry: "Education",
  },

  // Healthcare
  {
    id: 3,
    title: "Patient Intake",
    category: "Intake",
    industry: "Healthcare",
  },
  {
    id: 4,
    title: "Telehealth Appointment",
    category: "Appointment Booking",
    industry: "Healthcare",
  },

  // Real Estate
  {
    id: 5,
    title: "Property Viewing",
    category: "Appointment Booking",
    industry: "Real Estate",
  },
  {
    id: 6,
    title: "Home Valuation",
    category: "Order / Quote Request",
    industry: "Real Estate",
  },

  // IT / SaaS
  {
    id: 7,
    title: "Client Onboarding",
    category: "Onboarding",
    industry: "IT / SaaS",
  },
  { id: 8, title: "Bug Report", category: "Bug Report", industry: "IT / SaaS" },
  {
    id: 9,
    title: "Feature Request",
    category: "Feature Request",
    industry: "IT / SaaS",
  },

  // HR & Recruiting
  {
    id: 10,
    title: "Job Application",
    category: "Job Application",
    industry: "HR & Recruiting",
  },
  {
    id: 11,
    title: "Employee Onboarding",
    category: "Onboarding",
    industry: "HR & Recruiting",
  },
  {
    id: 12,
    title: "Leave Request",
    category: "Application",
    industry: "HR & Recruiting",
  },

  // Legal
  { id: 13, title: "Legal Intake", category: "Intake", industry: "Legal" },
  {
    id: 14,
    title: "Case Evaluation",
    category: "Lead Capture",
    industry: "Legal",
  },

  // Finance & Insurance
  {
    id: 15,
    title: "Loan Pre-Qualification",
    category: "Application",
    industry: "Finance",
  },
  {
    id: 16,
    title: "Insurance Claim",
    category: "Support Ticket",
    industry: "Insurance",
  },

  // Nonprofit
  {
    id: 17,
    title: "Donation Form",
    category: "Donation",
    industry: "Nonprofit / Charity",
  },
  {
    id: 18,
    title: "Volunteer Signup",
    category: "Volunteer Signup",
    industry: "Nonprofit / Charity",
  },

  // Hospitality / Restaurants / Travel
  {
    id: 19,
    title: "Hotel Booking Request",
    category: "Reservation",
    industry: "Hospitality",
  },
  {
    id: 20,
    title: "Restaurant Reservation",
    category: "Reservation",
    industry: "Restaurants",
  },
  {
    id: 21,
    title: "Travel Inquiry",
    category: "Lead Capture",
    industry: "Travel & Tourism",
  },

  // E-commerce & Manufacturing
  {
    id: 22,
    title: "Product Return Request",
    category: "Support Ticket",
    industry: "E-commerce",
  },
  {
    id: 23,
    title: "Warranty Claim",
    category: "Support Ticket",
    industry: "Manufacturing",
  },

  // Construction & Home Services
  {
    id: 24,
    title: "Construction Quote",
    category: "Order / Quote Request",
    industry: "Construction",
  },
  {
    id: 25,
    title: "Home Service Request",
    category: "Intake",
    industry: "Home Services",
  },

  // Media / Marketing / Events
  {
    id: 26,
    title: "Photography Booking",
    category: "Appointment Booking",
    industry: "Photography & Media",
  },
  {
    id: 27,
    title: "Marketing Project Brief",
    category: "Intake",
    industry: "Marketing & Agencies",
  },
  {
    id: 28,
    title: "Event RSVP",
    category: "Event Registration",
    industry: "Entertainment & Events",
  },
  {
    id: 29,
    title: "Venue Booking Request",
    category: "Reservation",
    industry: "Entertainment & Events",
  },

  // Automotive / Logistics
  {
    id: 30,
    title: "Auto Repair Request",
    category: "Maintenance Request",
    industry: "Automotive",
  },
  {
    id: 31,
    title: "Shipment Quote",
    category: "Order / Quote Request",
    industry: "Logistics",
  },

  // Fitness / Sports / Pets / Beauty
  {
    id: 32,
    title: "Gym Membership Signup",
    category: "Subscription / Waitlist",
    industry: "Fitness & Wellness",
  },
  {
    id: 33,
    title: "Team Tryout Sign-Up",
    category: "Event Registration",
    industry: "Sports & Recreation",
  },
  {
    id: 34,
    title: "Pet Grooming Appointment",
    category: "Appointment Booking",
    industry: "Pet Services",
  },
  {
    id: 35,
    title: "Salon Appointment",
    category: "Appointment Booking",
    industry: "Beauty & Salon",
  },

  // Government & General
  {
    id: 36,
    title: "Public Feedback",
    category: "Survey / Poll",
    industry: "Government",
  },
  { id: 37, title: "Contact Us", category: "Contact", industry: "IT / SaaS" },

  // Faith communities kept from original
  {
    id: 38,
    title: "Prayer Request Form",
    category: "Contact",
    industry: "Nonprofit / Charity",
  },
];

/* -----------------------------
   Component
----------------------------- */
export default function TemplatesClient() {
  const [selectedIndustry, setSelectedIndustry] =
    useState<(typeof INDUSTRY_FILTERS)[number]>("All");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORY_FILTERS)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const normIndustry = (raw: string) => INDUSTRY_GROUPS[raw] ?? raw;
    const normCategory = (raw: string) => CATEGORY_GROUPS[raw] ?? raw;

    return TEMPLATES.filter((t) => {
      const iGroup = normIndustry(t.industry);
      const cGroup = normCategory(t.category);

      const matchesIndustry =
        selectedIndustry === "All" || iGroup === selectedIndustry;
      const matchesCategory =
        selectedCategory === "All" || cGroup === selectedCategory;
      const matchesSearch = t.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

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

              {/* Industry (condensed) */}
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

              {/* Use Case (condensed) */}
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
                  <div>
                    <div className="tpl-card__icon">📄</div>
                    <h4 className="tpl-card__title">{t.title}</h4>
                  </div>
                </div>

                <div className="tpl-card__meta">
                  <span className="badge--pill">{t.industry}</span>
                  <div className="text-sm text-muted mt-2">
                    {t.category} template
                  </div>
                </div>

                <div className="tpl-card__footer">
                  {/* full-width & centered per your styles */}
                  <button className="btn btn--primary">Use Template</button>
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
