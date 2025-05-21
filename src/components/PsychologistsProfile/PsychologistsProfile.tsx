import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PsychologId } from "../../types/psychologId";
import { getPsychologistId, getReview } from "../../api/api";
import "./PsychologistsProfile.scss";
import Price from "../../image/Profile/price.svg";
import Experience from "../../image/Profile/Experience.svg";
import Languages from "../../image/Profile/Languages.svg";
import education from "../../image/Profile/education-filled.svg";
import activeStarts from "../../image/Profile/StartsActive.svg";
import Starts from "../../image/Profile/StartsGray.svg";

import { USE, WORKWITH } from "./workWith";
import Calendar from "./Calendar/Calendar";
import { Loader } from "../Loader/Loader";
import { GetReviews } from "../../types/GetReviews";
import { FadeInSection } from "../../utils/useInViewAnimation";

export const PsychologistProfile = () => {
  const [psycholog, setPsycholog] = useState<PsychologId | null>(null);
  const [review, setReview] = useState<GetReviews[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getPsychologistId(id);
        setPsycholog(data);
      } catch (error) {
        console.error("Failed to fetch psychologist by ID:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const psychologistId = Number(id);
      try {
        const data = await getReview(psychologistId);
        setReview(data);
        console.log({ data });
      } catch (error) {
        console.error("fetchData getReview:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="profile">
      {psycholog ? (
        <>
          <div className="wrapperProfile">
            <img
              src={psycholog.imageUrl}
              className="profileImg"
              alt="psychologist"
            />

            <div className="Information">
              <div className="wrappeInfo">
                <div className="profileWrapperName">
                  <h2 className="profileName">
                    {psycholog.firstName} {psycholog.lastName}
                  </h2>
                  <p className="profileIntroduction">
                    {psycholog.introduction}
                  </p>
                </div>
              </div>

              <span className="prodileLine"></span>

              <div className="ProfileBox">
                <div className="wrapperBox">
                  <div className="BoxTitle">
                    <img src={Price} alt="price" />
                    <h2 className="boxTitle">Price</h2>
                  </div>
                  <div className="boxDescription">
                    <p className="profileDescription">
                      ${psycholog.sessionPrice} • 50 min
                    </p>
                  </div>
                </div>

                <span className="prodileLine"></span>

                <div className="wrapperBox">
                  <div className="BoxTitle">
                    <img src={Experience} alt="experience" />
                    <h2 className="boxTitle">Experience</h2>
                  </div>
                  <div className="boxDescription">
                    <p className="profileDescription">
                      Helping clients for {psycholog.experience} years
                    </p>
                  </div>
                </div>

                <span className="prodileLine"></span>

                <div className="wrapperBox">
                  <div className="BoxTitle">
                    <img src={Languages} alt="languages" />
                    <h2 className="boxTitle">Languages</h2>
                  </div>
                  <div className="boxDescription">
                    <p className="profileDescription">{psycholog.languages}</p>
                  </div>
                </div>
              </div>

              <span className="prodileLine"></span>

              <div className="wrapperBox">
                <div className="BoxTitle">
                  <img src={education} alt="education" />
                  <h2 className="boxTitle">Education</h2>
                </div>
                <div className="boxDescription">
                  <p className="profileDescription">{psycholog.education}</p>
                </div>
              </div>
            </div>
          </div>

          <FadeInSection>
            <div className="profileAbout">
              <h2 className="AboutTitle">About Me</h2>
              <p className="AboutDescription">
                I’m a practicing psychologist with {psycholog.experience} years
                of experience in individual therapy. I combine cognitive
                behavioral therapy techniques with the principles of Gestalt
                therapy. I help people better understand themselves, their
                emotions, and how to build healthy relationships. Creating a
                safe space for open conversation is essential in my work.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="profileMainBlock">
              <div className="profileMainWrappeWork">
                <div className="workWith">
                  <h2 className="workWithTitle">What I Work With</h2>
                  <ul className="workWithList">
                    {WORKWITH.map((label, index) => (
                      <li className="workWithItem" key={index}>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="Use">
                  <h2 className="workWithTitle">What I Work With</h2>
                  <ul className="workWithList">
                    {USE.map((label, index) => (
                      <li className="workWithItem" key={index}>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="profileMainCalendar">
                <h2 className="planAppointment">Schedule Your Appointment</h2>
                <div className="calendarWrapper">
                  {psycholog && <Calendar psycholog={psycholog} />}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* ВІДГУКИ */}
          <div className="lastReviews">
            <h2 className="titleReviews">Last Reviews</h2>
            <div className="reviewsCard">
              {review.length > 0 ? (
                review.map((item) => (
                  <div className="reviewItem" key={item.id}>
                    <div className="reviewUser">
                      <h2 className="reviewNameAgeUser">
                        {item.reviewerName},
                      </h2>
                      <p className="reviewNameAgeUser">{item.reviewerAge}</p>
                    </div>
                    <div className="reviewStarts">
                      {Array.from({ length: 5 }, (_, i) => (
                        <img
                          key={i}
                          src={i < item.rate ? activeStarts : Starts}
                          alt={i < item.rate ? "active star" : "inactive star"}
                          className="reviewStarIcon"
                        />
                      ))}
                    </div>
                    <p className="reviewText">{item.reviewText}</p>

                    <span className="reviewLine"></span>
                    <div className="reviewWrapperDateSesion">
                      <p className="reviewDateSesions">
                        {item.sessionsCount} sessions
                      </p>
                      <p className="reviewDateSesions">
                        {new Date(item.reviewDate).toLocaleDateString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="noReviews">This psychologist has no reviews.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>
  );
};
