"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Exclusion {
  type: string;
  end_date: string;
  duration_days: number;
}

export default function ResponsibleSelfExclusion() {
  const { isLoggedIn, token } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [duration, setDuration] = useState("1");
  const [exclusionType, setExclusionType] = useState<"cooldown" | "exclusion">("cooldown");
  const [activeExclusion, setActiveExclusion] = useState<Exclusion | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    fetch(`${API_URL}/responsible/exclusion`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setActiveExclusion(d.data));
  }, [isLoggedIn, token]);

  const handleSubmit = async () => {
    if (!agreed) {
      setMessage({ type: "error", text: "Please agree to the terms first." });
      return;
    }
    if (!token) {
      setMessage({ type: "error", text: "You must be logged in." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/responsible/exclusion`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: exclusionType, duration_days: duration }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setActiveExclusion(null);
        // Refresh
        const r2 = await fetch(`${API_URL}/responsible/exclusion`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const d2 = await r2.json();
        setActiveExclusion(d2.data);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 xl:flex-row">
      <div className="rounded-xl bg-layer4 flex-1">
        <div className="help-center-box p-4">
          <h2 className="text-sm font-semibold text-primary">Self-Exclusion</h2>

          {activeExclusion && (
            <div className="mt-3 rounded-lg bg-brand/10 border border-brand/30 px-4 py-3">
              <p className="text-brand font-semibold text-sm">
                ✅ You have an active {activeExclusion.type} until{" "}
                {new Date(activeExclusion.end_date).toLocaleDateString()}.
              </p>
            </div>
          )}

          {message && (
            <div className={`mt-3 rounded-lg px-4 py-3 text-sm font-semibold ${message.type === "success" ? "bg-success/10 text-green-400 border border-green-500/30" : "bg-danger/10 text-red-400 border border-red-500/30"}`}>
              {message.text}
            </div>
          )}

          <div className="help-raw-html mt-3">
            <section>
              <p>
                Are you seeking a break from BC.GAME? Initiate the automated
                self-exclusion process by establishing a limit, and you will be
                temporarily barred from accessing your account for the selected
                period.
              </p>
            </section>
          </div>

          {/* Type selection */}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setExclusionType("cooldown")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-all ${exclusionType === "cooldown" ? "bg-brand text-alw_dark border-brand" : "bg-layer5 border-transparent text-secondary hover:border-brand/30"}`}
            >
              Cooldown
            </button>
            <button
              type="button"
              onClick={() => setExclusionType("exclusion")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-all ${exclusionType === "exclusion" ? "bg-brand text-alw_dark border-brand" : "bg-layer5 border-transparent text-secondary hover:border-brand/30"}`}
            >
              Self-Exclusion
            </button>
          </div>

          {/* Duration */}
          <div className="mt-3">
            <label className="text-xs text-secondary mb-1 block">Duration</label>
            <select
              className="w-full rounded-lg bg-layer5 border border-transparent text-primary px-3 py-2 text-sm outline-none"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="1">1 Day</option>
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="180">6 Months</option>
              <option value="365">1 Year</option>
            </select>
          </div>

          {/* Agreement */}
          <div className="mt-4 flex items-center gap-2">
            <button
              className={`size-5 rounded border flex-none flex center transition-all ${agreed ? "bg-brand border-brand" : "bg-layer5 border-white/20"}`}
              type="button"
              onClick={() => setAgreed(!agreed)}
            >
              {agreed && <i className="fa fa-check text-xs text-alw_dark" />}
            </button>
            <div className="text-sm text-secondary">
              By requesting self-exclusion, I acknowledge the{" "}
              <span className="text-brand cursor-pointer">rules of self-exclusion</span>{" "}
              and take full responsibility.
            </div>
          </div>

          <button
            className="button button-brand button-m mt-3 w-full text-sm font-semibold text-primary_brand disabled:opacity-50"
            disabled={!agreed || !isLoggedIn || loading || !!activeExclusion}
            type="button"
            onClick={handleSubmit}
          >
            {loading ? "Processing..." : !isLoggedIn ? "Login to continue" : activeExclusion ? "Active exclusion in place" : "Continue"}
          </button>
        </div>
      </div>

      <div className="center flex w-full flex-col rounded-lg bg-layer4 px-4 pb-6 xl:w-57.5 xl:flex-none">
        <img alt="users" className="mt-6 size-20" src="https://bc.game/substation/bc/static/support.png" />
        <div className="mt-4 text-base text-primary">Need Help?</div>
        <div className="mt-4 text-center text-secondary">Have questions or concerns regarding your account?</div>
        <div className="text-center text-secondary">Our experts are here to help!</div>
        <button className="button button-brand button-m mt-4 w-full" type="button">
          Chat with us
        </button>
      </div>
    </div>
  );
}

