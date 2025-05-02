// import React from "react";
// import { allFilterPsychologist } from "../../types/allFilterPsychologist";

// interface Prpps {
//   psychologist: allFilterPsychologist[];
// }

// export const PsychogistItem: React.FC<Prpps> = ({ psychologist }) => {
//   return (
//     <div key={psychologist.id} className="psychologist__card">
//       <div className="psychologistWrapper__info">
//         <div className="psychologistInfo__NamePrice">
//           <h3 className="psychologistInfo__name">
//             {psych.firstName} {psych.lastName}
//           </h3>
//         </div>

//         <span className="psychologistInfo__line"></span>

//         <div className="psychologistWrapper__about">
//           <h2 className="psychologistAbout__title">About the psychologist</h2>

//           <div className="Specialization">
//             <div className="InfoWrraper">
//               <img src={spec} alt="spec" />
//               <h6 className="InfoTitle">Specialization</h6>
//             </div>
//             <p className="specName">{psych.speciality?.name}</p>
//           </div>
//         </div>

//         <span className="psychologistInfo__line"></span>

//         {/* Approaches */}
//         <div className="Approaches">
//           <div className="InfoWrraperAppro">
//             <img src={messange} alt="appro" />
//             <h6 className="InfoTitle">Therapeutic Approach</h6>
//           </div>
//           <p className="InfoDescription">
//             {psych.approaches?.map((appro) => appro.name).join(", ")}
//           </p>
//         </div>

//         <span className="psychologistInfo__line"></span>

//         {/* Concerns */}
//         <div className="Concerns">
//           <div className="InfoWrraperAppro">
//             <img src={brain} alt="con" />
//             <h6 className="InfoTitle">Issues</h6>
//           </div>
//           <p className="InfoDescription">
//             {psych.concerns?.map((con) => con.name).join(", ")}
//           </p>
//         </div>

//         <NavLink to={`/psychologist/${psych.id}`} className="viewProfile">
//           View Profile
//         </NavLink>
//       </div>
//     </div>
//   );
// };
