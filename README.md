# Swarnendu Koley — Creative Developer Portfolio

A modern, interactive developer portfolio built with Next.js, React Three Fiber, Three.js, GSAP, and TypeScript. It showcases my projects, technical skills, certifications, development journey, and blog.

## Features

- Responsive portfolio design
- Interactive 3D background and visualizations
- Animated sections and transitions
- Project showcase with interactive cards
- Interactive certificate album
- Personal developer blog with individual article pages
- Contact form with Resend email integration
- Mobile-friendly navigation
- SEO metadata, sitemap, and robots configuration

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber and Drei
- GSAP and ScrollTrigger
- Resend
- Lucide React
- Highlight.js

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and navigate into the project folder.

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Environment Variables

The contact form uses Resend for email delivery.

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_sender_email
TO_EMAIL=your_receiving_email
```

Configure your verified sender address in Resend.

**Security:** Never commit `.env.local` or expose your API key publicly.

For deployment, configure these environment variables in your hosting provider.

## Project Structure

```text
portfolio1/
├── app/
│   ├── api/
│   │   └── contact/
│   ├── blog/
│   ├── components/
│   ├── hooks/
│   ├── sections/
│   ├── lib/
│   │   ├── siteConfig.ts
│   │   └── blogData.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── public/
│   ├── images/
│   ├── projects/
│   ├── certificates/
│   └── resume.pdf
├── package.json
└── README.md
```

## Updating Content

### Personal Information and Projects

Edit:

```text
app/lib/siteConfig.ts
```

This file contains personal information, social links, skills, projects, certificates, and timeline details.

### Blog Articles

Edit:

```text
app/lib/blogData.ts
```

Add or update blog articles, including their titles, descriptions, images, categories, and content.

## Adding Images and Assets

Place your files in the appropriate `public` folders:

- Profile image: `public/images/profile.webp`
- Project images: `public/projects/`
- Certificate images: `public/certificates/`
- Resume: `public/resume.pdf`

When referencing public assets in your application, use paths without the `/public` prefix.

For example:

```tsx
"/images/profile.webp"
"/projects/one.webp"
"/certificates/one.webp"
"/resume.pdf"
```

## Email Integration

The contact form sends messages through the Resend API using the Next.js API route:

```text
app/api/contact/route.ts
```

It includes input validation, HTML escaping, and a honeypot field for basic spam protection.

## Credits

- Custom cursor effect: [cursor-effects](https://github.com/tholman/cursor-effects)
- Cursor effect author: [Tim Holman](https://github.com/tholman)