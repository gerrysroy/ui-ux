import type { Customer, CustomerFormData } from '../models/Customer';

/** Simulated network delay for save operations (intentionally no loading UI). */
const SAVE_DELAY_MS = 2000;

const initialCustomers: Customer[] = [
  { id: '1', customerNumber: 'K-10001', firstName: 'Anna', lastName: 'Müller', company: 'Alpine Solutions GmbH', email: 'anna.mueller@alpine-solutions.de', phone: '+49 89 1234567', city: 'München', country: 'Germany', status: 'Active' },
  { id: '2', customerNumber: 'K-10002', firstName: 'Thomas', lastName: 'Weber', company: 'RheinTech AG', email: 't.weber@rheintech.ch', phone: '+41 44 9876543', city: 'Zürich', country: 'Switzerland', status: 'Active' },
  { id: '3', customerNumber: 'K-10003', firstName: 'Sophie', lastName: 'Bernard', company: 'Lumière SARL', email: 'sophie.bernard@lumiere.fr', phone: '+33 1 45678901', city: 'Paris', country: 'France', status: 'Inactive' },
  { id: '4', customerNumber: 'K-10004', firstName: 'Marco', lastName: 'Rossi', company: 'Bella Vista SpA', email: 'marco.rossi@bellavista.it', phone: '+39 02 3456789', city: 'Milano', country: 'Italy', status: 'Active' },
  { id: '5', customerNumber: 'K-10005', firstName: 'Elena', lastName: 'Kowalski', company: 'Baltic Trade Sp. z o.o.', email: 'elena.k@baltictrade.pl', phone: '+48 22 5678901', city: 'Warsaw', country: 'Poland', status: 'Active' },
  { id: '6', customerNumber: 'K-10006', firstName: 'James', lastName: 'Harrison', company: 'Thames Consulting Ltd', email: 'j.harrison@thames.co.uk', phone: '+44 20 79461234', city: 'London', country: 'United Kingdom', status: 'Active' },
  { id: '7', customerNumber: 'K-10007', firstName: 'Laura', lastName: 'Janssen', company: 'Windmolen BV', email: 'laura@windmolen.nl', phone: '+31 20 1234567', city: 'Amsterdam', country: 'Netherlands', status: 'Inactive' },
  { id: '8', customerNumber: 'K-10008', firstName: 'Peter', lastName: 'Novák', company: 'Vltava Systems s.r.o.', email: 'p.novak@vltava.cz', phone: '+420 2 34567890', city: 'Prague', country: 'Czech Republic', status: 'Active' },
  { id: '9', customerNumber: 'K-10009', firstName: 'Isabella', lastName: 'García', company: 'Sol y Mar SL', email: 'isabella.garcia@solymar.es', phone: '+34 91 2345678', city: 'Madrid', country: 'Spain', status: 'Active' },
  { id: '10', customerNumber: 'K-10010', firstName: 'Lukas', lastName: 'Schneider', company: 'Donau Digital GmbH', email: 'lukas.schneider@donau-digital.at', phone: '+43 1 9876543', city: 'Vienna', country: 'Austria', status: 'Active' },
  { id: '11', customerNumber: 'K-10011', firstName: 'Emma', lastName: 'Andersson', company: 'Nordic Light AB', email: 'emma.a@nordiclight.se', phone: '+46 8 12345678', city: 'Stockholm', country: 'Sweden', status: 'Inactive' },
  { id: '12', customerNumber: 'K-10012', firstName: 'Niklas', lastName: 'Hansen', company: 'Fjord Design AS', email: 'niklas@fjorddesign.no', phone: '+47 22 334455', city: 'Oslo', country: 'Norway', status: 'Active' },
  { id: '13', customerNumber: 'K-10013', firstName: 'Maria', lastName: 'Santos', company: 'Atlântico Lda', email: 'maria.santos@atlantico.pt', phone: '+351 21 3456789', city: 'Lisbon', country: 'Portugal', status: 'Active' },
  { id: '14', customerNumber: 'K-10014', firstName: 'Henrik', lastName: 'Larsen', company: 'Copenhagen Foods ApS', email: 'henrik.l@cphfoods.dk', phone: '+45 33 445566', city: 'Copenhagen', country: 'Denmark', status: 'Active' },
  { id: '15', customerNumber: 'K-10015', firstName: 'Claire', lastName: 'Dubois', company: 'Savoir Faire SA', email: 'claire.dubois@savoirfaire.be', phone: '+32 2 5678901', city: 'Brussels', country: 'Belgium', status: 'Inactive' },
  { id: '16', customerNumber: 'K-10016', firstName: 'Michael', lastName: 'O\'Brien', company: 'Emerald Software Ltd', email: 'm.obrien@emerald.ie', phone: '+353 1 2345678', city: 'Dublin', country: 'Ireland', status: 'Active' },
  { id: '17', customerNumber: 'K-10017', firstName: 'Sofia', lastName: 'Papadopoulos', company: 'Aegean Logistics SA', email: 'sofia.p@aegeanlog.gr', phone: '+30 210 9876543', city: 'Athens', country: 'Greece', status: 'Active' },
  { id: '18', customerNumber: 'K-10018', firstName: 'Jan', lastName: 'Horváth', company: 'Danube Partners Kft.', email: 'jan.horvath@danubep.hu', phone: '+36 1 4567890', city: 'Budapest', country: 'Hungary', status: 'Active' },
  { id: '19', customerNumber: 'K-10019', firstName: 'Eva', lastName: 'Kováčová', company: 'Tatra Innovations s.r.o.', email: 'eva.kovacova@tatra.sk', phone: '+421 2 54321098', city: 'Bratislava', country: 'Slovakia', status: 'Inactive' },
  { id: '20', customerNumber: 'K-10020', firstName: 'Andreas', lastName: 'Christodoulou', company: 'Mediterranean Exports Ltd', email: 'andreas.c@medexp.cy', phone: '+357 22 345678', city: 'Nicosia', country: 'Cyprus', status: 'Active' },
  { id: '21', customerNumber: 'K-10021', firstName: 'Julia', lastName: 'Fischer', company: 'Schwarzwald Bio GmbH', email: 'julia.fischer@schwarzwald-bio.de', phone: '+49 761 5544332', city: 'Freiburg', country: 'Germany', status: 'Active' },
  { id: '22', customerNumber: 'K-10022', firstName: 'David', lastName: 'Meier', company: 'Swiss Precision AG', email: 'david.meier@swissprecision.ch', phone: '+41 31 2233445', city: 'Bern', country: 'Switzerland', status: 'Active' },
  { id: '23', customerNumber: 'K-10023', firstName: 'Camille', lastName: 'Lefèvre', company: 'Provence Vins SARL', email: 'camille.lefevre@provence-vins.fr', phone: '+33 4 90123456', city: 'Marseille', country: 'France', status: 'Inactive' },
  { id: '24', customerNumber: 'K-10024', firstName: 'Roberto', lastName: 'Conti', company: 'Toscana Ceramiche Srl', email: 'r.conti@toscana-ceramiche.it', phone: '+39 055 6789012', city: 'Florence', country: 'Italy', status: 'Active' },
  { id: '25', customerNumber: 'K-10025', firstName: 'Katarzyna', lastName: 'Nowak', company: 'Kraków Media Sp. z o.o.', email: 'k.nowak@krakowmedia.pl', phone: '+48 12 3456789', city: 'Kraków', country: 'Poland', status: 'Active' },
];

let customers: Customer[] = [...initialCustomers];
let nextId = 26;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const customerService = {
  getAll(): Customer[] {
    return [...customers];
  },

  getById(id: string): Customer | undefined {
    return customers.find((c) => c.id === id);
  },

  async add(data: CustomerFormData): Promise<Customer> {
    await delay(SAVE_DELAY_MS);
    const customer: Customer = { ...data, id: String(nextId++) };
    customers = [...customers, customer];
    return customer;
  },

  async update(id: string, data: CustomerFormData): Promise<Customer | undefined> {
    await delay(SAVE_DELAY_MS);
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    const updated: Customer = { ...data, id };
    customers = customers.map((c) => (c.id === id ? updated : c));
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(SAVE_DELAY_MS);
    const lengthBefore = customers.length;
    customers = customers.filter((c) => c.id !== id);
    return customers.length < lengthBefore;
  },

  generateCustomerNumber(): string {
    const maxNum = customers.reduce((max, c) => {
      const num = parseInt(c.customerNumber.replace('K-', ''), 10);
      return num > max ? num : max;
    }, 10000);
    return `K-${maxNum + 1}`;
  },
};
