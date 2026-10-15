import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const COUNTRIES = [
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+66",  flag: "🇹🇭", name: "Thailand" },
  { code: "+62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "+84",  flag: "🇻🇳", name: "Vietnam" },
  { code: "+90",  flag: "🇹🇷", name: "Turkey" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
];

/* ------------------------------------------------------------------ */
/* Configuration (all VITE_ values are PUBLIC – they ship in the bundle) */
/* ------------------------------------------------------------------ */
const SHEET_URL = import.meta.env.VITE_CONTACT_FORM_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // site key is public by design
const RECAPTCHA_ACTION = "contact_form"; // must match CONFIG.RECAPTCHA_ACTION in Code.gs
const REQUEST_TIMEOUT_MS = 30000;

// Keep in sync with CONFIG.MAX_LEN in Code.gs (server is still the authority)
const MAX = { name: 100, email: 254, jobTitle: 100, phone: 15, companyName: 150, message: 2000 };
const FIELD_ORDER = ["name", "email", "jobTitle", "phone", "companyName", "message"];

// Mirrors of the server-side formats (UX only – never trusted)
const PERSON_NAME_RX = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]*$/u;
const ORG_TEXT_RX = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}\s.,&'’()\/+#:\-]*$/u;
const EMAIL_RX = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~\-]{1,64}@(?:[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

// Keep in sync with RX.messageText in Code.gs.
// Allowed: letters (any script), digits, spaces/newlines and  . , ! ? ' ’ " “ ” - – — ( ) : ; / & @
const MESSAGE_TEXT_RX = /^[\p{L}\p{M}\p{N}\s.,!?'’"“”\-–—():;\/&@\u200C\u200D]+$/u;

// Keep in sync with CONFIG.MIN_MESSAGE_LETTERS in Code.gs
const MESSAGE_MIN_LETTERS = 5;
const countLetters = (s) => (s.match(/\p{L}/gu) || []).length;

const validators = {
  name: (v) => {
    const s = v.trim();
    if (s.length < 2) return "Name is required";
    return PERSON_NAME_RX.test(s) ? "" : "Name contains unsupported characters";
  },
  email: (v) => {
    const s = v.trim();
    return s.length <= 254 && EMAIL_RX.test(s) && !s.includes("..") ? "" : "Enter a valid email";
  },
  jobTitle: (v) => {
    const s = v.trim();
    if (s.length < 2) return "Job title is required";
    return ORG_TEXT_RX.test(s) ? "" : "Job title contains unsupported characters";
  },
  phone: (v) => (/^[0-9]{6,15}$/.test(v) ? "" : "Enter a valid phone number"),
  companyName: (v) => {
    const s = v.trim();
    if (s.length < 2) return "Company name is required";
    return ORG_TEXT_RX.test(s) ? "" : "Company name contains unsupported characters";
  },
  message: (v) => {
    const s = v.trim();
    if (s.length < 10) return "Minimum 10 characters required";
    if (!MESSAGE_TEXT_RX.test(s)) return "Special characters are not allowed in the message";
    // Same rule as the server: must contain real words, not just digits/symbols
    if (countLetters(s) < MESSAGE_MIN_LETTERS) return "Please write your message in words";
    return "";
  },
};

/* Server field names → React field names */
const SERVER_FIELD_MAP = {
  name: "name", email: "email", role: "jobTitle",
  phone: "phone", organization: "companyName", message: "message",
};

const GENERIC_ERROR = "Submission failed. Please try again.";
const UNCONFIRMED_ERROR =
  "We couldn't confirm that your message was received. Please check your connection and try again.";
const SERVER_ERROR_MESSAGES = {
  CAPTCHA_FAILED: "We couldn't verify your submission. Please try again.",
  CAPTCHA_UNAVAILABLE: "The verification service is unavailable right now. Please try again in a moment.",
  RATE_LIMITED: "Too many submissions. Please try again later.",
  BUSY: "We're receiving a lot of requests right now. Please try again in a moment.",
};

/* ------------------------------------------------------------------ */
/* reCAPTCHA v3 loader (loaded once, shared promise)                   */
/* ------------------------------------------------------------------ */
let recaptchaPromise = null;
function loadRecaptcha(siteKey) {
  if (recaptchaPromise) return recaptchaPromise;
  recaptchaPromise = new Promise((resolve, reject) => {
    const ready = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
    if (window.grecaptcha?.ready) return ready();

    let s = document.getElementById("recaptcha-v3-script");
    if (!s) {
      s = document.createElement("script");
      s.id = "recaptcha-v3-script";
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener("load", ready);
    s.addEventListener("error", () => reject(new Error("recaptcha_load_failed")));
  }).catch((err) => {
    recaptchaPromise = null; // allow a retry on the next submit
    throw err;
  });
  return recaptchaPromise;
}

function newSubmissionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const b = new Uint8Array(16);
  window.crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

/* ------------------------------------------------------------------ */
/* UI pieces                                                           */
/* ------------------------------------------------------------------ */
function CountrySelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchRef = useRef(null);
  const selected = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];
  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch("");
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative flex-shrink-0"
      onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Country code: ${selected.name} ${selected.code}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 h-11 border border-gray-300 rounded-lg bg-white cursor-pointer text-sm text-gray-800 outline-none whitespace-nowrap hover:border-violet-400 transition-colors"
      >
        <span className="text-lg" aria-hidden="true">{selected.flag}</span>
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="text-sm text-gray-700">{selected.code}</span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-56 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-gray-100">
            <Search size={12} className="text-gray-400" aria-hidden="true" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // Enter inside the search box must not submit the surrounding <form>
              onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
              placeholder="Search…"
              aria-label="Search countries"
              className="border-none outline-none text-xs text-gray-800 w-full bg-transparent placeholder-gray-400"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onChange(c.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-6 py-2 border-none text-xs text-gray-800 text-left cursor-pointer transition-colors hover:bg-violet-50 ${c.code === value ? "bg-violet-50" : "bg-transparent"}`}
              >
                <span className="text-base" aria-hidden="true">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-violet-700 text-[11px] font-semibold">{c.code}</span>
                {c.code === value && <Check size={11} className="text-violet-700" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ hasError, className = "", ...props }) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-gray-800 bg-white outline-none transition-all placeholder-gray-400
        focus:border-violet-600 focus:ring-2 focus:ring-violet-100
        ${hasError ? "border-red-300 bg-red-50" : "border-gray-300"}
        ${className}`}
      {...props}
    />
  );
}

function FieldTextarea({ hasError, ...props }) {
  return (
    <textarea
      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-gray-800 bg-white outline-none transition-all resize-y leading-relaxed placeholder-gray-400
        focus:border-violet-600 focus:ring-2 focus:ring-violet-100
        ${hasError ? "border-red-300 bg-red-50" : "border-gray-300"}`}
      {...props}
    />
  );
}

function Err({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
      <AlertCircle size={10} aria-hidden="true" />
      {msg}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function ContactForm() {
  const [fd, setFd] = useState({
    name: "", email: "", jobTitle: "",
    countryCode: "+91", phone: "",
    companyName: "", message: "",
    fax_number: "", // honeypot – real users never see or fill this
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);
  const submittingRef = useRef(false);   // synchronous guard: blocks double-clicks before state updates
  const submissionIdRef = useRef(null);  // idempotency key, reused for retries until confirmed success
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // Preload reCAPTCHA so the token request at submit time is fast
  useEffect(() => {
    if (RECAPTCHA_SITE_KEY) loadRecaptcha(RECAPTCHA_SITE_KEY).catch(() => {});
  }, []);

  const validate = (name, value, data = fd) => {
    if (name === "phone") {
      const err = validators.phone(value);
      if (err) return err;
      const total = `${data.countryCode}${value}`.replace(/\D/g, "").length; // E.164 max 15 digits
      return total < 8 || total > 15 ? "Enter a valid phone number" : "";
    }
    return validators[name]?.(value) ?? "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFd((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const focusField = (name) => formRef.current?.elements.namedItem(name)?.focus();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // already sending – ignore repeated clicks / Enter presses
    setFormError("");

    const allT = FIELD_ORDER.reduce((a, k) => ({ ...a, [k]: true }), {});
    const allE = FIELD_ORDER.reduce((a, k) => ({ ...a, [k]: validate(k, fd[k] ?? "", fd) }), {});
    setTouched(allT);
    setErrors(allE);
    const firstBad = FIELD_ORDER.find((k) => allE[k]);
    if (firstBad) { focusField(firstBad); return; }

    if (!SHEET_URL || !RECAPTCHA_SITE_KEY) {
      setFormError("This form is not configured correctly. Please contact us another way.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      if (!submissionIdRef.current) submissionIdRef.current = newSubmissionId();
      const submissionId = submissionIdRef.current;

      // Fresh token at submit time (tokens expire after ~2 minutes and are single-use)
      const grecaptcha = await loadRecaptcha(RECAPTCHA_SITE_KEY);
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION });

      // Content-Type is CORS-safelisted → no preflight (Apps Script cannot answer OPTIONS).
      // The response is READ and verified; we never assume success.
      const res = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "omit",
        cache: "no-store",
        signal: controller.signal,
        body: new URLSearchParams({
          name: fd.name.trim(),
          email: fd.email.trim(),
          role: fd.jobTitle.trim(),
          phone: `${fd.countryCode}${fd.phone}`,
          organization: fd.companyName.trim(),
          message: fd.message.trim(),
          fax_number: fd.fax_number, // honeypot value (empty for humans)
          recaptchaToken: token,
          submissionId,
        }).toString(),
      });

      let body = null;
      try { body = await res.json(); } catch { body = null; }

      if (!mountedRef.current) return;

      // Success ONLY with an explicit, matching receipt from the server
      if (body && body.ok === true && body.submissionId === submissionId) {
        submissionIdRef.current = null;
        setSuccess(true);
        return;
      }

      if (body && body.ok === false) {
        if (body.code === "VALIDATION" && body.fieldErrors && typeof body.fieldErrors === "object") {
          const mapped = {};
          Object.entries(body.fieldErrors).forEach(([k, msg]) => {
            const field = SERVER_FIELD_MAP[k];
            if (field) mapped[field] = String(msg).slice(0, 120);
          });
          setErrors((p) => ({ ...p, ...mapped }));
          setTouched((p) => ({ ...p, ...Object.fromEntries(Object.keys(mapped).map((k) => [k, true])) }));
          const first = FIELD_ORDER.find((k) => mapped[k]);
          if (first) focusField(first);
          setFormError("Please correct the highlighted fields.");
        } else {
          setFormError(SERVER_ERROR_MESSAGES[body.code] ?? GENERIC_ERROR);
        }
        return;
      }

      // 200 but not a valid receipt (HTML error page, truncated body, wrong id…)
      setFormError(UNCONFIRMED_ERROR);
    } catch (err) {
      // Network failure, timeout/abort, CORS-blocked Google error page, reCAPTCHA load failure.
      // We cannot know whether the server stored it → say so; do NOT show success.
      console.error("Contact form submission error:", err?.name || "error"); // no form data logged
      if (mountedRef.current) {
        setFormError(err?.message === "recaptcha_load_failed"
          ? "We couldn't load the spam-protection check. Please disable content blockers and try again."
          : UNCONFIRMED_ERROR);
      }
    } finally {
      clearTimeout(timer);
      submittingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  };

  // Shared props + a11y wiring for the text fields
  const fieldProps = (name) => {
    const msg = touched[name] && errors[name];
    return {
      name,
      value: fd[name],
      onChange,
      onBlur,
      maxLength: MAX[name],
      hasError: !!msg,
      "aria-invalid": !!msg,
      "aria-describedby": msg ? `cf-${name}-error` : undefined,
      "aria-required": true,
    };
  };

  const { hasError: phoneHasError, ...phoneProps } = fieldProps("phone");

  return (
    <div className=" flex  justify-center p-1 md:p-5 mb-20">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-[480px] px-8 py-7">
        {success ? (
          <div className="text-center py-10" role="status">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-300">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-[17px] font-bold text-gray-900 text-center mb-6">
              Contact our team
            </h2>

            {formError && (
              <div
                role="alert"
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 mb-4 text-xs text-red-600"
              >
                <AlertCircle size={13} aria-hidden="true" />
                {formError}
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              aria-busy={loading}
              className="flex flex-col gap-3"
            >
              {/* Honeypot: off-screen, not focusable, hidden from assistive tech. Bots fill it; people never do. */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
              >
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="fax_number"
                    value={fd.fax_number}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <FieldInput {...fieldProps("name")} placeholder="Name*" aria-label="Name" autoComplete="name" />
                <Err id="cf-name-error" msg={touched.name && errors.name} />
              </div>

              {/* Work email */}
              <div>
                <FieldInput
                  {...fieldProps("email")}
                  type="email"
                  placeholder="Work email*"
                  aria-label="Work email"
                  autoComplete="email"
                />
                <Err id="cf-email-error" msg={touched.email && errors.email} />
              </div>

              {/* Job title */}
              <div>
                <FieldInput
                  {...fieldProps("jobTitle")}
                  placeholder="Job title*"
                  aria-label="Job title"
                  autoComplete="organization-title"
                />
                <Err id="cf-jobTitle-error" msg={touched.jobTitle && errors.jobTitle} />
              </div>

              {/* Phone */}
              <div>
                <div className="flex gap-2">
                  <CountrySelector
                    value={fd.countryCode}
                    onChange={(code) => {
                      setFd((p) => ({ ...p, countryCode: code }));
                      if (touched.phone) {
                        setErrors((p) => ({ ...p, phone: validate("phone", fd.phone, { ...fd, countryCode: code }) }));
                      }
                    }}
                  />
                  <input
                    {...phoneProps}
                    type="text"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="Phone number*"
                    aria-label="Phone number"
                    className={`flex-1 min-w-0 px-3.5 py-2.5 border rounded-lg text-sm text-gray-800 bg-white outline-none transition-all placeholder-gray-400
                      focus:border-violet-600 focus:ring-2 focus:ring-violet-100
                      ${phoneHasError ? "border-red-300 bg-red-50" : "border-gray-300"}`}
                  />
                </div>
                <Err id="cf-phone-error" msg={touched.phone && errors.phone} />
              </div>

              {/* Company name */}
              <div>
                <FieldInput
                  {...fieldProps("companyName")}
                  placeholder="Company name*"
                  aria-label="Company name"
                  autoComplete="organization"
                />
                <Err id="cf-companyName-error" msg={touched.companyName && errors.companyName} />
              </div>

              {/* Message */}
              <div>
                <FieldTextarea
                  {...fieldProps("message")}
                  rows={4}
                  placeholder="Tell us more about your team and what work you'd like to manage"
                  aria-label="Message"
                />
                <Err id="cf-message-error" msg={touched.message && errors.message} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-full border-none text-white text-[15px] font-semibold flex items-center justify-center gap-2 mt-1 transition-all
                  ${loading
                    ? "bg-violet-300 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-br from-violet-600 to-violet-800 cursor-pointer shadow-lg shadow-violet-300 hover:shadow-violet-400 hover:shadow-xl"
                  }`}
              >
                {loading ? (
                  <>
                    <svg
                      style={{ animation: "spin 0.7s linear infinite" }}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : "Submit"}
              </button>

              <p className="text-[11px] text-gray-500 text-center leading-relaxed m-0">
                By submitting you agree to our{" "}
                <Link to="/privacy-policy" className="text-violet-700 cursor-pointer underline">
                  Privacy Policy
                </Link>
                .
                We never share your data.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}