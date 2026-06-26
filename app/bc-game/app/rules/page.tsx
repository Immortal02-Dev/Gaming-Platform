"use client";

import React, { useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";

interface Rule {
  id: number;
  category: string;
  title: string;
  content: string;
}

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rules");
        const json = await response.json();
        if (json.success) {
          setRules(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch rules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  const categories = ["All", ...Array.from(new Set(rules.map((r) => r.category)))];

  const filteredRules = activeCategory === "All" 
    ? rules 
    : rules.filter((r) => r.category === activeCategory);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Platform Rules & Terms</h1>
          <p className="text-gray-400">Everything you need to know about playing on BC Game</p>
        </header>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white scale-105 shadow-lg"
                  : "bg-secondary text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-secondary/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary uppercase tracking-wider">
                      {rule.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{rule.title}</h2>
                  </div>
                  <div 
                    className="prose prose-invert max-w-none text-gray-300 rule-content"
                    dangerouslySetInnerHTML={{ __html: rule.content }}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12 bg-secondary/30 rounded-2xl border border-dashed border-gray-800">
                No rules found for this category.
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-primary { background-color: #3bc117; }
        .text-primary { color: #3bc117; }
        .border-primary { border-color: #3bc117; }
        .bg-secondary { background-color: #1e2024; }
        
        .rule-content :global(p) { margin-bottom: 1rem; line-height: 1.6; }
        .rule-content :global(ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rule-content :global(li) { margin-bottom: 0.5rem; }
      `}</style>
    </ClientLayout>
  );
}
