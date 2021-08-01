interface TimeZonesProps {
  time: Date;
}

function TimeZones(props: TimeZonesProps) {
  return (
    <div
      style={{ color: "white", borderStyle: "dashed", borderColor: "green" }}
    >
      <p>
        EVE - GMT:{" "}
        {props.time.toLocaleString("en-US", {
          timeZone: "Atlantic/Reykjavik",
        })}
      </p>
      <p>
        CN - UTC+8:{" "}
        {props.time.toLocaleString("en-US", {
          timeZone: "Asia/Shanghai",
        })}
      </p>
      <p>
        PDT - UTC-7:{" "}
        {props.time.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        })}
      </p>
      <p>
        EDT - UTC-4:{" "}
        {props.time.toLocaleString("en-US", {
          timeZone: "America/New_York",
        })}
      </p>
    </div>
  );
}

export default TimeZones;
