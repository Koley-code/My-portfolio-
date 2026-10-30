'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { siteConfig } from '../lib/siteConfig';
import { useInView } from '../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  Linkedin,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  whatsapp: <MessageCircle className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
};

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter',
  email: 'Email',
};

const socialDockItems = [
  {
    key: 'github',
    letter: 'C',
    label: 'GitHub',
    url: siteConfig.social.github,
    color: '#f1f5f9',
  },
  {
    key: 'linkedin',
    letter: 'O',
    label: 'LinkedIn',
    url: siteConfig.social.linkedin,
    color: '#0A66C2',
  },
  {
    key: 'whatsapp',
    letter: 'N',
    label: 'WhatsApp',
    url: siteConfig.social.whatsapp,
    color: '#25D366',
  },
  {
    key: 'instagram',
    letter: 'T',
    label: 'Instagram',
    url: siteConfig.social.instagram,
    color: '#E1306C',
  },
  {
    key: 'facebook',
    letter: 'A',
    label: 'Facebook',
    url: siteConfig.social.facebook,
    color: '#1877F2',
  },
  {
    key: 'twitter',
    letter: 'C',
    label: 'Twitter',
    url: siteConfig.social.twitter,
    color: '#1D9BF0',
  },
  {
    key: 'email',
    letter: 'T',
    label: 'Email',
    url: `mailto:${siteConfig.personal.email}`,
    color: '#38BDF8',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isInView: headerInView } = useInView(0.2);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.contact-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormState('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="connect" ref={sectionRef} className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Connect
          </h2>
          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-card glass rounded-2xl p-6">
              <h3 className="text-ink font-semibold text-lg mb-4">Address</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.personal.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all"
                >
                  <span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-light uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      {siteConfig.personal.phone}
                    </p>
                  </div>
                </a>
                <a
                  href={`mailto:${siteConfig.personal.email}`}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all"
                >
                  <span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-light uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      {siteConfig.personal.email}
                    </p>
                  </div>
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.personal.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all"
                >
                  <span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-light uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      {siteConfig.personal.location}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-card glass rounded-2xl p-6">
              <h3 className="text-ink font-semibold text-lg mb-4">Social</h3>

              <div className="social-dock-wrap">
                <div className="social-dock" aria-label="Social links">
                  {socialDockItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.url}
                      target={item.key === 'email' ? undefined : '_blank'}
                      rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={item.label}
                      className="social-dock-item"
                      style={
                        {
                          '--social-color': item.color,
                        } as CSSProperties
                      }
                    >
                      <span className="social-dock-tooltip">
                        {item.label}
                      </span>

                      <span className="social-dock-flip">
                        <span className="social-dock-face social-dock-front">
                          {item.letter}
                        </span>

                        <span className="social-dock-face social-dock-back">
                          {socialIcons[item.key as keyof typeof socialIcons]}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="contact-card glass rounded-2xl p-6 lg:p-8">
              <h3 className="text-ink font-semibold text-lg mb-6">Drop Me a Line</h3>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-10000px',
                    top: 'auto',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                  }}
                >
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-ink placeholder:text-ink-light outline-none transition-all focus:bg-white focus:shadow-lg ${errors.name ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-accent/50'
                        }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-ink placeholder:text-ink-light outline-none transition-all focus:bg-white focus:shadow-lg ${errors.email ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-accent/50'
                        }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-ink placeholder:text-ink-light outline-none transition-all focus:bg-white focus:shadow-lg ${errors.subject ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-accent/50'
                      }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-ink placeholder:text-ink-light outline-none transition-all focus:bg-white focus:shadow-lg resize-none ${errors.message ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-accent/50'
                      }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formState === 'loading' || formState === 'success'}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 ${formState === 'success'
                      ? 'bg-green-500 text-white'
                      : formState === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-ink text-white hover:bg-ink/90'
                      }`}
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : formState === 'success' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent!
                      </>
                    ) : formState === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Failed to Send
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
