import Link from "next/link";
import { Button } from "../ui/button";
import { MarqueeDemo } from "../ui/marquee";

export default function HeroSection() {
  return (
    <main className="relative">
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl md:text-6xl font-medium mb-2">
      Encrypted Data
      </h1>
      <h2 className="text-5xl md:text-6xl font-medium text-emerald-500">
      Safe from Tampering
      </h2>
      
      <p className="max-w-2xl text-lg mt-10">
        Aeternum is an open source storage platform.
      </p>
      <p className="max-w-2xl text-lg mb-8"> 
      A modern solution for issuing and managing digital credentials that are securely stored on the blockchain, verifiable by anyone, and accessible anytime.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-5 text-sm font-medium">
          <Link href="">
            Start your credential
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-5 text-sm font-medium">
          <Link href="">
            Request a demo
          </Link>
        </Button>
      </div>
      
      <div className="absolute bottom-6">
      <MarqueeDemo/>
      <p className="text-sm text-[#868989]">Trusted by global companies worldwide</p>
      </div>
    </div>  
  </main>
  )
}