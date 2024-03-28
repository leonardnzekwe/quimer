import image from "next/image";
import Link from "next/link";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="">
      <nav className="m-12">
        <div className="flex justify-between font-bold text-cyan-800">
          <Link href="/dashboard" className="hover:text-cyan-500">Dashboard</Link>
          <Link href="/about" className="hover:text-cyan-500">About</Link>
          <Link href="/services"className="hover:text-cyan-500">Services</Link>
          <Link href="/help" className="hover:text-cyan-500">Help</Link>
          <Link href="/settings"className="hover:text-cyan-500">Settings</Link>
          <h1 className="text-3xl font-bold">QUIMER</h1>
        </div>
      </nav>
      <div className="flex justify-between mx-12 text-cyan-800" >
      <div className="flex flex-col justify-between">
        <h2 className="text-9xl font-bold">Learning made easy with Quimer</h2>
        <p className="text-5xl"> We help you achieve success in your computer based
          tests by preparing you through our practice questions
        as practice makes perfect.
        </p>
        <div className="flex">
          <button className="border-6 rounded mr-10 bg-cyan-800 hover:bg-cyan-500 text-white font-bold py-2 px-6"> Get Started</button>
          <button className="border-6 rounded bg-cyan-800 hover:bg-cyan-500 text-white font-bold py-2 px-6">Sign Up</button>
        </div>
      </div>
      <img src="/man.jpeg" alt="ManImage" width={700} height={500}/>
      </div>
    </main>
  );
}
