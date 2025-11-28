import React from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { IoArrowBack } from "react-icons/io5"

/**
 * Terms of Service Page
 * * Displays the application's terms and conditions for usage.
 * Outlines user responsibilities, rights, and restrictions.
 * Styled to match the mountain theme of the application.
 */
const TermsOfService = () => {
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
                    Terms of Service
                </h1>
                <p className="text-gray-400 text-sm">Last Updated: June 12, 2025</p>
            </div>
            
            {/* Content */}
            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Agreement to Terms
                </h2>
                <p>
                    By accessing or using Memoirs of Miles, you agree to be bound by these Terms of Service. If you disagree 
                    with any part of the terms, you may not access the application.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    User Accounts
                </h2>
                <p className="mb-4">
                    When you create an account with us, you must provide accurate, complete, and updated information. You are 
                    responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p>
                    You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
                    aware of any breach of security or unauthorized use of your account.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    User Content
                </h2>
                <p className="mb-4">
                    Our application allows you to post, link, store, share and otherwise make available certain information, text, 
                    graphics, videos, or other material ("Content"). You are responsible for the Content that you post, including 
                    its legality, reliability, and appropriateness.
                </p>
                <p>
                    By posting Content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and 
                    distribute such Content on and through the application. You retain any and all of your rights to any Content 
                    you submit and are responsible for protecting those rights.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Acceptable Use
                </h2>
                <p className="mb-4">
                    You agree not to use the application:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">
                    <li>In any way that violates any applicable national or international law or regulation</li>
                    <li>For the purpose of exploiting, harming, or attempting to harm minors in any way</li>
                    <li>To transmit any material that is defamatory, obscene, invasive of another's privacy, or offensive</li>
                    <li>To impersonate or attempt to impersonate another user or person</li>
                    <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the application</li>
                </ul>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Intellectual Property
                </h2>
                <p>
                    The application and its original content (excluding Content provided by users), features, and functionality are 
                    and will remain the exclusive property of Memoirs of Miles and its licensors. The application is protected by 
                    copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks may not be 
                    used in connection with any product or service without the prior written consent.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Termination
                </h2>
                <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                    whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the 
                    application will immediately cease.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Limitation of Liability
                </h2>
                <p>
                    In no event shall Memoirs of Miles, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                    be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
                    loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
                    inability to access or use the application.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Changes to Terms
                </h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                    material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                    a material change will be determined at our sole discretion.
                </p>
                </section>
                
                <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                    Contact Us
                </h2>
                <p>
                    If you have any questions about these Terms, please contact us at: 
                    <a href="mailto:terms@memoirsofmiles.com" className="text-indigo-400 hover:text-indigo-300 ml-2 font-medium underline decoration-indigo-500/30 hover:decoration-indigo-500 transition-all">
                    terms@memoirsofmiles.com
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

export default TermsOfService