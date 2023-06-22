import checkAuth from "@/utils/checkAuth";

import SignInButton from "./SignInButton";
import ProfileIcon from "./ContextMenu/ProfIleIcon";
import ContextMenu from "./ContextMenu/ContextMenu";

export default async function Navbar() {
  const session = await checkAuth();
  return (
    <div className="fixed top-0 w-full flex z-20 bg-black justify-between py-4 border-b-[1px] border-b-[rgba(255,255,255,0.2)]">
      <span>
        <span className="absolute top-[25px] md:top-6 left-3 md:left-7 w-0 h-0 border-[15px] border-transparent border-t-solid border-t-white"></span>
        <h1 className="text-2xl ml-11 md:ml-16 font-semibold tracking-wider">
          SellFast
        </h1>
      </span>
      {session ? (
        <ProfileIcon session={session}>
          <ContextMenu />
        </ProfileIcon>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
