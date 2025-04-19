import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import Sale from "../ui/collections/sale";

export default function ThaseenTeensPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Sale />
      </main>
      <Footer />
    </div>
  );
}
