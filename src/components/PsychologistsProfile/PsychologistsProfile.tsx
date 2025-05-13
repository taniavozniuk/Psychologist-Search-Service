import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PsychologId } from "../../types/psychologId";
import { getPsychologistId } from "../../api/api";
import "./PsychologistsProfile.scss";
import Price from "../../image/Profile/price.svg";
import Experience from "../../image/Profile/Experience.svg";
import Languages from "../../image/Profile/Languages.svg";
import education from "../../image/Profile/education-filled.svg";

import { USE, WORKWITH } from "./workWith";
import Calendar from "./Calendar/Calendar";

export const PsychologistProfile = () => {
  const [psycholog, setPsycholog] = useState<PsychologId | null>(null);
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

  return (
    <div className="profile">
      {/* <h1>Psychologist Profile</h1> */}
      {psycholog ? (
        <div className="wrapperProfile">
          <img src={psycholog.imageUrl} className="profileImg" />

          <div className="Information">
            <div className="wrappeInfo">
              <div className="profileWrapperName">
                <h2 className="profileName">
                  {psycholog.firstName} {psycholog.lastName}
                </h2>
                <p className="profileIntroduction">{psycholog.introduction}</p>
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
                    ${psycholog.sessionPrice} . 50 min
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
                  <img src={Languages} alt="experience" />
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
                <img src={education} alt="experience" />
                <h2 className="boxTitle">Education</h2>
              </div>
              <div className="boxDescription">
                <p className="profileDescription">{psycholog.education}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="profileAbout">
        {/* <div className="profileAboutMe"> */}
        <h2 className="AboutTitle">About Me</h2>
        {/* </div> */}
        <p className="AboutDescription">
          I’m a practicing psychologist with {psycholog?.experience} years of
          experience in individual therapy. I combine cognitive behavioral
          therapy techniques with the principles of Gestalt therapy. I help
          people better understand themselves, their emotions, and how to build
          healthy relationships. Creating a safe space for open conversation is
          essential in my work.
        </p>
      </div>

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
            {psycholog && (
              <Calendar
                psycholog={psycholog}
                // firtsName={firtsName}
                // lastName={lastName}
                // email={email}
                // handleReview={handleReview}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
