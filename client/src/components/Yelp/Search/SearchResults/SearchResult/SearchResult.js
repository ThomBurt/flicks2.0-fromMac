import React, { useState, useEffect } from 'react';
// import { Icon } from 'semantic-ui-react';
import { FaHandPointUp } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

import { Modal } from './Modal';
import styles from './SearchResult.module.css';







export function SearchResult(props) {

  const [isOpen, setIsOpen] = useState(false);

  const b = props.business;
  if (!b) {
    return <div />;
  }
  //console.log(b);
  const rating = b.rating;
  const name = b.name;
  //const yelpBusinessURL = b.url;
  // const phone = b.phone;
  // const pickup = b.transactions[0];
  // const delivery = b.transactions[1];

  const tags = b.categories.map((category) => (
    <span
      className={`tag ${styles['business-tag']}`}
      key={b.id + category.title}
    >
      {category.title}
    </span>
  ));
  const addressLines = b.location.display_address.map((addressLine) => (
    <p key={b.id + addressLine}>{addressLine}</p>
  ));



    const restaurantInfoObject = {
      name: name,
      image: b.image_url,
      rating: rating,
      reviews: b.review_count,
      price: b.price,
      address: b.location.address1,
      city: b.location.city,
      state: b.location.state,
      zip: b.location.zip_code,
      phone: b.phone,
      pickup: b.transactions[0],
      delivery: b.transactions[1]
    }






  function onSubmit(e) {

    console.log(name) 
    //  console.log (b)
    //localStorage.setItem('restaurantInfo', JSON.stringify(name));
    localStorage.setItem("restaurantInfoObject", JSON.stringify(restaurantInfoObject))
    //  localStorage.setItem('restaurantImage', JSON.stringify(b.image_url));
    //  localStorage.setItem('restaurantRating', JSON.stringify(rating));
    //  localStorage.setItem('restaurantReviews', JSON.stringify(b.review_count));
    //  localStorage.setItem('restaurantPrice', JSON.stringify(b.price));

    window.location.href='/drink';
  }

  return (
    <div className={styles['search-result']}>
      <img
        src={b.image_url}
        alt="business"
        className={styles['business-image']}
      />
      <div className={styles['business-info']}>
        <h2 className="subtitle">{b.name}</h2>
        <img
          src={require(`../../../../Assets/img/yelp-stars/${rating}.png`)}
          alt=" Stars"
          className={styles['review-stars']}
        />
        <p>{b.review_count} Reviews</p>
        <p>
          {b.price} {tags}
        </p>
      </div>
      <div className={styles['contact-info']}>
        <p>{b.phone}</p>
        {addressLines}


        <button
          className={styles['choose-button']}
          onClick={() => setIsOpen(true)}
        >
          Check out <span>{b.name}</span>
          <span>
            <FaHandPointUp />
          </span>
        </button>
 
        <Modal
          open={isOpen}
          visible={props}
          props={props.business}
          onClose={() => setIsOpen(false)}
        ></Modal>
 
      </div>

    </div>
  );
}
