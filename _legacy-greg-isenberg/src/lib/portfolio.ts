/**
 * Portfolio data: real work pulled from Emily's existing site.
 *
 * Files live in /public/portfolio. Update this list when new work ships.
 * Each item has a category (matches site service slugs), a short title that
 * gets used as alt text and shown on the tile, and the file path.
 */

export type PortfolioCategory =
  | "sermon-series"
  | "social-media"
  | "announcements"
  | "youth-and-kids"
  | "logos"
  | "signage";

export type PortfolioItem = {
  category: PortfolioCategory;
  title: string;
  file: string;
};

export const portfolioCategories: { slug: PortfolioCategory; name: string }[] = [
  { slug: "sermon-series", name: "Sermon series" },
  { slug: "social-media", name: "Social media" },
  { slug: "announcements", name: "Announcements" },
  { slug: "logos", name: "Logos and branding" },
  { slug: "youth-and-kids", name: "Youth and kids" },
  { slug: "signage", name: "Signage and print" },
];

export const portfolioItems: PortfolioItem[] = [
  // Sermon series
  { category: "sermon-series", title: "Trees", file: "/portfolio/sermon-trees-11.jpg" },
  { category: "sermon-series", title: "This is Church", file: "/portfolio/sermon-this-is-church.webp" },
  { category: "sermon-series", title: "Malachi", file: "/portfolio/sermon-malachi.webp" },
  { category: "sermon-series", title: "Reset", file: "/portfolio/sermon-reset.webp" },
  { category: "sermon-series", title: "FAQ", file: "/portfolio/sermon-faq.webp" },
  { category: "sermon-series", title: "The Me I Want to Be", file: "/portfolio/sermon-me-i-want-to-be.webp" },
  { category: "sermon-series", title: "Drive-In Church", file: "/portfolio/sermon-drive-in-church.webp" },
  { category: "sermon-series", title: "Joy in Every Season", file: "/portfolio/sermon-joy-in-every-season.webp" },
  { category: "sermon-series", title: "Foster Care Christmas", file: "/portfolio/sermon-foster-care-christmas.webp" },
  { category: "sermon-series", title: "Matters of the Heart", file: "/portfolio/sermon-matters-of-the-heart.webp" },
  { category: "sermon-series", title: "Love Your Neighbor", file: "/portfolio/sermon-love-your-neighbor.webp" },
  { category: "sermon-series", title: "Series art", file: "/portfolio/sermon-series-shot-1.webp" },
  { category: "sermon-series", title: "Series art", file: "/portfolio/sermon-series-shot-2.webp" },
  { category: "sermon-series", title: "Series art", file: "/portfolio/sermon-series-shot-3.webp" },
  { category: "sermon-series", title: "Series art", file: "/portfolio/sermon-series-shot-4.webp" },
  { category: "sermon-series", title: "Series art", file: "/portfolio/sermon-series-asset.webp" },

  // Social media
  { category: "social-media", title: "Social post 1", file: "/portfolio/social-smp-1.webp" },
  { category: "social-media", title: "Social post 8", file: "/portfolio/social-smp-8.webp" },
  { category: "social-media", title: "Social post 9", file: "/portfolio/social-smp-9.webp" },
  { category: "social-media", title: "Social post 10", file: "/portfolio/social-smp-10.webp" },
  { category: "social-media", title: "Social post 18", file: "/portfolio/social-smp-18.webp" },
  { category: "social-media", title: "Social post 21", file: "/portfolio/social-smp-21.webp" },
  { category: "social-media", title: "Social post 23", file: "/portfolio/social-smp-23.webp" },
  { category: "social-media", title: "Social post 26", file: "/portfolio/social-smp-26.webp" },
  { category: "social-media", title: "Social post 28", file: "/portfolio/social-smp-28.webp" },
  { category: "social-media", title: "Social post 35", file: "/portfolio/social-smp-35.webp" },
  { category: "social-media", title: "Social post 40", file: "/portfolio/social-smp-40.webp" },
  { category: "social-media", title: "Strong Men Retreat", file: "/portfolio/social-strong-men.webp" },
  { category: "social-media", title: "Summer Sundays", file: "/portfolio/social-summer-sundays.webp" },
  { category: "social-media", title: "1 Peter 5:7", file: "/portfolio/social-1-peter.webp" },
  { category: "social-media", title: "Social graphic", file: "/portfolio/social-asset-1.webp" },
  { category: "social-media", title: "Social graphic", file: "/portfolio/social-asset-2.webp" },

  // Announcements
  { category: "announcements", title: "Follow the Leader", file: "/portfolio/announcements-follow-the-leader.webp" },
  { category: "announcements", title: "Welcome Dinner", file: "/portfolio/announcements-welcome-dinner.webp" },
  { category: "announcements", title: "August BBQ", file: "/portfolio/announcements-august-bbq.webp" },
  { category: "announcements", title: "Clothing Drive", file: "/portfolio/announcements-clothing-drive.webp" },
  { category: "announcements", title: "Men Made Strong", file: "/portfolio/announcements-men-made-strong.webp" },
  { category: "announcements", title: "Connection Sunday", file: "/portfolio/announcements-connection-sunday.webp" },
  { category: "announcements", title: "Baptism", file: "/portfolio/announcements-baptism.webp" },
  { category: "announcements", title: "Virtual Group", file: "/portfolio/announcements-virtual-group.webp" },
  { category: "announcements", title: "Spring Slides", file: "/portfolio/announcements-spring-slides.webp" },
  { category: "announcements", title: "21 Day Focus", file: "/portfolio/announcements-21-day-focus.webp" },
  { category: "announcements", title: "Food Pantry", file: "/portfolio/announcements-food-pantry.webp" },
  { category: "announcements", title: "Garage Sale", file: "/portfolio/announcements-garage.webp" },
  { category: "announcements", title: "Easter Services", file: "/portfolio/announcements-easter-services.webp" },
  { category: "announcements", title: "Announcement slide", file: "/portfolio/announcements-slide-shot.webp" },

  // Logos
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-1.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-2.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-3.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-4.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-5.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-6.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-7.webp" },
  { category: "logos", title: "Church logo", file: "/portfolio/logos-logo-8.webp" },

  // Youth and kids
  { category: "youth-and-kids", title: "Open Conversations", file: "/portfolio/youth-open-conversations.webp" },
  { category: "youth-and-kids", title: "Timothy and Transitions", file: "/portfolio/youth-timothy.webp" },
  { category: "youth-and-kids", title: "Youth campaign", file: "/portfolio/youth-shot-1.webp" },
  { category: "youth-and-kids", title: "Youth campaign", file: "/portfolio/youth-shot-2.webp" },
  { category: "youth-and-kids", title: "Youth campaign", file: "/portfolio/youth-shot-3.webp" },
  { category: "youth-and-kids", title: "Youth campaign", file: "/portfolio/youth-shot-4.webp" },
  { category: "youth-and-kids", title: "Youth campaign", file: "/portfolio/youth-shot-5.webp" },

  // Signage
  { category: "signage", title: "Holiday Food Offering", file: "/portfolio/signage-holiday-food.webp" },
  { category: "signage", title: "Service Announcement", file: "/portfolio/signage-service-announcement.webp" },
  { category: "signage", title: "Guest Reception", file: "/portfolio/signage-guest-reception.webp" },
  { category: "signage", title: "Lobby signage", file: "/portfolio/signage-shot-1.webp" },
  { category: "signage", title: "Lobby signage", file: "/portfolio/signage-shot-2.webp" },
  { category: "signage", title: "Lobby signage", file: "/portfolio/signage-shot-3.webp" },
  { category: "signage", title: "Lobby signage", file: "/portfolio/signage-shot-4.webp" },
  { category: "signage", title: "Lobby signage", file: "/portfolio/signage-shot-5.webp" },
];

export function getPortfolioByCategory(category: PortfolioCategory): PortfolioItem[] {
  return portfolioItems.filter((p) => p.category === category);
}
