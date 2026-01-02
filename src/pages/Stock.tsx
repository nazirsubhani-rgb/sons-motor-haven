import { ExternalLink, Shield, CreditCard, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const Stock = () => {
  const stockSources = [
    {
      name: "GSS Garage",
      url: "https://www.gssgarage.co.uk/used-cars",
      description: "Browse our partner's extensive collection of quality used vehicles.",
    },
    {
      name: "Mr Car Max",
      url: "https://www.mrcarmax.co.uk",
      description: "Discover more great deals from our trusted partner dealership.",
    },
    {
      name: "Golden Motors Ltd",
      url: "https://www.goldenmotorsltd.co.uk",
      description: "Explore additional premium used car options.",
    },
  ];

  const badges = [
    { icon: Shield, label: "Warranty Included" },
    { icon: CreditCard, label: "Finance Available" },
    { icon: Car, label: "Part Exchange" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Our Stock
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Quality Used Cars
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our selection of carefully inspected, warranty-backed vehicles. All competitively priced with no hidden fees.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-charcoal-light px-4 py-2 rounded-full"
                >
                  <badge.icon className="w-4 h-4 text-gold" />
                  <span className="text-secondary-foreground text-sm font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stock Sources */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Browse Our Stock
            </h2>
            <p className="text-muted-foreground mt-4">
              View our full range of available vehicles through our partner platforms below.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stockSources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-border hover:border-gold/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-gold transition-colors">
                    {source.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  {source.description}
                </p>
                <span className="inline-flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  View Vehicles
                  <ExternalLink className="w-4 h-4 ml-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We have access to a wide network of quality vehicles. Tell us what you're looking for and we'll do our best to source it for you at a competitive price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <a href="tel:07960130449">Call Us: 07960 130449</a>
              </Button>
              <Button variant="gold-outline" size="lg" asChild>
                <a href="mailto:wmsonsmotorsltd@gmail.com">Email Your Requirements</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Quality Assured",
                description: "Every vehicle undergoes thorough inspection before sale.",
              },
              {
                title: "Warranty Protection",
                description: "Drive away with peace of mind courtesy of Autoguard.",
              },
              {
                title: "Finance Options",
                description: "Flexible finance packages to suit your budget.",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6">
                <h3 className="text-xl font-display font-semibold text-secondary-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stock;
