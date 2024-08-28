import React from "react";
import Clock from "react-live-clock";

function Time_Zone_Clock() {
  return (
    <>
      London -{" "}
      <Clock format={"HH:mm:ss"} ticking={true} timezone={"Europe/London"} />
      <br />
      India -
      <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Calcutta"} />
      <br />
      US - <Clock format={"HH:mm:ss"} ticking={true} timezone={"US/Pacific"} />
    </>
  );
}
export default Time_Zone_Clock;
