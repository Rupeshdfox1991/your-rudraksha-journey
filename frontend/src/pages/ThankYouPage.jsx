import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

// reuse same constants
const WHATSAPP = "919820302028";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const name = localStorage.getItem("rudra_name") || "Guest";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* LEFT PANEL (reuse same component) */}
      <TrustPanel navigate={navigate} />

      {/* RIGHT SUCCESS PANEL */}
      <div className="flex-1 bg-[#F8F4EC] flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md text-center">
          
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" />
          </div>

          <p className="font-serif text-3xl font-light text-[#800000] mb-1">
            Namaste
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#2C1E16] mb-2">
            {name}
          </h2>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-[#C9A227]/30" />
            <span className="text-[#C9A227] font-serif">ॐ</span>
            <div className="h-px flex-1 bg-[#C9A227]/30" />
          </div>

          <p className="text-[#5C4A42] text-sm mb-7">
            Your details have been received. One of our experts will contact you within{" "}
            <strong className="text-[#800000]">24 hours</strong>.
          </p>

          <div className="bg-white rounded-2xl border p-5 mb-7 text-left">
            <p className="text-[#800000] text-xs uppercase mb-3">
              What happens next
            </p>

            {[
              "Our expert reviews your details",
              "We identify the best Rudraksha",
              "You receive your recommendation",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Check size={13} className="text-[#C9A227]" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] text-white py-3 rounded-full text-center"
            >
              Chat on WhatsApp
            </a>

            <button
              onClick={() => navigate("/")}
              className="flex-1 border border-[#C9A227] py-3 rounded-full"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
