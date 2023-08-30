import React, { useState } from "react";

const Modal = (props:any) => {
  const { children } = props;

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex h-full overflow-x-hidden flex-col justify-center items-center absolute  w-full ">
    <div className="bg-white rounded-xl p-4 w-[600px] h-[600px] border-2">
      <h1>Upload and Display Image usign React Hook's</h1>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />
      
      <input
        type="file"
        name="myImage"
        onChange={(event:any) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      {children}
    </div>
    </div>
  );
};

export default Modal;