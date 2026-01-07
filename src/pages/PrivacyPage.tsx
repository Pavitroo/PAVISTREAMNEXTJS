import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { ArrowLeft, Shield } from "lucide-react";
import AdsterraAd from "@/components/AdsterraAd";

const PrivacyPage = () => {
  const lastUpdated = "January 4, 2026";

  return (
    <>
      <Helmet>
        <title>Privacy Policy - PaviStream</title>
        <meta
          name="description"
          content="PaviStream Privacy Policy. Learn how we collect, use, and protect your personal information when you use our streaming platform."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/privacy" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground">Privacy Policy</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to PaviStream ("we," "our," or "us"). We are committed to protecting your privacy and 
                ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website at pavistream.vercel.app.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Information We Collect</h2>
              <h3 className="font-display text-xl font-medium text-foreground mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and approximate location</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mt-4">Information You Provide</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Contact information when you reach out to us</li>
                <li>Feedback and communications you send</li>
                <li>Search queries within our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">We use the collected information to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve and personalize your experience</li>
                <li>Analyze usage patterns and optimize our service</li>
                <li>Display relevant advertisements</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Detect and prevent fraud or security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Advertising</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use third-party advertising companies, including Adsterra, to serve ads when you visit our website. 
                These companies may use cookies and similar technologies to collect information about your visits to 
                this and other websites to provide relevant advertisements. We do not control these third-party cookies 
                and recommend reviewing the privacy policies of these advertisers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain 
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
                sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal 
                information. However, no method of transmission over the Internet or electronic storage is 100% 
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices or content of these external sites. We encourage you to review the privacy policies 
                of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain data processing activities</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2 mt-4">
                <li><strong className="text-foreground">Name:</strong> Pavitra Gupta</li>
                <li><strong className="text-foreground">Email:</strong> <a href="mailto:pavitaguptadelhi@gmail.com" className="text-primary hover:underline">pavitaguptadelhi@gmail.com</a></li>
                <li><strong className="text-foreground">Phone:</strong> <a href="tel:+918756753043" className="text-primary hover:underline">+91 8756753043</a></li>
                <li><strong className="text-foreground">Location:</strong> Delhi, India</li>
              </ul>
            </section>
          </div>

          <AdsterraAd />
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/privacy" className="text-primary font-medium">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPage;
