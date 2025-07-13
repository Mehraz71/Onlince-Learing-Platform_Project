import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // optional

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="ml-64 w-full p-6 bg-white">{children}</main>
      </div>
    </>
  );
}
