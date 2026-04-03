import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Peoplecard.css';

const Peoplecard = ({ name, designation, img, occupation, email, phoneno }) => {
  return (
    <Tilt 
      tiltReverse={false}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1500}
      scale={1.05}
      transitionSpeed={1500}
      className="people-card-tilt"
    >
      <div className="people-card">
        <div className="people-card-img-container">
          <img src={img} alt={name} className="people-card-img" />
        </div>
        <div className="people-card-info">
          <h3 className="people-card-name">{name}</h3>
          <p className="people-card-designation">{designation}</p>
          {occupation && <p className="people-card-occupation">{occupation}</p>}
          {email && <p className="people-card-contact">📧 {email}</p>}
          {phoneno && <p className="people-card-contact">📞 {phoneno}</p>}
        </div>
      </div>
    </Tilt>
  );
};

export default Peoplecard;
