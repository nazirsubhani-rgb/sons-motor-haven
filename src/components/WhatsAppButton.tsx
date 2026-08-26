import { MessageCircle } from "lucide-react";
import { openWhatsAppChat } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const phoneNumber = "442046468471";
  const message = "Hello! I'm interested in learning more about your vehicles.";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppChat(phoneNumber, message);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      <span className="hidden sm:block absolute right-full mr-3 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
