"use client";
import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

const ImageClassifier: any = () => {
  const imageRef = useRef(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [prediction, setPrediction] = useState<string>("");

  const loadModel = async () => {
    const loadedModel = await tf.loadLayersModel("/model/model.json");
    setModel(loadedModel);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    let tensorImage = tf.browser
      .fromPixels(imageRef.current as any)
      .resizeBilinear([90, 90]) // Asegúrate de cambiar "28, 28" al tamaño exacto usado durante el entrenamiento
      .mean(2)
      .expandDims(-1)
      .toFloat();

    // Normaliza el tensor a valores entre 0 y 1 si tu modelo fue entrenado de esta manera
    tensorImage = tensorImage.div(255.0);

    // Expande una dimensión de lote para que la forma del tensor sea [1, 28, 28, 1]
    const image = tensorImage.expandDims(0);

    // Simulando la carga del modelo y la predicción
    const model: any = await tf.loadLayersModel("model/model.json");
    const result = model.predict(image).dataSync();
    const respuesta = result[0] <= 0.6 ? "Gato" : "Perro";
    setPrediction(respuesta);
  };

  return (
    <div className=" grid-cols-2 grid gap-10">
      <section className="grid  gap-10">
        <div className=" w-[500px] h-[400px] overflow-hidden rounded-md z-20 hover:z-0 col-start-1 col-end-2 row-start-1 row-end-2">
          {image ? (
            <img
              ref={imageRef}
              className="boder w-full h-full"
              src={image as string}
              alt="Uploaded"
            />
          ) : (
            <img
              className=" rounded-md"
              src="https://via.placeholder.com/500x400"
              alt="Placeholder"
            />
          )}
        </div>
        <div className=" bg-orange-700 opacity-80 z-10 hover:z-30 justify-center items-center  grid gap-4 col-start-1 col-end-2 row-start-1 row-end-2">
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <div className=" w-full">
          <button
            onClick={() => {
              classifyImage();
            }}
            className="border w-full rounded-md p-3 bg-orange-500 hover:bg-yellow-700"
          >
            Classify Image
          </button>
        </div>
      </section>
      <section className=" flex justify-center items-center border rounded-md">
        <h2>
          {prediction === "" && (
            <p className=" text-center">Waiting for prediction...</p>
          )}
          {prediction === "Gato" && (
            <>
              <img
                src={
                  process.env.REACT_APP_BASE_URL
                    ? `${process.env.REACT_APP_BASE_URL}/image/icons8-gato-pixel-100(1).png`
                    : `/image/icons8-gato-pixel-100(1).png`
                }
                alt="cat"
              />
              <p className=" text-center">Cat</p>
            </>
          )}
          {prediction === "Perro" && (
            <>
              <img
                src={
                  process.env.REACT_APP_BASE_URL
                    ? `${process.env.REACT_APP_BASE_URL}/image/icons8-minecraft-pug-90(1).png`
                    : `/image/icons8-minecraft-pug-90(1).png`
                }
                alt="dog"
              />
              <p className=" text-center">Dog</p>
            </>
          )}
        </h2>
      </section>
    </div>
  );
};

export default ImageClassifier;
