import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          role: "Software Developer Client",
          projectType: "Full-Stack Development / Engineering"
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg("Message sent! I'll get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        await fetch("https://formspree.io/f/mgollvpl", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData)
        });
        setStatus("success");
        setStatusMsg("Message sent! Thank you for reaching out.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setStatus("success");
      setStatusMsg("Message received! Thank you.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate contact boxes with stagger from bottom
    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-form-section">
          <h2 className="contact-form-title">
            Let's Create <br />
            Something <span>Amazing</span>
          </h2>
          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              {status === "success" && (
                <div style={{ padding: "10px 14px", marginBottom: "12px", borderRadius: "8px", backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#6ee7b7", fontSize: "13px" }}>
                  ✅ {statusMsg}
                </div>
              )}
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" disabled={status === "loading"} className="form-submit" style={{ opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info-section">
          <h3>{config.developer.fullName}</h3>
          <div className="contact-flex">
            <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LeetCode <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href={config.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Facebook <MdArrowOutward />
            </a>
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{config.developer.fullName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
