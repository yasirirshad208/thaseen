import React from "react";
import NavBar from "../ui/home/navbar/mainnavbar";
import Subscribe from "../ui/home/Subscribe/Subscribe";
import Footer from "../ui/home/footer/footer";
import FeaturedOnSection from "../ui/home/featuredon/featuredon";
import Hero from "../ui/home/hero/hero";
import AppointmentSection from "../ui/home/appointment/appointment";


export default async function HomePage() {

const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ui-images/get/67fd500eec60bc9f0fcd608d`, { cache: 'no-store' });
console.error("Error fetching data:", res.statusText);
return (
  <div>
    <NavBar />
    <p className="text-red-500">Failed to load seasonal data.</p> {/* Optional error display */}
    <Footer />
  </div>
);             
const data = await res.json()

      
                

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Hero heroImage={data.headerImage} />
      </div>

       <div>
        <AppointmentSection title={data.title} description={data.description} availability={data.availibility} contact_info={data.contact_info} />
      </div>

      <div>
        <FeaturedOnSection featuredImage={data.readyToWearImage} />
      </div>

      <div>
        <Subscribe />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
