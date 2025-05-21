import { useState } from "react";
import starts from "../../image/Profile/StartsGray.svg";
import startsActive from "../../image/Profile/StartsActive.svg";
import ConcernsBtClose from "../../image/ConcernsBtClose.svg";
import ConcernsBtOpen from "../../image/ConcernsBtOpen.svg";
import user from "../../image/user.svg";
import "./FeedbackForm.scss";
import { MyBokking } from "../../types/MyBooking";
import { postReview } from "../../api/api";
import { Review } from "../../types/Postreview";

interface FeetbackFormProps {
  showFeatbackForm: () => MyBokking[];
}

export const FeetbackForm: React.FC<FeetbackFormProps> = ({
  showFeatbackForm,
}) => {
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<
    number | null
  >(null);

  const [text, setText] = useState("");
  const [hasTextError, setHasTextError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [rating, setRating] = useState(0);

  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

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

  const handlePsychologistSelect = (id: number) => {
    setSelectedPsychologistId(id);
    console.log("Selected psychologistId:", id);
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!selectedPsychologistId) {
      alert("Please select a specialist");
      hasError = true;
    }

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
      psychologistId: selectedPsychologistId!,
      reviewText: text,
      rate: rating,
    };

    try {
      const response = await postReview(newReviews, selectedPsychologistId!);
      console.log("Review response:", response);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const confirmedBookings = showFeatbackForm();

  const uniquePsychologists = confirmedBookings.reduce(
    (acc: MyBokking[], current) => {
      const exists = acc.find(
        (booking) => booking.psychologistDto.id === current.psychologistDto.id
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  return (
    <div className="feetbackForm">
      <div className="feetbackText">
        <h2 className="feetbackTitle">How was your session?</h2>
        <p className="feetbackDes">
          We’d love to hear your thoughts. Your feedback helps us make your next
          experience even better.
        </p>
      </div>

      <span className="feetbackLine"></span>

      <div className="listPsychologist">
        <div className="wrapperList">
          <h2 className="titleList">Choose a specialist</h2>
          <button className="model__concernsBt" onClick={handleConcernsList}>
            <img
              src={isOpen ? ConcernsBtOpen : ConcernsBtClose}
              alt="Toggle concerns"
            />
          </button>
        </div>
        {isOpen && (
          <div className="itemFeed">
            <ul className="ulFeed">
              {uniquePsychologists.map((psychologist) => (
                <li
                  className={`feedItem psyWrapper ${
                    selectedPsychologistId === psychologist.psychologistDto.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handlePsychologistSelect(psychologist.psychologistDto.id)
                  }
                >
                  <img src={user} alt="iconPsy" className="iconPsy" />
                  Dr. {psychologist.psychologistDto.firstName}{" "}
                  {psychologist.psychologistDto.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}
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
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>

        <div className="starDes">
          <p className="text Hated">Hated it</p>
          <p className="text Loved">Loved it</p>
        </div>

        <form className="feetbackForm" onSubmit={(e) => e.preventDefault()}>
          <div className="textFeetback">
            <label className="labetFeetback" htmlFor="Feetback">
              What’s on your mind?
            </label>
            <div className="feetbackBox">
              <textarea
                id="Feetback"
                className={`inputFeetback ${hasTextError ? "is-danger" : ""}`}
                value={text}
                onChange={handleTextChange}
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
  );
};
