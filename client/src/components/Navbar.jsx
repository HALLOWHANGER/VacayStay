/**
 * Navbar.jsx - Main Navigation Component
 * 
 * This component provides the top navigation bar for the application.
 * Features:
 * - Logo and branding
 * - Navigation links (Home, Hotels, Experience, About)
 * - User authentication state display
 * - Role-based buttons (Admin Panel, Dashboard, List Hotel)
 * - Responsive mobile menu
 * - Scroll-based styling
 * 
 * The navbar adapts based on:
 * - User authentication status (logged in or not)
 * - User role (admin, hotel owner, or regular user)
 * - Screen size (desktop vs mobile)
 * - Scroll position
 */

import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

/**
 * BookIcon Component
 * SVG icon used in user menu for bookings
 */
const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

/**
 * Navbar Component
 * Main navigation component for the entire application
 */
const Navbar = () => {
    // Navigation links configuration
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];

    // State management
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Get authentication and context functions
    const { openSignIn } = useClerk();
    const { user, setShowHotelReg, isOwner, navigate, isAdmin, isPending } = useAppContext();

    /**
     * Handle scroll effect for navbar styling
     * Changes navbar appearance based on scroll position and route
     */
    useEffect(() => {
        if (location.pathname !== "/") {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false);
        }

        setIsScrolled(prev => location.pathname !== "/" ? true : prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-[#1e3b96] shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "bg-[#1e3b96] py-4 md:py-6"}`}>
            {/* Logo */}
            <Link to="/">
                <img src={assets.logo} alt="logo" className={`h-9`} />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((navLink, index) => (
                    <NavLink key={index} to={navLink.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-white" : "text-white"}`} onClick={() => scrollTo(0, 0)}>
                        {navLink.name}
                        {/* Hover underline effect */}
                        <div className={`${isScrolled ? "bg-white" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} ></div>
                    </NavLink>
                ))}

                {/* Role-based Buttons - visible on desktop */}
                {user && (
                    <>
                        {(isAdmin !== null && isPending !== null && isOwner !== null) ? (
                            isAdmin ? (
                                // Admin Panel Button
                                <button
                                    className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                                        isScrolled ? "text-white" : "text-white"
                                    } transition-all`}
                                    onClick={() => navigate("/admin")}
                                >
                                    Admin Panel
                                </button>
                            ) : isPending ? (
                                // Pending Approval Status
                                <div
                                    className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                                        isScrolled ? "text-white" : "text-white"
                                    } transition-all`}
                                >
                                    Pending Approval
                                </div>
                            ) : (
                                // Hotel Owner Dashboard or List Hotel Button
                                <button
                                    className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                                        isScrolled ? "text-white" : "text-white"
                                    } transition-all`}
                                    onClick={() =>
                                        isOwner ? navigate("/owner") : setShowHotelReg(true)
                                    }
                                >
                                    {isOwner ? "Dashboard" : "List Your Hotel"}
                                </button>
                            )
                        ) : (
                            <div></div>
                        )}
                    </>
                )}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <UserButton >
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer">
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-3 md:hidden">
                <UserButton />
                <img
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={assets.menuIcon}
                    alt="menu"
                    className={`h-4`}
                />
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-[#1e3b96] text-white flex flex-col md:hidden items-center justify-center gap-6 font-medium transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Close Menu Button */}
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeMenu} alt="close-menu" className="h-6.5 invert" />
                </button>

                {/* Mobile Navigation Links */}
                {navLinks.map((navLink) => (
                    <NavLink
                        key={navLink.name}
                        to={navLink.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white text-lg"
                    >
                        {navLink.name}
                    </NavLink>
                ))}

                {/* Mobile Role-based Buttons */}
                {user && (
                    <>
                        {(isAdmin !== null && isPending !== null && isOwner !== null) ? (
                            isAdmin ? (
                                <button
                                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all"
                                    onClick={() => {
                                        navigate("/admin");
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Admin Panel
                                </button>
                            ) : isPending ? (
                                <div className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all">
                                    Pending Approval
                                </div>
                            ) : (
                                <button
                                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all"
                                    onClick={() => {
                                        isOwner ? navigate("/owner") : setShowHotelReg(true);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {isOwner ? "Dashboard" : "List Your Hotel"}
                                </button>
                            )
                        ) : null}

                        {/* My Bookings Link */}
                        <NavLink to="/my-bookings" onClick={() => setIsMenuOpen(false)}>
                            My Bookings
                        </NavLink>
                    </>
                )}

                {/* Mobile Login Button */}
                {!user && (
                    <button
                        onClick={() => { openSignIn(); setIsMenuOpen(false); }}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
