const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

const $formInfoSubmit = document.querySelector('.info-block')
const $avatarLinkInput = document.getElementById('avatar-link')
const $usernameInput = document.getElementById('username-input')
const $firstNameInput = document.getElementById('first-name-input')
const $lastNameInput = document.getElementById('last-name-input')
const $telInput = document.getElementById('tel-input')
const $descriptionInput = document.getElementById('description-input')
const $socialMediaCountSelect = document.getElementById('social-media-count')
const $socialMedia1TypeSelect = document.getElementById('social-media-1-type')
const $socialMedia2TypeSelect = document.getElementById('social-media-2-type')
const $socialMedia3TypeSelect = document.getElementById('social-media-3-type')
const $socialMedia1LinkInput = document.getElementById('social-media-1-link')
const $socialMedia2LinkInput = document.getElementById('social-media-2-link')
const $socialMedia3LinkInput = document.getElementById('social-media-3-link')
const $saveChangesButton = document.querySelector('.save-changes')
const socialMedia = {} // создаем пустой объект социальных сетей


window.addEventListener('DOMContentLoaded', () => {
   checkFormSubmitted()
})

const socialMediaArr = []
/* --------------------------===>Выбор соц. сетей<===-------------------------- */
function onSocialMediaCountChange() {
   const socialMediaCount = parseInt($socialMediaCountSelect.value)
   for (let i = 1; i <= 3; i++) {
      const socialMediaDiv = document.getElementById(`social-media-${i}`)
      if (i <= socialMediaCount) {
         socialMediaDiv.style.display = 'block'
      } else {
         socialMediaDiv.style.display = 'none'
      }
   }
   for (let i = 1; i <= socialMediaCount; i++) {
      const socialMediaSelect = document.getElementById(`social-media-${i}-type`)
      const socialMediaLinkInput = document.getElementById(`social-media-${i}-link`)

      if (socialMediaSelect.value && socialMediaLinkInput.value) {
         const socialMediaObj = {
            type: socialMediaSelect.value,
            link: socialMediaLinkInput.value
         }
         socialMediaArr.push(socialMediaObj)
      }
   }
   console.log(socialMediaArr)
}

/* --------------------------===>Подготовка информации из формы для отправки<===-------------------------- */
$formInfoSubmit.addEventListener('submit', (event) => {
   event.preventDefault()

   // вызываем функцию onSocialMediaCountChange() для заполнения объекта socialMedia
   onSocialMediaCountChange()

   if ($usernameInput.validity.valid && $firstNameInput.validity.valid && $lastNameInput.validity.valid && $telInput.validity.valid && $descriptionInput.validity.valid && $socialMediaCountSelect.value > 0) {
      createProfile({
         userName: $usernameInput.value,
         personalInfo: {
            firstName: $firstNameInput.value,
            lastName: $lastNameInput.value,
            description: $descriptionInput.value,
            telephone: $telInput.value,
         },
         socialMedia: socialMedia
      });
   }

})

/* --------------------------===>Отправка информации о профиле в FireBase<===-------------------------- */
async function createProfile({ userName, personalInfo: { firstName, lastName, description, telephone }, socialMedia }) {
   const profile = {
      userName,
      personalInfo: {
         firstName,
         lastName,
         description,
         telephone,
      },
      socialMedia: socialMediaArr,
   }
   try {
      const uid = getUID()
      console.log(profile)
      const response = await fetch(`${BASE_URL}/users/${uid}/about.json`, {
         method: 'POST',
         body: JSON.stringify(profile),
      })


      if (response.ok) {
         localStorage.setItem('formSubmitted', true)
         window.open('/homePage.html', '_self')
      }

   } catch (e) {
      console.error(e)
   }
}


/* --------------------------===>Фунция для получания uid<===-------------------------- */
function getUID() {
   return localStorage.getItem('localId')
}

/* --------------------------===>Проверка на авторизованность<===-------------------------- */
window.addEventListener('DOMContentLoaded', () => {
   const localId = localStorage.getItem('localId')
   if (!localId) {
      window.open('/createAccount.html', '_self')
   }
})

/* --------------------------===>Проверка на прохождения формы<===-------------------------- */
function checkFormSubmitted() {
   const formSubmitted = localStorage.getItem('formSubmitted')
   if (formSubmitted) {
      window.open('/homePage.html', '_self')
   }
}
