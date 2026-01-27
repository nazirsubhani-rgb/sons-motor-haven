import { Users, Target, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Honest Advice",
      description: "We believe in transparency. You'll always get straightforward, honest information about every vehicle.",
    },
    {
      icon: Target,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We take time to understand your needs and find the right car for you.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We carefully select every vehicle, ensuring only the best quality cars make it to our stock.",
    },
    {
      icon: Users,
      title: "Family Values",
      description: "As a family-run business, we treat every customer like family. Personal service you can trust.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              About Us
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-4 md:mb-6">
              WM & Sons Motors Ltd
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Your trusted partner for quality used cars in the United Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  WM & Sons Motors Ltd is a trusted UK used car dealer committed to supplying quality vehicles at competitive prices. We pride ourselves on honest advice, carefully selected stock, and providing customers with peace of mind through comprehensive warranties.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Our goal is simple: make buying a car straightforward, transparent, and stress-free. We understand that purchasing a vehicle is a significant decision, and we're here to guide you every step of the way.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  As a family-run business, we take pride in building lasting relationships with our customers. Many return to us time and again, and we're honoured by the trust they place in us.
                </p>
              </div>
              <div className="bg-cream-dark rounded-2xl p-6 md:p-8 shadow-card">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                    Family-Run Business
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Personal service and attention to detail that only a family business can provide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-gold text-sm font-medium tracking-widest uppercase">
                Our Values
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-3">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card p-8 rounded-xl shadow-card text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <value.icon className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-2 md:mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary-foreground mb-6">
              Our Promise to You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
              {[
                "No pressure sales tactics",
                "Transparent pricing always",
                "Quality vehicles only",
                "Comprehensive warranty",
                "After-sales support",
                "Customer satisfaction first",
              ].map((promise) => (
                <div
                  key={promise}
                  className="bg-charcoal-light p-4 md:p-6 rounded-xl text-secondary-foreground text-sm md:text-base"
                >
                  {promise}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 md:mb-6">
            Ready to Meet the Team?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Get in touch today and experience the WM & Sons difference. We're here to help you find your perfect vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="gold-outline" size="lg" asChild>
              <Link to="/stock">View Our Stock</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
