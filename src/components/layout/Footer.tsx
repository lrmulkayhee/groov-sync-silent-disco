import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-border mt-auto">
            <div className="container flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-6 gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6">
                        <div className="absolute inset-0 bg-groove-purple rounded-full opacity-75"></div>
                        <div className="absolute inset-1 bg-groove-blue rounded-full rotate-45 opacity-75"></div>
                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                            <div className="h-1 w-1 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <span className="text-sm font-medium">
                        GroovSync Silent Disco
                    </span>
                </div>

                <nav className="flex gap-4 text-xs text-muted-foreground">
                    <Link to="/about" className="hover:text-foreground transition">
                        About
                    </Link>
                    <Link to="/terms" className="hover:text-foreground transition">
                        Terms
                    </Link>
                    <Link to="/privacy" className="hover:text-foreground transition">
                        Privacy
                    </Link>
                    <Link to="/contact" className="hover:text-foreground transition">
                        Contact
                    </Link>
                </nav>

                <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} GroovSync
                </div>
            </div>
        </footer>
    );
};

export default Footer;