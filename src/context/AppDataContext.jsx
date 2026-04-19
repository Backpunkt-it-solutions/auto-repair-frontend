import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  appointments as initialAppointments,
  customers as initialCustomers,
  vehicles as initialVehicles,
  jobs as initialJobs,
  inventory as initialInventory,
  invoices as initialInvoices,
  staff as initialStaff,
} from "../data/mockData";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "auto-repair-demo-data-v1";

const AppDataContext = createContext(null);

function generateId(prefix) {
  return `${prefix}-${Date.now()}`;
}

export function AppDataProvider({ children }) {
  const stored = loadFromStorage(STORAGE_KEY, null);

  const [appointments, setAppointments] = useState(
    stored?.appointments || initialAppointments,
  );
  const [customers, setCustomers] = useState(
    stored?.customers || initialCustomers,
  );
  const [vehicles, setVehicles] = useState(stored?.vehicles || initialVehicles);
  const [jobs, setJobs] = useState(stored?.jobs || initialJobs);
  const [inventory, setInventory] = useState(
    stored?.inventory || initialInventory,
  );
  const [invoices, setInvoices] = useState(stored?.invoices || initialInvoices);
  const [staff, setStaff] = useState(stored?.staff || initialStaff);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, {
      appointments,
      customers,
      vehicles,
      jobs,
      inventory,
      invoices,
      staff,
    });
  }, [appointments, customers, vehicles, jobs, inventory, invoices, staff]);

  const api = useMemo(() => {
    return {
      appointments,
      customers,
      vehicles,
      jobs,
      inventory,
      invoices,
      staff,

      resetAllData() {
        setAppointments(initialAppointments);
        setCustomers(initialCustomers);
        setVehicles(initialVehicles);
        setJobs(initialJobs);
        setInventory(initialInventory);
        setInvoices(initialInvoices);
        setStaff(initialStaff);
      },

      createAppointment(payload) {
        setAppointments((prev) => [
          ...prev,
          {
            id: generateId("APT"),
            status: "Pending",
            ...payload,
          },
        ]);
      },
      updateAppointment(id, payload) {
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteAppointment(id) {
        setAppointments((prev) => prev.filter((item) => item.id !== id));
      },

      createCustomer(payload) {
        setCustomers((prev) => [
          ...prev,
          {
            id: generateId("CUS"),
            vehicles: Number(payload.vehicles || 0),
            totalSpent: Number(payload.totalSpent || 0),
            loyalty: payload.loyalty || "Silver",
            notes: payload.notes || "",
            ...payload,
          },
        ]);
      },
      updateCustomer(id, payload) {
        setCustomers((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteCustomer(id) {
        setCustomers((prev) => prev.filter((item) => item.id !== id));
      },

      createVehicle(payload) {
        setVehicles((prev) => [
          ...prev,
          {
            id: generateId("VEH"),
            mileage: Number(payload.mileage || 0),
            history: payload.history || [],
            ...payload,
          },
        ]);
      },
      updateVehicle(id, payload) {
        setVehicles((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteVehicle(id) {
        setVehicles((prev) => prev.filter((item) => item.id !== id));
      },

      createJob(payload) {
        setJobs((prev) => [
          ...prev,
          {
            id: generateId("JOB"),
            laborCost: Number(payload.laborCost || 0),
            priority: payload.priority || "Medium",
            status: payload.status || "Pending",
            ...payload,
          },
        ]);
      },
      updateJob(id, payload) {
        setJobs((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteJob(id) {
        setJobs((prev) => prev.filter((item) => item.id !== id));
      },

      createInventoryItem(payload) {
        setInventory((prev) => [
          ...prev,
          {
            id: generateId("INV"),
            stock: Number(payload.stock || 0),
            ...payload,
          },
        ]);
      },
      updateInventoryItem(id, payload) {
        setInventory((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteInventoryItem(id) {
        setInventory((prev) => prev.filter((item) => item.id !== id));
      },

      createInvoice(payload) {
        setInvoices((prev) => [
          ...prev,
          {
            id: generateId("BIL"),
            amount: Number(payload.amount || 0),
            items: payload.items || [],
            ...payload,
          },
        ]);
      },
      updateInvoice(id, payload) {
        setInvoices((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteInvoice(id) {
        setInvoices((prev) => prev.filter((item) => item.id !== id));
      },

      createStaff(payload) {
        setStaff((prev) => [
          ...prev,
          {
            id: generateId("STF"),
            jobsToday: Number(payload.jobsToday || 0),
            utilization: Number(payload.utilization || 0),
            ...payload,
          },
        ]);
      },
      updateStaff(id, payload) {
        setStaff((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        );
      },
      deleteStaff(id) {
        setStaff((prev) => prev.filter((item) => item.id !== id));
      },
    };
  }, [appointments, customers, vehicles, jobs, inventory, invoices, staff]);

  return (
    <AppDataContext.Provider value={api}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }
  return context;
}
