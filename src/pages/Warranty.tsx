import { Shield, CheckCircle, Wrench, Phone, Clock, MapPin, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Warranty = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Mechanical & Electrical Cover",
      description: "Comprehensive protection against unexpected mechanical and electrical failures.",
    },
    {
      icon: MapPin,
      title: "Nationwide Repair Network",
      description: "Access to approved repairers across the UK for convenient servicing.",
    },
    {
      icon: Clock,
      title: "Extended Warranty Options",
      description: "Optional extended coverage for continued peace of mind beyond initial warranty.",
    },
    {
      icon: Phone,
      title: "24/7 Breakdown Assistance",
      description: "Round-the-clock support whenever and wherever you need it.",
    },
  ];

  const coverageItems = [
    "Engine components",
    "Gearbox and transmission",
    "Electrical systems",
    "Fuel system components",
    "Steering mechanisms",
    "Brake components",
    "Cooling system",
    "Air conditioning",
    "Suspension parts",
    "Clutch assembly",
  ];

  const faqs = [
    {
      question: "What does the warranty cover?",
      answer: "Our warranty covers a wide range of mechanical and electrical components including the engine, gearbox, transmission, steering, brakes, cooling system, and more. Specific coverage details are provided with each warranty policy and can vary depending on the level of cover selected.",
    },
    {
      question: "How long does the warranty last?",
      answer: "Standard warranty periods typically range from 3 to 12 months, depending on the vehicle and package selected. Extended warranty options are available for those seeking longer-term protection and peace of mind.",
    },
    {
      question: "Is there a mileage limit on the warranty?",
      answer: "Most warranty packages include a mileage allowance that varies based on the level of cover. Details of any mileage restrictions will be clearly outlined in your warranty documentation.",
    },
    {
      question: "How do I make a claim?",
      answer: "Making a claim is straightforward. Simply contact the Autoguard claims line, provide your warranty details and describe the issue. You'll be guided to an approved repairer who will assess and carry out any necessary repairs covered under your warranty.",
    },
    {
      question: "Can I use any garage for repairs?",
      answer: "To ensure repairs meet the required standards, warranty work should be carried out by approved repairers within the Autoguard network. This network covers the UK, so you'll always have convenient access to qualified technicians.",
    },
    {
      question: "Are there any exclusions?",
      answer: "Like all warranties, there are some exclusions such as wear and tear items, routine servicing, and pre-existing faults. All exclusions are clearly detailed in the warranty terms and conditions provided at the time of purchase.",
    },
    {
      question: "Can I extend my warranty?",
      answer: "Yes, extended warranty options are available. We recommend discussing your requirements with us before your initial warranty expires to ensure continuous coverage and protection.",
    },
    {
      question: "Is the warranty transferable if I sell the car?",
      answer: "In most cases, warranties can be transferred to a new owner, which can add value when selling your vehicle. Please check your specific warranty terms or contact us for confirmation.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Autoguard Warranty
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Peace of Mind Motoring
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive warranty coverage in partnership with Autoguard. Drive away with confidence knowing you're protected.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream-dark rounded-2xl p-8 md:p-12 shadow-card">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-20 h-20 text-gold" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    In Partnership with <span className="text-gold">Autoguard</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Autoguard is one of the UK's leading warranty providers, offering comprehensive mechanical and electrical protection for used vehicles. Every warranty we provide is backed by their expertise and nationwide support network.
                  </p>
                  <p className="text-sm text-gold font-medium">
                    Warranty peace of mind in partnership with Autoguard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Key Benefits
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground mt-3">
              Why Choose Our Warranty
            </h2>
            <p className="text-muted-foreground mt-4">
              Enjoy comprehensive protection and support designed to keep you on the road with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-8 rounded-xl shadow-card text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-secondary-foreground">
                What's Covered
              </h2>
              <p className="text-muted-foreground mt-4">
                Our warranty packages cover a wide range of mechanical and electrical components, giving you protection where it matters most.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {coverageItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-charcoal-light p-4 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-secondary-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground">
              How Claims Work
            </h2>
            <p className="text-muted-foreground mt-4">
              Getting repairs covered under your warranty is simple and straightforward.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Report the Issue",
                  description: "Contact the Autoguard claims line and describe the problem you're experiencing with your vehicle.",
                },
                {
                  step: "02",
                  title: "Get Authorisation",
                  description: "A claims handler will assess your case and direct you to an approved repairer in the nationwide network.",
                },
                {
                  step: "03",
                  title: "Repair Complete",
                  description: "The approved repairer carries out the work, and covered costs are handled directly with Autoguard.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-secondary font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="text-3xl font-display font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4">
                Got questions? Find answers to the most common warranty queries below.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 border-none shadow-card"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-gold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Extended Warranty */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Wrench className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Extended Warranty Options
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Looking for longer-term protection? Ask us about extended warranty packages that can provide coverage for 12 months or more. Keep your vehicle protected for longer and enjoy uninterrupted peace of mind.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Enquire About Extended Warranty
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-secondary-foreground mb-6">
            Questions About Our Warranty?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contact us today to learn more about our comprehensive warranty packages and how they can protect your purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:07960130449">
                <Phone className="w-5 h-5 mr-2" />
                Call 07960 130449
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">Ask About Warranty</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Warranty;
