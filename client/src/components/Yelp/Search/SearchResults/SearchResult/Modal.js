import './Modal.css';

import React from 'react';
import { FaSearch } from 'react-icons/fa';

//import axios from 'axios';

export function Modal({ open, children, onClose, props }) {
  if (!open) return null;

  const { name, location, rating, phone, url, image_url } = props;

  const address = `${location.address1}, ${location.city} ${location.state} ${location.zip_code}`;
  const placeholderImg = image_url
    ? image_url
    : 'https://via.placeholder.com/250';


  //   const getCoordsFromAddress = async(address) => {

  //     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=
  //       ${encodeURIComponent(address)}&key=AIzaSyAT-nlITvzakKRo0xMvxiovQyh2j6Lh6vg`)

  //       const data = response.data;
  //       //console.log(data);
  //       if(!data || data.status === 'ZERO_RESULTS') {
  //         console.log('could not find location for this address')
  //       }

  //       const coordinates = data.results[0].geometry.location;

  //       //return coordinates;
  //       console.log(coordinates);
  //   }

    
  // getCoordsFromAddress(address);

  const uriAddress = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  &q=${encodeURIComponent(address)}`



  return (
    <div className="modal-styles">
      <button onClick={onClose} className="close-button">
        {/* <Icon name="close" /> */}
        X
      </button>

      <div className="business-info-div">
        <img src={placeholderImg} className="business-img" alt="business" />

        <div>
          <h3>{name}</h3>
          <p>{address}</p>
          <img
          src={require(`../../../../Assets/img/yelp-stars/${rating}.png`)}
          alt=" Stars"
        />
          {/* <p>{rating}</p> */}
          <p>{phone}</p>
          <button className='button-modal' onClick={(e) => {
            e.preventDefault();
            window.open(url)
          }}>Business Website <span><FaSearch /></span></button>            
        </div>
        <div className='map'>
           <iframe title="location" src={uriAddress} height="400" width ="800"></iframe>
        </div>
      </div>
    </div>
  );
}
