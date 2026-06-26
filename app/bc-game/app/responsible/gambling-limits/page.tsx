"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Limits {
  daily_loss_limit: number | null;
  weekly_loss_limit: number | null;
  monthly_loss_limit: number | null;
  daily_deposit_limit: number | null;
}

export default function ResponsibleGamblingLimits() {
  const { isLoggedIn, token } = useAuth();
  const [limits, setLimits] = useState<Limits>({
    daily_loss_limit: null,
    weekly_loss_limit: null,
    monthly_loss_limit: null,
    daily_deposit_limit: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    fetch(`${API_URL}/responsible/limits`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setLimits(d.data);
      });
  }, [isLoggedIn, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/responsible/limits`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(limits),
      });
      const data = await res.json();
      setMessage({ type: res.ok ? "success" : "error", text: data.message });
    } catch {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const fields: { key: keyof Limits; label: string }[] = [
    { key: "daily_loss_limit", label: "Daily Loss Limit ($)" },
    { key: "weekly_loss_limit", label: "Weekly Loss Limit ($)" },
    { key: "monthly_loss_limit", label: "Monthly Loss Limit ($)" },
    { key: "daily_deposit_limit", label: "Daily Deposit Limit ($)" },
  ];

  return (
    <div className="flex flex-col items-start gap-4 xl:flex-row">
      <div className="rounded-xl bg-layer4 flex-1">
        <div className="p-4 text-secondary">
          <p className="mt-0 font-extrabold text-primary">Gambling Limits</p>
          <p className="mb-0 mt-4">
            Gain control over your play or betting by using loss or wagering limits. These limits allow you to control the maximum loss or wagered amount over a daily, weekly or monthly period.
          </p>
          <p className="mb-0 mt-3">
            Your limit will apply within 15 minutes and will reset when that time is reached.
          </p>

          {message && (
            <div className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"}`}>
              {message.text}
            </div>
          )}

          {!isLoggedIn ? (
            <div className="mt-4 rounded-lg bg-brand/10 border border-brand/30 px-4 py-3 text-sm text-brand">
              Please <a href="/login" className="font-bold underline">login</a> to set your gambling limits.
            </div>
          ) : (
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-secondary block mb-1">{label}</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="No limit"
                    className="w-full rounded-lg bg-layer5 border border-transparent focus:border-brand/50 text-primary px-3 py-2 text-sm outline-none transition-all"
                    value={limits[key] ?? ""}
                    onChange={(e) => setLimits((prev) => ({
                      ...prev,
                      [key]: e.target.value === "" ? null : Number(e.target.value),
                    }))}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="button button-brand button-m w-full mt-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Set Gambling Limits"}
              </button>
            </form>
          )}
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

