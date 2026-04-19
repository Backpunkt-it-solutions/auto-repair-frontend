import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import ToggleRow from "../components/common/ToggleRow";
import { useAppData } from "../context/AppDataContext";

export default function SettingsPage() {
  const { resetAllData } = useAppData();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [inventoryWarnings, setInventoryWarnings] = useState(true);
  const [darkReports, setDarkReports] = useState(true);

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Modern toggle panels, system sections, and save-state style settings."
        actionLabel="Save Changes"
        secondaryActionLabel="Reset Demo Data"
        onAction={() => alert("Settings saved locally for this demo view.")}
        onSecondaryAction={() => {
          resetAllData();
          alert("Demo data reset complete.");
        }}
      />

      <div className="info-grid">
        <div className="card">
          <h3 className="card-title" style={{ fontSize: 24 }}>
            Workshop Profile
          </h3>
          <p className="card-subtitle">Core business information</p>
          <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
            <input defaultValue="WerkstattPro GmbH" />
            <input defaultValue="Friedrichstraße 22, Düsseldorf" />
            <input defaultValue="support@werkstattpro.de" />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ fontSize: 24 }}>
            Billing Setup
          </h3>
          <p className="card-subtitle">Tax and invoice configuration</p>
          <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
            <input defaultValue="EUR" />
            <input defaultValue="19%" />
            <input defaultValue="BIL" />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ fontSize: 24 }}>
            System Toggles
          </h3>
          <p className="card-subtitle">Live behavior controls</p>
          <div style={{ marginTop: 12 }}>
            <ToggleRow
              label="Email Alerts"
              description="Send appointment and invoice email notifications"
              checked={emailAlerts}
              onChange={setEmailAlerts}
            />
            <ToggleRow
              label="SMS Alerts"
              description="Send mobile reminders to workshop customers"
              checked={smsAlerts}
              onChange={setSmsAlerts}
            />
            <ToggleRow
              label="Inventory Warnings"
              description="Highlight low-stock items automatically"
              checked={inventoryWarnings}
              onChange={setInventoryWarnings}
            />
            <ToggleRow
              label="Enhanced Report Theme"
              description="Use premium report styling in exports"
              checked={darkReports}
              onChange={setDarkReports}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
