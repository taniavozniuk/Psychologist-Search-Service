import { useEffect, useState } from "react";
import "./Calendar.scss";
import nextBt from "../../../image/nextBt.svg";
import prevBt from "../../../image/prevBt.svg";
import { getDateBokkingId } from "../../../api/api";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const dni = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const todayString = new Date().toISOString().split("T")[0];
        const data = await getDateBokkingId(id, todayString);
        setSelectHour(data);
        console.log("fetch data BokkingId", data);
      } catch (error) {
        console.log("error BokkingId", error);
      }
    };

    fetchData();
  }, []);

  // функція для отримання днів місяця
  const getDaysInMonth = (date: Date) => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    // масив для заповнення клітинок календаря
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      const fullDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(fullDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const daysInMonth = getDaysInMonth(currentDate);

  //фільтрую години
  const availableTimes = selectHour?.filter((hour: string) => {
    if (!selectedDate) return false;

    const hourDate = new Date(hour);
    return (
      hourDate.getFullYear() === selectedDate.getFullYear() &&
      hourDate.getMonth() === selectedDate.getMonth() &&
      hourDate.getDate() === selectedDate.getDate()
    );
  });
  return (
    <div className="wrapperCalendar">
      <header className="headerCalendar">
        <h2 className="Month">
          {currentDate.toLocaleString("en-US", { month: "long" })}
        </h2>
        <div className="wrapperBt">
          <button className="prevMonth" onClick={handlePrevMonth}>
            <img src={prevBt} />
          </button>
          <button className="nextMonth" onClick={handleNextMonth}>
            <img src={nextBt} />
          </button>
        </div>
      </header>

      <span className="calendarLine"></span>

      <div className="calendarWeek">
        {dni.map((day, index) => (
          <div key={index} className="calendarWeekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? "" : "empty"}`}
            onClick={() => day && handleDayClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {selectedDate && (
        <>
          <span className="calendarLineSecond"></span>{" "}
          <div>
            <h2 className="hourTitle">Pick Your Preferred Time</h2>
            <div className="wrapperHour">
              {availableTimes?.map((time, index) => (
                <div key={index} className="hour">
                  {new Date(time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;