const itemsPerPage = 6;
const container = document.querySelector('.browse-contant');
const cards = container.querySelectorAll('.browse-card');
const numPages = Math.ceil(cards.length / itemsPerPage);

let currentPage = 1;

function displayCards(pageNum, container) {
  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  container.innerHTML = '';
  for (let i = startIndex; i < endIndex && i < cards.length; i++) {
    container.appendChild(cards[i].cloneNode(true));
  }

  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentPage === numPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

const counter = document.querySelector('.counter');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayCards(currentPage, container);
    counter.textContent = currentPage;
  }
});
nextBtn.addEventListener('click', () => {
  if (currentPage < numPages) {
    currentPage++;
    displayCards(currentPage, container);
    counter.textContent = currentPage;
  }
});

displayCards(currentPage, container);
counter.textContent = currentPage;

if (currentPage === 1) {
  prevBtn.disabled = true;
} else {
  prevBtn.disabled = false;
}

if (currentPage === numPages) {
  nextBtn.disabled = true;
} else {
  nextBtn.disabled = false;
}


// ------------------------------------------------------------------
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/';

fetch(BASE_URL + '/nfts.json')
  .then(response => response.json())
  .then(nfts => {
    // здесь можно обработать полученные данные
  })
  .catch(error => console.error(error));

  fetch(BASE_URL + '/nfts.json')
  .then(response => response.json())
  .then(nfts => {
    Object.values(nfts).forEach(nft => {
      const nftElement = document.createElement('div');
      nftElement.classList.add('nft');
      nftElement.innerHTML =`
      <div class="browse-card">
      <div class="imgofnfts">
        <img class="imgofnfts" src="${nft.nftImage}" alt="${nft.name}">
      </div>
      <div class="browse-card-bottom">
         <div>
            <h2>${nft.itemName}</h2>
            <img src="NFTimgs/avatar (2).png" alt=""> <span>BeKind23</span>
         </div>
         <div class="browse-card-bottom-bottom">
            <div>
            <span>Price</span>
            <p>1.83 $</p>
         </div>
         <div>
            <span>highest Bid</span>
            <p>1.22 $</p>
         </div>
         </div>
      </div>
   </div>
      `;
      container.appendChild(nftElement);
    });
  })
  .catch(error => console.error(error));
