const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

// const itemsPerPage = 6
// const container = document.querySelector('.browse-contant')
// const cards = container.querySelectorAll('.browse-card')
// const numPages = Math.ceil(cards.length / itemsPerPage)

// let currentPage = 1

// function displayCards(pageNum, container) {
//   const startIndex = (pageNum - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   container.innerHTML = ''
//   for (let i = startIndex; i < endIndex && i < cards.length; i++) {
//     container.appendChild(cards[i].cloneNode(true))
//   }

//   if (currentPage === 1) {
//     prevBtn.disabled = true
//   } else {
//     prevBtn.disabled = false
//   }

//   if (currentPage === numPages) {
//     nextBtn.disabled = true
//   } else {
//     nextBtn.disabled = false
//   }
// }

// const counter = document.querySelector('.counter')
// const prevBtn = document.querySelector('.btn-prev')
// const nextBtn = document.querySelector('.btn-next')
// prevBtn.addEventListener('click', () => {
//   if (currentPage > 1) {
//     currentPage--
//     displayCards(currentPage, container)
//     counter.textContent = currentPage
//   }
// })
// nextBtn.addEventListener('click', () => {
//   if (currentPage < numPages) {
//     currentPage++
//     displayCards(currentPage, container)
//     counter.textContent = currentPage
//   }
// })

// displayCards(currentPage, container)
// counter.textContent = currentPage

// if (currentPage === 1) {
//   prevBtn.disabled = true
// } else {
//   prevBtn.disabled = false
// }

// if (currentPage === numPages) {
//   nextBtn.disabled = true
// } else {
//   nextBtn.disabled = false
// }

const $userProfileIMG = document.getElementById('user-profile-img')
const $usernameProfile = document.getElementsByClassName('username-profile')
const $bioUserdescription = document.getElementsByClassName('bio-description')
const $leftProfilDescriptionDiv = document.querySelector('.left-profil-description')

// links
const $mySiteLinkImg = document.getElementById("mySite-link-img")
const $discordLinkImg = document.getElementById("Discord-link-img")
const $youtubeLinkImg = document.getElementById("Youtube-link-img")
const $twitterLinkImg = document.getElementById("Twitter-link-img")
const $instagramLinkImg = document.getElementById("Instagram-link-img")
const $gitHubLinkImg = document.getElementById("GitHub-link-img")

document.addEventListener('DOMContentLoaded', () => {
   fetchUserProfile()
})


function fillUserProfile(userProfile) {
   console.log(userProfile)
   const {
      userName,
      userAvatarLink,
      personalInfo: {
         firstName,
         lastName,
         description,
         telephone,
      },
      socialMedia,
   } = userProfile
   $userProfileIMG.src = userAvatarLink

   const socialMediaArr = socialMedia.map(sm => ({ type: sm.type, link: sm.link }))

   const socialMediaIcons = socialMediaArr.map((sm) => {
      const link = sm.link;
      switch (sm.type) {
         case 'mySite':
            return `<img class="aps-img" src="/img/profilIMGS/Globe.png" alt="mySite-link" id="mySite-link-img" onclick="parent.location.href='${link}'">`
         case 'discord':
            return `<img class="aps-img" src="/img/profilIMGS/DiscordLogo.png" alt="Discord-link" id="Discord-link-img" onclick="parent.location.href='${link}'">`
         case 'youtube':
            return `<img class="aps-img" src="/img/profilIMGS/YoutubeLogo.png" alt="Youtube-link" id="Youtube-link-img" onclick="parent.location.href='${link}'">`
         case 'twitter':
            return `<img class="aps-img" src="/img/profilIMGS/twiter.png" alt="Twitter-link" id="Twitter-link-img" onclick="parent.location.href='${link}'">`
         case 'instagram':
            return `<img class="aps-img" src="/img/profilIMGS/InstagramLogo.png" alt="Instagram-link" id="Instagram-link-img" onclick="parent.location.href='${link}'">`
         case 'github':
            return `<img class="aps-img" src="/img/profilIMGS/github.png" alt="GitHub-link" id="GitHub-link-img" onclick="parent.location.href='${link}'">`
         default:
            return ''
      }
   })
   console.log(socialMediaIcons)
   return `
   <h1 class="username-profile">${userName}</h1>
            <br>

            <div class="status-of-description">
               <div>
                  <p>250k+</p>
                  <p class="words0fStatus">Volume</p>
               </div>
               <div>
                  <p>50+</p>
                  <p class="words0fStatus">NFTs Sold</p>
               </div>
               <div>
                  <p>3000+</p>
                  <p class="words0fStatus">Followers</p>
               </div>
               <br>
            </div>

            <p class="smallScription">Bio</p>
            <p class="bio-description">${description}</p>
            <br>

            <p class="smallScription">Links</p>
            <div class="Links-aps">
            ${socialMediaIcons.join('')}
            </div>
   `
}

function fetchUserProfile() {
   const localId = localStorage.getItem('localId')
   if (!localId) {
      window.open('/createAccount.html', '_self')
      return
   }

   fetch(`${BASE_URL}/users/${localId}.json`)
      .then(response => response.json())
      .then(data => {
         const aboutData = Object.values(data.about)[0]
         const html = fillUserProfile(aboutData)
         $leftProfilDescriptionDiv.innerHTML = html
      })
      .catch(error => console.error(error))
}