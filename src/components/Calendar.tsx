import { useState } from "react";
import { DatePicker, TimePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useEffect } from "react";
import TimeZones from "./TimeZones";
import { API } from "aws-amplify";
import { createTime } from "../graphql/mutations";
import { listTimes } from "../graphql/queries";
import { TimeType } from "../utils/types";

interface CalendarProps {
  adminPassword: string;
}

const adminPassword = "IWantATShips";

function Calendar(props: CalendarProps) {
  const now = new Date();
  const [trainDateTime, setTrainDateTime] = useState<Date>(new Date());
  const [timeList, setTimeList] = useState<Array<TimeType>>([]);
  const [opponent, setOpponent] = useState("");

  useEffect(() => {
    fetchTimeList();
  }, []);

  const handleDateChange = (year: number, month: number, day: number) => {
    let newTrainDateTime = new Date(trainDateTime);
    newTrainDateTime.setUTCFullYear(year);
    newTrainDateTime.setUTCMonth(month);
    newTrainDateTime.setUTCDate(day);
    setTrainDateTime(newTrainDateTime);
  };

  const handleTimeChange = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    let newTrainDateTime = new Date(trainDateTime);
    newTrainDateTime.setUTCHours(hours);
    newTrainDateTime.setUTCMinutes(minutes);
    newTrainDateTime.setUTCSeconds(seconds);
    setTrainDateTime(newTrainDateTime);
  };

  const fetchTimeList = async () => {
    const apiData: any = await API.graphql({ query: listTimes });
    setTimeList(apiData.data.listTimes.items);
  };

  const uploadNewTime = async () => {
    if (props.adminPassword === adminPassword) {
      await API.graphql({
        query: createTime,
        variables: {
          input: {
            timeId: getNextTimeId(),
            timeString: trainDateTime.toUTCString(),
            opponent,
          },
        },
      });
      window.location.reload();
    } else {
      alert("Admin Password错误");
    }
  };

  const getNextTimeId = () => {
    return timeList.length === 0
      ? 0
      : timeList
          .map((time) => time.timeId)
          .reduce((carrier, curr) => (carrier = Math.max(carrier, curr, 0))) +
          1;
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "gray" }}>
      <div>
        <div style={{ paddingBottom: "0.5rem" }}>
          <label style={{ marginRight: "1rem", color: "white" }}>
            输入eve时间：
          </label>
          <DatePicker
            onChange={(date) => {
              if (date) {
                let newDate = date.toDate();
                handleDateChange(
                  newDate.getFullYear(),
                  newDate.getMonth(),
                  newDate.getDate()
                );
              }
            }}
          />
          <TimePicker
            onChange={(time) => {
              if (time) {
                let newTime = time.toDate();
                handleTimeChange(
                  newTime.getHours(),
                  newTime.getMinutes(),
                  newTime.getSeconds()
                );
              }
            }}
          />
          <input
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="对手"
          ></input>
          <button style={{ paddingLeft: "1rem" }} onClick={uploadNewTime}>
            添加训练赛(admin)
          </button>
        </div>
        <TimeZones time={trainDateTime}></TimeZones>
        <br />
      </div>
      <hr />
      <div style={{ color: "white" }}>
        未来的训练赛：
        {timeList
          .sort((t1, t2) => {
            const date1 = new Date(t1.timeString);
            const date2 = new Date(t2.timeString);
            return date1.getTime() - date2.getTime();
          })
          .map((t) => {
            const date = new Date(t.timeString);
            if (date > now) {
              return (
                <div>
                  <h2 style={{ color: "white" }}>
                    # {t.timeId} -VS- {t.opponent}
                  </h2>
                  <TimeZones time={date}></TimeZones>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Calendar;
