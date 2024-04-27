import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import axios from "axios";

function Unzip() {
  const [priceArr, setPriceArr] = useState([]);
  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://api.esios.ree.es/archives/2/download?date_type=datos&end_date=2024-02-01T23%3A59%3A59%2B00%3A00&locale=es&start_date=2024-01-01T00%3A00%3A00%2B00%3A00"
  //       )
  //       .then((e) => console.log(e));
  //   }, []);

  const handleFileUpload = async (event) => {
    let file = event.target.files[0];
    try {
      const zip = await JSZip.loadAsync(file);
      let find_file = await zip.files[
        Object.keys(zip.files).find((file) => file.includes("prmdiari"))
      ];
      if (!find_file.dir) {
        let content = await find_file.async("string");
        let data = content
          .split("\r\n")
          .slice(2, -2)
          .map((e) => {
            return e.split(";").slice(1, -2);
          });
        setPriceArr(data);
      }
    } catch (error) {
      console.error("Error unzipping file:", error);
    }
  };

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
      <div>
        {priceArr.map((e, i) => {
          return (
            <div key={i} style={{ marginTop: "10px" }}>
              Day {i + 1}
              {e.map((a, j) => {
                return (
                  <span className="price_span">
                    {Number(a)} (<i className="text-danger">{j + 1}</i>)
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Unzip;
