
import React from 'react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onPrivacyPolicyClick: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline, onPrivacyPolicyClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-nord5/80 dark:bg-nord1/80 backdrop-blur-md p-4 sm:p-6 shadow-2xl animate-fadeInUp">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-nord1 dark:text-nord4 text-center sm:text-left">
          We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies. Read our{' '}
          <button onClick={onPrivacyPolicyClick} className="underline text-nord8 hover:text-nord9 font-semibold focus:outline-none">
            Privacy Policy
          </button>
          {' '}for more details.
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            onClick={onDecline}
            className="px-4 py-2 rounded-lg text-sm font-bold text-nord3 dark:text-nord4 hover:bg-nord4 dark:hover:bg-nord3 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-nord8 text-nord0 hover:bg-nord9 transition-colors shadow-md shadow-nord8/30"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
