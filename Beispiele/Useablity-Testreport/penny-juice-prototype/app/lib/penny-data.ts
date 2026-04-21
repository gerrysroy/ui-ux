export type JuiceProduct = {
  name: string;
  slug: string;
  ingredients: string;
  image: string;
};

export const juiceProducts: JuiceProduct[] = [
  {
    name: "Green Glow",
    slug: "green-glow",
    ingredients: "Spinach, Kale, Green Apple, Cucumber, Lemon",
    image: "https://penny-juice.com/greenglowoptimized.png",
  },
  {
    name: "Kiwi Vitality",
    slug: "kiwi-vitality",
    ingredients: "Kiwi, Apple, Lime, Ginger",
    image: "https://penny-juice.com/kiwi-vitalityoptimized.png",
  },
  {
    name: "Zen Pear",
    slug: "zen-pear",
    ingredients: "Pear, Ginger, Lemon, Apple",
    image: "https://penny-juice.com/zenpearoptimized.png",
  },
  {
    name: "Golden Aura",
    slug: "golden-aura",
    ingredients: "Carrot, Orange, Turmeric, Pineapple",
    image: "https://penny-juice.com/golden-aura-optimized.png",
  },
  {
    name: "Pineapple Pulse",
    slug: "pineapple-pulse",
    ingredients: "Pineapple, Orange, Turmeric, Coconut Water",
    image: "https://penny-juice.com/pineapplepulseoptimized.png",
  },
];

export const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/learn", label: "Learn" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/store-finder", label: "Store Finder" },
  { href: "/contact", label: "Contact" },
];
