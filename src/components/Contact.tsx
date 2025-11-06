import { motion } from "framer-motion";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Contact as ContactType } from "../types/portfolio";

interface ContactProps {
  data: ContactType;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact({ data }: ContactProps) {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formState.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="section-container relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Animated gradient waves */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-96 opacity-30"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -20, 0],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 rounded-t-full blur-3xl" />
        <div className="absolute bottom-10 left-10 right-10 h-32 bg-gradient-to-r from-accent-400 via-primary-400 to-accent-400 rounded-t-full blur-2xl" />
      </motion.div>

      {/* Decorative orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                x: [-20, 20, -20],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4 px-4 py-2 glass-light rounded-full text-primary-600 dark:text-primary-400 font-semibold border border-primary-400/20">
            ✉️ Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-['Space_Grotesk'] px-4">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {data.message}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-3xl p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 font-['Space_Grotesk']">
                Contact Info
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm sm:text-base">
                Feel free to reach out for collaborations or just a friendly
                hello 👋
              </p>

              <motion.a
                href={`mailto:${data.email}`}
                whileHover={shouldReduceMotion ? {} : { x: 5, scale: 1.02 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-light rounded-2xl hover:border-primary-400/40 border border-primary-400/20 transition-all group mb-6"
                aria-label={`Send email to ${data.email}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    Email
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
                    {data.email}
                  </p>
                </div>
              </motion.a>

              <div className="pt-4">
                <p className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {data.social.map((social) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }
                      }
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 glass-light rounded-xl flex items-center justify-center hover:border-primary-400/40 border border-primary-400/20 transition-all group p-2"
                      title={social.platform}
                      aria-label={`Visit ${social.platform} profile`}
                    >
                      <span className="text-lg sm:text-xl">
                        {social.platform === "LinkedIn"
                          ? "💼"
                          : social.platform === "GitHub"
                          ? "🐙"
                          : social.platform === "Twitter"
                          ? "🐦"
                          : "🔗"}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-3"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative"
              noValidate
              aria-label="Contact form"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary-400 rounded-tl-xl" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-accent-400 rounded-br-xl" />

              <div className="space-y-6 relative">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={data.placeholders.name}
                    required
                    disabled={submitStatus === "submitting"}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: focusedField === "name" ? 1.01 : 1,
                          }
                    }
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 glass-light rounded-xl border-2 transition-all disabled:opacity-50 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-primary-400/20 focus:border-primary-400"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={data.placeholders.email}
                    required
                    disabled={submitStatus === "submitting"}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: focusedField === "email" ? 1.01 : 1,
                          }
                    }
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 glass-light rounded-xl border-2 transition-all disabled:opacity-50 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-primary-400/20 focus:border-primary-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={data.placeholders.message}
                    required
                    disabled={submitStatus === "submitting"}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: focusedField === "message" ? 1.01 : 1,
                          }
                    }
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 glass-light rounded-xl border-2 transition-all disabled:opacity-50 resize-none text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-primary-400/20 focus:border-primary-400"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  whileHover={
                    shouldReduceMotion || submitStatus === "submitting"
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)",
                        }
                  }
                  whileTap={
                    shouldReduceMotion || submitStatus === "submitting"
                      ? {}
                      : { scale: 0.98 }
                  }
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shimmer text-sm sm:text-base"
                >
                  {submitStatus === "submitting" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message ✨"
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 glass-light border-2 border-green-400/50 rounded-xl"
                    role="status"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-green-800 dark:text-green-200 font-semibold">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 glass-light border-2 border-red-400/50 rounded-xl"
                    role="alert"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 font-semibold">
                        Failed to send. Please try again or email me directly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
