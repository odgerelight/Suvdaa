import Link from "next/link";
import LoveAnimation from "@/components/LoveAnimation";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-800 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <LoveAnimation />
      </div>

      <div className="pb-10 flex items-center justify-center gap-8">
        <Link href="/invitation">
          <button className="px-6 py-3 rounded-2xl bg-black text-white shadow-lg active:scale-95 transition">
            Ready?
          </button>
        </Link>

        <Link href="/letters">
          <button className="px-6 py-3 rounded-2xl bg-black text-white shadow-lg active:scale-95 transition">
            Letters
          </button>
        </Link>
      </div>
    </main>
  );
}
