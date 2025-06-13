import React from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

/**
 * Terms of Service Page
 * 
 * Displays the application's terms and conditions for usage.
 * Outlines user responsibilities, rights, and restrictions.
 * Styled to match the mountain theme of the application.
 */
const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-800 to-slate-900">
      {/* Navbar would typically be here, but will be added via your layout component */}
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          
          {/* Last Updated */}
          <p className="text-slate-400 text-sm mb-8">Last Updated: June 12, 2025</p>
          
          {/* Content */}
          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using Memoirs of Miles, you agree to be bound by these Terms of Service. If you disagree 
                with any part of the terms, you may not access the application.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">User Accounts</h2>
              <p className="leading-relaxed mb-3">
                When you create an account with us, you must provide accurate, complete, and updated information. You are 
                responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="leading-relaxed">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
                aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">User Content</h2>
              <p className="leading-relaxed mb-3">
                Our application allows you to post, link, store, share and otherwise make available certain information, text, 
                graphics, videos, or other material ("Content"). You are responsible for the Content that you post, including 
                its legality, reliability, and appropriateness.
              </p>
              <p className="leading-relaxed">
                By posting Content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and 
                distribute such Content on and through the application. You retain any and all of your rights to any Content 
                you submit and are responsible for protecting those rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Acceptable Use</h2>
              <p className="leading-relaxed mb-3">
                You agree not to use the application:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>For the purpose of exploiting, harming, or attempting to harm minors in any way</li>
                <li>To transmit any material that is defamatory, obscene, invasive of another's privacy, or offensive</li>
                <li>To impersonate or attempt to impersonate another user or person</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the application</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Intellectual Property</h2>
              <p className="leading-relaxed">
                The application and its original content (excluding Content provided by users), features, and functionality are 
                and will remain the exclusive property of Memoirs of Miles and its licensors. The application is protected by 
                copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks may not be 
                used in connection with any product or service without the prior written consent.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the 
                application will immediately cease.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall Memoirs of Miles, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
                inability to access or use the application.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms, please contact us at: 
                <a href="mailto:terms@memoirsofmiles.com" className="text-sky-400 hover:text-sky-300 ml-1">
                  terms@memoirsofmiles.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer will be added via your existing Footer component */}
    </div>
  )
}

export default TermsOfService