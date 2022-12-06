import './About.css'
import React from 'react';
var chris = require('../assets/chris.jpg');
var selina = require('../assets/selina.jpg');
var jean = require('../assets/jean.jpg');
var bridget = require('../assets/bridget.jpg');


function About() {
  const arr = ['We are an ambitious group of engineering students at Notre Dame that decided', <br />,
  'that filling our bellies should be of top priority,', <br />,
  'and that is why we built this app.', <br />,
  'Feel free to reach out to any of us on Linkedin with any inquiries,', <br />,
  'and enjoy the app with its quirks and features!', <br />];
  return (
    <div className='about-page'>
        <h1>The first NDeaters!</h1>

        <div className='student-wrapper'>
          <div className='student-info'>
            <img src={chris} alt="Chris"/>
            <p>Chris Boumalhab</p>
            <p>CS at Notre Dame 2024</p>
          </div>

          <div className='student-info'>
            <img src={bridget} alt="Bridget"/>
            <p>Bridget Goodwine</p>
            <p>EE & CE at Notre Dame 2023</p>
          </div>

          <div className='student-info'>
            <img src={selina} alt="Selina"/>
            <p>Selina Nie</p>
            <p>CS at Notre Dame 2023</p>
          </div>

          <div className='student-info'>
            <img src={jean} alt="Jean"/>
            <p>Jean-Francois Boueri</p>
            <p>CE at Notre Dame 2023</p>
          </div>
        </div>

        <p className='title'>Hey fellow user! Glad you found the about page :)</p>
        <p className='description'>{arr}</p>

    </div>
  );
}

export default About;