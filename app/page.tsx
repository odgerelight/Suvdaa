import Link from "next/link";
import LoveAnimation from "@/components/LoveAnimation";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-800 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <LoveAnimation />
      </div>

      <div className="pb-10 flex items-center justify-center gap-8">
        <Link href="https://open.spotify.com/playlist/08M2SMi0f4JRp16SXTNvbv?si=uwlWOLePSGmh_Q3bFVE4tQ">
          <button className="px-6 py-3 rounded-2xl bg-sky-500 text-white shadow-lg active:scale-95 transition">
            Our playlist
          </button>
        </Link>
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

        <Link href="/valentine">
          <button className="px-6 py-3 rounded-2xl bg-black text-white shadow-lg active:scale-95 transition">
            Valentine
          </button>
        </Link>

        {/* <Link href="/heart">
          <button className="px-6 py-3 rounded-2xl bg-black text-white shadow-lg active:scale-95 transition">
            Heart
          </button>
        </Link> */}
      </div>
    </main>
  );
}
