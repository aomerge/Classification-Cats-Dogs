"use client";
import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const VideoClassifier: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<string>("");

  useEffect(() => {
    tf.loadLayersModel("./model/model.json").then((loadedModel) => {
      setModel(loadedModel);
      console.log("Model loaded.");
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
      const imgData = image?.getImageData(0, 0, image.canvas.width, image.canvas?.height);

      let arr: Array<any> = [];
      const arr2 = [];

      for (let i = 0; i < imgData?.data.length!; i +=4) {             
        const red = imgData?.data[i]! / 255;
        const green = imgData?.data[i + 1]!/ 255;
        const blue = imgData?.data[i + 2]! / 255;
        const gray = (red + green + blue) / 3;
        arr.push(gray);
        if (arr.length === 90) {
          arr2.push(arr);
          arr = [];
        }        
        const tensor  = tf.tensor4d([arr]);
        const response: Number | any  = model.predict(tensor);

        const resultModel = response <= 0.5 ? "Cat" : "Dog";
        setPrediction(resultModel);

      }

      /* const tfImg = tf.browser.fromPixels(canvas).expandDims(0);      
      const smallImg = tf.image.resizeBilinear(tfImg, [90, 90]);
      const resized = tf.cast(smallImg, "float32");
      const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1, 90, 90, 3]); */

      /*   const predictions = await model.predict(t4d);
      if (predictions instanceof tf.Tensor) {
        const predictionArray = await predictions.data();
        setPrediction(predictionArray[0] > 0.5 ? "Dog" : "Cat");
      } */
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      classifyVideo();
    }, 1000); // Classify every second

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="720"
        height="480"
      />
      <canvas
        ref={canvasRef}
        style={{ display: "block" }}
        width="90"
        height="90"
        className="border"
      />
      <div>Prediction: {prediction}</div>
    </div>
  );
};

export default VideoClassifier;
