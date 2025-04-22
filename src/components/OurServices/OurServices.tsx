import { services } from "./services";
import "./OurServices.scss";

export const OurServices = () => {
  return (
    <div className="ourServices">
      {/* <div className="line"></div> */}
      <h3 className="section__title">Our services</h3>
      {/* <div className="line"></div> */}

      <div className="services__card">
        {services.map((service, index) => (
          <>
            <div className="card__services" key={index}>
              <img
                src={service.image}
                alt={service.title}
                className="services__image"
              />
              <div className="services__text">
                <h2 className="servides__title">{service.title}</h2>
                <p className="services__description">{service.description}</p>
              </div>
            </div>
            {index !== services.length - 1 && (
              <span className="services__line"></span>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
