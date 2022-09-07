import resetTags from './reset';

export default function renderList(countries) {
    if (countries.message) return false;
    const markup = countries
      .map(({ flags, name }) => {
        return `<li class = "render_list"><img src="${flags.svg}" alt="${name.official}" width = "270">${name.official}</li>`;
      })
      .join('');
    resetTags();
    document.querySelector('.country-list').innerHTML = markup;
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
    document.querySelector('.country-list').innerHTML = markup;
  }