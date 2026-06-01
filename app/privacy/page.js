import Link from 'next/link';
import '../legal.css';

export const metadata = {
  title: 'Privacy Policy | Veil by Wonlv',
  description: 'Veil by Wonlv privacy policy — how we collect, use, and protect your personal information.',
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

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <Stars />
      <div className="legal-wrap">
        <header className="legal-header">
          <Link href="/" className="legal-back">← Back to Veil</Link>
        </header>

        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: June 1, 2026</p>

          <p>
            Veil by Wonlv ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at veil.wonlv.com (the "Site") and use our name-reading oracle service (the "Service").
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Personal Information You Provide</h3>
          <p>When you use our Service, we may collect:</p>
          <ul>
            <li><strong>Name</strong> — The name you enter for your reading</li>
            <li><strong>Birth date and birth hour</strong> — If you purchase the Full Destiny reading</li>
            <li><strong>Email address</strong> — If you contact our support team</li>
            <li><strong>Payment information</strong> — Processed securely through our payment processor (Creem). We do not store full payment card details on our servers.</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>When you visit our Site, we may automatically collect:</p>
          <ul>
            <li><strong>Usage data</strong> — Pages visited, time spent, referral source</li>
            <li><strong>Device information</strong> — Browser type, operating system, IP address</li>
            <li><strong>Analytics data</strong> — Collected via Vercel Analytics and similar tools to improve our Service</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To generate your personalized name reading and destiny report</li>
            <li>To process your payment and deliver your purchased reading</li>
            <li>To respond to your questions and support requests</li>
            <li>To improve and optimize our Service</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
          <ul>
            <li><strong>Service providers</strong> — We use third-party services including Anthropic (AI API provider), Creem (payment processing), and Vercel (hosting). These providers have access to only the information necessary to perform their functions.</li>
            <li><strong>Legal requirements</strong> — If required by law or to protect our legal rights.</li>
            <li><strong>Business transfers</strong> — In connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>We retain your personal information only as long as necessary to provide the Service and fulfill the purposes described in this policy. Name reading results are generated in real-time and are not stored permanently. Payment records are retained as required by tax and financial regulations.</p>

          <h2>5. Data Security</h2>
          <p>We implement reasonable security measures including encrypted connections (HTTPS), secure API authentication, and limited data storage. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access</strong> — Request a copy of the information we hold about you</li>
            <li><strong>Correction</strong> — Request that we correct inaccurate information</li>
            <li><strong>Deletion</strong> — Request that we delete your information</li>
            <li><strong>Objection</strong> — Object to certain processing of your information</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the information below.</p>

          <h2>7. Third-Party Services</h2>
          <p>Our Service relies on the following third-party providers:</p>
          <ul>
            <li><strong>Anthropic</strong> — AI model provider for generating name readings. Your name and birth data may be transmitted to Anthropic for processing. See Anthropic's privacy policy at anthropic.com/privacy.</li>
            <li><strong>Creem</strong> — Payment processing. See Creem's privacy policy at creem.io/privacy.</li>
            <li><strong>Vercel</strong> — Website hosting and analytics. See Vercel's privacy policy at vercel.com/privacy.</li>
            <li><strong>Google Fonts</strong> — Font rendering. See Google's privacy policy at policies.google.com/privacy.</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>Our Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete it.</p>

          <h2>9. International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your own, including the United States, where our service providers are located. We ensure appropriate safeguards are in place for such transfers.</p>

          <h2>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.</p>

          <h2>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
          <p><strong>Email:</strong> support@veil.wonlv.com</p>
        </div>
      </div>
    </div>
  );
}
