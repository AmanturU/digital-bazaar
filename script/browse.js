// const $container = document.querySelector('.browse-container')
// const $currentPage = document.querySelector('.counter')
// const $prevPage = document.querySelector('.btn-prev')
// const $nextPage = document.querySelector('.btn-next')
// const $browseCards = Array.from(document.getElementsByClassName('browse-card'));

// const LIMIT = 6
// let offset = 0
// let page = 1

// function addBrowseCard(country) {
//     $container.innerHTML += titleCountryCard(country);
// }

// async function getAllCountries(offset) {
//     try {
//         $currentPage.innerHTML = page;

//         const slicedCountries = $browseCards.slice(offset, offset + LIMIT);

//         const temp = slicedCountries.reduce((acc, country) => acc + titleCountryCard(country), '');

//         $container.innerHTML = temp;

//         // Добавление browse-card в контейнер
//         slicedCountries.forEach(country => addBrowseCard(country));

//         // Проверка на первую страницу
//         if (page === 1) {
//             $prevPage.disabled = true;
//         } else {
//             $prevPage.disabled = false;
//         }
//         // Проверка на последнюю страницу
//         if (offset + LIMIT >= $browseCards.length) {
//             $nextPage.disabled = true;
//         } else {
//             $nextPage.disabled = false;
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }

// $prevPage.addEventListener('click', () => {
//     getAllCountries(offset -= LIMIT)
//     page--
//  })
 
//  $nextpage.addEventListener('click', () => {
//     getAllCountries(offset += LIMIT)
//     page++
//  })
 
//  window.addEventListener('DOMContentLoaded', () => {
//     getAllCountries(offset)
//  })


