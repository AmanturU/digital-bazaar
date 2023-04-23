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

