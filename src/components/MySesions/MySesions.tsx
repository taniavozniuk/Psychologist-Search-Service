import "./MySesions.scss";
import bookNotYet from "../../image/Profile/bookNotYet.svg";
import { NavLink } from "react-router-dom";
import { useMySesionHook } from "./useMySesionsHook";
import { FeetbackForm } from "../FeedbackForm/FeedbackForm";
import feedback from "../../image/Profile/feedback.svg";
import modalCloce from "../../image/modalClose.svg";
import { useState } from "react";

export const MySesions = () => {
  const [, setonOpenFeedback] = useState(false);

  const {
    cancelModalOpen,
    viewDeteilsCancelModalOpen,
    booking,
    viewDeteilsConfirmedModal,
    viewExpiredModal,
    selectBookink,
    handleViewDetails,
    handleViewConfirmedDetails,
    handleViewExpired,
    openCancelModal,
    confirmCancel,
    setCancelModalOpen,
    setViewDeteilsCancelModalOpen,
    setViewDeteilsConfirmedModal,
    setviewExpiredModal,
  } = useMySesionHook();

  const showFeatbackForm = () => {
    return booking.filter((book) => {
      return book.status === "CONFIRMED";
    });
  };

  return (
    <div className="UserPage">
      <div className="profilePage">
        <div className="bookConteiner">
          <div className="feetbackConteiner">
            <FeetbackForm showFeatbackForm={showFeatbackForm} />
            <div className="wrapperClose">
              <button
                className="closeFeetback"
                onClick={() => setonOpenFeedback(false)}
              >
                <img src={modalCloce} alt="close" />
              </button>
              <img src={feedback} alt="feedbackImg" className="feedbackImg" />
            </div>
          </div>

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
                              className="action-button cancel"
                              onClick={() => openCancelModal(bookings.id)}
                            >
                              Cancel
                            </button>
                          )}

                          {bookings.status.toLowerCase() === "canceled" && (
                            <button
                              className="action-button details-button"
                              onClick={() => handleViewDetails(bookings.id)}
                            >
                              View Details
                            </button>
                          )}

                          {bookings.status.toLowerCase() === "confirmed" && (
                            <button
                              className="action-button details-button"
                              onClick={() =>
                                handleViewConfirmedDetails(bookings.id)
                              }
                            >
                              View Details
                            </button>
                          )}

                          {bookings.status.toLowerCase() === "expired" && (
                            <button
                              className="action-button expired-button"
                              onClick={() => handleViewExpired(bookings.id)}
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
                session.
              </p>
              <img src={bookNotYet} alt="No bookings" className="noBookImage" />
            </div>
          )}
        </div>
      </div>

      {cancelModalOpen && selectBookink && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modalTitleDeteils">Cancellation Confirmation</h2>
            <p className="modalDesDeteils">
              Are you sure you want to cancel your session with Dr.{" "}
              {selectBookink.psychologistDto.firstName}
              {selectBookink.psychologistDto.lastName}? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={confirmCancel} className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {viewDeteilsCancelModalOpen && selectBookink && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modalTitleDeteils">Session Details</h2>
            <p className="modalDesDeteils">
              This session with Dr. {selectBookink.psychologistDto.firstName}
              {selectBookink.psychologistDto.lastName} has been cancelled.
            </p>
            <p className="modalCancelOn">
              Cancelled on:{" "}
              <span className="cancelDate">
                {new Date(selectBookink.startTime).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setViewDeteilsCancelModalOpen(false)}
                className="cancel-button"
              >
                Close
              </button>
              <NavLink
                to={`/psychologist/${selectBookink.psychologistDto.id}`}
                className="reschedule-button"
              >
                Reschedule
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {viewDeteilsConfirmedModal && selectBookink && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modalTitleDeteils">Session Details</h2>
            <p className="modalDesDeteils">
              This session with Dr. {selectBookink.psychologistDto.firstName}
              {selectBookink.psychologistDto.lastName} has been confirmed.
            </p>
            <p className="modalCancelOn">
              Confirmed on:{" "}
              <span className="cancelDate">
                {new Date(selectBookink.startTime).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            <p className="sessionSumary">Session Summary:</p>
            <p className="discussed">
              Dr. {selectBookink.psychologistDto.firstName}
              {selectBookink.psychologistDto.lastName} discussed coping
              strategies for anxiety and stress management. Techniques and
              resources were shared during the session.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setViewDeteilsConfirmedModal(false)}
                className="cancel-button"
              >
                Close
              </button>
              <NavLink
                to={`/psychologist/${selectBookink.psychologistDto.id}`}
                className="reschedule-button"
              >
                Book Next
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {viewExpiredModal && selectBookink && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modalTitleDeteils">Session Details</h2>
            <p className="modalDesDeteils">
              This session with Dr. {selectBookink.psychologistDto.firstName}
              {selectBookink.psychologistDto.lastName} has expired.
            </p>
            <p className="modalCancelOn">
              Confirmed on:{" "}
              <span className="cancelDate">
                {new Date(selectBookink.startTime).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            <p className="sessionSumary">
              This session expired and can’t be accessed.
            </p>
            <p className="discussed">
              If you still need support, feel free to book a new session with
              the same specialist or explore other available professionals.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setviewExpiredModal(false)}
                className="cancel-button"
              >
                Close
              </button>
              <NavLink
                to={`/psychologist/${selectBookink.psychologistDto.id}`}
                className="reschedule-button"
              >
                Book Next
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
