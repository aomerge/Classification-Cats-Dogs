import Image from "next/image";
import Header from "@/components/header";
import Contains from "@/components/contains";
import RingaText from "@/components/ringaText";
import VideoClassifier from "@/components/videoRecord";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <VideoClassifier />
    </main>
  );
}
