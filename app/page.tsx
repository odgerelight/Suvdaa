import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <div className="bg-gray-800 h-screen w-screen flex flex-rpw justify-center items-center gap-12">
          <Link href="/invitation">
            <button>Ready?</button>
          </Link>
          <Link href="/letters">
            <button>Letters</button>
          </Link>
        </div>
        <div></div>
      </div>
    </>
  );
}
