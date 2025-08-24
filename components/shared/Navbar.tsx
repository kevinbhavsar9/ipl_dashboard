import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="p-4 bg-[#0a93c5] text-white px-12">
      <h2 onClick={() => router.push("/")} className="cursor-pointer">
        IPL Dashboard
      </h2>
    </nav>
  );
}

export default Navbar;
