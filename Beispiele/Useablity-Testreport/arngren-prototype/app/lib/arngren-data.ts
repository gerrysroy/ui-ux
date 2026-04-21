export type ArngrenProduct = {
  id: string;
  name: string;
  price: string;
  category: "vehicles" | "bikes" | "robots" | "gadgets";
  image: string;
  note: string;
};

export const navItems = [
  { href: "/", label: "Start" },
  { href: "/shop", label: "Shop" },
  { href: "/vehicles", label: "E-Fahrzeuge" },
  { href: "/gadgets", label: "Gadgets" },
  { href: "/contact", label: "Kontakt" },
];

export const products: ArngrenProduct[] = [
  {
    id: "atv-ce",
    name: "Elektrisk ATV",
    price: "ab kr. 3.998,-",
    category: "vehicles",
    image: "https://arngren.net/sitebuilder/images/ATV-CE.B1017620521-300x234.jpg",
    note: "Mehrere Leistungsstufen fur Kinder und Erwachsene.",
  },
  {
    id: "el-porsche",
    name: "Elektrisk Porsche",
    price: "fra kr. 399.890,-",
    category: "vehicles",
    image: "https://arngren.net/sitebuilder/images/EL-Porsche.speed_959_2-166x125.jpg",
    note: "Premiumfahrzeug aus dem Originalsortiment.",
  },
  {
    id: "willy-jeep",
    name: "Willy el-Jeep",
    price: "kr. 8.998,-",
    category: "vehicles",
    image: "https://arngren.net/sitebuilder/images/elbil-WILLY-435_1769773702-169x97.jpg",
    note: "2-Sitzer mit robusten Reifen.",
  },
  {
    id: "fatbike-1000",
    name: "El-Fatbike 1000W",
    price: "ab kr. 14.998,-",
    category: "bikes",
    image: "https://arngren.net/sitebuilder/images/elfatbike-rosa-84515_Fat_bike_1000w_48v_2018mod_n__med_Hydraulisk_1-165x92.jpg",
    note: "Sportliches Fatbike fur Alltag und Freizeit.",
  },
  {
    id: "trike-bike",
    name: "3-hjuls el-sykkel",
    price: "ab kr. 15.998,-",
    category: "bikes",
    image: "https://arngren.net/sitebuilder/images/elsykkel-3hjul-foran-9-134x114.jpg",
    note: "Stabile Dreirad-Variante fur mehr Komfort.",
  },
  {
    id: "cargo-bike",
    name: "El-Cargo Bike",
    price: "ab kr. 29.998,-",
    category: "bikes",
    image: "https://arngren.net/sitebuilder/images/elsykkel-cargo-43166_Taxi_Sykkel___Persontransport_5-100x86.jpg",
    note: "Praktische Transportlosung aus der Originalseite.",
  },
  {
    id: "r2d2",
    name: "Star Wars R2-D2",
    price: "kr. 1.998,-",
    category: "robots",
    image: "https://arngren.net/sitebuilder/images/r2d2-101x101.jpg",
    note: "Beliebtes Sammlerstuck im Robotik-Bereich.",
  },
  {
    id: "robot-arm",
    name: "Robot-Arm Bausatz",
    price: "kr. 498,-",
    category: "robots",
    image: "https://arngren.net/sitebuilder/images/ROBOT-ARM.thumb_3940_image1_robot_arm-162x154.jpg",
    note: "Steuerbar via RC oder PC.",
  },
  {
    id: "rc-tank",
    name: "RC Tank Torro",
    price: "ab kr. 2.998,-",
    category: "robots",
    image: "https://arngren.net/sitebuilder/images/rctank-torro-14097_14097_20170317113109469-163x164.jpg",
    note: "Metallfahrwerk, Reichweite bis 25 m.",
  },
  {
    id: "alkotester",
    name: "Alkotester",
    price: "kr. 139,-",
    category: "gadgets",
    image: "https://arngren.net/sitebuilder/images/Alkotester.LAV.Safe-Drive_2-93x75.jpg",
    note: "Kompaktes Gadget fur unterwegs.",
  },
  {
    id: "digital-compass",
    name: "Digital Kompass",
    price: "kr. 29,-",
    category: "gadgets",
    image: "https://arngren.net/sitebuilder/images/Digital-compas.CE350-PIP-51x65.jpg",
    note: "Kompass, Uhr und Temperatur in einem.",
  },
  {
    id: "digital-binoculars",
    name: "Digital-Kikkert",
    price: "kr. 1.598,-",
    category: "gadgets",
    image: "https://arngren.net/sitebuilder/images/Digital-Kikkert.stor.B1000414482-73x61.jpg",
    note: "Fernglas mit Kamera und LCD.",
  },
];
