import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { opportunityTypes } from "@/config/opportunity-types";
import { LinkButton } from "@/components/ui/Button";
import { PricingCard } from "@/components/domain/StatAndPricing";
import { FAQSection } from "@/components/domain/FAQSection";

const steps = [
  ["01", "Build a profile", "Age, location, interests, career goals and preferred pathways."],
  ["02", "Discover", "A focused opportunity catalogue built around the student, not a generic job board."],
  ["03", "Apply", "One structured application process across internships, apprenticeships, trainships and headstart programs."],
  ["04", "School coordinates", "The school counsellor manages the organisation conversation and placement details."],
];

export default function HomePage() {
  return (
    <div className="site-home">
      <section className="hero-premium">
        <div className="hero-premium__inner">
          <div className="hero-premium__copy">
            <p className="eyebrow">{siteConfig.brand.fullMeaning}</p>
            <h1>Make the next step<br /><span>easier to find.</span></h1>
            <p className="hero-lead">A structured pathway platform connecting young people with real-world learning opportunities — with schools at the centre of the process.</p>
            <div className="hero-actions"><LinkButton href="/opportunities" size="lg">Explore opportunities</LinkButton><LinkButton href="/login" variant="outline" size="lg">Portal login</LinkButton></div>
            <div className="hero-proof"><span>✓ Student-first</span><span>✓ School-supported</span><span>✓ Organisation-ready</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual__frame"><img src="/images/educational-pathway.png" alt="Educational pathway illustration" /></div>
            <div className="hero-visual__caption"><strong>Explore → Apply → Grow</strong><span>One connected pathway from interest to experience.</span></div>
          </div>
        </div>
      </section>

      <section className="photo-feature">
        <div className="photo-feature__image"><img src="/images/students-classroom.png" alt="Students collaborating in a classroom" /></div>
        <div className="photo-feature__copy"><p className="eyebrow">Designed for education</p><h2>Opportunity should feel accessible — not complicated.</h2><p>iLearn4U gives students a clear place to discover and apply, gives parents visibility, gives schools the tracking tools they need, and gives organisations a controlled way to manage applications.</p><div className="feature-points"><span>Student profile & intake</span><span>20+ student tracking view</span><span>School–organisation messaging</span><span>Decision workflow</span></div></div>
      </section>

      <section className="pathway-section">
        <div className="section-head"><p className="eyebrow">The pathway</p><h2>Simple on the surface. Powerful underneath.</h2><p>Every part of the experience is designed to be upgraded as the platform moves from pilot to production.</p></div>
        <div className="step-grid">{steps.map(([n,t,d]) => <div className="step-card" key={n}><span className="step-card__number">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="opportunity-section"><div className="section-head"><p className="eyebrow">Pathway types</p><h2>One platform. Multiple pathways.</h2></div><div className="opportunity-grid">{opportunityTypes.slice(0,4).map(t=><Link key={t.id} href={`/opportunities?type=${t.id}`} className="opportunity-tile"><span>{t.icon}</span><div><h3>{t.label}</h3><p>{t.shortDescription}</p></div><b>→</b></Link>)}</div></section>

      <section className="pricing-premium"><div className="section-head"><p className="eyebrow">Access</p><h2>Simple pricing. Clear roles.</h2></div><div className="pricing-grid"><PricingCard {...siteConfig.pricing.student} currencySymbol={siteConfig.pricing.currencySymbol}/><PricingCard {...siteConfig.pricing.parent} currencySymbol={siteConfig.pricing.currencySymbol}/><PricingCard {...siteConfig.pricing.school} currencySymbol={siteConfig.pricing.currencySymbol}/><PricingCard {...siteConfig.pricing.organisation} currencySymbol={siteConfig.pricing.currencySymbol}/></div></section>

      <FAQSection />

      <section className="final-premium"><p className="eyebrow">iLearn4U</p><h2>From interest to opportunity.</h2><p>Built to give every student a clearer next step — and every school a better way to manage it.</p><LinkButton href="/login" size="lg">Enter the portal</LinkButton></section>
    </div>
  );
}
