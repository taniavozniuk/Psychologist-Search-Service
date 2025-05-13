// import { useNavigate } from "react-router-dom";
import "./userPage.scss";
import Defolt from "../../image/Profile/defalt.jpg";

import edit from "../../image/Profile/edit.svg";
import { useUserPageHook } from "./useUserPageHook";
import { Loader } from "../Loader/Loader";

export const UserPage = () => {
  const {
    user,
    profilePhoto,
    firstName,
    hasFirstNameError,
    errorFirstName,
    lastName,
    hasLastNameError,
    errorLastName,
    handleFirstNameChange,
    handleLastNameChange,
    handlePhotoUpload,
    email,
    hasEmailError,
    handleEmailChange,
    errorEmail,
    day,
    hasDayError,
    errorDay,
    handleDayChange,
    month,
    hasMonthError,
    errorMonth,
    handleMonthChange,
    year,
    hasYearError,
    errorYear,
    handleYearChange,
    handleSave,
  } = useUserPageHook();

  if (!user)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );

  return (
    
    <div className="UserPage">
      <div className="profileConteiner">
        <h1 className="profileTitle">Profile information</h1>

        <div className="profilePage">
          <div className="profilePhoto">
            {profilePhoto ? (
              <img src={profilePhoto} alt="photo" className="profilePreview" />
            ) : (
              <img src={Defolt} alt="photo" className="profilePreview" />
            )}
            <label className="uploadButton">
              <img src={edit} className="edit" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                hidden
              />
            </label>
          </div>
          {/* <div> */}
          <form className="profileInfo">
            <div className="boxName">
              <div className="field__FirstName">
                <label className="label__FirstName" htmlFor="SingIn-FirstName">
                  First Name
                </label>

                <div className="FirstNameBox">
                  <input
                    type="text"
                    id="SingIn-FirstName"
                    className={`ProfileInputFirstName ${
                      hasFirstNameError ? "is-danger" : ""
                    } `}
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  {hasFirstNameError && (
                    <p className="help is-danger">{errorFirstName}</p>
                  )}
                </div>
              </div>

              <div className="field__LastName">
                <label className="label__LastName" htmlFor="SingIn-LastName">
                  Last Name
                </label>

                <div className="LastNameBox">
                  <input
                    type="text"
                    id="SingIn-LastName"
                    className={`ProfileInputLastName ${
                      hasLastNameError ? "is-danger" : ""
                    } `}
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {hasLastNameError && (
                    <p className="help is-danger">{errorLastName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="Profilefield__Email">
              <label className="label__email" htmlFor="SingIn-email">
                Email
              </label>

              <div className="emailBox">
                <input
                  type="email"
                  id="SingIn-email"
                  className={`inputEmail ${hasEmailError ? "is-danger" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {hasEmailError && <p className="help is-danger">{errorEmail}</p>}
            </div>

            <div className="ProfileFieldDateBirth">
              <h2 className="titleDayBirth">Date of Birth</h2>
              <div className="infoBirth">
                <div className="ProfileFieldBirth">
                  <label className="labelBirth" htmlFor="Day">
                    Day
                  </label>

                  <div className="BirthBox">
                    <input
                      type="text"
                      id="Day"
                      className={`inputBirth ${hasDayError ? "is-danger" : ""}`}
                      value={day}
                      onChange={handleDayChange}
                    />
                  </div>
                  {errorDay && <p className="help is-danger">{errorDay}</p>}
                </div>

                <div className="ProfileFieldBirth">
                  <label className="labelBirth" htmlFor="Month">
                    Month
                  </label>

                  <div className="BirthBox">
                    <input
                      type="text"
                      id="Month"
                      className={`inputBirth ${
                        hasMonthError ? "is-danger" : ""
                      }`}
                      value={month}
                      onChange={handleMonthChange}
                    />
                  </div>
                  {errorMonth && <p className="help is-danger">{errorMonth}</p>}
                </div>

                <div className="ProfileFieldBirth">
                  <label className="labelBirth" htmlFor="Year">
                    Year
                  </label>

                  <div className="BirthBox">
                    <input
                      type="text"
                      id="Year"
                      className={`inputBirthYear ${
                        hasYearError ? "is-danger" : ""
                      }`}
                      value={year}
                      onChange={handleYearChange}
                    />
                  </div>
                  {errorYear && <p className="help is-danger">{errorYear}</p>}
                </div>
                <button className="saveBirth" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <span className="Profileline"></span>

        <div className="DeleteBox">
          <div className="TextBox">
            <h2 className="deleteTitle">Delete Profile</h2>
            <p className="deleteDes">
              Deleting your profile will permanently remove your account,
              booking history, and saved specialists. This action cannot be
              undone.
            </p>
          </div>
          <div className="btBox">
            <button className="BtDelete">Delete My Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};
