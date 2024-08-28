import React, { useState, useEffect } from "react";
import axios from "axios";

function RadiusMeter() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const postData = async () => {
      const url = "https://sm3.talk2device.com/gtDta";
      const reqObj = {
        type: "LP",
        meter_serial_no: "22053241",
        date: "2024-08-27",
        count: 0,
        r_count: 100,
      };
      const headers = {
        api_gateway: "UHES",
      };
      try {
        const response = await axios.post(url, reqObj, { headers });
        setContent(response.data.DATA.map((e) => e.raw_data));
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    };

    postData();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <span>Records: <b>{content.length}</b></span>
      <table>
        {content.map((e) => {
          return (
            <tr key={e}>
              {e.split(",").map((a, i) => {
                return <td key={a}>{i === 0 ? a : Number(a).toFixed(2)}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default RadiusMeter;
