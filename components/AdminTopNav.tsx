"use client"
import { HiMenuAlt1 } from 'react-icons/hi';
import { useAdminContext } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';

const AdminTopNav = () => {

    const { isNavOpen, updateNavStatus } = useAdminContext();
    const router = useRouter();
     

    const handleToggle = () => {
        updateNavStatus(!isNavOpen);
    };
  
    return (
        <div className="h-[60px] absolute top-0 border-b border-b-[#ccc] p-4 flex justify-between items-center transition-all duration-300"
            style={{
                left: isNavOpen ? '220px' : '0px',
                width: isNavOpen ? 'calc(100% - 220px)' : '100%',
            }}>
            <div className='text-[26px] flex items-center h-[100%] cursor-pointer' onClick={handleToggle}>
                <HiMenuAlt1 />
            </div>
            <div className='mr-4'>
                <button className='text-white bg-black px-[22px] py-[10px] rounded-[50px] text-[15px] font-[500]' onClick={() => router.push('/home')}>
                    Website
                </button>
            </div>
        </div>
    );
};

export default AdminTopNav;
