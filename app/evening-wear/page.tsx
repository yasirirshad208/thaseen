

import NavBar from "../ui/home/navbar/mainnavbar";
import EveningWearComponent from "../ui/collections/eveningwear";
import Footer from "../ui/home/footer/footer";
import AppointmentSection from "../ui/home/appointment/appointment";

export default async function EveningWearPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ui-images/get`, { cache: 'no-store' });
  if(!res.ok){
    console.error("Error fetching data:", res.statusText);
    return (
      <div>
        <NavBar />
        <p className="text-red-500">Failed to load seasonal data.</p> {/* Optional error display */}
        <Footer />
      </div>
    ); 
  }           
  const data = await res.json()
  return (
    <div>
      <NavBar />
      <EveningWearComponent />
      <div>
        <AppointmentSection title={data[0].title || "Book An Appointment"} description={data[0].description || "Scheduling an appointment with Tha Seen is effortless! Simply call or message us, and our dedicated team will help arrange a convenient time for your visit. We look forward to welcoming you."} availability={data[0].availibility || "Monday to Friday, 11:00"} contact_info={data[0].contact_info || "971565761000"} />
      </div>
      <Footer />
    </div>
  );
}
