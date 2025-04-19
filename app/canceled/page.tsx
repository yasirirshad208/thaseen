import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";

export default function CanceledPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Payment Canceled</h1>
        <p className="mt-4">
          You canceled the payment. Feel free to browse more and checkout when
          ready!
        </p>
      </div>
      <Footer />
    </div>
  );
}
