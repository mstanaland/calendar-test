import "./App.css";

import { Calendar } from "./Calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

import { availabilities } from "../data/availabilities";

function convertDateToApiKey(date) {
  const dateStringBit = date.toDate().toISOString().split("T")[0];
  const dateKey = `${dateStringBit}T00:00:00Z`;
  return dateKey;
}

function renderCalendarDay(date) {
  const dateKey = convertDateToApiKey(date);
  const availType = availabilities[dateKey];

  let jsx = null;
  let className = "";

  if (availType === "Available") {
    jsx = <div className="text-sm leading-none">A</div>;
    className = "available";
  } else if (availType === "Reserved") {
    jsx = <div className="text-sm leading-none">R</div>;
    className = "reserved";
  } else if (availType === "FF") {
    jsx = <div className="text-xs leading-none">FF</div>;
    className = "ff";
  }

  return {
    jsx,
    className,
  };
}

function isDateUnavailable(date) {
  const dateKey = convertDateToApiKey(date);
  const availType = availabilities[dateKey];

  if (availType === "Reserved") {
    return true;
  }

  return false;
}

function App() {
  return (
    <div className="flex flex-col items-center">
      {/* prettier-ignore */}
      <p className="mt-8 mb-16 text-gray-600">This sandbox shows examples of <strong><code>Calendar</code></strong>, and <strong><code>RangeCalendar</code></strong> components built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank" className="text-blue-700 underline">React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" className="text-blue-700 underline">Tailwind CSS</a>.</p>
      <h2 className="ml-12 font-bold text-3xl text-gray-700">Calendar</h2>
      <Calendar
        minValue={today(getLocalTimeZone())}
        defaultValue={today(getLocalTimeZone())}
        numVisibleMonths={4}
        isDateUnavailable={isDateUnavailable}
        renderCalendarDay={renderCalendarDay}
      />
    </div>
  );
}

export default App;
