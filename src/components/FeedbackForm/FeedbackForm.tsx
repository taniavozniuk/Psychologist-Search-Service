import React, { useState } from "react";
import "./FeedbackForm.scss";
import ModalCloce from "../../image/modalClose.svg";
import starts from "../../image/Profile/StartsGray.svg";
import startsActive from "../../image/Profile/StartsActive.svg";
import { Review } from "../../types/Postreview";
import { postReview } from "../../api/api";

interface FeetbackProps {
  onClose: () => void;
  psychologistId: number;
}

export const FeetbackForm: React.FC<FeetbackProps> = ({
  onClose,
  psychologistId,
}) => {
  const [text, setText] = useState("");
  const [hasTextError, setHasTextError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [rating, setRating] = useState(0);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
    setHasTextError(false);
    setErrorText("");
  };

  const handleClickStarts = (index: number) => {
    if (rating === index + 1) {
      setRating(0); // скинути рейтинг
    } else {
      setRating(index + 1);
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!text.trim()) {
      setHasTextError(true);
      setErrorText("Please enter text");
      hasError = true;
    }

    if (rating === 0) {
      alert("Please select a rating");
      hasError = true;
    }

    if (hasError) return;

    const newReviews: Review = {
      psychologistId,
      reviewText: text,
      rate: rating,
    };

    try {
      const response = await postReview(newReviews, psychologistId);
      console.log("Review response:", response);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="modal-feetbak">
      <div className="feetback-content">
        <button className="closeModal" onClick={onClose}>
          <img src={ModalCloce} alt="close" />
        </button>

        <div className="feetbackText">
          <h2 className="feetbackTitle">Your opinion matters to us</h2>
          <p className="feetbackDes">
            We’re always working to make things better.Let us know what you
            think — your feedback helps us improve.
          </p>
        </div>

        <span className="feetbackLine"></span>

        <div className="wrapperStarsForm">
          <div className="stars stars--5">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? startsActive : starts}
                alt="star"
                className="star"
                onClick={() => handleClickStarts(index)}
              />
            ))}
          </div>

          <div className="starDes">
            <p className="text Hated">Hated it</p>
            <p className="text Loved">Loved it</p>
          </div>

          <form className="feetbackForm">
            <div className="textFeetback">
              <label className="labetFeetback" htmlFor="Feetback">
                What’s on your mind?
              </label>
              <div className="feetbackBox">
                <textarea
                  id="Feetback"
                  className={`inputFeetback ${hasTextError ? "is-danger" : ""}`}
                  value={text}
                  onChange={handleTextChange} // ← правильно
                  placeholder="Share your thoughts, suggestions, or anything you think we should know"
                  required
                />
                {hasTextError && <p className="help is-danger">{errorText}</p>}
              </div>
            </div>
          </form>

          <button className="feetbackSub" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
