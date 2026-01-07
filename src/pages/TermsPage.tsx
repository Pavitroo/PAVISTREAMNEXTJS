import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { ArrowLeft, FileText } from "lucide-react";
import AdsterraAd from "@/components/AdsterraAd";

const TermsPage = () => {
  const lastUpdated = "January 4, 2026";

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - PaviStream</title>
        <meta
          name="description"
          content="PaviStream Terms and Conditions. Read our terms of service for using the PaviStream streaming platform."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/terms" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground">Terms & Conditions</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PaviStream (pavistream.vercel.app), you agree to be bound by these 
                Terms and Conditions. If you disagree with any part of these terms, you may not access the website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                PaviStream is a free streaming platform that provides access to movies and TV shows. The service 
                is provided "as is" without warranties of any kind. We reserve the right to modify, suspend, or 
                discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">As a user of PaviStream, you agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not interfere with or disrupt the service</li>
                <li>Not use automated means to access the service without permission</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not share or distribute content from our platform without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on PaviStream, including but not limited to text, graphics, logos, icons, images, 
                and software, is the property of PaviStream or its content suppliers and is protected by 
                international copyright laws. The content is provided for personal, non-commercial use only.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                PaviStream acts as a platform for streaming content. We do not claim ownership of any third-party 
                content displayed on our platform. If you believe that any content infringes upon your intellectual 
                property rights, please contact us immediately with detailed information about the alleged infringement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Advertisements</h2>
              <p className="text-muted-foreground leading-relaxed">
                PaviStream displays advertisements from third-party advertising networks. By using our service, 
                you agree to view these advertisements. We are not responsible for the content, accuracy, or 
                opinions expressed in advertisements, and you access advertiser websites at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, PaviStream and its owner, Pavitra Gupta, shall not be 
                liable for any indirect, incidental, special, consequential, or punitive damages, including 
                but not limited to loss of profits, data, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your use or inability to use the service</li>
                <li>Any unauthorized access to your data</li>
                <li>Any interruption or cessation of the service</li>
                <li>Any bugs, viruses, or errors in the service</li>
                <li>Any content obtained through the service</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless PaviStream and Pavitra Gupta from any claims, 
                damages, obligations, losses, liabilities, costs, or debt arising from your use of the service 
                or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service may contain links to third-party websites or services that are not owned or controlled 
                by PaviStream. We have no control over and assume no responsibility for the content, privacy 
                policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to the service immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach these Terms. 
                Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of India, without 
                regard to its conflict of law provisions. Any disputes arising under these terms shall be 
                subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days' notice prior to any new terms taking effect. What 
                constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us:
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
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="text-primary font-medium">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TermsPage;
