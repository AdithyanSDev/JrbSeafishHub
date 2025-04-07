import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+917259494007?text=Hello!%20I'm%20interested%20in%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={50} color="green" />
    </a>
  );
};

export default WhatsAppButton;
