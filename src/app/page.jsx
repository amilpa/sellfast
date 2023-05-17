import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <SignInButton />
      </div>
    );
  }

  return (
    <div>
      <p>Hello {session.user.name}</p>
      <SignOutButton />
    </div>
  );
}
