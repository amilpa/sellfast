"use client";
import Image from "next/image";

export default function ProfileIcon({ session }) {
  return (
    <Image
      src={session.user.image}
      width={75}
      height={30}
      className="rounded-[50%] m-auto cursor-pointer"
      alt="profile"
    />
  );
}
