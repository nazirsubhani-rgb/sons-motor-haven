import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-gold font-display text-2xl font-bold tracking-wide">
                WM & Sons
              </span>
              <span className="text-gold/80 text-sm tracking-widest uppercase">
                Motors Ltd
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for quality used cars with comprehensive warranty coverage. Family-run business committed to honest advice and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "View Stock", path: "/stock" },
                { name: "Warranty Information", path: "/warranty" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
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
            <h3 className="text-gold font-display text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:07960130449"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  07960 130449
                </a>
              </li>
              <li>
                <a
                  href="mailto:wmsonsmotorsltd@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  wmsonsmotorsltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>United Kingdom</span>
              </li>
            </ul>
          </div>

          {/* Warranty Partner */}
          <div className="space-y-4">
            <h3 className="text-gold font-display text-lg font-semibold">Warranty Partner</h3>
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
              <Link to="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gold transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
