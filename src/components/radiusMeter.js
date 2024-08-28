import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function RadiusMeter() {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState(new Date());

  const arr = [
    "D/T",
    "",
    "",
    "",
    "V1",
    "V2",
    "V3",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  useEffect(() => {
    const postData = async () => {
      const url = "https://sm3.talk2device.com/gtDta";
      const reqObj = {
        type: "LP",
        meter_serial_no: "22053241",
        date: moment(date || new Date()).format("YYYY-MM-DD"),
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
  }, [date]);

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}>
        <span>
          Records: <b>{content.length}</b>
        </span>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <table>
        <tr>
          {arr.map((e, i) => {
            return <th key={i}>{e}</th>;
          })}
        </tr>
        {content.map((e, i) => {
          return (
            <tr key={i}>
              {e.split(",").map((a, b) => {
                return <td key={b}>{b === 0 ? a : Number(a).toFixed(2)}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default RadiusMeter;
