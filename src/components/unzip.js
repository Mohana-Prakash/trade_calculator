import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import axios from "axios";

function Unzip() {
  const [priceArr, setPriceArr] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://www.omie.es/es/file-download?parents%5B0%5D=marginalpdbc&filename=marginalpdbc_20240502.1"
  //     )
  //     .then((e) => console.log(e))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    let url =
      "https://www.omie.es/es/file-download?parents%5B0%5D=marginalpdbc&filename=marginalpdbc_20240502.1";
    // axios
    //   .get(

    //   )
    //   .then((e) => console.log(e))
    //   .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
  }, []);

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
