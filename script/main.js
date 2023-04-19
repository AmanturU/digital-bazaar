$preloader = document.querySelector('#preloader')
$percents = document.querySelector('#percents')

document.addEventListener('DOMContentLoaded', () => {

   const mediaFiles = document.querySelectorAll('img, video');
   let i = 0

   if (!mediaFiles) {
      Array.from(mediaFiles).forEach((file, index) => {
         file.onload = () => {
            i++

            outNum(((i * 100) / mediaFiles.length).toFixed(1), $percents, {
               step: 1,
               time: 1000
            })

            if (i === mediaFiles.length) {
               $preloader.classList.add('preloader--hide')
               $percents.innerHTML = 100
            }
         }
      })
   } else {
      $preloader.classList.add('preloader--hide')
   }

})
function outNum(num, elem, options) {
   const { step, time } = options

   let n = parseInt(elem.innerHTML)
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

// // ----Проверка на авторизованность


// $signOutBtn.addEventListener('click', () => {
//    alert('Всё робит')
//    localStorage.removeItem('localId')
//    window.open('../html/signIn.html', '_self')
// })