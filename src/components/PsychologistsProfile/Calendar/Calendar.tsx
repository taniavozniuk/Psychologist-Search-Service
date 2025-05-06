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
        if (!id || !selectedDate) return;
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        const data = await getDateBokkingId(id, selectedDateString);
        console.log("API response:", selectHour, data);
        
        setSelectHour(data);

        // if (JSON.stringify(data) !== JSON.stringify(selectHour)) {
        //   setSelectHour(data);
        // }
      } catch (error) {
        console.log("error BokkingId", error);
      }
    };
    fetchData();
  }, [id, selectedDate]);

  useEffect(() => {
    console.log("selectedDate changed:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("selectHour updated:", selectHour);
  }, [selectHour]);

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

  const handleDayClick = async (day: number | null) => {
    if (day === null || !id) return;
    const fullDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day + 1,
      0, 0, 0, 0
    );

    setSelectedDate(fullDate);
    const formatted = fullDate.toISOString().split("T")[0];
    try {
      const data = await getDateBokkingId(id, formatted);
      setSelectHour(data);
      console.log("Fetched for selected day:", data);
    } catch (error) {
      console.error("Failed to fetch hours for selected date", error);
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
  
    // const match =
    //   hourDate.getFullYear() === selectedDate.getFullYear() &&
    //   hourDate.getMonth() === selectedDate.getMonth() &&
    //   hourDate.getDate() === selectedDate.getDate();
  
    // if (!match) {
    //   console.log("Skipping:", hourDate.toISOString(), "!= selected", selectedDate.toISOString());
    // }
  
    return hourDate;
  });

  console.log('availableTimes', availableTimes);
  
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
