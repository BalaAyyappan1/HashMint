"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

// Define TypeScript interfaces
interface QnA {
  question: string;
  answer: string;
}

interface Subcategory {
  label: string;
  qna?: QnA[];
}

interface Category {
  label: string;
  submenu: Subcategory[];
}

interface MenuItem {
  label: string;
  submenu: string[];
}

interface SearchResult {
  categoryLabel: string;
  subLabel: string;
  question: string;
  answer: string;
  key: string;
}

import { menuItems, menuItems2 } from './Contents';
import Link from 'next/link';

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [stickyHeadersInfo, setStickyHeadersInfo] = useState<Record<string, boolean>>({});
  const [stickySubHeaders, setStickySubHeaders] = useState<Record<string, boolean>>({});

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement>>({});
  const subcategoryRefs = useRef<Record<string, HTMLDivElement>>({});

  // Toggle answer visibility
  const toggleAnswer = useCallback((key: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Scroll to category or subcategory
  const scrollToSection = useCallback((categoryLabel: string, subLabel?: string) => {
    const key = subLabel ? `${categoryLabel}||${subLabel}` : categoryLabel;
    const element = subLabel ? subcategoryRefs.current[key] : categoryRefs.current[categoryLabel];
    if (element) {
      const headerHeight = 70; // Height of category header
      const subHeaderHeight = 50; // Height of subcategory header
      const yOffset = subLabel ? -(headerHeight + 10) : -20; // Adjust offset for subcategory
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categoryLabel);
      if (subLabel) {
        setActiveSubcategory(key);
      } else {
        setActiveSubcategory(null);
      }
    }
  }, []);

  // Toggle menu expansion and scroll
  const handleCategoryClick = useCallback((index: number, categoryLabel: string) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    scrollToSection(categoryLabel);
  }, [scrollToSection]);

  // Handle subcategory click
  const handleSubcategoryClick = useCallback((categoryLabel: string, subLabel: string, index: number) => {
    scrollToSection(categoryLabel, subLabel);
    setOpenIndex(index); // Keep the category expanded
  }, [scrollToSection]);

  // Handle scroll events for sticky headers and parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const newStickyHeadersInfo: Record<string, boolean> = {};
      const newStickySubHeaders: Record<string, boolean> = {};
      let activeCat: string | null = null;
      let activeSub: string | null = null;

      // Check category headers
      Object.keys(categoryRefs.current).forEach(categoryLabel => {
        const element = categoryRefs.current[categoryLabel];
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const headerHeight = 70;
        const isSticky = rect.top <= 0 && rect.bottom > headerHeight;
        newStickyHeadersInfo[categoryLabel] = isSticky;

        // Set active category
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          activeCat = categoryLabel;
        }
      });

      // Check subcategory headers
      Object.keys(subcategoryRefs.current).forEach(subKey => {
        const element = subcategoryRefs.current[subKey];
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const headerHeight = 70;
        const subHeaderHeight = 50;
        const categoryLabel = subKey.split('||')[0];

        const subHeaderShouldBeSticky =
          newStickyHeadersInfo[categoryLabel] &&
          rect.top <= headerHeight &&
          rect.bottom > (headerHeight + subHeaderHeight);

        newStickySubHeaders[subKey] = subHeaderShouldBeSticky;

        // Set active subcategory
        if (rect.top <= (headerHeight + subHeaderHeight) && rect.bottom >= (headerHeight + subHeaderHeight)) {
          activeSub = subKey;
        }
      });

      setStickyHeadersInfo(newStickyHeadersInfo);
      setStickySubHeaders(newStickySubHeaders);
      setActiveCategory(activeCat);
      setActiveSubcategory(activeSub);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Perform search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setActiveSubcategory(null);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    menuItems2.forEach((category) => {
      category.submenu.forEach((subcategory) => {
        subcategory.qna?.forEach((qa, qIndex) => {
          const key = `${category.label}-${subcategory.label}-${qIndex}`;
          if (
            qa.question.toLowerCase().includes(query) ||
            qa.answer.toLowerCase().includes(query) ||
            subcategory.label.toLowerCase().includes(query) ||
            category.label.toLowerCase().includes(query)
          ) {
            results.push({
              categoryLabel: category.label,
              subLabel: subcategory.label,
              question: qa.question,
              answer: qa.answer,
              key
            });
          }
        });
      });
    });

    setSearchResults(results);

    if (results.length > 0) {
      const newOpenAnswers: Record<string, boolean> = { ...openAnswers };
      results.forEach(result => {
        newOpenAnswers[result.key] = true;
      });
      setOpenAnswers(newOpenAnswers);
    }
  }, [searchQuery, openAnswers]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Search results view
  const renderSearchResults = () => (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col border border-[#D9D0CC] mb-6 qna-group">
        <div className="flex items-center justify-between px-5 text-black font-medium py-3 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl sticky top-0 z-30">
          <span>Search Results</span>
        </div>
        {searchResults.length > 0 ? (
          <div className="flex flex-col">
            {searchResults.map((result, index) => (
              <div key={`search-${index}`} className="border-t border-[#D9D0CC]">
                <p className="text-xl font-semibold pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC] sticky top-16 z-20">
                  {result.subLabel} <span className="text-sm font-normal">({result.categoryLabel})</span>
                </p>
                <div className="flex flex-col border border-[#D9D0CC]">
                  <button
                    onClick={() => toggleAnswer(result.key)}
                    className="flex items-center justify-between py-5 w-full text-left px-8 text-lg md:text-xl font-medium bg-[#FAF5F2] cursor-pointer"
                  >
                    <span>{result.question}</span>
                    <IoMdArrowDropright
                      className={`ml-2 h-5 w-5 transition-transform duration-200 ${openAnswers[result.key] ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openAnswers[result.key] && (
                    <div className="px-6 py-4 bg-[#FAF5F2] text-sm md:text-base">
                      {result.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-xl">No results found for "{searchQuery}"</p>
            <p className="mt-2 text-gray-600">Try a different search term or browse the categories</p>
          </div>
        )}
      </div>
    </div>
  );

  // Default content view
  const renderDefaultContent = () => (
    <div className="w-full max-w-3xl ml-10 z-90">
      {menuItems2.map((item) => (
        <div
          key={item.label}
          ref={el => {
            if (el) categoryRefs.current[item.label] = el;
          }}
          className="flex flex-col border border-[#D9D0CC] mb-6 qna-group relative"
          id={`category-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div
            className={`flex items-center tracking-tighter leading-tight font-horizona justify-between px-5 text-black py-4 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl transition-all duration-300 ${
              stickyHeadersInfo[item.label] ? 'sticky top-0 z-30 shadow-md' : ''
            }`}
          >
            <span>{item.label}</span>
          </div>
          <div className="flex flex-col">
            {item.submenu.map((sub) => (
              <div
                key={sub.label}
                ref={el => {
                  if (el) subcategoryRefs.current[`${item.label}||${sub.label}`] = el;
                }}
                id={`${sub.label.replace(/\s+/g, '-').toLowerCase()}`}
                className="border-t border-[#D9D0CC] relative"
              >
                <p
                  className={`text-xl tracking-tighter leading-tight font-horizona pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC] transition-all duration-300 ${
                    stickySubHeaders[`${item.label}||${sub.label}`] ? 'sticky top-16 z-20 shadow-sm' : ''
                  }`}
                >
                  {sub.label}
                </p>
                {sub.qna?.map((qa, qIndex) => {
                  const key = `${item.label}-${sub.label}-${qIndex}`;
                  return (
                    <div key={key} className="flex flex-col border border-[#D9D0CC]">
                      <button
                        onClick={() => toggleAnswer(key)}
                        className="flex items-center justify-between py-8 w-full text-left px-8 text-lg md:text-xl tracking-tighter leading-tight bg-[#FAF5F2] cursor-pointer"
                      >
                        <span className="text-[#817F79]">{qa.question}</span>
                        <IoMdArrowDropright
                          className={`ml-2 h-5 w-5 transition-transform duration-200 ${openAnswers[key] ? "rotate-90" : ""}`}
                        />
                      </button>
                      {openAnswers[key] && (
                        <div className="px-6 py-4 bg-[#FAF5F2] text-sm tracking-tighter leading-tight md:text-lg text-[#817F79]">
                          {qa.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={scrollContainerRef} className="relative min-h-screen bg-[#E8E1DC] pb-30 pt-20 pl-17">
      {/* Grid background */}
      <div className="absolute inset-0 z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(to right, #73737330 1px, transparent 1px)',
            backgroundSize: '11px 100%',
          }}
        ></div>
      </div>

      <div className="flex xl:flex-row flex-col px-6 lg:px-12 xl:px-20 gap-8 xl:gap-16 pt-6 xl:pt-12 justify-between">
        {/* Left sidebar */}
        <div className="xl:w-1/4 lg:w-1/3 w-full bg-white sticky top-0 self-start z-90">
          <div className="w-full bg-[#FAF4F1] z-10">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full p-3 pl-10 pr-28 text-black bg-[#FAF4F1] border border-[#D9D0CC] rounded-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1/2 right-0 h-full px-6 bg-[#DED6D0] text-black text-sm whitespace-nowrap border border-[#D9D0CC] -translate-y-1/2 hover:bg-[#D9D0CC] transition-colors font-regular"
              >
                Search
              </button>
            </form>
          </div>

          {searchQuery.trim() !== "" && (
            <button
              onClick={() => setSearchQuery("")}
              className="w-full bg-[#FAF4F1] text-black text-sm py-2 px-6 border border-[#D9D0CC] hover:bg-[#D9D0CC] transition-colors mb-2"
            >
              Clear Search
            </button>
          )}

          {/* Categories menu */}
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col bg-[#FAF4F1] border border-[#D9D0CC] py-2"
            >
              <button
                onClick={() => handleCategoryClick(index, item.label)}
                className={`w-full flex items-center justify-between px-4 py-2 text-xl font-medium cursor-pointer transition-colors ${
                  activeCategory === item.label ? 'text-black bg-[#f6f0ec]' : 'text-black'
                }`}
              >
                <span className="truncate tracking-tighter leading-tight font-horizona">{item.label}</span>
                <IoMdArrowDropright
                  className={`h-5 w-5 transition-transform duration-200 ${openIndex === index ? "rotate-90" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="flex flex-col bg-[#f6f0ec] rounded-md">
                  {item.submenu.map((sub, i) => (
                    <Link
                      key={i}
                      href={`#${sub.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleSubcategoryClick(item.label, sub, index)}
                      className={`px-4 py-2 text-sm font-regular cursor-pointer text-left transition-colors ${
                        activeSubcategory === `${item.label}||${sub}` ? 'text-black bg-[#EFE6E1]' : 'text-gray-700 hover:bg-[#EFE6E1]'
                      }`}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content container */}
        <div className="xl:w-3/4 lg:w-2/3 w-full z-90">
          <div ref={contentRef} className="overflow-y-auto">
            {searchQuery.trim() !== "" ? renderSearchResults() : renderDefaultContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;