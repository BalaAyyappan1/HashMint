"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { menuItems, menuItems2 } from './Contents';

// Register GSAP plugins once outside component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openAnswers, setOpenAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Refs
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const contentEndMarkerRef = useRef(null);
  const contentContainerRef = useRef(null);
  const spacerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Update heights and refresh ScrollTrigger when content changes
  const updateHeights = useCallback(() => {
    if (!contentRef.current || !contentContainerRef.current || !spacerRef.current) return;
    
    // Calculate heights
    const contentHeight = contentRef.current.scrollHeight;
    const visibleHeight = contentRef.current.clientHeight;
    const scrollableHeight = contentHeight - visibleHeight;
    
    // Update container height
    contentContainerRef.current.style.height = `${contentHeight}px`;
    
    // Update spacer height
    spacerRef.current.style.height = `${scrollableHeight}px`;
    
    // Force ScrollTrigger to recalculate
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.refresh();
    } else {
      ScrollTrigger.refresh(true);
    }
  }, []);

  // Set up ScrollTrigger
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current || !contentEndMarkerRef.current) return;
    
    // Initial height update
    updateHeights();
    
    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${contentRef.current?.scrollHeight || 0}`,
      pin: true,
      pinSpacing: false,
      onUpdate: (self) => {
        if (!contentRef.current || !self.isActive) return;
        
        // Update scroll position based on progress
        const totalScrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        contentRef.current.scrollTop = totalScrollHeight * self.progress;
        
        // Update spacer height as we scroll
        if (spacerRef.current) {
          const remainingHeight = totalScrollHeight * (1 - self.progress);
          spacerRef.current.style.height = `${remainingHeight}px`;
        }
      },
      onLeaveBack: () => {
        // Reset scroll position when scrolling back up
        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }
        
        // Reset spacer height
        updateHeights();
      },
      markers: false
    });
    
    // Set up ResizeObserver for more efficient resize handling
    resizeObserverRef.current = new ResizeObserver(updateHeights);
    if (contentRef.current) {
      resizeObserverRef.current.observe(contentRef.current);
    }
    
    // Clean up
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateHeights]);

  // Handle content changes
  useEffect(() => {
    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(() => {
      updateHeights();
    });
    
    return () => cancelAnimationFrame(rafId);
  }, [openAnswers, openIndex, searchResults, updateHeights]);

  // Toggle answer visibility
  const toggleAnswer = useCallback((key) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Toggle menu expansion
  const handleClick = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  // Perform search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

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
      const newOpenAnswers = { ...openAnswers };
      results.forEach(result => {
        newOpenAnswers[result.key] = true;
      });
      setOpenAnswers(newOpenAnswers);
    }
  }, [searchQuery, openAnswers]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Search results view
  const renderSearchResults = () => (
    <div className="w-full max-w-4xl pb-16">
      <div className="flex flex-col border border-[#D9D0CC] mb-6 qna-group">
        <div className="flex items-center justify-between px-5 text-black font-medium py-3 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl">
          <span>Search Results</span>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="flex flex-col">
            {searchResults.map((result, index) => (
              <div key={`search-${index}`} className="border-t border-[#D9D0CC]">
                <p className="text-xl font-semibold pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC]">
                  {result.subLabel} <span className="text-sm font-normal">({result.categoryLabel})</span>
                </p>
                <div className="flex flex-col border border-[#D9D0CC]">
                  <button
                    onClick={() => toggleAnswer(result.key)}
                    className="flex items-center justify-between py-5 w-full text-left px-8 text-lg md:text-xl font-medium bg-[#FAF5F2] cursor-pointer"
                  >
                    <span>{result.question}</span>
                    <IoMdArrowDropright
                      className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                        openAnswers[result.key] ? "rotate-90" : ""
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
    <div className="w-full max-w-4xl pb-16">
      {menuItems2.map((item) => (
        <div
          key={item.label}
          className="flex flex-col border border-[#D9D0CC] mb-6 qna-group"
        >
          <div className="flex items-center justify-between px-5 text-black font-medium py-3 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl">
            <span>{item.label}</span>
          </div>

          <div className="flex flex-col">
            {item.submenu.map((sub) => (
              <div key={sub.label} className="border-t border-[#D9D0CC]">
                <p className="text-xl font-semibold pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC]">
                  {sub.label}
                </p>
                {sub.qna?.map((qa, qIndex) => {
                  const key = `${item.label}-${sub.label}-${qIndex}`;
                  return (
                    <div key={key} className="flex flex-col border border-[#D9D0CC]">
                      <button
                        onClick={() => toggleAnswer(key)}
                        className="flex items-center justify-between py-5 w-full text-left px-8 text-lg md:text-xl font-medium bg-[#FAF5F2] cursor-pointer"
                      >
                        <span>{qa.question}</span>
                        <IoMdArrowDropright
                          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                            openAnswers[key] ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {openAnswers[key] && (
                        <div className="px-6 py-4 bg-[#FAF5F2] text-sm md:text-base">
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
    <>
      <div 
        ref={sectionRef}
        className="relative h-screen flex xl:flex-row flex-col px-6 lg:px-12 xl:px-20 gap-8 xl:gap-16 pt-6 xl:pt-12 justify-between"
      >
        {/* Grid background */}
        <div className="absolute -z-10 inset-0 w-full bg-[#E8E1DC] [background-image:linear-gradient(to_right,#73737330_1px,transparent_1px),linear-gradient(to_bottom,#73737330_0px,transparent_0px)] [background-size:11px_11px]" />

        {/* Left sidebar */}
        <div className="xl:w-1/4 lg:w-1/3 w-full bg-white sticky top-0 self-start">
          <div className="w-full bg-white z-10">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full p-3 pl-10 pr-28 text-black bg-white border border-[#D9D0CC] rounded-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute top-1/2 right-0 h-full px-6 bg-[#DED6D0] text-black text-sm whitespace-nowrap border border-[#D9D0CC] -translate-y-1/2 hover:bg-[#D9D0CC] transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Clear search button */}
          {searchQuery.trim() !== "" && (
            <button
              onClick={() => setSearchQuery("")}
              className="w-full bg-[#DED6D0] text-black text-sm py-2 px-6 border border-[#D9D0CC] hover:bg-[#D9D0CC] transition-colors mb-2"
            >
              Clear Search
            </button>
          )}

          {/* Categories menu */}
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col bg-white border border-[#D9D0CC] py-2"
            >
              <button
                onClick={() => handleClick(index)}
                className="flex items-center justify-between px-2 text-black font-medium py-2 text-xl cursor-pointer"
              >
                <span>{item.label}</span>
                <IoMdArrowDropright
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="flex flex-col bg-[#f6f0ec] rounded-md">
                  {item.submenu.map((sub, i) => (
                    <div key={i} className="px-4 py-2 cursor-pointer text-sm">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content container */}
        <div 
          ref={contentContainerRef}
          className="xl:w-3/4 lg:w-2/3 w-full relative"
        >
          {/* FAQ content */}
          <div 
            ref={contentRef}
            className="h-[80vh] overflow-hidden"
          >
            {searchQuery.trim() !== "" ? renderSearchResults() : renderDefaultContent()}
          </div>
          
          {/* End marker */}
          <div 
            ref={contentEndMarkerRef} 
            className="content-end-marker absolute bottom-0"
          />
        </div>
      </div>
      
      {/* Spacer element */}
      <div 
        ref={spacerRef} 
        className="spacer-element transition-height duration-300 ease-linear" 
      />
    </>
  );
};

export default Faq;