import "./PsychologistPI.scss";
import { NavLink } from "react-router-dom";
import spec from "../../image/AboutPsychologist/people.svg";
import messange from "../../image/AboutPsychologist/mesege.svg";
import brain from "../../image/AboutPsychologist/brain.svg";
import nextBt from "../../image/nextBt.svg";
import prevBt from "../../image/prevBt.svg";
import like from "../../image/like.svg";
import liked from "../../image/liked.svg";

import { usePsychologPIHook } from "./usePsychologPIHook";
import { Loader } from "../Loader/Loader";
import { useFavourites } from "../../hooks/FavouritesContext";
import React from "react";
// import { FindTherapist } from "../FindTherapist/FindTherapist";
export const PsychologistPageAll = () => {
  const {
    totalPages,
    currentPsychologists,
    handlePageChange,
    currentPage,
    loading,
    error,
    fetchData,
  } = usePsychologPIHook();
  const { toggleFavorite } = useFavourites();

  if (error) {
    return (
      <div className="error__container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="Page">
      <div className="wrapper">
        <h2 className="psychologists__title">Psychologists just for you</h2>
        <p className="psychologists__description">
          Here are the psychologists that match your criteria. Browse their
          profiles and choose the one that suits you best.
        </p>
      </div>

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {!loading && (
        <>
          <div className="page__psychologists">
            {currentPsychologists.map((psych) => {
              // const isFavotire = Array.isArray(favorites)
              //   ? favorites.some((fav) => fav.id === psych.id)
              //   : false;
              // const Favotire = favorites.some((p) => p.id === psych.id);

              const handleToogleFavorite = (e: React.MouseEvent) => {
                e.stopPropagation();
                toggleFavorite(psych, fetchData);
                
                console.log("Toggling favorite for:", psych.id);
                console.log("favorite click");
              };
              return (
                <div key={psych.id} className="psychologist__card">
                  <div className="psychologistWrapper__info">
                    <div className="wrapperImgEx">
                      <img
                        src={psych.imageUrl}
                        className="imgProf"
                        alt="Profile"
                      />
                      <div className="experience-badge">
                        {psych.experience} years' experience
                      </div>
                      <button className="folow" onClick={handleToogleFavorite}>
                        <img
                          src={psych.isLiked ? liked : like}
                          alt="like"
                          className="like"
                        />
                      </button>
                    </div>
                    <div className="warapperNamePrice">
                      <div className="psychologistInfo__NamePrice">
                        <h3 className="psychologistInfo__name">
                          {psych.firstName} {psych.lastName}
                        </h3>
                        <p className="psychologistInfo__price">
                          <span className="priceLabel">Price:</span>
                          <span className="priceAmount">
                            ${psych.sessionPrice}
                          </span>
                          <span className="duration"> • 50 min</span>
                        </p>
                      </div>

                      <span className="psychologistInfo__line"></span>

                      <div className="psychologistWrapper__about">
                        <h2 className="psychologistAbout__title">
                          About the psychologist
                        </h2>

                        <div className="Specialization">
                          <div className="InfoWrraper">
                            <img src={spec} alt="spec" />
                            <h6 className="InfoTitle">Specialization</h6>
                          </div>
                          <p className="specName">{psych.speciality?.name}</p>
                        </div>
                      </div>

                      <span className="psychologistInfo__line"></span>

                      {/* Approaches */}
                      <div className="Approaches">
                        <div className="InfoWrraperAppro">
                          <img src={messange} alt="appro" />
                          <h6 className="InfoTitle">Therapeutic Approach</h6>
                        </div>
                        <p className="InfoDescription">
                          {psych.approaches
                            ?.map((appro) => appro.name)
                            .join(", ")}
                        </p>
                      </div>

                      <span className="psychologistInfo__line"></span>

                      {/* Concerns */}
                      <div className="Concerns">
                        <div className="InfoWrraperAppro">
                          <img src={brain} alt="con" />
                          <h6 className="InfoTitle">Issues</h6>
                        </div>
                        <p className="InfoDescription">
                          {psych.concerns?.map((con) => con.name).join(", ")}
                        </p>
                      </div>

                      <NavLink
                        to={`/psychologist/${psych.id}`}
                        className="viewProfile"
                      >
                        View Profile
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
            {currentPsychologists.length === 0 && (
              <p className="no-results-message">
                No results found for the selected name and filters.
              </p>
            )}
          </div>
          <div className="prev__buttons">
            <button
              className={`prev__buttonsbuttonPrev ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <img src={prevBt} alt="prev" className="prev" />
            </button>
            <div className="WrapperPagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={`pagination ${
                      currentPage === number ? "active" : "notActive"
                    }`}
                    onClick={() => handlePageChange(number)}
                    disabled={currentPage === number}
                  >
                    {number}
                  </button>
                )
              )}
            </div>

            <button
              className={`prev__buttonsbuttonNext ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <img src={nextBt} alt="next" className="next" />
            </button>
          </div>
        </>
      )}

      {/* <FindTherapist psychologists={psychologists} /> */}
    </div>
  );
};
