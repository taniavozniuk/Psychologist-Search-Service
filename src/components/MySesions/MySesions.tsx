import { useEffect, useState } from "react";
import { canceledPaymnt, getBookingUser } from "../../api/api";
import { useAuth } from "../../hooks/AuthContext";
import "./MySesions.scss";
import { MyBokking } from "../../types/MyBooking";
import bookNotYet from "../../image/Profile/bookNotYet.svg";

export const MySesions = () => {
  const [booking, setBooking] = useState<MyBokking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingUser();
        console.log("Отримані бронювання:", data);
        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    if (user?.id) {
      fetchBooking();
    }
  }, [user]);

  const handleViewDetails = (bookingId: number) => {
    console.log("View details for booking:", bookingId);
    // TODO: відкрий модалку або перейди на сторінку деталей
  };

  const handleCancel = async (bookingId: number) => {
    console.log("Cancel booking:", bookingId);

    try {
      // Потім скасовуємо саму бронь
      await canceledPaymnt(bookingId);
      console.log("Бронювання скасовано");

      // Оновлюємо стан бронювань — помічаємо, що ця бронь скасована
      setBooking((prevBooking) =>
        prevBooking.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (error) {
      console.error("Помилка при скасуванні бронювання:", error);
    }
  };

  return (
    <div className="UserPage">
      <div className="profilePage">
        <div className="bookConteiner">
          {booking.length > 0 ? (
            <>
              <h1 className="profileTitle">Your Appointments & Payments</h1>
              <div className="dookCard">
                <table className="bookingList">
                  <thead className="thead">
                    <tr className="tr">
                      <th className="th">Date & Time</th>
                      <th className="th">Specialist</th>
                      <th className="th">Amount</th>
                      <th className="th">Status</th>
                      <th className="th">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="tbody">
                    {booking.map((bookings) => (
                      <tr key={bookings.id} className="tr">
                        <td className="td">
                          {new Date(bookings.startTime).toLocaleString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </td>

                        <td className="td">
                          Dr. {bookings.psychologistDto.firstName}{" "}
                          {bookings.psychologistDto.lastName}
                        </td>

                        <td className="td">
                          $ {bookings.psychologistDto.sessionPrice}
                        </td>

                        <td className="td">
                          <span
                            className={`status status-${bookings.status.toLowerCase()}`}
                          >
                            {bookings.status.charAt(0).toUpperCase() +
                              bookings.status.slice(1).toLowerCase()}
                          </span>
                        </td>

                        <td className="td">
                          {bookings.status.toLowerCase() === "pending" && (
                            <button
                              className="action-button cancel-button"
                              onClick={() => handleCancel(bookings.id)}
                            >
                              Cancel
                            </button>
                          )}

                          {bookings.status.toLowerCase() === "paid" && (
                            <button
                              className="action-button details-button"
                              onClick={() => handleViewDetails(bookings.id)}
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="noBookings">
              <h1 className="profileTitle">
                You haven’t booked any sessions yet
              </h1>

              <p className="favoritesDesNotYet">
                Find a specialist who fits your needs and schedule your first
                session.{" "}
              </p>
              <img
                src={bookNotYet}
                alt="No bookings"
                className="noBookImage"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
