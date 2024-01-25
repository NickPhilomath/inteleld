import chartday from "../../assets/chartday.svg";
import useEntities from "../../hooks/useEntities";
import { Log } from "../..";

const dayInSeconds = 24 * 60 * 60;

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

const DriverLog = () => {
  const {
    data: logs,
    error,
    isLoading,
    refetch,
  } = useEntities<Log>({
    keys: ["logs"],
    url: "/drivers/1/logs/01-24-2024",
    staleTime: 3 * 60 * 1000,
    logoutOn404: true,
  });

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

export default DriverLog;
