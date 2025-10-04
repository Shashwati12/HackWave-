"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaClipboardList, FaRegLightbulb, FaChevronDown, FaChevronUp } from "react-icons/fa";

type FormState = { name: string; email: string; message: string };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const faqs = [
    { q: "How do I register for a competition on EventOS?", a: "To participate in a competition, create an account on EventOS. Browse competitions, select one, and click 'Register'. Follow the prompts to complete your registration." },
    { q: "Can I participate in multiple competitions simultaneously?", a: "Yes! You can register for multiple competitions as long as you meet the eligibility criteria for each." },
    { q: "Do I need a college or ID proof to participate?", a: "Yes, most competitions require a valid college ID or government-issued ID for verification." },
    { q: "How will I receive updates or my entry confirmation?", a: "After registration, you will receive a confirmation email with competition details. Make sure to check your inbox and spam folder." },
    { q: "What should I do if I forget my EventOS password?", a: "Click on 'Forgot Password' at login, enter your registered email, and follow the instructions to reset your password." },
    { q: "Who do I contact for sponsorship or collaboration?", a: "Email our sponsorship team at sponsors@EventOS.com with a short proposal and your contact details." },
    { q: "How do I track my competition participation?", a: "Log in to your EventOS account and visit your profile dashboard to view registrations and status updates." },
    { q: "Can I update my registration details after registering?", a: "Yes, you can edit your registration details from your profile before the registration deadline." }
  ];

  const cards = [
    { icon: <FaPhoneAlt size={28} className="text-[#16D3AC]" />, title: "Call Us", subtitle: "Customer Support", info: "+91 9123456789" },
    { icon: <FaEnvelope size={28} className="text-[#16D3AC]" />, title: "Email Us", subtitle: "General Enquiries", info: "support@EventOS.com" },
    { icon: <FaClipboardList size={28} className="text-[#16D3AC]" />, title: "Registration Help", subtitle: "Step-by-step guidance", info: "support@EventOS.com" },
    { icon: <FaRegLightbulb size={28} className="text-[#16D3AC]" />, title: "Feedback", subtitle: "Ideas & Issues", info: "support@EventOS.com" },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const auroraX1 = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const auroraY1 = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const auroraX2 = useTransform(mouseX, [0, window.innerWidth], [30, -30]);
  const auroraY2 = useTransform(mouseY, [0, window.innerHeight], [20, -20]);

  function update(k: string, v: string) {
    setForm((s) => ({ ...s, [k]: v } as FormState));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3500);
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-inter overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#36C1F6" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#657FFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#16D3AC" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#g1)" />
        </svg>
      </div>

      {/* Aurora blobs */}
      <motion.div
        className="absolute -left-20 -top-16 w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-[#36C1F6] via-[#657FFF] to-[#16D3AC]"
        style={{ x: auroraX1, y: auroraY1 }}
      />
      <motion.div
        className="absolute -right-24 -bottom-12 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-[#657FFF] via-[#16D3AC] to-[#36C1F6]"
        style={{ x: auroraX2, y: auroraY2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF] drop-shadow-[0_8px_40px_rgba(54,193,246,0.08)]">
            Contact Our Team
          </h1>
          <p className="mt-4 text-[#B0B3C0] max-w-2xl mx-auto text-base md:text-lg">
            Let us know how we can help — registration, technical support, or feedback. We reply fast.
          </p>
        </header>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col lg:flex-row gap-6 items-stretch justify-center mb-12"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ scale: 1.02 }}
              className="relative w-full lg:w-64 h-64 rounded-3xl bg-white/5 backdrop-blur-lg border border-[#16D3AC]/20 shadow-[0_0_40px_rgba(22,211,172,0.15)] flex flex-col items-center justify-center p-5 text-center mx-auto"
            >
              <div className="absolute -top-7 inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#16D3AC]/20 shadow-[0_8px_30px_rgba(22,211,172,0.06)]">
                {c.icon}
              </div>
              <h3 className="mt-6 text-white font-semibold text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-[#B0B3C0]">{c.subtitle}</p>
              <p className="mt-2 text-sm text-[#16D3AC] font-medium">{c.info}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF] mb-6">
              Frequently Asked Questions
              <span className="block w-12 h-1 mt-1 bg-gradient-to-r from-[#36C1F6] to-[#16D3AC] rounded-full"></span>
            </h2>
            <div className="space-y-4">
              {(showAllFaqs ? faqs : faqs.slice(0, 3)).map((f, idx) => (
                <div
                  key={idx}
                  onClick={() => setOpen(open === idx ? null : idx)}
                  className="cursor-pointer select-none bg-white/5 backdrop-blur-lg border border-[#16D3AC]/20 p-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(22,211,172,0.15)]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{f.q}</h3>
                    <div className="text-[#16D3AC] text-xl">{open === idx ? <FaChevronUp /> : <FaChevronDown />}</div>
                  </div>
                  {open === idx && <p className="mt-3 text-[#B0B3C0]">{f.a}</p>}
                </div>
              ))}
              {faqs.length > 3 && (
                <div className="text-center mt-2">
                  <button
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                    className="text-[#16D3AC] font-medium flex items-center gap-1 mx-auto"
                  >
                    {showAllFaqs ? "Show Less" : "Read More"} {showAllFaqs ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              )}
            </div>
          </motion.section>

          {/* Message Form */}
          <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF] mb-6">
              Send us a message
              <span className="block w-12 h-1 mt-1 bg-gradient-to-r from-[#36C1F6] to-[#16D3AC] rounded-full"></span>
            </h2>
            <form onSubmit={submit} className="bg-white/5 backdrop-blur-lg border border-[#16D3AC]/20 p-6 rounded-3xl shadow-[0_0_60px_rgba(22,211,172,0.15)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-[#B0B3C0]">Name</span>
                  <input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-[#ffffff10] text-white outline-none focus:ring-2 focus:ring-[#16D3AC]/40 transition" placeholder="Your name" required />
                </label>

                <label className="block">
                  <span className="text-sm text-[#B0B3C0]">Email</span>
                  <input value={form.email} onChange={(e) => update('email', e.target.value)} type="email" className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-[#ffffff10] text-white outline-none focus:ring-2 focus:ring-[#16D3AC]/40 transition" placeholder="you@college.edu" required />
                </label>
              </div>

              <label className="block mt-4">
                <span className="text-sm text-[#B0B3C0]">Message</span>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={5} className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-[#ffffff10] text-white outline-none focus:ring-2 focus:ring-[#16D3AC]/40 transition" placeholder="How can we help?" required />
              </label>

              <div className="mt-4 flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.98 }} type="submit" className="inline-flex items-center gap-3 bg-[#16D3AC] hover:brightness-105 px-5 py-3 rounded-full font-semibold shadow-[0_8px_30px_rgba(22,211,172,0.18)] transition">
                  Send Message
                </motion.button>
                {submitted && <span className="text-[#16D3AC] font-medium">Thanks — we’ll reply within 24 hours.</span>}
              </div>
            </form>
          </motion.section>
        </div>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 bg-white/5 backdrop-blur-lg border border-[#16D3AC]/20 rounded-3xl p-6 flex items-center justify-between shadow-[0_0_40px_rgba(22,211,172,0.15)]">
          <div>
            <div className="text-sm text-[#B0B3C0]">Need immediate help?</div>
            <div className="text-white font-semibold">Call our support line — +91 9123456789</div>
          </div>
          <a href="mailto:support@EventOS.com" className="inline-block px-4 py-2 rounded-lg bg-transparent border border-[#16D3AC]/20 text-[#16D3AC] hover:bg-[#16D3AC]/8 transition">Email support</a>
        </motion.div>
      </div>

      <style jsx>{`
        .font-inter { font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
      `}</style>
    </div>
    // ignore the error - its font related
  );
}