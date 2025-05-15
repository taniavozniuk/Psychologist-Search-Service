import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { MyBokking } from "../../types/MyBooking";
import { canceledPaymnt, getBookingUser } from "../../api/api";

export const useMySesionHook = () => {
    const [booking, setBooking] = useState<MyBokking[]>([]);
  const { user } = useAuth();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [viewDeteilsCancelModalOpen, setViewDeteilsCancelModalOpen] =
    useState(false);
  const [viewDeteilsConfirmedModal, setViewDeteilsConfirmedModal] =
    useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

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
    setSelectedBookingId(bookingId);
    setViewDeteilsCancelModalOpen(true);
  };

  const handleViewConfirmedDetails = (bookingId: number) => {
    console.log("View details for booking:", bookingId);
    setSelectedBookingId(bookingId);
    setViewDeteilsConfirmedModal(true);
  };

  const handleCancel = async (bookingId: number) => {
    console.log("Cancel booking:", bookingId);

    try {
      //скасовуємо саму бронь
      await canceledPaymnt(bookingId);
      console.log("Бронювання скасовано");

      // оновлюю стан бронювань — помічаємо, що ця бронь скасована
      setBooking((prevBooking) =>
        prevBooking.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELED" } : b
        )
      );
    } catch (error) {
      console.error("Помилка при скасуванні бронювання:", error);
    }
  };

  const selectBookink = booking.find((b) => b.id === selectedBookingId);

  const openCancelModal = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (selectedBookingId !== null) {
      await handleCancel(selectedBookingId);
      setCancelModalOpen(false);
      setSelectedBookingId(null);
    }
  };

  return {
    cancelModalOpen,
    viewDeteilsCancelModalOpen,
    booking,
    viewDeteilsConfirmedModal,
    selectBookink,
    handleViewDetails,
    handleViewConfirmedDetails,
    openCancelModal,
    confirmCancel,
    setCancelModalOpen,
    setViewDeteilsCancelModalOpen,
    setViewDeteilsConfirmedModal,
  }
}