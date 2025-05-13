import { useEffect, useState } from "react";
import { Booking } from "../../types/bookings";
import { getBookingUser } from "../../api/api";
import { useAuth } from "../../hooks/AuthContext";

export const MySesions = () => {
  const [booking, setBooking] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingUser();
        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    if (user?.id) {
      fetchBooking();
    }
  }, [user]);

  return (
    <div className="UserPage">
      <div className="profilePage">
        <h1 className="profileTitle">Your Appointments & Payments</h1>

        {booking.length > 0 ? (
          <ul className="bookingList">
            {booking.map((bookings) => (
              <li key={bookings.id} className="bookingItem">
                <p><strong>Date:</strong> {new Date(bookings.startTime).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(bookings.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <p><strong>Status:</strong> {bookings.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You don’t have any bookings yet.</p>
        )}
      </div>
    </div>
  );
};
