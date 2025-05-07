import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-1 pt-16 ${className}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageWrapper;