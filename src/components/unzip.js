import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import axios from "axios";

function Unzip() {
  const [files, setFiles] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://api.esios.ree.es/archives/2/download?date_type=datos&end_date=2024-02-01T23%3A59%3A59%2B00%3A00&locale=es&start_date=2024-01-01T00%3A00%3A00%2B00%3A00"
  //       )
  //       .then((e) => console.log(e));
  //   }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const zip = await JSZip.loadAsync(file);
      const unzippedFiles = [];
      const formData = new FormData();

      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          const file = zip.files[fileName];
          if (!file.dir) {
            const content = await file.async("string");
            unzippedFiles.push({
              name: fileName,
              content: content,
            });
          }
        })
      );
      const filteredFile = unzippedFiles.filter((file) =>
        file.name.includes("prmdiari")
      );

      const blob = new Blob([file.content], { type: "text/plain" });
      formData.append(`price_file`, blob, filteredFile.name);

      //   setFiles(filteredFile);
    } catch (error) {
      console.error("Error unzipping file:", error);
    }
  };

  console.log(files);

  return (
    <div>
      <h2 className="text-center my-4">Unzip File</h2>

      <div className="w-50 m-auto">
        <input className="w-100" type="file" onChange={handleFileUpload} />
        {/* <h3>Unzipped files:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default Unzip;
