"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileIcon({ session, children }) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex justify-end">
      <Image
        src={session.user.image}
        width={35}
        height={30}
        className="rounded-[50%] mr-4 cursor-pointer"
        onClick={() => setShow(!show)}
        alt="profile"
      />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 5 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, translateY: -5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
