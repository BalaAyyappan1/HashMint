"use client";
import React, { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";

const Faq2 = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [openMainIndex, setOpenMainIndex] = useState<number | null>(null);
    const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

    const handleMainClick = (index: number) => {
        setOpenMainIndex(prev => (prev === index ? null : index));
        setOpenQuestions({}); // Reset all question toggles when main category changes
    };

    const handleQuestionToggle = (key: string) => {
        setOpenQuestions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };


    const handleClick = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const menuItems = [
        { label: 'Order', submenu: ['Payments', 'Policies', 'Shipping'] },
        { label: 'Device', submenu: ['Customer Support', 'Repairs'] },
        { label: 'Software', submenu: ['Downloads', 'Licensing'] },
        { label: 'Company', submenu: ['About Us', 'Investors'] },
        { label: 'Health', submenu: ['Wellness', 'Fitness'] },
        { label: 'Work With Us', submenu: ['Careers', 'Internships'] },
    ];


    return (
        <div>

          


            

        </div>
    )
}

export default Faq2
