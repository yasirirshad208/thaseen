"use client"
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { LuUsers } from 'react-icons/lu'
import {  MdOutlineUnsubscribe } from 'react-icons/md'
import { RiFileList3Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { useAdminContext } from '@/context/AdminContext'

const AdminNav = () => {
    const { isNavOpen } = useAdminContext()
    const router = useRouter()

  return (
    <div className={`h-[100vh] fixed w-[220px] border-r border-r-[#ccc] px-4 transition-all duration-300`}
    style={{
      left: isNavOpen ? '0' : '-220px',
    }}>
        <div className='text-[28px] text-black font-bold py-5'>
            Thaseen.
        </div>
        <nav className='text-[15px] mt-7 flex flex-col gap-7 text-black'>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/category')}><BiCategoryAlt className='mr-2 text-[22px]' />Category</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/sub-category')}> <RiFileList3Line  className='mr-2 text-[22px]'/>Sub Category</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300'  onClick={()=>router.push('/admin/product/')}><IoNewspaperOutline className='mr-2 text-[22px]'/>Product</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300'  onClick={()=>router.push('/admin/collection')}><MdOutlineUnsubscribe className='mr-2 text-[22px]'/>Collection</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/orders')}><RiFileList3Line className='mr-2 text-[22px]'/>Orders</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/users')}><LuUsers className='mr-2 text-[22px]' />Users</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/contact')}> <RiFileList3Line  className='mr-2 text-[22px]'/>Contact</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/ui')}> <RiFileList3Line  className='mr-2 text-[22px]'/>UI Elements</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/privacy/update')}><BiCategoryAlt className='mr-2 text-[22px]' />Policy</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>router.push('/admin/terms/update')}><BiCategoryAlt className='mr-2 text-[22px]' />Terms</div>
            
        </nav>
    </div>
  )
}

export default AdminNav