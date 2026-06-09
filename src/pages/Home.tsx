import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Users, ThumbsUp, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { openWhatsAppChat } from "@/lib/whatsapp";
import heroImage from "@/assets/hero-car.jpg";
import autoguardBenefits from "@/assets/autoguard-benefits.jpg";
import autoguard3Months from "@/assets/autoguard-3-months.jpg";
import autoguard6Months from "@/assets/autoguard-6-months.jpg";
import happyCustomer1 from "@/assets/happy-customer-1.jpeg";
import happyCustomer2 from "@/assets/happy-customer-2.jpeg";

const Home = () => {
  const phoneNumber = "447960130449";
  const whatsappMessage = "Hello! I'm interested in learning more about your vehicles.";

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppChat(phoneNumber, whatsappMessage);
  };
  const features = [
    {
      icon: CheckCircle,
      title: "Quality Checked Vehicles",
      description: "Every vehicle undergoes rigorous inspection to ensure reliability and peace of mind.",
    },
    {
      icon: Star,
      title: "Competitive Pricing",
      description: "Fair, transparent pricing with no hidden fees. We offer genuine value for money.",
    },
    {
      icon: Shield,
      title: "Warranty Peace of Mind",
      description: "Comprehensive warranty coverage in partnership with Autoguard for added security.",
    },
    {
      icon: Users,
      title: "Friendly Customer Service",
      description: "Family-run business with a personal touch. No pressure, just honest advice.",
    },
  ];

  const trustPoints = [
    "Transparent, no-pressure sales approach",
    "Comprehensive vehicle history checks",
    "Flexible viewing appointments",
    "Part exchange welcome",
    "Finance options available",
    "Nationwide delivery available",
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium used car"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="space-y-2">
              <span className="inline-block text-gold text-xs md:text-sm font-medium tracking-widest uppercase opacity-0 animate-fade-in stagger-1">
                Welcome to WM & Sons Motors Ltd
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-secondary-foreground leading-tight opacity-0 animate-fade-in stagger-2">
                Quality Used Cars{" "}
                <span className="text-gold">You Can Trust</span>
              </h1>
            </div>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl opacity-0 animate-fade-in stagger-3">
              Peace of mind motoring with warranty included in partnership with Autoguard. Family-run dealership offering carefully selected vehicles at competitive prices.
            </p>
            <div className="flex items-center gap-3 opacity-0 animate-fade-in stagger-3">
              <img src={autoguardBenefits} alt="Autoguard Warranties Partner" className="h-12 md:h-16 w-auto rounded-md" />
              <span className="text-muted-foreground text-xs md:text-sm">Official Autoguard Warranty Partner</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in stagger-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/stock">
                  View Stock
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2 md:pt-4 opacity-0 animate-fade-in stagger-5">
              <a
                href="tel:02046368471"
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-sm md:text-base">0204 636 8471</span>
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base font-medium"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                Chat with us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mt-3">
              The WM & Sons Difference
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              We're not just selling cars – we're building relationships based on trust, quality, and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 md:p-8 bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <span className="text-gold text-sm font-medium tracking-widest uppercase">
                Warranty Protection
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary-foreground">
                Warranty Peace of Mind in Partnership with{" "}
                <span className="text-gold">Autoguard</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Every vehicle we sell comes with the option of comprehensive warranty coverage through our trusted partner, Autoguard. Drive away with confidence knowing you're protected against unexpected mechanical and electrical failures.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Mechanical & electrical cover included",
                  "Nationwide repair network",
                  "Optional extended warranty available",
                  "24/7 breakdown assistance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 md:gap-3 text-secondary-foreground text-sm md:text-base">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" size="lg" asChild>
                <Link to="/warranty">
                  Learn More About Warranty
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative space-y-4">
              <img src={autoguardBenefits} alt="Autoguard Warranty Benefits" className="w-full rounded-xl shadow-card" />
              <div className="grid grid-cols-2 gap-4">
                <img src={autoguard3Months} alt="3 Month Warranty Cover" className="w-full rounded-xl shadow-card" />
                <img src={autoguard6Months} alt="6 Month Warranty Cover" className="w-full rounded-xl shadow-card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-cream-dark rounded-2xl p-6 md:p-8 lg:p-12 shadow-card">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {trustPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2 md:gap-3">
                      <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-xs md:text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4 md:space-y-6">
              <span className="text-gold text-sm font-medium tracking-widest uppercase">
                Customer Reassurance
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
                Trust, Transparency & No Pressure Sales
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                At WM & Sons Motors Ltd, we believe in doing business the right way. We're a family-run dealership that values honesty and transparency above all else. When you visit us, you'll experience a refreshingly different approach to car buying.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                No pushy sales tactics, no hidden fees, just straightforward advice and a genuine commitment to finding you the right vehicle at the right price.
              </p>
              <Button variant="gold-outline" size="lg" asChild>
                <Link to="/about">
                  About Our Family Business
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Happy Customers
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary-foreground mt-3">
              Driving Away With a Smile
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              Real customers, real handovers. We're proud to be part of every journey that starts with WM & Sons Motors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { src: happyCustomer1, alt: "Happy customers collecting their Nissan Qashqai from WM & Sons Motors", caption: "Nissan Qashqai handover" },
              { src: happyCustomer2, alt: "Happy customer collecting his Ford Mondeo from WM & Sons Motors", caption: "Ford Mondeo handover" },
            ].map((item) => (
              <div
                key={item.caption}
                className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-elevated transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-5">
                  <p className="text-white font-display text-sm md:text-base">{item.caption}</p>
                  <p className="text-gold text-xs md:text-sm">Another satisfied WM & Sons customer</p>
                </div>
              </div>
            ))}
            <div className="hidden lg:flex flex-col justify-center items-center text-center bg-charcoal-light/40 rounded-xl p-8 border border-gold/20">
              <Star className="w-10 h-10 text-gold mb-3" />
              <h3 className="text-secondary-foreground font-display text-lg mb-2">Could be you next</h3>
              <p className="text-muted-foreground text-sm mb-4">Browse our latest collection and join our growing family of happy drivers.</p>
              <Button variant="gold" size="sm" asChild>
                <Link to="/stock">View Our Collection<ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary-foreground mb-4 md:mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Browse our carefully selected stock or get in touch to discuss your requirements. We're here to help you find quality used cars you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/stock">
                View Our Stock
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="tel:07960130449">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
