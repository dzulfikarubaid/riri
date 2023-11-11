import Webcam from "react-webcam";
import React, { useCallback, useRef, useState, useEffect } from "react";

const WebcamCapture = () => {
  const [devices, setDevices] = useState([]);
  const [imgSrc, setImgSrc] = useState(Array(devices.length).fill(null));

  const handleDevices = useCallback((mediaDevices:any) => {
    setDevices(mediaDevices.filter(({ kind }:any) => kind === "videoinput"));
  }, []);

  const webcamRefs:any = useRef(devices.map(() => React.createRef()));

  const capture = useCallback(() => {
    const newImgSrc = webcamRefs.current.map((ref:any, key:any) => {
      return ref.current.getScreenshot();
    });
    console.log(newImgSrc)
    setImgSrc(newImgSrc);

    // Menyimpan gambar ke sisi klien (Anda dapat mengirimnya ke server jika diperlukan)
    newImgSrc.forEach((imgData:any, key:any) => {
      if (imgData) {
        const blob = dataURItoBlob(imgData);
        saveBlobAsFile(blob, `captured_image_${key + 1}.png`);
      }
    });
  }, [webcamRefs]);

  // Fungsi untuk mengubah data URI menjadi objek blob
  function dataURItoBlob(dataURI:any) {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
  }

  // Fungsi untuk menyimpan blob sebagai file
 // Fungsi untuk menyimpan blob sebagai file
function saveBlobAsFile(blob:any, fileName:any) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  
  // Menambahkan elemen link ke body
  document.body.appendChild(link);
  
  // Membuat fungsi untuk menghapus elemen link setelah di-klik
  const cleanup = () => {
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  };

  // Menjalankan fungsi cleanup setelah link di-klik
  link.addEventListener("click", cleanup, { once: true });

  // Mengklik link
  link.click();
}



  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      console.log(mediaDevices);
      handleDevices(mediaDevices);
    });
  }, [handleDevices]);

  return (
    <>
      {devices.map((device:any, key:any) => (
        <div key={key}>
          {imgSrc[key] ? (
            <img src={imgSrc[key]} alt={`webcam-${key}`} />
          ) : (
            <Webcam
              height={600}
              width={600}
              ref={webcamRefs?.current[key]}
              videoConstraints={{ deviceId: device.deviceId }}
            />
          )}
          {device.label || `Device ${key + 1}`}
          <div className="">
            {imgSrc[key] ? (
              <button onClick={capture}>Capture another photo</button>
            ) : (
              <button onClick={capture}>Capture photo</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default WebcamCapture;
