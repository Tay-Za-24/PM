import Sidebar from "./component/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <>
    <div className="dashboard-wrap">
      <Sidebar />
      <main>{children}</main>
    </div>
    </>
  );
}
