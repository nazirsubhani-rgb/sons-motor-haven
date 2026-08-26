import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/wm-sons-logo.jpg";
import { openWhatsAppChat } from "@/lib/whatsapp";

const Footer = () => {
  const location = useLocation();
  const phoneNumber = "442046468471";
  const whatsappMessage = "Hello! I'm interested in learning more about your vehicles.";
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppChat(phoneNumber, whatsappMessage);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Always scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });
    
    // If already on the same path, prevent default and just scroll
    if (location.pathname === path) {
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="inline-block">
              <img 
                src={logo} 
                alt="WM & Sons Motors Ltd" 
                className="h-14 md:h-16 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for quality used cars with comprehensive warranty coverage. Family-run business committed to honest advice and customer satisfaction.
            </p>
            {/* WhatsApp Button */}
            <Button 
              variant="outline" 
              className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-sm"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold font-display text-base md:text-lg font-semibold tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Our Collection", path: "/stock" },
                { name: "Warranty Information", path: "/warranty" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-gold font-display text-base md:text-lg font-semibold tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:02046468471"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  02046468471
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@wmsonsmotorsltd.com"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>sales@wmsonsmotorsltd.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>121 Augustine Road, Harrow, HA3 5NT</span>
              </li>
            </ul>
          </div>

          {/* Warranty Partner */}
          <div className="space-y-4">
            <h3 className="text-gold font-display text-base md:text-lg font-semibold tracking-wider">Warranty Partner</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Warranty provided in partnership with <span className="text-gold font-semibold">Autoguard</span> for your complete peace of mind.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-light">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WM & Sons Motors Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                onClick={(e) => handleNavClick(e, "/privacy")}
                className="hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                onClick={(e) => handleNavClick(e, "/terms")}
                className="hover:text-gold transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/admin/login" 
                className="hover:text-gold transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
