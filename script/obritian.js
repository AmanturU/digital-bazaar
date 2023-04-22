const $card = document.querySelectorAll('.browse-card')
const $modal = document.querySelector('.modal')
const $closeBtn = document.querySelector('.close-btn')


for (let i = 0; i < $card.length; i++) {
    $card[i].addEventListener('click', () => {
  
      $modal.style.display = 'block';

    });
}



$closeBtn.addEventListener('click', () => {
    $modal.style.display = 'none'
})

