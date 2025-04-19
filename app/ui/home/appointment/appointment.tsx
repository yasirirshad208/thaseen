"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdAccessTime } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

interface AppointmentData {
  title: string;
  description: string;
  contact_info: string;
  availability: string;
}

export default function AppointmentSection({title, description, contact_info, availability}:AppointmentData) {


  return (
    <motion.div
      className="bg-white text-gray-900 py-24 px-6 border-t border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          className="text-left"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl ">{title}</h2>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg leading-8 text-gray-600">
            {description}
          </p>

          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <FaWhatsapp size={32} className="text-gray-900" />
            <a
              href={`https://wa.me/${contact_info}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:underline text-gray-800"
            >
              + {contact_info}
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <MdAccessTime size={32} className="text-gray-900" />
            <p className="text-lg font-medium text-gray-800">
              {availability}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
