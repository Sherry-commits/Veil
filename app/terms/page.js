import Link from 'next/link';
import '../legal.css';

export const metadata = {
  title: 'Terms of Service | Veil by Wonlv',
  description: 'Veil by Wonlv terms of service — terms and conditions for using our name-reading oracle service.',
};

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 2 + Math.random() * 3,
    delay: Math.random() * 3,
    brightness: 0.3 + Math.random() * 0.7,
  }));

  return (
    <div className="legal-stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="legal-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--b': s.brightness,
          }}
        />
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="legal-page">
      <Stars />
      <div className="legal-wrap">
        <header className="legal-header">
          <Link href="/" className="legal-back">← Back to Veil</Link>
        </header>

        <div className="legal-content">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: June 1, 2026</p>

          <p>Welcome to Veil by Wonlv. By accessing or using our website at veil.wonlv.com (the "Site") and our name-reading oracle service (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use our Service.</p>

          <h2>1. Description of Service</h2>
          <p>Veil by Wonlv provides an AI-powered name-reading oracle that generates personalized interpretations including name origin analysis, elemental personality insights, and destiny guidance. The Service includes a free reading option and a paid "Full Destiny" reading that incorporates birth date information.</p>
          <p>The readings provided are for entertainment and personal reflection purposes. They are AI-generated interpretations based on name etymology, elemental frameworks, and esoteric symbolism. They do not constitute professional advice of any kind.</p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 13 years of age to use our Service. If you are under the age of majority in your jurisdiction, you represent that you have obtained consent from a parent or legal guardian. The Service is not intended for users under the age of 13.</p>

          <h2>3. User Responsibilities</h2>
          <p>By using our Service, you agree to:</p>
          <ul>
            <li>Provide accurate information when using the Service</li>
            <li>Use the Service for lawful purposes only</li>
            <li>Not attempt to disrupt, overload, or compromise the Service</li>
            <li>Not reproduce, distribute, or exploit the Service for commercial purposes without our written consent</li>
            <li>Not use automated tools, bots, or scripts to access the Service</li>
          </ul>

          <h2>4. Payments and Refunds</h2>

          <h3>Paid Readings</h3>
          <p>The Full Destiny reading is priced at $9.90 (USD) as a one-time purchase. Prices are subject to change with notice. Payment is processed securely through our third-party payment processor, Creem.</p>

          <h3>Refund Policy</h3>
          <p>Due to the digital nature of our Service (AI-generated readings are delivered instantly upon payment), all purchases are final and non-refundable. If you experience a technical issue that prevents you from receiving your reading, please contact our support team at support@veil.wonlv.com, and we will work to resolve the issue.</p>

          <h2>5. Intellectual Property</h2>
          <p>All content on the Site, including but not limited to text, graphics, logos, brand design, and the Veil by Wonlv name and branding, is our intellectual property or used with permission. The AI-generated reading content delivered to you is for your personal use only. You may not reproduce, modify, or distribute it commercially without our permission.</p>

          <p>The Veil by Wonlv name, logo, and related trade dress are our trademarks. You may not use them without our prior written consent.</p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p>WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR THAT ALL READINGS WILL BE ACCURATE OR MEANINGFUL TO YOU.</p>
          <p>READINGS PROVIDED BY THE SERVICE ARE FOR ENTERTAINMENT PURPOSES ONLY. THEY ARE NOT A SUBSTITUTE FOR PROFESSIONAL ADVICE IN ANY FIELD, INCLUDING BUT NOT LIMITED TO MEDICAL, LEGAL, FINANCIAL, OR PSYCHOLOGICAL ADVICE.</p>

          <h2>7. Limitation of Liability</h2>
          <p>TO THE FULLEST EXTENT PERMITTED BY LAW, VEIL BY WONLV AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO EMOTIONAL DISTRESS, LOST OPPORTUNITIES, OR DECISIONS MADE BASED ON READING CONTENT.</p>
          <p>OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.</p>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify and hold harmless Veil by Wonlv and its operators from any claims, damages, liabilities, costs, or expenses arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>

          <h2>9. Privacy</h2>
          <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our <Link href="/privacy">Privacy Policy</Link> to understand our data practices.</p>

          <h2>10. Third-Party Services</h2>
          <p>Our Service integrates with third-party services including:</p>
          <ul>
            <li><strong>Anthropic</strong> — AI model for generating readings</li>
            <li><strong>Creem</strong> — Payment processing</li>
            <li><strong>Vercel</strong> — Website hosting</li>
          </ul>
          <p>We are not responsible for the practices or content of these third-party services. Your interactions with them are governed by their respective terms and policies.</p>

          <h2>11. Modifications to Service</h2>
          <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>

          <h2>12. Changes to These Terms</h2>
          <p>We may revise these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the new Terms. We will make reasonable efforts to notify users of material changes.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Site operator is based, without regard to conflict of law principles.</p>

          <h2>14. Contact Information</h2>
          <p>For questions, concerns, or support regarding these Terms or our Service, please contact us at:</p>
          <p><strong>Email:</strong> support@veil.wonlv.com</p>
        </div>
      </div>
    </div>
  );
}
