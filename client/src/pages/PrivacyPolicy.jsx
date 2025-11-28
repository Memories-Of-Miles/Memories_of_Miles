import React from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { IoArrowBack } from "react-icons/io5"

/**
 * Privacy Policy Page
 * * Displays the application's privacy policy with information about data collection,
 * usage, and user rights. Styled to match the mountain theme of the application.
 */
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-display overflow-x-hidden flex flex-col">
      
      {/* --- Simple Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight group-hover:text-indigo-200 transition-colors">
              <span className="text-white">Memoirs</span>
              <span className="text-gray-400 mx-1">of</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                Miles
              </span>
            </h1>
          </Link>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-grow pt-28 pb-12 px-4 relative">
        {/* Background Decor */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 animate-fade-in-scale">
          {/* Back to Home Link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mb-8 transition-colors group"
          >
            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-gray-800 bg-gray-900/40 backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="border-b border-gray-800 pb-8 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Privacy Policy
                </h1>
                <p className="text-gray-400 text-sm">Last Updated: June 12, 2025</p>
            </div>
            
            {/* Content */}
            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Introduction
                </h2>
                <p>
                    Welcome to Memoirs of Miles. We respect your privacy and are committed to protecting your personal data. 
                    This privacy policy explains how we collect, use, and safeguard your information when you use our application.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Information We Collect
                </h2>
                <p className="mb-4">
                    We collect several types of information from and about users of our application, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">
                    <li>Personal information such as name, email address, and profile pictures when you create an account</li>
                    <li>Content you create, upload, or submit to our service, including travel stories, locations, and images</li>
                    <li>Usage data including how you interact with our application</li>
                    <li>Device information such as IP address, browser type, and operating system</li>
                </ul>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    How We Use Your Information
                </h2>
                <p className="mb-4">
                    We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-pink-500">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and complete transactions</li>
                    <li>Send you technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Protect the security and integrity of our application</li>
                </ul>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Sharing Your Information
                </h2>
                <p>
                    We do not sell or rent your personal information to third parties. We may share your information with trusted 
                    service providers who assist us in operating our application and conducting our business, as long as those 
                    parties agree to keep this information confidential.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Data Security
                </h2>
                <p>
                    We implement appropriate security measures to protect your personal information. However, no method of 
                    transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially 
                    acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Your Rights
                </h2>
                <p className="mb-4">
                    You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Request restriction of processing your personal information</li>
                    <li>Request transfer of your personal information</li>
                </ul>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Changes to Our Privacy Policy
                </h2>
                <p>
                    We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
                    privacy policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Contact Us
                </h2>
                <p>
                    If you have any questions about this privacy policy or our data practices, please contact us at: 
                    <a href="mailto:privacy@memoirsofmiles.com" className="text-indigo-400 hover:text-indigo-300 ml-2 font-medium underline decoration-indigo-500/30 hover:decoration-indigo-500 transition-all">
                    privacy@memoirsofmiles.com
                    </a>
                </p>
                </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default PrivacyPolicy