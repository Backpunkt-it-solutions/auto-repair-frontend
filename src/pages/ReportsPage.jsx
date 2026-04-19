import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import RevenueTrendChart from "../components/reports/RevenueTrendChart";
import ReportsSummaryChart from "../components/reports/ReportsSummaryChart";
import { reportCards } from "../data/mockData";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Real charts for workshop performance, revenue trend, and service distribution."
        actionLabel="Export Report"
        secondaryActionLabel="Filter Range"
      />

      <div className="grid-4" style={{ marginBottom: 18 }}>
        {reportCards.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={
              typeof item.value === "number" &&
              item.title !== "Customer Satisfaction"
                ? `€${item.value}`
                : item.value
            }
            note="Analytics snapshot"
          />
        ))}
      </div>

      <div className="grid-2">
        <RevenueTrendChart />
        <ReportsSummaryChart />
      </div>
    </div>
  );
}
