import { useEffect, useState } from "react";
import "./Calendar.scss";
import nextBt from "../../../image/nextBt.svg";
import prevBt from "../../../image/prevBt.svg";
import { getDateBokkingId, getLokedDates } from "../../../api/api";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectHour, setSelectHour] = useState<string[]>([]);
  const [lockedDates, setLockedDates] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const dni = ["S", "M", "T", "W", "T", "F", "S"];

  //фетчу дні які недоступні в календарі
  useEffect(() => {
    const fetcLockedhDates = async () => {
      try {
        if (!id) return;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const formattedMonth = `${year}-${month.toString().padStart(2, "0")}`;
        const data = await getLokedDates(id, formattedMonth);
        setLockedDates(data);
      } catch (error) {
        console.log("error fetch locked dates", error);
      }
    };

    fetcLockedhDates();
  }, [id, currentDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !selectedDate) return;
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        const data = await getDateBokkingId(id, selectedDateString);

        setSelectHour(data);

        // if (JSON.stringify(data) !== JSON.stringify(selectHour)) {
        //   setSelectHour(data);
        // }
      } catch (error) {
        console.log("error BokkingId", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("selectedDate changed:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("selectHour updated:", selectHour);
  }, [selectHour]);

  useEffect(() => {
    console.log("lockedDates", lockedDates);
  }, [lockedDates]);

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
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0,
        0
      )
    );

    setSelectedDate(fullDate);
    const formatted = fullDate.toISOString().split("T")[0];

    try {
      const data = await getDateBokkingId(id, formatted);
      console.log("API response:", selectHour, data);

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

    return hourDate;
  });

  console.log("availableTimes", availableTimes);

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
        {daysInMonth.map((day, index) => {
          const dateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day || 1
          );
          const dateString = `${dateObj.getFullYear()}-${(
            dateObj.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${dateObj
            .getDate()
            .toString()
            .padStart(2, "0")}`;

          const isDisabled = lockedDates.includes(dateString);

          return (
            <div
              key={index}
              className={`calendar-day ${day ? "" : "empty"} 
        ${selectedDate?.getDate() === day ? "selected" : ""} 
        ${isDisabled ? "locked" : ""}`}
              onClick={() => !isDisabled && day && handleDayClick(day)}
            >
              {day || ""}
            </div>
          );
        })}
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
