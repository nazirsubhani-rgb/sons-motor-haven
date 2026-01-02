import { Shield, CheckCircle, Wrench, Phone, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Warranty Protection
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Peace of Mind Motoring
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive warranty coverage in partnership with Autoguard. Drive away with confidence.
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
                <div className="w-32 h-32 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-16 h-16 text-gold" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    In Partnership with <span className="text-gold">Autoguard</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Autoguard is one of the UK's leading warranty providers, offering comprehensive mechanical and electrical protection for used vehicles. Every warranty we provide is backed by their expertise and nationwide support network.
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
              Warranty Benefits
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground mt-3">
              What's Included
            </h2>
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
                Components Covered
              </h2>
              <p className="text-muted-foreground mt-4">
                Our warranty packages cover a wide range of mechanical and electrical components.
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
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Purchase Your Vehicle",
                  description: "Choose from our quality-checked stock with warranty included.",
                },
                {
                  step: "02",
                  title: "Something Goes Wrong",
                  description: "Contact Autoguard's dedicated claims line 24/7.",
                },
                {
                  step: "03",
                  title: "Get It Fixed",
                  description: "Approved repairs at a nationwide network of repairers.",
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
              <Link to="/contact">Send Enquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Warranty;
