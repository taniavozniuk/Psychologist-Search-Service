// import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";

// const servicImgTablet = [
//   "../../image/OurServices/Img1.svg",
//   "../../image/OurServices/Img2.svg",
//   "../../image/OurServices/Img3.svg",
// ];

// const servicImgDesktop = [
//   "../../image/OurServices/tablet/Img1.svg",
//   "../../image/OurServices/tablet/Img2.svg",
//   "../../image/OurServices/tablet/Img3.svg",
// ];

// export const useServiceHooke = () => {
//   const isTablet = useMediaQuery({ maxWidth: 768 });
//   const [selectedImage, setSelectedImage] = useState(servicImgDesktop); // Default to desktop images

//   useEffect(() => {
//     if (isTablet) {
//       setSelectedImage(servicImgTablet); // Switch to tablet images when on tablet
//     } else {
//       setSelectedImage(servicImgDesktop); // Switch back to desktop images
//     }
//   }, [isTablet]); // This effect will run whenever `isTablet` changes

//   export const services = [
//     {
//       image: selectedImage[0],
//       title: "Smart Matching System",
//       description:
//         "Take a quick personalized quiz or use smart filters to find the best licensed therapist online. Whether you want guidance or prefer to choose on your own, we make the process easy and intuitive.",
//     },
//     {
//       image: selectedImage[1],
//       title: "Online Sessions",
//       description:
//         "Book secure online therapy sessions that fit your schedule. Connect with trusted mental health professionals from the comfort of your home.",
//     },
//     {
//       image: selectedImage[2],
//       title: "Continuous Support",
//       description:
//         "We offer long-term support to help you build healthy coping strategies, reduce stress, and improve your overall well-being with ongoing therapist sessions.",
//     },
//   ];
// };
