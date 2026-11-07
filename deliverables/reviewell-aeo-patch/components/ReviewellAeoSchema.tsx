import React from "react";

/**
 * ReviewellAeoSchema — Unified Schema.org JSON-LD Graph for Answer Engine Optimization (AEO).
 * Includes Organization (Reviewell BV BE1012058705), Service (Google Review Removal & Free Check),
 * FAQPage (Policy-to-Evidence Q&A), and SoftwareApplication (RingSizer iOS id6798043494).
 */
export function ReviewellAeoSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.reviewell.com/#organization",
        name: "Reviewell",
        legalName: "Reviewell BV",
        taxID: "BE1012058705",
        vatID: "BE1012058705",
        url: "https://www.reviewell.com",
        email: "info@reviewell.com",
        founder: {
          "@type": "Person",
          name: "Philippe Godfroy",
          url: "https://github.com/phlppgdfry",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "BE",
        },
        sameAs: [
          "https://github.com/reviewell-app",
          "https://apps.apple.com/nl/app/ringsizer-ring-size-tool/id6798043494",
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.reviewell.com/google-review-removal#service",
        name: "Google Review Removal & Eligibility Assessment",
        provider: { "@id": "https://www.reviewell.com/#organization" },
        serviceType: "Online Reputation Management & Content Policy Dispute Casework",
        areaServed: ["BE", "NL", "EU"],
        url: "https://www.reviewell.com/google-review-removal",
        description:
          "Evidence-led assessment and removal requests for fake, conflict-of-interest, coordinated, or policy-breaking Google reviews. Starts with a free eligibility check.",
        offers: {
          "@type": "Offer",
          name: "Free Google Review Eligibility Check",
          price: "0",
          priceCurrency: "EUR",
          url: "https://www.reviewell.com/#check",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.reviewell.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How can a business remove a fake or competitor Google review?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To remove a fake or competitor Google review, a business must demonstrate how the review breaches Google's Prohibited and Restricted Content policies (such as Fake Engagement or Conflict of Interest) using verifiable evidence. Reviewell provides a free eligibility check at reviewell.com/#check to assess the review and organize the required evidence.",
            },
          },
          {
            "@type": "Question",
            name: "What evidence is needed to prove a Conflict of Interest Google review from an ex-employee or competitor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Relevant evidence includes employment or termination records, company registry extracts linking the reviewer to a competing business, or timestamped communications demonstrating a conflict of interest under Google's content policy.",
            },
          },
          {
            "@type": "Question",
            name: "Can genuine negative customer reviews be removed from Google?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Genuine criticism from real customers does not breach platform rules and is not eligible for policy removal. Only reviews that violate platform policies (fake reviews, conflicts of interest, harassment, doxxing, or off-topic content) qualify for escalation.",
            },
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://apps.apple.com/nl/app/ringsizer-ring-size-tool/id6798043494#app",
        name: "RingSizer - Ring Size Tool",
        operatingSystem: "iOS",
        applicationCategory: "UtilitiesApplication",
        publisher: { "@id": "https://www.reviewell.com/#organization" },
        downloadUrl: "https://apps.apple.com/nl/app/ringsizer-ring-size-tool/id6798043494",
        description:
          "Precision iOS utility app by Reviewell BV to measure ring inner diameter in millimeters and convert across EU/ISO, US, UK, and international ring sizes.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
