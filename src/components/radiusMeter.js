import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { ColorRing } from "react-loader-spinner";

function RadiusMeter() {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const arr = [
    { label: "Date/Time", obis: "0.0.1.0.0.255" },
    { label: "L1 Current Avg", obis: "1.0.31.27.0.255" },
    { label: "L2 Current Avg", obis: "1.0.51.27.0.255" },
    { label: "L3 Current Avg", obis: "1.0.71.27.0.255" },
    { label: "L1 Voltage Avg", obis: "1.0.32.27.0.255" },
    { label: "L2 Voltage Avg", obis: "1.0.52.27.0.255" },
    { label: "L3 Voltage Avg", obis: "1.0.72.27.0.255" },
    { label: "Block Energy (WhInp)", obis: "1.0.1.29.0.255" },
    { label: "Block Energy (VAhInp)", obis: "1.0.9.29.0.255" },
    { label: "Block Energy (WhExp)", obis: "1.0.2.29.0.255" },
    { label: "Block Energy (VAhExp)", obis: "1.0.10.29.0.255" },
    { label: "Block Energy (VArhQ1)", obis: "1.0.5.29.0.255" },
    { label: "Block Energy (VArhQ2)", obis: "1.0.6.29.0.255" },
    { label: "Block Energy (VArhQ3)", obis: "1.0.7.29.0.255" },
    { label: "Block Energy (VArhQ4)", obis: "1.0.8.29.0.255" },
    { label: "", obis: "1.0.1.27.0.255" },
    { label: "", obis: "1.0.9.27.0.255" },
    { label: "", obis: "1.0.5.27.0.255" },
    { label: "", obis: "1.0.8.27.0.255" },
    { label: "", obis: "1.0.13.27.0.255" },
    { label: "", obis: "1.0.91.27.0.255" },
    { label: "", obis: "1.0.128.8.98.255" },
    { label: "", obis: "1.0.128.7.17.255" },
    { label: "", obis: "1.0.128.7.18.255" },
    { label: "", obis: "1.0.128.7.19.255" },
    { label: "", obis: "1.0.128.7.21.255" },
    { label: "", obis: "1.0.128.7.22.255" },
    { label: "", obis: "1.0.128.7.23.255" },
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
        setContent(response.data);
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
        }}>
        <span>
          Records: <b>{content?.DATA?.length}</b>
        </span>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
      {/* {content.STRUCTURE.split(",").map((struc) => {
        return <p key={struc}>{struc}</p>;
      })} */}
      <div>
        {loading ? (
          <div className="loader">
            <ColorRing visible={true} height="100" width="100" />
          </div>
        ) : (
          <div>
            {content?.DATA?.length > 0 ? (
              <div className="table_container">
                <table>
                  <tr className="fixed_header">
                    {arr.map((e, i) => {
                      return (
                        <th key={i} className={i === 7 && "eighth_head"}>
                          <p>{e.label}</p>
                          <p className="obis_code">{e.obis}</p>
                        </th>
                      );
                    })}
                  </tr>
                  {content?.DATA?.map((e, i) => {
                    return (
                      <tr key={i} onClick={() => rowHandler(e)}>
                        {e?.raw_data?.split(",").map((a, b) => {
                          return (
                            <td key={b} className={b === 7 && "eighth_col"}>
                              {b === 0 ? a : Number(a).toFixed(2)}
                            </td>
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
    </div>
  );
}

export default RadiusMeter;
