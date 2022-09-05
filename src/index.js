import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const bodyRef = document.querySelector('body');

const refs = {
  input: bodyRef.querySelector('#search-box'),
  ul: bodyRef.querySelector('.country-list'),
  div: bodyRef.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

function renderList(countries) {
  if (countries.message) return false;
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class = "render_list"><img src="${flags.svg}" alt="${name.official}" width = "270">${name.official}</li>`;
    })
    .join('');
  resetTags();
  refs.ul.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<h2><img src="${flags.svg}" alt="${
        name.official
      }" width= "320"></h2>
        <p>${name.official}</p>
        <p><span>Capital: </span>${capital[0]}</p>
        <p><span>Population: </span>${population}</p>
        <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`;
    })
    .join('');

  resetTags();
  refs.div.innerHTML = markup;
}

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

const resetTags = () => {
  refs.div.innerHTML = '';
  refs.ul.innerHTML = '';
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
