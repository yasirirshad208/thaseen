import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import BestSeller from "../ui/collections/bestseller";

export default function ThaseenTeensPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <BestSeller />
      </main>
      <Footer />
    </div>
  );
}
