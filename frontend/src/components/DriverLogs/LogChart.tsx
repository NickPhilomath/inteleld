import { Log } from "../..";
import chartday from "../../assets/chartday.svg";

const dayInSeconds = 24 * 60 * 60;

const logStatusMap = [
  { status: "of", top: 13 },
  { status: "pc", top: 13 },
  { status: "sb", top: 37 },
  { status: "dr", top: 63 },
  { status: "on", top: 87 },
  { status: "ym", top: 87 },
];

const timeInSeconds = (time: string) => {
  var a = time.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  return seconds;
};

const getLogLeft = (time: string) => {
  var seconds = timeInSeconds(time);
  var left = (seconds * 100) / dayInSeconds; // calculate left margin in %
  return left + "%";
};

const getLogWidth = (data: Log[], index: number) => {
  var l1 = timeInSeconds(data[index].time);
  var l2 =
    index === data.length - 1
      ? dayInSeconds
      : timeInSeconds(data[index + 1].time);

  var width = ((l2 - l1) * 100) / dayInSeconds;

  return width + "%";
};

const getLogVertical = (data: Log[], index: number) => {};

const LogChart = ({ logs }: { logs: Log[] }) => {
  return (
    <div className="chart">
      <img src={chartday} alt="chartday" className="chart-image" />
      <div className="chart-wrapper">
        {logs?.map((log, index) => {
          return (
            <span
              key={log.id}
              className={log.status}
              style={{
                left: getLogLeft(log.time),
                width: getLogWidth(logs, index),
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default LogChart;
