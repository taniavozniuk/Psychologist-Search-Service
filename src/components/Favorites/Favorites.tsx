import { useFavourites } from "../../hooks/FavouritesContext";
import "./Favorites.scss";
import liked from "../../image/liked.svg";
import spec from "../../image/AboutPsychologist/people.svg";
import favoriteYet from "../../image/Profile/favoriteYet.svg";
import { NavLink, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getLikedPsychologist } from "../../api/api";
import nextBt from "../../image/nextBt.svg";
import prevBt from "../../image/prevBt.svg";
import { useCallback, useEffect, useState } from "react";
import { getLikedPsychologist } from "../../api/api";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";

export const Favorites = () => {
  const {
    // favorites,
    toggleFavorite,
    // totalPages,
    // setSearchParams,
    // setCurrentPage,
    // currentPage,
    // searchParams,
  } = useFavourites();
  // console.log("FAVORITES:", favorites);
  const [totalPages, setTotalPages] = useState(1);
  const itemPrePage = 3;
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки
  const pageFromParams = Number(searchParams.get("page")) || 1; // стосується url сторінки
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const [favorites, setFavorites] = useState<allFilterPsychologist[]>([]);
  console.log({ favorites }); 
  
  const fetchFavorites = useCallback(async () => {
    try {
      searchParams.set("page", currentPage.toString());
      searchParams.set("size", itemPrePage.toString());
      const data = await getLikedPsychologist(searchParams);
      setFavorites(data.psychologists);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Failed to load liked psychologists:", error);
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="UserPage">
      <div className="profilePage">
        <div className="favoritesConteiner">
          {favorites.length === 0 ? (
            <div className="nothing">
              <h1 className="profileTitleNotYet">No favorites yet</h1>
              <p className="favoritesDesNotYet">
                Save specialists you trust to easily find them later.
              </p>
              <img
                src={favoriteYet}
                alt="No favorites"
                className="noFavoritesImage"
              />
            </div>
          ) : (
            <>
              <h1 className="profileTitle">Your Saved Specialists</h1>
              <p className="favoritesDes">
                Your personal list of trusted professionals — carefully saved so
                you can come back to them anytime you're ready to continue your
                journey.
              </p>

              <div className="favourites__card">
                {favorites.map((psychologist) => (
                  <div key={psychologist.id} className="psychologistLike">
                    <div className="wrapperPsychologistLike">
                      <img
                        src={psychologist.imageUrl}
                        className="psychologistLikeImg"
                        alt="Profile"
                      />
                      <button
                        className="psychologistFolow"
                        onClick={() =>
                          toggleFavorite(psychologist, fetchFavorites)
                        }
                      >
                        <img src={liked} alt="like" className="like" />
                      </button>
                    </div>
                    <div className="psychologistWrapperInfo">
                      <h3 className="psychologistName">
                        {psychologist.firstName} {psychologist.lastName}
                      </h3>
                      <p className="psychologistLikePrice">
                        <span className="priceLabel">Price:</span>
                        <span className="priceAmount">
                          ${psychologist.sessionPrice}
                        </span>
                        <span className="duration"> • 50 min</span>
                      </p>

                      <span className="likeLine"></span>

                      <div className="Specialization">
                        <div className="Spec">
                          <img src={spec} alt="spec" />
                          <h6 className="InfoTitle">Specialization</h6>
                        </div>
                        <p className="specName">
                          {psychologist.speciality?.name}
                        </p>
                      </div>

                      <NavLink
                        to={`/psychologist/${psychologist.id}`}
                        className="viewProfile"
                      >
                        View Profile
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
          ))}
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
    </div>
  );
};
