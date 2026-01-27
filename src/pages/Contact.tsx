import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const phoneNumber = "447960130449";
  const whatsappMessage = "Hello! I'm interested in learning more about your vehicles.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("enquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "07960 130449",
      href: "tel:07960130449",
    },
    {
      icon: Mail,
      label: "Email",
      value: "wmsonsmotorsltd@gmail.com",
      href: "mailto:wmsonsmotorsltd@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "121 Augustine Road, Harrow, HA3 5NT",
      href: "https://maps.google.com/?q=121+Augustine+Road,+Harrow,+HA3+5NT",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon-Sat: 9am-6pm",
      href: null,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a question or ready to find your next car? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    Reach out to us through any of the methods below. We aim to respond to all enquiries within 24 hours.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((item) => (
                    <div
                      key={item.label}
                      className="bg-cream-dark p-6 rounded-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            {item.label}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.label === "Location" ? "_blank" : undefined}
                              rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                              className="text-foreground font-semibold hover:text-gold transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="text-foreground font-semibold">
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-[#25D366]/10 p-6 rounded-xl border border-[#25D366]/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Chat on WhatsApp
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Get instant responses
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white"
                    asChild
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat with us on WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Map */}
                <div className="bg-cream-dark rounded-xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.123456789!2d-0.3345!3d51.5890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487611e5c123456%3A0x0!2s121%20Augustine%20Rd%2C%20Harrow%20HA3%205NT!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WM & Sons Motors Ltd Location"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-card">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07123 456789"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the car you're looking for, or ask any questions..."
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-secondary-foreground mb-4">
            Prefer to Call?
          </h2>
          <p className="text-muted-foreground mb-6">
            Speak directly with our friendly team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:07960130449">
                <Phone className="w-5 h-5 mr-2" />
                07960 130449
              </a>
            </Button>
            <Button 
              size="xl"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
              asChild
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
