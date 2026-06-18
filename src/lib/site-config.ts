export const siteConfig = {
  name: "Ajay Sahu Physics",
  tagline: "Physics that makes you score",
  url: "https://ajaysahuphysics.com",
  email: "ajaysirphysics01@gmail.com",
  phone: "+91 8081005662",
  whatsappNumber: "918081005662",
  instagram: "https://instagram.com/ajaysahu_36",
  instagramHandle: "@ajaysahu_36",
  linkedin: "https://linkedin.com/in/ajay-sahu-66962a1a4",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Formula Sheet", href: "/formula-sheet" },
  { label: "DPP", href: "/dpp" },
  { label: "PYQ", href: "/pyq" },
  { label: "Video Lectures", href: "/videos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const examNav: NavLink[] = [
  { label: "JEE", href: "/jee" },
  { label: "NEET", href: "/neet" },
];

export const classNav: NavLink[] = [
  { label: "Class 11", href: "/class-11" },
  { label: "Class 12", href: "/class-12" },
];

export const footerResourceLinks: NavLink[] = [
  { label: "Notes Hub", href: "/notes" },
  { label: "Formula Sheet", href: "/formula-sheet" },
  { label: "Daily Practice Problems", href: "/dpp" },
  { label: "Previous Year Questions", href: "/pyq" },
  { label: "Video Lectures", href: "/videos" },
];

export const footerExamLinks: NavLink[] = [
  { label: "JEE Main & Advanced", href: "/jee" },
  { label: "NEET", href: "/neet" },
  { label: "Class 11 Physics", href: "/class-11" },
  { label: "Class 12 Physics", href: "/class-12" },
];

export const footerSiteLinks: NavLink[] = [
  { label: "About Ajay Sir", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
