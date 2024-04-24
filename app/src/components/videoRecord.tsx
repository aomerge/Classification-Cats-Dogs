"use client";
import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const VideoClassifier: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null | any>(null);
  const [prediction, setPrediction] = useState<string>("");

  useEffect(() => {
    tf.loadLayersModel("./model/model.json").then((loadedModel) => {
      setModel(loadedModel);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  }, []);

  const classifyVideo = async () => {
    if (videoRef.current && model) {
      const video = videoRef.current;
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const image = canvas?.getContext("2d");
      image?.drawImage(video, 0, 0, image.canvas?.width, image.canvas?.width);
      const imgData = image?.getImageData(
        0,
        0,
        image.canvas.width,
        image.canvas?.height
      );

      let arr: Array<any> = [];

      for (let i = 0; i < imgData?.data.length!; i += 4) {
        const red = imgData?.data[i]! / 255;
        const green = imgData?.data[i + 1]! / 255;
        const blue = imgData?.data[i + 2]! / 255;
        const gray = (red + green + blue) / 3;
        arr.push(gray);
      }
      const tensor = tf.tensor4d(arr, [1, 90, 90, 1]);
      const response: Number | any = model.predict(tensor).dataSync();           
      if (response[0] > 0.2 && response[0] < 0.8) {
        setPrediction("");
      }
      if (response[0] <= 0.2) {
        setPrediction("cat");
      }
      if (response[0] >= 0.8) {
        setPrediction("dog");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      classifyVideo();
    }, 1000); // Classify every second

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className="flex gap-10">
      <section className=" w-1/2  rounded-sm overflow-hidden ">
        {videoRef ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="720"
            height="480"
          />
        ) : (
          <img src="https://via.placeholder.com/720x480" alt="Placeholder" />
        )}
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="90"
          height="90"
          className="border none"
        />
      </section>
      <section className="border rounded-md w-1/2 grid justify-center items-center">
        <div>
          {prediction === "" && (
            <p className=" text-center">Enfoca bien al objeto</p>
          )}
          {prediction === "cat" && (
            <>
              <img src="/image/icons8-gato-pixel-100(1).png" alt="cat" />
              <p className=" text-center">Cat</p>
            </>
          )}
          {prediction === "dog" && (
            <>
              <img src="/image/icons8-minecraft-pug-90(1).png" alt="dog" />
              <p className=" text-center">Dog</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default VideoClassifier;
