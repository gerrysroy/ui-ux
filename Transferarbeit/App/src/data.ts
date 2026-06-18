import type { Customer } from "./types";

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Müller GmbH",
    email: "info@mueller.example",
    phone: "030 123456",
    company: "Müller",
    note: "VIP"
  },
  {
    id: 2,
    name: "Anna Schmidt",
    email: "a.schmidt@mail.example",
    phone: "0171 998877",
    company: "",
    note: ""
  },
  {
    id: 3,
    name: "TechNova",
    email: "kontakt@technova.example",
    phone: "",
    company: "TechNova AG",
    note: "Rechnung per Post"
  }
];
