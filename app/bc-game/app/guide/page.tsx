"use client";

import React, { useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";

interface Guide {
  id: number;
  category: string;
  title: string;
  content: string;
}

export default function GuidePage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/guides");
        const json = await response.json();
        if (json.success) {
          setGuides(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch guides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const categories = ["All", ...Array.from(new Set(guides.map((g) => g.category)))];

  const filteredGuides = activeCategory === "All" 
    ? guides 
    : guides.filter((g) => g.category === activeCategory);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Guides</h1>
          <p className="text-gray-400">Master your game with our comprehensive guides</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-secondary/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 group"
                >
                  <div className="flex flex-col h-full">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-widest w-fit mb-3">
                      {guide.category}
                    </span>
                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <div 
                      className="text-gray-400 text-sm line-clamp-3 mb-6"
                      dangerouslySetInnerHTML={{ __html: guide.content.replace(/<[^>]*>/g, "") }}
                    />
                    <button 
                      className="mt-auto text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      onClick={() => alert("Detailed view coming soon!")}
                    >
                      Read More <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 bg-secondary/30 rounded-2xl border border-dashed border-gray-800">
                No guides found for this category.
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
      `}</style>
    </ClientLayout>
  );
}
