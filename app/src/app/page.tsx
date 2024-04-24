import ImageClassifier from "@/components/imageModel";
import Nav from "@/components/nav";
export default function Home() {
  return (
    <main className="flex min-h-screen gap-24 flex-col items-center px-24 py-10">
      <Nav />
      <div>
        <h1 className="text-center text-yellow-500 text-6xl mb-2 font-extrabold">Image Classification</h1>
        <p className=" text-xl">
          Clasificaci&oacute;n de im&aacute;genes (Perro o Gato) usando una imagen, sobre un modelo de Tensorflow.js
        </p>
      </div>
      <ImageClassifier />
    </main>
  );
}
