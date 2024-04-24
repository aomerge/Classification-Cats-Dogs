import Image from "next/image";
import Header from "@/components/header";
import Contains from "@/components/contains";
import RingaText from "@/components/ringaText";
import VideoClassifier from "@/components/videoRecord";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="flex min-h-screen gap-24 flex-col items-center p-14">
      <Nav />
      <Header />
      <VideoClassifier />
    </main>
  );
}
