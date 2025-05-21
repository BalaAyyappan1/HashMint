"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
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

// Import your actual data here
import { menuItems, menuItems2 } from './Contents';

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  // Scroll to category when clicked from sidebar
  const scrollToCategory = useCallback((categoryLabel: string) => {
    const element = categoryRefs.current[categoryLabel];
    if (element) {
      const yOffset = -20; // Offset to account for sticky headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categoryLabel);
    }
  }, []);

  // Toggle menu expansion and scroll to category
  const handleClick = useCallback((index: number, categoryLabel: string) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    scrollToCategory(categoryLabel);
  }, [scrollToCategory]);

  // Handle scroll events to manage sticky headers
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      // Loop through all category sections to determine which headers should be sticky
      const newStickyHeadersInfo: Record<string, boolean> = {};
      const newStickySubHeaders: Record<string, boolean> = {};
      
      // Check which category headers should be sticky
      Object.keys(categoryRefs.current).forEach(categoryLabel => {
        const element = categoryRefs.current[categoryLabel];
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const headerHeight = 70; // Approximate height of the header
        
        // Make header sticky when its top is at or above the viewport top,
        // and the bottom of its section is below the viewport top + header height
        const headerShouldBeSticky = rect.top <= 0 && rect.bottom > headerHeight;
        newStickyHeadersInfo[categoryLabel] = headerShouldBeSticky;
        
        // Set active category based on scroll position
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setActiveCategory(categoryLabel);
        }
      });
      
      // Check which subcategory headers should be sticky
      Object.keys(subcategoryRefs.current).forEach(subKey => {
        const element = subcategoryRefs.current[subKey];
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const headerHeight = 70; // Approximate height of the header
        const subHeaderHeight = 50; // Approximate height of the subheader
        const categoryLabel = subKey.split('||')[0];
        
        // Make subheader sticky when its parent category is sticky,
        // its top is at or below the category header height, 
        // and the bottom of its section is below the viewport top + both header heights
        const subHeaderShouldBeSticky = 
          newStickyHeadersInfo[categoryLabel] && 
          rect.top <= headerHeight &&
          rect.bottom > (headerHeight + subHeaderHeight);
        
        newStickySubHeaders[subKey] = subHeaderShouldBeSticky;
      });
      
      setStickyHeadersInfo(newStickyHeadersInfo);
      setStickySubHeaders(newStickySubHeaders);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Perform search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search through all data
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

    // Auto-expand search results
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
                      className={`ml-2 h-5 w-5 transition-transform duration-200 ${openAnswers[result.key] ? "rotate-90" : ""
                        }`}
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
            className={`flex items-center justify-between px-5 text-black py-4 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl
              ${stickyHeadersInfo[item.label] ? 'sticky top-0 z-30' : ''}`}
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
                className="border-t border-[#D9D0CC] relative"
              >
                <p 
                  className={`text-xl font-medium pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC]
                    ${stickySubHeaders[`${item.label}||${sub.label}`] ? 'sticky top-16 z-20' : ''}`}
                >
                  {sub.label}
                </p>
                {sub.qna?.map((qa, qIndex) => {
                  const key = `${item.label}-${sub.label}-${qIndex}`;
                  return (
                    <div key={key} className="flex flex-col border border-[#D9D0CC]">
                      <button
                        onClick={() => toggleAnswer(key)}
                        className="flex items-center justify-between py-8 w-full text-left px-8 text-lg md:text-xl font-medium bg-[#FAF5F2] cursor-pointer"
                      >
                        <span className='text-[#817F79]'>{qa.question}</span>
                        <IoMdArrowDropright
                          className={`ml-2 h-5 w-5 transition-transform duration-200 ${openAnswers[key] ? "rotate-90" : ""
                            }`}
                        />
                      </button>
                      {openAnswers[key] && (
                        <div className="px-6 py-4 bg-[#FAF5F2] text-sm md:text-lg text-[#817F79]">
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

          {/* Clear search button */}
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
              className="flex flex-col bg-[#FAF4F1] border border-[#D9D0CC] py-2 hidden sm:block md:block"
            >
              <button
                onClick={() => handleClick(index, item.label)}
                className={`w-full flex items-center justify-between px-4 py-2 text-xl font-medium cursor-pointer
                  ${activeCategory === item.label ? 'text-black bg-[#f6f0ec]' : 'text-black'}`}
              >
                <span className="truncate">{item.label}</span>
                <IoMdArrowDropright
                  className={`h-5 w-5 transition-transform duration-200 ${openIndex === index ? "rotate-90" : ""
                    }`}
                />
              </button>

              {openIndex === index && (
                <div className="flex flex-col bg-[#f6f0ec] rounded-md">
                  {item.submenu.map((sub, i) => (
                    <div key={i} className="px-4 py-2 cursor-pointer text-sm font-regular">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content container */}
        <div className="xl:w-3/4 lg:w-2/3 w-full z-90">
          <div
            ref={contentRef}
            className="overflow-y-auto"
          >
            {searchQuery.trim() !== "" ? renderSearchResults() : renderDefaultContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;