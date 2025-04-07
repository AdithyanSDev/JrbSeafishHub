import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import WhatsAppButton from "../components/WhatsappButton";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "seafish.jrb@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatusMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form after success
      } else {
        setStatusMessage("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatusMessage("❌ Error sending message. Please try again.");
      console.error("Email sending error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <WhatsAppButton/>

      {/* Page Header with Gradient Background */}
      <div
        className="container-fluid page-header py-5"
        style={{
          background: "linear-gradient(135deg, #0a3d62, #74b9ff)",
        }}
      >
        <h1 className="text-center text-white display-6">Contact</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </li>
          <li className="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div>

      {/* Contact Section */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12 text-center mx-auto" style={{ maxWidth: "700px" }}>
                <h1 className="text-primary display-3 ">Get in touch</h1>
                <p className="mb-4">
                  Fill in your details and send us a message. We’ll get back to you soon!
                </p>
              </div>

              {/* Google Map - Updated Location */}
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: "400px" }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.063372517454!2d77.69378577477166!3d13.273024987064095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1d111f4e4811%3A0x621312b3f6c4e91f!2s6PM7%2BJ6W%20Devanahalli%2C%20Southegowdanahalli%2C%20Karnataka%20562110!5e0!3m2!1sen!2sin!4v1708168791345!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-100 form-control border-0 mb-4"
                    rows={5}
                    placeholder="Your Message"
                    required
                  ></textarea>
                  <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary" type="submit">
                    Submit
                  </button>
                </form>
                {statusMessage && <p className="text-center mt-3">{statusMessage}</p>}
              </div>

              {/* Contact Info */}
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">
                      6PM7+J6W, Devanahalli, Southegowdanahalli, Karnataka 562110
                    </p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">seafish.jrb@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+91) 7259494007</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
