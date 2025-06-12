import React from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

/**
 * Privacy Policy Page
 * 
 * Displays the application's privacy policy with information about data collection,
 * usage, and user rights. Styled to match the mountain theme of the application.
 */
const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          {/* Last Updated */}
          <p className="text-slate-400 text-sm mb-8">Last Updated: June 12, 2025</p>
          
          {/* Content */}
          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Memoirs of Miles. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our application.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
              <p className="leading-relaxed mb-3">
                We collect several types of information from and about users of our application, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information such as name, email address, and profile pictures when you create an account</li>
                <li>Content you create, upload, or submit to our service, including travel stories, locations, and images</li>
                <li>Usage data including how you interact with our application</li>
                <li>Device information such as IP address, browser type, and operating system</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect the security and integrity of our application</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Sharing Your Information</h2>
              <p className="leading-relaxed">
                We do not sell or rent your personal information to third parties. We may share your information with trusted 
                service providers who assist us in operating our application and conducting our business, as long as those 
                parties agree to keep this information confidential.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of 
                transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially 
                acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Your Rights</h2>
              <p className="leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes to Our Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "Last Updated" date at the top of this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at: 
                <a href="mailto:privacy@memoirsofmiles.com" className="text-sky-400 hover:text-sky-300 ml-1">
                  privacy@memoirsofmiles.com
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

export default PrivacyPolicy