/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/templates/marketingTemplates.ts
import type { Field } from "@/types/form";

export type MarketingTemplate = {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  industry: string;
  category: string;
  renderer?: "classic" | "chat";
  icon?: string;
  featured?: boolean;
  fields: any[]; // ideally Field[]
  primaryColor?: string;
  backgroundColor?: string;
};

type Option = { label: string; value: string };

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function f(p: Omit<Field, "id"> & { id?: string }): Field {
  return {
    id: p.id ?? crypto.randomUUID(),
    ...p,
  };
}

function selectOptions(values: string[]): Option[] {
  return values.map((v) => ({ label: v, value: slug(v) }));
}

function baseContact(prefix = ""): Field[] {
  const pre = prefix ? `${prefix}_` : "";
  return [
    f({
      type: "text",
      label: "Full name",
      name: `${pre}full_name`,
      required: true,
      placeholder: "Jane Doe",
    }),
    f({
      type: "email",
      label: "Email",
      name: `${pre}email`,
      required: true,
      placeholder: "you@example.com",
    }),
    f({
      type: "tel",
      label: "Phone",
      name: `${pre}phone`,
      required: false,
      placeholder: "(555) 555-1234",
    }),
  ];
}

function baseAppointment(serviceOptions?: string[]): Field[] {
  return [
    ...baseContact(),
    ...(serviceOptions
      ? [
          f({
            type: "select",
            label: "Service",
            name: "service",
            required: true,
            options: selectOptions(serviceOptions),
          }),
        ]
      : []),
    f({
      type: "date",
      label: "Preferred date",
      name: "preferred_date",
      required: false,
    }),
    f({
      type: "select",
      label: "Preferred time",
      name: "preferred_time",
      required: false,
      options: selectOptions(["Morning", "Afternoon", "Evening"]),
    }),
    f({
      type: "textarea",
      label: "Notes",
      name: "notes",
      required: false,
      placeholder: "Anything we should know?",
    }),
  ];
}

function baseSurvey(titleLabel = "Overall rating"): Field[] {
  return [
    f({
      type: "text",
      label: "Name (optional)",
      name: "name",
      required: false,
    }),
    f({
      type: "email",
      label: "Email (optional)",
      name: "email",
      required: false,
    }),
    f({
      type: "select",
      label: titleLabel,
      name: "rating",
      required: true,
      options: selectOptions([
        "5 - Excellent",
        "4 - Good",
        "3 - Okay",
        "2 - Poor",
        "1 - Very poor",
      ]),
    }),
    f({
      type: "textarea",
      label: "What went well?",
      name: "what_went_well",
      required: false,
    }),
    f({
      type: "textarea",
      label: "What could improve?",
      name: "improvements",
      required: false,
    }),
  ];
}

function baseRequest(title = "Describe your request"): Field[] {
  return [
    ...baseContact(),
    f({
      type: "textarea",
      label: title,
      name: "request",
      required: true,
      placeholder: "Share details so we can help.",
    }),
    f({
      type: "textarea",
      label: "Additional details (optional)",
      name: "details",
      required: false,
    }),
  ];
}

function baseOrderQuote(kind = "Quote"): Field[] {
  return [
    ...baseContact(),
    f({
      type: "text",
      label: `${kind} for`,
      name: "subject",
      required: true,
      placeholder: "What do you need?",
    }),
    f({
      type: "select",
      label: "Budget range",
      name: "budget",
      required: false,
      options: selectOptions([
        "Under $500",
        "$500–$1,500",
        "$1,500–$5,000",
        "$5,000+",
      ]),
    }),
    f({ type: "date", label: "Needed by", name: "needed_by", required: false }),
    f({
      type: "textarea",
      label: "Details",
      name: "details",
      required: true,
      placeholder: "Specs, quantity, preferences...",
    }),
  ];
}

function baseSupport(): Field[] {
  return [
    ...baseContact(),
    f({
      type: "text",
      label: "Issue title",
      name: "issue_title",
      required: true,
    }),
    f({
      type: "select",
      label: "Priority",
      name: "priority",
      required: true,
      options: selectOptions(["Critical", "High", "Medium", "Low"]),
    }),
    f({
      type: "textarea",
      label: "What happened?",
      name: "description",
      required: true,
    }),
    f({
      type: "textarea",
      label: "Steps to reproduce (optional)",
      name: "steps",
      required: false,
      placeholder: "1) ... 2) ...",
    }),
  ];
}

function baseRegistration(eventLabel = "Event"): Field[] {
  return [
    ...baseContact(),
    f({
      type: "text",
      label: `${eventLabel} name`,
      name: "event_name",
      required: false,
    }),
    f({
      type: "select",
      label: "Number of attendees",
      name: "attendees",
      required: true,
      options: selectOptions(["1", "2", "3", "4", "5+"]),
    }),
    f({
      type: "textarea",
      label: "Notes / accessibility needs (optional)",
      name: "notes",
      required: false,
    }),
  ];
}

function baseHRApplication(kind = "Job Application"): Field[] {
  return [
    f({ type: "text", label: "Full name", name: "full_name", required: true }),
    f({ type: "email", label: "Email", name: "email", required: true }),
    f({ type: "tel", label: "Phone", name: "phone", required: false }),
    f({
      type: "text",
      label: "Role / position",
      name: "role",
      required: true,
      placeholder: kind,
    }),
    f({
      type: "select",
      label: "Experience level",
      name: "experience",
      required: false,
      options: selectOptions(["Entry", "Mid", "Senior", "Lead"]),
    }),
    f({
      type: "textarea",
      label: "Why are you a fit?",
      name: "why_fit",
      required: true,
    }),
    f({
      type: "text",
      label: "Portfolio / LinkedIn (optional)",
      name: "portfolio",
      required: false,
      placeholder: "https://...",
    }),
  ];
}

export const MARKETING_TEMPLATES: MarketingTemplate[] = [
  // 1–2 Education
  {
    id: 1,
    title: "Student Enrollment",
    description: "Collect student details and guardian contact information.",
    category: "Event Registration",
    industry: "Education",
    icon: "🎓",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      f({
        type: "text",
        label: "Student full name",
        name: "student_name",
        required: true,
      }),
      f({ type: "date", label: "Date of birth", name: "dob", required: true }),
      f({
        type: "text",
        label: "Guardian name",
        name: "guardian_name",
        required: true,
      }),
      f({
        type: "email",
        label: "Guardian email",
        name: "guardian_email",
        required: true,
      }),
      f({
        type: "tel",
        label: "Guardian phone (optional)",
        name: "guardian_phone",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Notes (optional)",
        name: "notes",
        required: false,
      }),
    ],
  },
  {
    id: 2,
    title: "Course Feedback Survey",
    description: "Understand what worked and what to improve.",
    category: "Survey / Poll",
    industry: "Education",
    icon: "📝",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: baseSurvey("Course rating"),
  },

  // 3–4 Healthcare
  {
    id: 3,
    title: "Patient Intake",
    description: "A simple intake form for clinics and providers.",
    category: "Intake",
    industry: "Healthcare",
    icon: "🏥",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({ type: "date", label: "Date of birth", name: "dob", required: true }),
      f({
        type: "textarea",
        label: "Reason for visit",
        name: "reason",
        required: true,
      }),
      f({
        type: "textarea",
        label: "Medical history (optional)",
        name: "history",
        required: false,
      }),
      f({
        type: "select",
        label: "Preferred contact method",
        name: "contact_method",
        required: false,
        options: selectOptions(["Email", "Phone", "Text"]),
      }),
    ],
  },
  {
    id: 4,
    title: "Telehealth Appointment",
    description: "Book a remote appointment with a few quick questions.",
    category: "Appointment Booking",
    industry: "Healthcare",
    icon: "💻",
    renderer: "chat",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Preferred time",
        name: "preferred_time",
        required: true,
        options: selectOptions(["Morning", "Afternoon", "Evening"]),
      }),
      f({
        type: "textarea",
        label: "What would you like to discuss?",
        name: "topic",
        required: true,
      }),
    ],
  },

  // 5–6 Real Estate
  {
    id: 5,
    title: "Property Viewing",
    description: "Schedule a viewing and capture buyer details.",
    category: "Appointment Booking",
    industry: "Real Estate",
    icon: "🏠",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Property address / listing link",
        name: "property",
        required: true,
      }),
      f({
        type: "date",
        label: "Preferred date",
        name: "preferred_date",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Questions (optional)",
        name: "questions",
        required: false,
      }),
    ],
  },
  {
    id: 6,
    title: "Home Valuation",
    description: "Collect property details to estimate value.",
    category: "Order / Quote Request",
    industry: "Real Estate",
    icon: "📈",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Property address",
        name: "address",
        required: true,
      }),
      f({ type: "text", label: "Bedrooms", name: "beds", required: false }),
      f({ type: "text", label: "Bathrooms", name: "baths", required: false }),
      f({
        type: "text",
        label: "Approx. square footage",
        name: "sqft",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Upgrades / notes (optional)",
        name: "notes",
        required: false,
      }),
    ],
  },

  // 7–9 IT / SaaS
  {
    id: 7,
    title: "Client Onboarding",
    description: "Kick off a project with structured requirements.",
    category: "Onboarding",
    industry: "IT / SaaS",
    icon: "🚀",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({ type: "text", label: "Company", name: "company", required: false }),
      f({
        type: "text",
        label: "Project name",
        name: "project_name",
        required: true,
      }),
      f({ type: "textarea", label: "Goals", name: "goals", required: true }),
      f({
        type: "textarea",
        label: "Links / assets (optional)",
        name: "links",
        required: false,
      }),
    ],
  },
  {
    id: 8,
    title: "Bug Report",
    description: "Capture reproducible bugs with priority and steps.",
    category: "Bug Report",
    industry: "IT / SaaS",
    icon: "🐞",
    featured: true,
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    renderer: "classic",
    fields: baseSupport(),
  },
  {
    id: 9,
    title: "Feature Request",
    description: "Collect feature ideas with impact and urgency.",
    category: "Feature Request",
    industry: "IT / SaaS",
    icon: "✨",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Feature title",
        name: "feature_title",
        required: true,
      }),
      f({
        type: "textarea",
        label: "Describe the request",
        name: "description",
        required: true,
      }),
      f({
        type: "select",
        label: "Impact",
        name: "impact",
        required: false,
        options: selectOptions([
          "Nice to have",
          "Helpful",
          "High impact",
          "Critical",
        ]),
      }),
      f({
        type: "textarea",
        label: "Use case / examples (optional)",
        name: "examples",
        required: false,
      }),
    ],
  },

  // 10–12 HR & Recruiting (note: you used "HR & Recruiting" in list; no groups needed here)
  {
    id: 10,
    title: "Job Application",
    description: "A clean applicant intake for hiring teams.",
    category: "Job Application",
    industry: "HR & Recruiting",
    icon: "💼",
    featured: true,
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    renderer: "classic",
    fields: baseHRApplication("Job Application"),
  },
  {
    id: 11,
    title: "Employee Onboarding",
    description: "Collect the details needed to onboard a new hire.",
    category: "Onboarding",
    industry: "HR & Recruiting",
    icon: "🧑🏽‍💻",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      f({
        type: "text",
        label: "Full name",
        name: "full_name",
        required: true,
      }),
      f({
        type: "email",
        label: "Personal email",
        name: "email",
        required: true,
      }),
      f({ type: "tel", label: "Phone", name: "phone", required: false }),
      f({
        type: "text",
        label: "Start date",
        name: "start_date",
        required: false,
        placeholder: "YYYY-MM-DD",
      }),
      f({ type: "text", label: "Role", name: "role", required: true }),
      f({
        type: "textarea",
        label: "Equipment needs (optional)",
        name: "equipment",
        required: false,
      }),
    ],
  },
  {
    id: 12,
    title: "Leave Request",
    description: "Request time off with dates and coverage notes.",
    category: "Application",
    industry: "HR & Recruiting",
    icon: "🗓️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Leave type",
        name: "leave_type",
        required: true,
        options: selectOptions(["Vacation", "Sick", "Personal", "Other"]),
      }),
      f({
        type: "date",
        label: "Start date",
        name: "start_date",
        required: true,
      }),
      f({ type: "date", label: "End date", name: "end_date", required: true }),
      f({
        type: "textarea",
        label: "Coverage plan (optional)",
        name: "coverage",
        required: false,
      }),
    ],
  },

  // 13–14 Legal
  {
    id: 13,
    title: "Legal Intake",
    description: "Collect client details and matter summary.",
    category: "Intake",
    industry: "Legal",
    icon: "⚖️",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Matter type",
        name: "matter_type",
        required: true,
        options: selectOptions([
          "Family",
          "Business",
          "Real estate",
          "Immigration",
          "Other",
        ]),
      }),
      f({
        type: "textarea",
        label: "Brief summary",
        name: "summary",
        required: true,
      }),
      f({
        type: "textarea",
        label: "Urgency / deadlines (optional)",
        name: "deadlines",
        required: false,
      }),
    ],
  },
  {
    id: 14,
    title: "Case Evaluation",
    description: "Qualify leads with key questions up front.",
    category: "Lead Capture",
    industry: "Legal",
    icon: "🧾",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "textarea",
        label: "What happened?",
        name: "what_happened",
        required: true,
      }),
      f({
        type: "textarea",
        label: "What outcome do you want?",
        name: "desired_outcome",
        required: false,
      }),
      f({
        type: "select",
        label: "Timeframe",
        name: "timeframe",
        required: false,
        options: selectOptions([
          "ASAP",
          "Within 30 days",
          "Within 90 days",
          "Not sure",
        ]),
      }),
    ],
  },

  // 15–16 Finance & Insurance
  {
    id: 15,
    title: "Loan Pre-Qualification",
    description: "Collect basic details to pre-qualify applicants.",
    category: "Application",
    industry: "Finance",
    icon: "🏦",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Annual income (optional)",
        name: "income",
        required: false,
      }),
      f({
        type: "text",
        label: "Desired loan amount",
        name: "loan_amount",
        required: true,
      }),
      f({
        type: "select",
        label: "Credit range (optional)",
        name: "credit_range",
        required: false,
        options: selectOptions([
          "Excellent",
          "Good",
          "Fair",
          "Poor",
          "Not sure",
        ]),
      }),
      f({
        type: "textarea",
        label: "Notes (optional)",
        name: "notes",
        required: false,
      }),
    ],
  },
  {
    id: 16,
    title: "Insurance Claim",
    description: "File a claim with incident details and severity.",
    category: "Support Ticket",
    industry: "Insurance",
    icon: "🛡️",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Policy number",
        name: "policy_number",
        required: false,
      }),
      f({
        type: "date",
        label: "Incident date",
        name: "incident_date",
        required: true,
      }),
      f({
        type: "select",
        label: "Claim type",
        name: "claim_type",
        required: true,
        options: selectOptions(["Auto", "Home", "Health", "Travel", "Other"]),
      }),
      f({
        type: "textarea",
        label: "Describe the incident",
        name: "incident_details",
        required: true,
      }),
    ],
  },

  // 17–18 Nonprofit
  {
    id: 17,
    title: "Donation Form",
    description: "Collect donor info and donation details.",
    category: "Donation",
    industry: "Nonprofit / Charity",
    icon: "❤️",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Donation amount",
        name: "donation_amount",
        required: true,
        options: selectOptions(["$10", "$25", "$50", "$100", "$250", "Other"]),
      }),
      f({
        type: "textarea",
        label: "Message (optional)",
        name: "message",
        required: false,
      }),
    ],
  },
  {
    id: 18,
    title: "Volunteer Signup",
    description: "Recruit volunteers with availability and interests.",
    category: "Volunteer Signup",
    industry: "Nonprofit / Charity",
    icon: "🤝",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Availability",
        name: "availability",
        required: true,
        options: selectOptions([
          "Weekdays",
          "Weekends",
          "Evenings",
          "Flexible",
        ]),
      }),
      f({
        type: "textarea",
        label: "Skills / interests (optional)",
        name: "skills",
        required: false,
      }),
    ],
  },

  // 19–21 Hospitality / Restaurants / Travel
  {
    id: 19,
    title: "Hotel Booking Request",
    description: "Capture dates, guests, and preferences.",
    category: "Reservation",
    industry: "Hospitality",
    icon: "🏨",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({ type: "date", label: "Check-in", name: "check_in", required: true }),
      f({
        type: "date",
        label: "Check-out",
        name: "check_out",
        required: true,
      }),
      f({
        type: "select",
        label: "Guests",
        name: "guests",
        required: true,
        options: selectOptions(["1", "2", "3", "4", "5+"]),
      }),
      f({
        type: "textarea",
        label: "Preferences (optional)",
        name: "preferences",
        required: false,
      }),
    ],
  },
  {
    id: 20,
    title: "Restaurant Reservation",
    description: "Book a table with party size and notes.",
    category: "Reservation",
    industry: "Restaurants",
    icon: "🍽️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "date",
        label: "Reservation date",
        name: "res_date",
        required: true,
      }),
      f({
        type: "select",
        label: "Party size",
        name: "party_size",
        required: true,
        options: selectOptions(["1", "2", "3", "4", "5", "6", "7+"]),
      }),
      f({
        type: "select",
        label: "Seating preference (optional)",
        name: "seating",
        required: false,
        options: selectOptions(["Indoor", "Outdoor", "No preference"]),
      }),
      f({
        type: "textarea",
        label: "Allergies / notes (optional)",
        name: "notes",
        required: false,
      }),
    ],
  },
  {
    id: 21,
    title: "Travel Inquiry",
    description: "Capture trip details and goals.",
    category: "Lead Capture",
    industry: "Travel & Tourism",
    icon: "✈️",
    renderer: "chat",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Destination(s)",
        name: "destinations",
        required: true,
        placeholder: "Nassau, Exuma...",
      }),
      f({
        type: "date",
        label: "Travel start",
        name: "start_date",
        required: false,
      }),
      f({
        type: "date",
        label: "Travel end",
        name: "end_date",
        required: false,
      }),
      f({
        type: "select",
        label: "Budget",
        name: "budget",
        required: false,
        options: selectOptions([
          "Under $1,000",
          "$1,000–$3,000",
          "$3,000–$7,500",
          "$7,500+",
        ]),
      }),
      f({
        type: "textarea",
        label: "What kind of trip is this?",
        name: "trip_type",
        required: false,
        placeholder: "Family, honeymoon, adventure...",
      }),
    ],
  },

  // 22–23 E-commerce & Manufacturing
  {
    id: 22,
    title: "Product Return Request",
    description: "Streamline returns with order details and reasons.",
    category: "Support Ticket",
    industry: "E-commerce",
    icon: "📦",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Order number",
        name: "order_number",
        required: true,
      }),
      f({
        type: "select",
        label: "Reason for return",
        name: "reason",
        required: true,
        options: selectOptions([
          "Damaged",
          "Wrong item",
          "Not as described",
          "Changed mind",
          "Other",
        ]),
      }),
      f({
        type: "textarea",
        label: "Details (optional)",
        name: "details",
        required: false,
      }),
    ],
  },
  {
    id: 23,
    title: "Warranty Claim",
    description: "Collect product details for warranty processing.",
    category: "Support Ticket",
    industry: "Manufacturing",
    icon: "🧰",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Product name",
        name: "product_name",
        required: true,
      }),
      f({
        type: "text",
        label: "Serial number (optional)",
        name: "serial_number",
        required: false,
      }),
      f({
        type: "date",
        label: "Purchase date",
        name: "purchase_date",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Issue description",
        name: "issue",
        required: true,
      }),
    ],
  },

  // 24–25 Construction & Home Services
  {
    id: 24,
    title: "Construction Quote",
    description: "Request a quote with scope and timeline.",
    category: "Order / Quote Request",
    industry: "Construction",
    icon: "🏗️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: baseOrderQuote("Construction quote"),
  },
  {
    id: 25,
    title: "Home Service Request",
    description: "Capture service requests for repair or maintenance.",
    category: "Intake",
    industry: "Home Services",
    icon: "🧰",
    renderer: "classic",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Service address",
        name: "service_address",
        required: true,
      }),
      f({
        type: "select",
        label: "Service type",
        name: "service_type",
        required: true,
        options: selectOptions([
          "Plumbing",
          "Electrical",
          "HVAC",
          "Cleaning",
          "Landscaping",
          "Other",
        ]),
      }),
      f({
        type: "textarea",
        label: "Describe the issue",
        name: "issue",
        required: true,
      }),
    ],
  },

  // 26–29 Media / Marketing / Events
  {
    id: 26,
    title: "Photography Booking",
    description: "Collect details for a shoot and preferred dates.",
    category: "Appointment Booking",
    industry: "Photography & Media",
    icon: "📷",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseAppointment([
        "Portraits",
        "Family",
        "Engagement",
        "Event",
        "Branding",
      ]),
      f({
        type: "text",
        label: "Location (optional)",
        name: "location",
        required: false,
      }),
    ],
  },
  {
    id: 27,
    title: "Marketing Project Brief",
    description: "Capture goals, audiences, and deliverables.",
    category: "Intake",
    industry: "Marketing & Agencies",
    icon: "📣",
    featured: true,
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Brand / company",
        name: "company",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Project goals",
        name: "goals",
        required: true,
      }),
      f({
        type: "textarea",
        label: "Target audience",
        name: "audience",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Deliverables",
        name: "deliverables",
        required: true,
        placeholder: "Landing page, ads, social...",
      }),
      f({
        type: "date",
        label: "Deadline (optional)",
        name: "deadline",
        required: false,
      }),
    ],
  },
  {
    id: 28,
    title: "Event RSVP",
    description: "Collect attendance and guest count.",
    category: "Event Registration",
    industry: "Entertainment & Events",
    icon: "🎟️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: baseRegistration("Event"),
  },
  {
    id: 29,
    title: "Venue Booking Request",
    description: "Inquiries for venue rental with date and details.",
    category: "Reservation",
    industry: "Entertainment & Events",
    icon: "🏛️",
    renderer: "classic",
    fields: [
      ...baseContact(),
      f({
        type: "date",
        label: "Event date",
        name: "event_date",
        required: true,
      }),
      f({
        type: "select",
        label: "Estimated guests",
        name: "guests",
        required: true,
        options: selectOptions(["1–25", "26–50", "51–100", "100+"]),
      }),
      f({
        type: "textarea",
        label: "Event details",
        name: "event_details",
        required: true,
      }),
    ],
  },

  // 30–31 Automotive / Logistics
  {
    id: 30,
    title: "Auto Repair Request",
    description: "Request a repair with vehicle and issue details.",
    category: "Maintenance Request",
    industry: "Automotive",
    icon: "🚗",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "text",
        label: "Vehicle make/model",
        name: "vehicle",
        required: true,
        placeholder: "Toyota Camry",
      }),
      f({
        type: "text",
        label: "Year (optional)",
        name: "year",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Describe the issue",
        name: "issue",
        required: true,
      }),
      f({
        type: "date",
        label: "Preferred date (optional)",
        name: "preferred_date",
        required: false,
      }),
    ],
  },
  {
    id: 31,
    title: "Shipment Quote",
    description: "Get a shipping quote with origin/destination and size.",
    category: "Order / Quote Request",
    industry: "Logistics",
    icon: "🚚",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({ type: "text", label: "Origin", name: "origin", required: true }),
      f({
        type: "text",
        label: "Destination",
        name: "destination",
        required: true,
      }),
      f({
        type: "text",
        label: "Package details",
        name: "package",
        required: true,
        placeholder: "Weight, dimensions, quantity...",
      }),
      f({
        type: "date",
        label: "Ship date (optional)",
        name: "ship_date",
        required: false,
      }),
    ],
  },

  // 32–35 Fitness / Sports / Pets / Beauty
  {
    id: 32,
    title: "Gym Membership Signup",
    description: "Join a membership plan with goals and contact info.",
    category: "Subscription / Waitlist",
    industry: "Fitness & Wellness",
    icon: "🏋🏽‍♀️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseContact(),
      f({
        type: "select",
        label: "Plan",
        name: "plan",
        required: true,
        options: selectOptions(["Monthly", "Quarterly", "Annual"]),
      }),
      f({
        type: "textarea",
        label: "Goals (optional)",
        name: "goals",
        required: false,
        placeholder: "Strength, weight loss, mobility...",
      }),
    ],
  },
  {
    id: 33,
    title: "Team Tryout Sign-Up",
    description: "Register athletes for tryouts with key details.",
    category: "Event Registration",
    industry: "Sports & Recreation",
    icon: "🏀",
    renderer: "classic",
    fields: [
      f({
        type: "text",
        label: "Athlete full name",
        name: "athlete_name",
        required: true,
      }),
      f({ type: "date", label: "Date of birth", name: "dob", required: false }),
      f({ type: "email", label: "Email", name: "email", required: false }),
      f({ type: "tel", label: "Phone", name: "phone", required: false }),
      f({
        type: "text",
        label: "Position (optional)",
        name: "position",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Experience (optional)",
        name: "experience",
        required: false,
      }),
    ],
  },
  {
    id: 34,
    title: "Pet Grooming Appointment",
    description: "Book grooming services and capture pet details.",
    category: "Appointment Booking",
    industry: "Pet Services",
    icon: "🐶",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      ...baseAppointment(["Bath", "Groom", "Nails", "Full service"]),
      f({ type: "text", label: "Pet name", name: "pet_name", required: true }),
      f({
        type: "text",
        label: "Breed (optional)",
        name: "breed",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Behavior / allergies (optional)",
        name: "pet_notes",
        required: false,
      }),
    ],
  },
  {
    id: 35,
    title: "Salon Appointment",
    description: "Book salon services with preferred dates and notes.",
    category: "Appointment Booking",
    industry: "Beauty & Salon",
    icon: "💇🏽‍♀️",
    featured: true,
    renderer: "classic",
    fields: baseAppointment(["Cut", "Color", "Style", "Treatment"]),
  },

  // 36–38 Government & General / Faith
  {
    id: 36,
    title: "Public Feedback",
    description: "Collect community feedback in a structured way.",
    category: "Survey / Poll",
    industry: "Government",
    icon: "🏛️",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      f({
        type: "text",
        label: "Name (optional)",
        name: "name",
        required: false,
      }),
      f({
        type: "email",
        label: "Email (optional)",
        name: "email",
        required: false,
      }),
      f({
        type: "select",
        label: "Topic",
        name: "topic",
        required: true,
        options: selectOptions([
          "Roads",
          "Parks",
          "Utilities",
          "Safety",
          "Other",
        ]),
      }),
      f({
        type: "textarea",
        label: "Your feedback",
        name: "feedback",
        required: true,
      }),
    ],
  },
  {
    id: 37,
    title: "Contact Us",
    description: "A simple contact form for questions and leads.",
    category: "Contact",
    industry: "IT / SaaS",
    icon: "📨",
    renderer: "classic",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: baseRequest("How can we help?"),
  },
  {
    id: 38,
    title: "Prayer Request Form",
    description: "Submit a private request with optional contact info.",
    category: "Contact",
    industry: "Nonprofit / Charity",
    icon: "🙏",
    renderer: "chat",
    primaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    fields: [
      f({
        type: "text",
        label: "Name (optional)",
        name: "name",
        required: false,
      }),
      f({
        type: "email",
        label: "Email (optional)",
        name: "email",
        required: false,
      }),
      f({
        type: "textarea",
        label: "Prayer request",
        name: "request",
        required: true,
      }),
      f({
        type: "select",
        label: "May we contact you?",
        name: "may_contact",
        required: false,
        options: selectOptions(["Yes", "No"]),
      }),
    ],
  },
];

/**
 * Helper used by server action.
 */
export function getMarketingTemplateById(id: number): MarketingTemplate | null {
  return MARKETING_TEMPLATES.find((t) => t.id === id) ?? null;
}
