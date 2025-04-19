"use client"
import AdminNav from "@/components/AdminNav";
import AdminTopNav from "@/components/AdminTopNav";
import { useAdminContext } from "@/context/AdminContext";
import { useAuthAdmin } from "@/context/AuthAdminContext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isNavOpen } = useAdminContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const { isAdmin, checkAdmin } = useAuthAdmin();
  
      useEffect(() => { 
        
          const verifyAdmin = async () => {
            setLoading(true)
               const isValidAdmin = await checkAdmin();
  
              if (!isValidAdmin) {
                  router.replace("/login");
              }
              setLoading(false)
          };
  
          if(!isAdmin){
              verifyAdmin();
          }
      }, []);

      if (loading) {
        return <p>Loading...</p>;
      }
  return (
    <Suspense fallback={<div className="text-center md:mt-20 mt-12"><span className="loader"></span></div>}>
    <main>
      
        <div className="relative">
          <AdminNav/>
          <AdminTopNav/>
          <div className="px-[12px] sm:px-[24px] py-4 bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300"
           style={{
            left: isNavOpen ? '220px' : '0px',
            width: isNavOpen ? 'calc(100% - 220px)' : '100%',
          }}
          >

 {children}
          </div>
        </div>
    </main>
    </Suspense>
  );
}
