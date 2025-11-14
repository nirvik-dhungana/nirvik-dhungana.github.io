
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div 
        className="bg-nord6 dark:bg-nord1 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }} // Ensure final state of animation is kept
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-nord3 dark:text-nord4 hover:text-nord8 dark:hover:text-nord7 transition-colors"
          aria-label="Close privacy policy"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 id="privacy-policy-title" className="text-2xl md:text-3xl font-bold text-nord1 dark:text-nord6 mb-4">Privacy Policy</h2>
        <div className="w-16 h-1 bg-nord13 mb-6 rounded-full"></div>
        
        <div className="text-nord2 dark:text-nord4 space-y-4 text-left">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h3 className="text-xl font-semibold text-nord1 dark:text-nord5 !mt-6">Introduction</h3>
          <p>
            This portfolio website ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
          
          <h3 className="text-xl font-semibold text-nord1 dark:text-nord5 !mt-6">Information We Collect</h3>
          <p>
            We may use tools like Google Analytics and Google Search Console to collect information about your visit. This data is aggregated and anonymized, and may include:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>Your browser type and operating system.</li>
            <li>The pages you visit on our site and the time spent on those pages.</li>
            <li>The referring website that led you to our portfolio.</li>
            <li>General geographic location (e.g., country or city).</li>
          </ul>
          <p>We do not collect any personal identifiable information (PII) such as your name, email address, or IP address directly through these analytics tools.</p>

          <h3 className="text-xl font-semibold text-nord1 dark:text-nord5 !mt-6">Use of Cookies</h3>
          <p>
            A cookie is a small file placed on your device. We use cookies provided by third-party services like Google Analytics to help us understand website traffic and webpage usage. This helps us analyze data about web page traffic and improve our website in order to tailor it to visitor needs. You can choose to accept or decline cookies.
          </p>

          <h3 className="text-xl font-semibold text-nord1 dark:text-nord5 !mt-6">Your Consent</h3>
          <p>
            By clicking "Accept" on the cookie consent banner, you consent to our use of cookies and the processing of data by analytics services as described in this policy. If you decline, non-essential cookies will not be used.
          </p>
          
          <h3 className="text-xl font-semibold text-nord1 dark:text-nord5 !mt-6">Contact</h3>
          <p>
            If you have any questions about this Privacy Policy, please feel free to get in touch through the contact methods provided on this site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
