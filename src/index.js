// import './css/styles.css';
import {Notiflix} from 'notiflix';
import { fetchCountries } from './fetchCountries';
import {renderList} from './renderListCountri';
import {renderOneCountry} from './renderListCountri';
import {resetTags} from './reset';
import {debounce} from 'lodash.debounce';

const bodyRef = document.querySelector('body');

const refs = {
  input: bodyRef.querySelector('#search-box'),
  ul: bodyRef.querySelector('.country-list'),
  div: bodyRef.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;


function searchCountry(e) {
  const serchingCountry = refs.input.value.trim();
  if (serchingCountry === '') {
    resetTags();
    return;
  } else
    fetchCountries(serchingCountry)
      .then(serchingCountry => {
        if (serchingCountry.length > 10) {
          resetTags();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (serchingCountry.length === 1)
          renderOneCountry(serchingCountry);
        else renderList(serchingCountry);
      })
      .catch(error => {
        console.log(error);
        resetTags();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
}



refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
