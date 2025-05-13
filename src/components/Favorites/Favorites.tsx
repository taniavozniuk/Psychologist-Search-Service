import { useFavourites } from "../../hooks/FavouritesContext";
import "./Favorites.scss";
import liked from "../../image/liked.svg";
import spec from "../../image/AboutPsychologist/people.svg";
import { NavLink } from "react-router-dom";

export const Favorites = () => {
  const { favorites, toggleFavorite } = useFavourites();
  console.log("FAVORITES:", favorites);

  return (
    <div className="UserPage">
      <div className="profilePage">
        <div className="favoritesConteiner">
          <h1 className="profileTitle">Your Saved Specialists</h1>
          <p className="favoritesDes">
            Your personal list of trusted professionals — carefully saved so you
            can come back to them anytime you're ready to continue your journey.
          </p>

          {favorites.length === 0 ? (
            <div className="nothing">
              <p>вподобаних немає</p>
            </div>
          ) : (
            <div className="favourites__card">
              {favorites.map((psychologist) => (
                <div key={psychologist.id} className="psychologistLike">
                  {/* <img src={psychologist.imageUrl} className="psychologistLikeImg"/> */}
                  <div className="wrapperPsychologistLike">
                    <img
                      src={psychologist.imageUrl}
                      className="psychologistLikeImg"
                      alt="Profile"
                    />
                    <button
                      className="psychologistFolow"
                      onClick={() => toggleFavorite(psychologist)}
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
          )}
        </div>
      </div>
    </div>
  );
};
