import { Shield, CheckCircle, Wrench, Phone, Clock, MapPin, HelpCircle, ArrowRight, Car, Settings, Zap, Cog, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { openWhatsAppChat } from "@/lib/whatsapp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import autoguard3Months from "@/assets/autoguard-3-months.jpg";
import autoguard6Months from "@/assets/autoguard-6-months.jpg";
import autoguardApp from "@/assets/autoguard-app.jpg";
import autoguardBenefits from "@/assets/autoguard-benefits.jpg";
import autoguardCovered from "@/assets/autoguard-covered.jpg";

const Warranty = () => {
  const phoneNumber = "447960130449";
  const whatsappMessage = "Hello! I'd like to ask about your warranty options.";

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppChat(phoneNumber, whatsappMessage);
  };

  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Guard against unexpected mechanical and electrical failures with our extensive coverage options.",
    },
    {
      icon: MapPin,
      title: "Nationwide Network",
      description: "Access to approved repairers across the UK ensures you're never far from expert help.",
    },
    {
      icon: Clock,
      title: "Flexible Coverage Periods",
      description: "Choose from a range of warranty durations to suit your needs, from 3 to 24 months.",
    },
    {
      icon: Phone,
      title: "Dedicated Support Line",
      description: "Our claims team is available to assist you when you need it most.",
    },
    {
      icon: Car,
      title: "Roadside Assistance",
      description: "Many packages include breakdown cover for added peace of mind on every journey.",
    },
    {
      icon: Settings,
      title: "No Garage Ties",
      description: "Use approved repairers nationwide – no need to return to the selling dealer.",
    },
  ];

  const coverageCategories = [
    {
      title: "Engine",
      icon: Cog,
      items: ["Cylinder block", "Cylinder head", "Pistons & rings", "Camshaft & bearings", "Oil pump", "Timing components"],
    },
    {
      title: "Transmission",
      icon: Settings,
      items: ["Gearbox internals", "Clutch mechanism", "Differential", "Drive shafts", "Transfer box", "Torque converter"],
    },
    {
      title: "Electrical",
      icon: Zap,
      items: ["Starter motor", "Alternator", "Window motors", "Central locking", "Wiper motors", "ECU components"],
    },
    {
      title: "Braking & Steering",
      icon: Car,
      items: ["Brake master cylinder", "Servo unit", "ABS pump", "Power steering pump", "Steering rack", "Brake callipers"],
    },
  ];

  const faqs = [
    {
      question: "What components are covered by the warranty?",
      answer: "Our warranty packages provide cover for a comprehensive list of mechanical and electrical components. This typically includes the engine, gearbox, differential, steering, braking system (excluding wear items), electrical components, cooling system, and fuel system. The exact coverage depends on the level of warranty selected – full details are provided in your warranty documentation.",
    },
    {
      question: "How long does warranty coverage last?",
      answer: "We offer flexible warranty periods ranging from 3 months up to 24 months, depending on the vehicle and your requirements. Extended warranty options allow you to maintain continuous protection beyond the initial period.",
    },
    {
      question: "Is there a limit on repair costs?",
      answer: "Each warranty package has defined claim limits per repair and per claim period. These limits are designed to cover the cost of most repairs you're likely to encounter. Your warranty documentation will clearly state the applicable limits for your chosen package.",
    },
    {
      question: "What is the claims process?",
      answer: "Making a claim is straightforward: Contact the dedicated claims line when you experience an issue. A claims handler will authorise diagnosis at an approved repairer. Once the fault is confirmed as covered, repairs are authorised and costs are settled directly with the garage.",
    },
    {
      question: "Can I choose my own garage for repairs?",
      answer: "Warranty repairs should be carried out by repairers within the approved network to ensure quality standards are met. The network covers the UK extensively, so there's always a convenient option nearby.",
    },
    {
      question: "What isn't covered by the warranty?",
      answer: "Standard exclusions include routine servicing and maintenance, wear and tear items (brake pads, clutch plates, tyres), bodywork, interior trim, and pre-existing faults. Glass, audio equipment, and modifications may also be excluded. All exclusions are clearly listed in your warranty terms.",
    },
    {
      question: "Does the warranty transfer if I sell the vehicle?",
      answer: "In most cases, the warranty is transferable to a new private owner, which can be a valuable selling point. The transfer process is straightforward – contact us for details on how to arrange this.",
    },
    {
      question: "How do I extend my warranty coverage?",
      answer: "Extended warranty packages are available for those seeking continued protection. We recommend contacting us before your current warranty expires to ensure seamless coverage and avoid any gaps in protection.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Gold/Black Theme */}
      <section className="bg-secondary py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">
                Autoguard Warranty Partner
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Autoguard Warranty
              <span className="block text-gold mt-2 italic">Peace of Mind</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Drive with confidence knowing your vehicle is protected by one of the UK's most trusted warranty providers.
            </p>
            <div className="mt-8">
              <Button 
                variant="gold"
                size="xl"
                asChild
              >
                <Link to="/contact">
                  Ask About Warranty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Autoguard Images Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Our Partner
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mt-3">
              Warranty Protection with <span className="text-gold">Autoguard</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              Autoguard is one of the UK's premier warranty providers, trusted by thousands of motorists and dealers nationwide.
            </p>
          </div>

          {/* Coverage Plans */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            <img src={autoguard3Months} alt="Autoguard 3 Month Warranty Cover" className="w-full rounded-xl shadow-card" />
            <img src={autoguard6Months} alt="Autoguard 6 Month Warranty Cover" className="w-full rounded-xl shadow-card" />
          </div>

          {/* Benefits & Coverage */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            <img src={autoguardBenefits} alt="Autoguard Warranty Benefits" className="w-full rounded-xl shadow-card" />
            <img src={autoguardCovered} alt="What is covered by Autoguard Warranty" className="w-full rounded-xl shadow-card" />
          </div>

          {/* App */}
          <div className="max-w-3xl mx-auto">
            <img src={autoguardApp} alt="Autoguard Warranty App" className="w-full rounded-xl shadow-card" />
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Why Choose Autoguard
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mt-3">
              Key Benefits of Our Warranty
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              Comprehensive protection designed to keep you on the road with complete confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-6 md:p-8 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-t-4 border-gold"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              What's Covered
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary-foreground mt-3">
              Comprehensive Component Coverage
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Our warranty packages protect the vital mechanical and electrical systems that keep your vehicle running smoothly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {coverageCategories.map((category) => (
              <div
                key={category.title}
                className="bg-charcoal-light rounded-xl p-5 md:p-6 border border-charcoal"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gold rounded-lg flex items-center justify-center">
                    <category.icon className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-secondary-foreground">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Claims Work */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mt-3">
              How Claims & Repairs Work
            </h2>
            <p className="text-muted-foreground mt-4 text-sm md:text-base">
              When something goes wrong, getting it fixed is straightforward with our streamlined claims process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
              {[
                {
                  step: "1",
                  title: "Report",
                  description: "Contact the dedicated claims line as soon as you notice an issue with your vehicle.",
                },
                {
                  step: "2",
                  title: "Diagnose",
                  description: "A claims handler authorises diagnosis at an approved repairer near you.",
                },
                {
                  step: "3",
                  title: "Authorise",
                  description: "Once the fault is confirmed as covered, repair work is formally authorised.",
                },
                {
                  step: "4",
                  title: "Repair",
                  description: "The repairer completes the work and costs are settled directly.",
                },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 relative z-10">
                      <span className="text-secondary font-bold text-lg md:text-2xl">{item.step}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 md:top-8 left-[calc(50%+24px)] md:left-[calc(50%+32px)] w-[calc(100%-48px)] md:w-[calc(100%-64px)] h-0.5 bg-gold/30" />
                    )}
                    <h3 className="text-sm md:text-lg font-display font-semibold text-foreground mb-1 md:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extended Warranty */}
      <section className="py-16 md:py-20 bg-gradient-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Wrench className="w-12 h-12 md:w-16 md:h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary mb-4">
              Extended Warranty Options
            </h2>
            <p className="text-secondary/80 mb-8 max-w-2xl mx-auto text-sm md:text-lg">
              Looking for longer-term protection? Our extended warranty packages provide coverage for up to 24 months, ensuring continued peace of mind well into the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-secondary text-gold hover:bg-charcoal-light"
                asChild
              >
                <Link to="/contact">
                  Enquire About Extended Warranty
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
                asChild
              >
                <a href="tel:07960130449">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Call 07960 130449
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4 text-sm md:text-base">
                Find answers to the most common questions about our warranty coverage.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-4 md:px-6 border border-border shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-gold hover:no-underline py-4 md:py-6 text-sm md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 md:pb-6 leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary-foreground mb-6">
            Questions About Our Warranty?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm md:text-lg">
            Our team is here to explain your warranty options and help you choose the right protection for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gold"
              size="lg"
              asChild
            >
              <Link to="/contact">
                Ask About Warranty
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Warranty;
