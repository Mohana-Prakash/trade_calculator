import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { ColorRing } from "react-loader-spinner";

function RadiusMeter() {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const arr = [
    "Date/Time",
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
      setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error during POST request:", error);
        setLoading(false);
      }
    };

    postData();
  }, [date]);

  const rowHandler = (e) => {};

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          padding: "0px 10px",
        }}
      >
        <span>
          Records: <b>{content.length}</b>
        </span>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
      {loading ? (
        <div className="loader">
          <ColorRing visible={true} height="100" width="100" />
        </div>
      ) : (
        <div>
          {content.length > 0 ? (
            <div className="table_container">
              <table>
                <tr className="fixed_header">
                  {arr.map((e, i) => {
                    return <th key={i}>{e}</th>;
                  })}
                </tr>
                {content.map((e, i) => {
                  return (
                    <tr key={i} onClick={() => rowHandler(e)}>
                      {e.split(",").map((a, b) => {
                        return (
                          <td key={b}>{b === 0 ? a : Number(a).toFixed(2)}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>
              <b>No Records</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RadiusMeter;
