import React from 'react';
import { Tilt } from 'react-tilt';
import './Peoplecard.css';

const defaultTiltOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            10,     // max tilt rotation (degrees)
	perspective:    1500,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.05,   // 2 = 200%, 1.5 = 150%, etc..
	speed:          1500,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,   // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Peoplecard = ({ name, designation, img, occupation, email, phoneno }) => {
  return (
    <Tilt options={defaultTiltOptions} className="people-card-tilt">
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
