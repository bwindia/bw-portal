import Navbar from "@/components/organisms/Navbar";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="h-svh overflow-hidden flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="overflow-auto p-6 w-full max-w-screen-lg mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}
