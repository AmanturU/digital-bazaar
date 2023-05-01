const logoutBtn = document.querySelector('#logout-btn')

const preloader = document.querySelector('#preloader')
const percents = document.querySelector('#percents')
const btnOrProfileDiv = document.querySelector('.btn-or-profile-Div')

document.addEventListener('DOMContentLoaded', () => {
   let i = 0

   outNum(100, percents, {
      step: 1,
      time: 380 + Math.random() * 3800
   })

   setTimeout(() => {
      preloader.classList.add('preloader--hide')
      percents.innerHTML = 100
   }, 4000)
})

function outNum(num, elem, options) {
   const { step, time } = options

   let n = 0
   let t = Math.round(time / (num / step))

   let interval = setInterval(() => {
      n = n + step
      elem.innerHTML = n

      if (n >= num) {
         clearInterval(interval)
         elem.innerHTML = num
      }
   }, t)
}


if (localStorage.getItem('localId')) {
   logoutBtn.style.display = 'block';
} else {
   logoutBtn.style.display = 'none';
}





/* --------------------------===>dsdadasdsa<===-------------------------- */

