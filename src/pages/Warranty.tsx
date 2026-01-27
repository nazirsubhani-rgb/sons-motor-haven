import { Shield, CheckCircle, Wrench, Phone, Clock, MapPin, HelpCircle, ArrowRight, Car, Settings, Zap, Cog } from "lucide-react";
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
      {/* Hero Section - Autoguard Branded */}
      <section className="bg-autoguard-black py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-autoguard-red/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-autoguard-red/20 border border-autoguard-red/40 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-autoguard-red" />
              <span className="text-autoguard-red text-sm font-medium">
                Autoguard Warranty Partner
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-3 mb-6">
              Autoguard Warranty
              <span className="block text-autoguard-red mt-2">Peace of Mind</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Drive with confidence knowing your vehicle is protected by one of the UK's most trusted warranty providers.
            </p>
            <div className="mt-8">
              <Button 
                size="xl"
                className="bg-autoguard-red hover:bg-autoguard-red-dark text-white"
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

      {/* Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-autoguard-black to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-32 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-4">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-autoguard-red mx-auto mb-2" />
                    <span className="text-autoguard-black font-bold text-lg">AUTOGUARD</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                    Warranty Protection in Partnership with <span className="text-autoguard-red">Autoguard</span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Autoguard is one of the UK's premier warranty providers, trusted by thousands of motorists and dealers nationwide. Every vehicle we sell benefits from their comprehensive protection packages and dedicated claims support.
                  </p>
                  <p className="text-autoguard-red font-semibold text-lg">
                    Warranty peace of mind in partnership with Autoguard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-autoguard-red text-sm font-medium tracking-widest uppercase">
              Why Choose Autoguard
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-3">
              Key Benefits of Our Warranty
            </h2>
            <p className="text-gray-600 mt-4">
              Comprehensive protection designed to keep you on the road with complete confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-autoguard-red"
              >
                <div className="w-14 h-14 bg-autoguard-red/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-autoguard-red" />
                </div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-autoguard-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-autoguard-red text-sm font-medium tracking-widest uppercase">
              What's Covered
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-3">
              Comprehensive Component Coverage
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Our warranty packages protect the vital mechanical and electrical systems that keep your vehicle running smoothly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coverageCategories.map((category) => (
              <div
                key={category.title}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-autoguard-red rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-autoguard-red flex-shrink-0" />
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-autoguard-red text-sm font-medium tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-3">
              How Claims & Repairs Work
            </h2>
            <p className="text-gray-600 mt-4">
              When something goes wrong, getting it fixed is straightforward with our streamlined claims process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
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
                    <div className="w-16 h-16 bg-autoguard-red rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold text-2xl">{item.step}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-autoguard-red/30" />
                    )}
                    <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
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
      <section className="py-20 bg-gradient-to-br from-autoguard-red to-autoguard-red-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Wrench className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Extended Warranty Options
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Looking for longer-term protection? Our extended warranty packages provide coverage for up to 24 months, ensuring continued peace of mind well into the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl"
                className="bg-white text-autoguard-red hover:bg-gray-100"
                asChild
              >
                <Link to="/contact">
                  Enquire About Extended Warranty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:07960130449">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 07960 130449
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-autoguard-red mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mt-4">
                Find answers to the most common questions about our warranty coverage.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl px-6 border border-gray-200 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-autoguard-red hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-autoguard-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Questions About Our Warranty?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
            Our team is here to explain your warranty options and help you choose the right protection for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl"
              className="bg-autoguard-red hover:bg-autoguard-red-dark text-white"
              asChild
            >
              <Link to="/contact">
                Ask About Warranty
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07960130449">
                <Phone className="w-5 h-5 mr-2" />
                07960 130449
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Warranty;
