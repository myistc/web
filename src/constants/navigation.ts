export interface NavigationItem {
  name: string;
  href: string;
}

export const navigationLinks: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Facilities", href: "/facilities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Notices", href: "/notices" },
  { name: "Contact", href: "/contact" },
];
