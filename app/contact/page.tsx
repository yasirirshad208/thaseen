// pages/contact.tsx
import ContactForm from "../ui/contact/contactform";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";

export default async function Contact() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ui-images/get/sdfsfsdf`, { cache: 'no-store' });
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
      <ContactForm image={data.contactImage} />
      <Footer />
    </div>
  );
}
