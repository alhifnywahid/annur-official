import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import SpaceBottom from "@/components/SpaceBottom";
import { Button } from "@/components/ui/button";
import web from "@/lib/config";
import { auth, signIn } from "../../../auth";

export const metadata = {
  title: `Admin | ${web.title}`,
};

export default async function AdminLayout({ children }) {
  const session = await auth();
  console.log(session);
  if (!session)
    return (
      <div className="w-screen h-screen flex items-center justify-center font-bold text-lg">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit">Login Dulu Bro!</Button>
        </form>
      </div>
    );
  return (
    <main className="relative max-w-lg mx-auto border h-screen flex flex-col">
      <Header />
      <div className="flex h-full w-full flex-col gap-2 px-3 overflow-hidden">
        {children}
        <SpaceBottom />
      </div>
      <MenuBar />
    </main>
  );
}
