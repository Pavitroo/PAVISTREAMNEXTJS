import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, User, Send } from "lucide-react";
import AdsterraAd from "@/components/AdsterraAd";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - PaviStream Support</title>
        <meta
          name="description"
          content="Contact PaviStream for support, feedback, or business inquiries. Reach out to Pavitra Gupta via email or phone."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/contact" />
        
        {/* Schema.org Contact markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "PaviStream Contact",
            "description": "Contact page for PaviStream streaming platform",
            "url": "https://pavistream.vercel.app/contact"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-foreground">Contact Us</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Reach out for support, feedback, or business inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Contact Information</h2>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Name</h3>
                  <p className="text-muted-foreground">Pavitra Gupta</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:pavitaguptadelhi@gmail.com" className="text-primary hover:underline">
                    pavitaguptadelhi@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a href="tel:+918756753043" className="text-primary hover:underline">
                    +91 8756753043
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Delhi, India</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Send a Message</h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "mailto:pavitaguptadelhi@gmail.com";
              }}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
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
              <Link to="/contact" className="text-primary font-medium">Contact</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;
