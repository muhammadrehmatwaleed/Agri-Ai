import { useState } from "react";

function DiseaseDetection() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        AI Disease Detection
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-5"
        />

        {image && (
          <div className="mt-5">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full rounded-lg"
            />

            <p className="mt-3 text-gray-700">
              Selected Image: {image.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;