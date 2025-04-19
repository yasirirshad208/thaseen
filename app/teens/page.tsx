import NavBar from "../ui/home/navbar/mainnavbar";
import Teens from "../ui/collections/teens";
import Footer from "../ui/home/footer/footer";

export default function ThaseenTeensPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Teens />
      </main>
      <Footer />
    </div>
  );
}
