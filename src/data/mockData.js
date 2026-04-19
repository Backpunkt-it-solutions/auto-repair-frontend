export const stats = {
  revenueToday: 2480,
  vehiclesInService: 18,
  pendingJobs: 9,
  activeMechanics: 6,
};

export const revenueData = [
  { month: "Jan", value: 7200 },
  { month: "Feb", value: 8100 },
  { month: "Mar", value: 9200 },
  { month: "Apr", value: 8800 },
  { month: "May", value: 10500 },
  { month: "Jun", value: 11100 },
];

export const appointments = [
  {
    id: "APT-1001",
    customer: "Michael Schneider",
    vehicle: "BMW 320d",
    service: "Oil Change",
    date: "2026-04-20T09:00:00",
    status: "Pending",
    mechanic: "Ali Khan",
  },
  {
    id: "APT-1002",
    customer: "Anna Becker",
    vehicle: "Audi A4",
    service: "Brake Inspection",
    date: "2026-04-20T11:00:00",
    status: "Confirmed",
    mechanic: "Sami Ullah",
  },
  {
    id: "APT-1003",
    customer: "Daniel Hoffmann",
    vehicle: "VW Golf",
    service: "Engine Diagnosis",
    date: "2026-04-21T14:00:00",
    status: "Pending",
    mechanic: "Imran Hossain",
  },
  {
    id: "APT-1004",
    customer: "Laura König",
    vehicle: "Mercedes C220",
    service: "AC Service",
    date: "2026-04-21T16:00:00",
    status: "Completed",
    mechanic: "Ali Khan",
  },
];

export const customers = [
  {
    id: "CUS-001",
    name: "Michael Schneider",
    phone: "+49 176 123456",
    email: "michael@example.com",
    vehicles: 2,
    totalSpent: 1680,
    loyalty: "Gold",
    notes: "Prefers morning appointments.",
  },
  {
    id: "CUS-002",
    name: "Anna Becker",
    phone: "+49 175 998877",
    email: "anna@example.com",
    vehicles: 1,
    totalSpent: 980,
    loyalty: "Silver",
    notes: "Requests payment reminder by email.",
  },
  {
    id: "CUS-003",
    name: "Daniel Hoffmann",
    phone: "+49 157 332211",
    email: "daniel@example.com",
    vehicles: 3,
    totalSpent: 2410,
    loyalty: "Gold",
    notes: "Company fleet customer.",
  },
];

export const vehicles = [
  {
    id: "VEH-001",
    plate: "MH-AB-1023",
    brand: "BMW",
    model: "320d",
    owner: "Michael Schneider",
    lastService: "2026-03-10",
    mileage: 68000,
    history: [
      { date: "2026-03-10", title: "Oil & filter change", amount: 210 },
      { date: "2025-12-04", title: "Brake inspection", amount: 145 },
    ],
  },
  {
    id: "VEH-002",
    plate: "DU-CD-8871",
    brand: "Audi",
    model: "A4",
    owner: "Anna Becker",
    lastService: "2026-02-22",
    mileage: 89500,
    history: [
      { date: "2026-02-22", title: "ABS diagnostics", amount: 120 },
      { date: "2025-10-13", title: "Battery replacement", amount: 180 },
    ],
  },
  {
    id: "VEH-003",
    plate: "E-EF-6754",
    brand: "Volkswagen",
    model: "Golf",
    owner: "Daniel Hoffmann",
    lastService: "2026-01-12",
    mileage: 41200,
    history: [
      { date: "2026-01-12", title: "Engine scanner diagnostics", amount: 95 },
      { date: "2025-08-21", title: "AC refill", amount: 160 },
    ],
  },
];

export const jobs = [
  {
    id: "JOB-001",
    customer: "Michael Schneider",
    vehicle: "BMW 320d",
    issue: "Oil leakage check",
    mechanic: "Ali Khan",
    status: "In Progress",
    laborCost: 220,
    priority: "High",
  },
  {
    id: "JOB-002",
    customer: "Anna Becker",
    vehicle: "Audi A4",
    issue: "Front brake replacement",
    mechanic: "Sami Ullah",
    status: "Pending",
    laborCost: 180,
    priority: "Medium",
  },
  {
    id: "JOB-003",
    customer: "Daniel Hoffmann",
    vehicle: "VW Golf",
    issue: "Engine scanner diagnostics",
    mechanic: "Imran Hossain",
    status: "Completed",
    laborCost: 95,
    priority: "Low",
  },
  {
    id: "JOB-004",
    customer: "Laura König",
    vehicle: "Mercedes C220",
    issue: "AC compressor check",
    mechanic: "Ali Khan",
    status: "In Progress",
    laborCost: 260,
    priority: "High",
  },
];

export const inventory = [
  {
    id: "INV-001",
    item: "Brake Pads",
    category: "Brakes",
    stock: 3,
    supplier: "AutoParts GmbH",
    status: "Low Stock",
  },
  {
    id: "INV-002",
    item: "Engine Oil 5W-30",
    category: "Lubricants",
    stock: 24,
    supplier: "Liqui Supplies",
    status: "Available",
  },
  {
    id: "INV-003",
    item: "Air Filter",
    category: "Filters",
    stock: 12,
    supplier: "CarTec",
    status: "Available",
  },
  {
    id: "INV-004",
    item: "Battery 12V",
    category: "Electrical",
    stock: 2,
    supplier: "PowerMax",
    status: "Low Stock",
  },
];

export const invoices = [
  {
    id: "BIL-001",
    customer: "Michael Schneider",
    amount: 420,
    date: "2026-04-16",
    status: "Paid",
    items: [
      { label: "Oil change", amount: 180 },
      { label: "Leakage diagnostics", amount: 240 },
    ],
  },
  {
    id: "BIL-002",
    customer: "Anna Becker",
    amount: 285,
    date: "2026-04-17",
    status: "Unpaid",
    items: [
      { label: "Brake inspection", amount: 120 },
      { label: "Parts reservation", amount: 165 },
    ],
  },
  {
    id: "BIL-003",
    customer: "Daniel Hoffmann",
    amount: 150,
    date: "2026-04-17",
    status: "Paid",
    items: [{ label: "Engine scanner diagnostics", amount: 150 }],
  },
];

export const staff = [
  {
    id: "STF-001",
    name: "Ali Khan",
    role: "Senior Mechanic",
    phone: "+49 176 5550001",
    jobsToday: 3,
    utilization: 82,
  },
  {
    id: "STF-002",
    name: "Sami Ullah",
    role: "Mechanic",
    phone: "+49 176 5550002",
    jobsToday: 2,
    utilization: 61,
  },
  {
    id: "STF-003",
    name: "Imran Hossain",
    role: "Diagnostic Specialist",
    phone: "+49 176 5550003",
    jobsToday: 4,
    utilization: 90,
  },
];

export const reportCards = [
  { title: "Monthly Revenue", value: 11100 },
  { title: "Completed Jobs", value: 128 },
  { title: "Average Ticket", value: 236 },
  { title: "Customer Satisfaction", value: "4.8 / 5" },
];
