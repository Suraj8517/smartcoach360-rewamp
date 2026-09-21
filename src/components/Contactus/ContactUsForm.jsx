import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check, AlertCircle } from "lucide-react";
import {Link} from "react-router-dom";
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

const validators = {
  name:        (v) => v.trim().length < 2 ? "Name is required" : "",
  email:       (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email",
  jobTitle:    (v) => v.trim().length < 2 ? "Job title is required" : "",
  phone:       (v) => /^[0-9]{6,15}$/.test(v) ? "" : "Enter a valid phone number",
  companyName: (v) => v.trim().length < 2 ? "Company name is required" : "",
  message:     (v) => v.trim().length < 10 ? "Min 10 characters" : "",
};

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
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 h-11 border border-gray-300 rounded-lg bg-white cursor-pointer text-sm text-gray-800 outline-none whitespace-nowrap hover:border-violet-400 transition-colors"
      >
        <span className="text-lg">{selected.flag}</span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="text-sm text-gray-700">{selected.code}</span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-56 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-gray-100">
            <Search size={12} className="text-gray-400" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
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
                <span className="text-base">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-violet-700 text-[11px] font-semibold">{c.code}</span>
                {c.code === value && <Check size={11} className="text-violet-700" />}
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

function Err({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
      <AlertCircle size={10} />
      {msg}
    </p>
  );
}

const SHEET_URL = import.meta.env.VITE_CONTACT_FORM_URL;

export default function ContactForm() {
  const [fd, setFd] = useState({
    name: "", email: "", jobTitle: "",
    countryCode: "+91", phone: "",
    companyName: "", message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (name, value) => name === "countryCode" ? "" : validators[name]?.(value) ?? "";

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

  const onSubmit = () => {
    const allT = Object.keys(validators).reduce((a, k) => ({ ...a, [k]: true }), {});
    const allE = Object.keys(validators).reduce((a, k) => ({ ...a, [k]: validate(k, fd[k] ?? "") }), {});
    setTouched(allT); setErrors(allE);
    if (Object.values(allE).some((e) => e !== "")) return;

    setLoading(true);
    fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name:         fd.name,
        email:        fd.email,
        role:     fd.jobTitle,
        phone:        `${fd.countryCode}${fd.phone}`,
        organization: fd.companyName,
        message:      fd.message,
      }).toString(),
    })
      .then((r) => r.text())
      .then(() => { setLoading(false); setSuccess(true); })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrors((p) => ({ ...p, _global: "Submission failed. Please try again." }));
      });
  };

  return (
    <div className=" flex  justify-center p-1 md:p-5 mb-20">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-[480px] px-8 py-7">
        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-300">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
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

            {errors._global && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 mb-4 text-xs text-red-600">
                <AlertCircle size={13} />
                {errors._global}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* Name */}
              <div>
                <FieldInput
                  name="name"
                  value={fd.name}
                  placeholder="Name*"
                  onChange={onChange}
                  onBlur={onBlur}
                  hasError={touched.name && !!errors.name}
                />
                <Err msg={touched.name && errors.name} />
              </div>

              {/* Work email */}
              <div>
                <FieldInput
                  name="email"
                  type="email"
                  value={fd.email}
                  placeholder="Work email*"
                  onChange={onChange}
                  onBlur={onBlur}
                  hasError={touched.email && !!errors.email}
                />
                <Err msg={touched.email && errors.email} />
              </div>

              {/* Job title */}
              <div>
                <FieldInput
                  name="jobTitle"
                  value={fd.jobTitle}
                  placeholder="Job title*"
                  onChange={onChange}
                  onBlur={onBlur}
                  hasError={touched.jobTitle && !!errors.jobTitle}
                />
                <Err msg={touched.jobTitle && errors.jobTitle} />
              </div>

              {/* Phone */}
              <div>
                <div className="flex gap-2">
                  <CountrySelector
                    value={fd.countryCode}
                    onChange={(code) => setFd((p) => ({ ...p, countryCode: code }))}
                  />
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone number*"
                    value={fd.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`flex-1 min-w-0 px-3.5 py-2.5 border rounded-lg text-sm text-gray-800 bg-white outline-none transition-all placeholder-gray-400
                      focus:border-violet-600 focus:ring-2 focus:ring-violet-100
                      ${touched.phone && errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"}`}
                  />
                </div>
                <Err msg={touched.phone && errors.phone} />
              </div>

              {/* Company name */}
              <div>
                <FieldInput
                  name="companyName"
                  value={fd.companyName}
                  placeholder="Company name*"
                  onChange={onChange}
                  onBlur={onBlur}
                  hasError={touched.companyName && !!errors.companyName}
                />
                <Err msg={touched.companyName && errors.companyName} />
              </div>

              {/* Message */}
              <div>
                <FieldTextarea
                  name="message"
                  rows={4}
                  placeholder="Tell us more about your team and what work you'd like to manage"
                  value={fd.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  hasError={touched.message && !!errors.message}
                />
                <Err msg={touched.message && errors.message} />
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={onSubmit}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}