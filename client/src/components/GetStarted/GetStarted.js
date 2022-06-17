import React from 'react';
import styles from './GetStarted.module.css';
import { SearchBar } from '../Yelp/SearchBar/SearchBar';
//import { Logo } from '../Yelp/Logo/Logo';
//import { DinnerText } from '../Yelp/DinnerText.js/DinnerText';

//import useReactRouter from 'use-react-router';

const GetStarted = (props) => {
  // const { history } = useReactRouter();

  //const [useSearch, setSearch] = useState(search);

  function search(term, location) {
    const urlEncodedTerm = encodeURI(term);
    const urlEncodedLocation = encodeURI(location);
    window.location.href=(
      `/search?find_desc=${urlEncodedTerm}&find_loc=${urlEncodedLocation}`
    );
  }

  return (
    <div className={styles['search-area']}>
      <div className={styles['main-div-area']}>
        <div className={styles['main-header']}>
          <h3>What do you fancy for dinner?</h3>
        </div>
        <div>
          <SearchBar search={search} />
        </div>
      </div>
    </div>
  );
}
export default GetStarted;