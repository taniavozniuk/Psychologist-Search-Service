import React, { useRef, useState } from "react";
import ModalCloce from "../../../image/modalClose.svg";
import "./Review.scss";
import { PsychologId } from "../../../types/psychologId";
import { Booking } from "../../../types/bookings";
import { addPayment } from "../../../api/api";
import { Payment } from "../../../types/Payment";
import { useOutsideClick } from "../../../hooks";

interface ReviewProps {
  onClose: () => void;
  formattedDate: string;
  formattedTime: string;
  psycholog: PsychologId;
  firtsName: string;
  lastName: string;
  email: string;
  booking: Booking;
  // handleReview: (email: string, firtsName: string, lastName: string) => void;
}
export const Review: React.FC<ReviewProps> = ({
  onClose,
  formattedDate,
  formattedTime,
  firtsName,
  lastName,
  email,
  psycholog,
  booking,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useOutsideClick(modalRef, onClose);
  const [, setPay] = useState<Payment | null>(null);

  const handlePayment = async () => {
    try {
      const paymentData: Payment = {
        id: 0,
        bookingId: booking?.id ?? 0,
        status: "PENDING",
        sessionId: "",
        sessionUrl: "",
        amount: psycholog.sessionPrice,
      };

      console.log("paymentData", paymentData);

      const paymentResponse = await addPayment(paymentData);
      setPay(paymentResponse);

      if (paymentResponse.sessionUrl) {
        window.open(paymentResponse.sessionUrl, "_blank"); // відкриває в новій вкладці
        onClose();
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <div className="Review-backdrop">
      <div className="Review-content" ref={modalRef}>
        <button className="closeModal" onClick={onClose}>
          <img src={ModalCloce} alt="close" />
        </button>
        <div className="AlmostWrapper">
          <div className="AlmostTitle">
            <h2 className="titleAlmost">Review Your Booking Details</h2>
            <p className="ReviewDes">
              Please make sure all information is correct before proceeding with
              payment.
            </p>
          </div>
        </div>

        <div className="ReviewBookInfo">
          <div className="bookNumder">
            <h2 className="yourBooking">Your Booking </h2>
            <p className="yourBookingNumber">#BK-{booking.id}</p>
          </div>

          <span className="reviewLine"></span>

          <div className="BoxInfo">
            <div className="firstWrapperInfo">
              <div className="boxsesInfo">
                <h2 className="boxsesTitle">Date</h2>
                <h2 className="boxsesDes">{formattedDate}</h2>
              </div>

              <div className="boxsesInfo2">
                <h2 className="boxsesTitle">Patient</h2>
                <h2 className="boxsesDes">
                  {firtsName} {lastName}
                </h2>
              </div>

              <div className="boxsesInfo3">
                <h2 className="boxsesTitle">Email</h2>
                <h2 className="boxsesDesEmail">{email}</h2>
              </div>
            </div>

            <div className="secondWrapperInfo">
              <div className="boxsesInfo">
                <h2 className="boxsesTitle">Time</h2>
                <h2 className="boxsesDes">{formattedTime}</h2>
              </div>

              <div className="boxsesInfo2">
                <h2 className="boxsesTitle">Patient</h2>
                <h2 className="boxsesDes">
                  Dr.{psycholog.firstName} {psycholog.lastName}
                </h2>
              </div>

              <div className="boxsesInfo2">
                <h2 className="boxsesTitle">Session Type</h2>
                <h2 className="boxsesDes">Online Session</h2>
              </div>
            </div>
          </div>
{/* 
          <span className="reviewLine"></span>

          <div className="totalSum">
            <h2 className="totalTitle">Total</h2>
            <h2 className="totalDes">${psycholog.sessionPrice}</h2>
          </div> */}

          <button
            className="ContiueToPay"
            onClick={() => {
              console.log("clicking payment");
              handlePayment();
            }}
          >
            Continue to Paymentsion
          </button>
        </div>
      </div>
    </div>
  );
};
