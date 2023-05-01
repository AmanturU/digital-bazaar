const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

const urlParam = new URLSearchParams(window.location.search)
const userProfileId = urlParam.get('profileId')

const $container = document.querySelector('.browse')


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

var usernameOr = ''
var profileImgUrlOr = ''

document.addEventListener('DOMContentLoaded', () => {
   if (location.pathname === '/artistPage.html') {
      fetchUserProfile()
      cardWithdrawal2()
   } else {
      cardWithdrawal()
   }
})


/* --------------------------===>Шаблон для вывода персональных данных пользователя<===-------------------------- */
function fillUserProfile(userProfile) {
   // console.log(userProfile)
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
   usernameOr = userName
   profileImgUrlOr = userAvatarLink
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

/* --------------------------===>Функция для вывода персональных данных пользователя<===-------------------------- */
function fetchUserProfile() {
   const localId = localStorage.getItem('localId')
   if (!localId) {
      window.open('/createAccount.html', '_self')
      return
   }

   if (userProfileId) {
      fetch(`${BASE_URL}/users/${userProfileId}.json`)
         .then(response => response.json())
         .then(data => {
            const aboutData = Object.values(data.about)[0]
            const html = fillUserProfile(aboutData)
            $leftProfilDescriptionDiv.innerHTML = html
         })
         .catch(error => console.error(error))
   } else {
      fetch(`${BASE_URL}/users/${localId}.json`)
         .then(response => response.json())
         .then(data => {
            const aboutData = Object.values(data.about)[0]
            const html = fillUserProfile(aboutData)
            $leftProfilDescriptionDiv.innerHTML = html
         })
         .catch(error => console.error(error))
   }

}

/* --------------------------===>Шаблон для вывода nfts пользователя<===-------------------------- */
function cardTemplate(nftDataFromFB, profilesData) {
   const nftDataWithId = Object.keys(nftDataFromFB).map((id) => ({
      id,
      ...nftDataFromFB[id],
   }))
   const nftDataList = nftDataWithId.map((nftData) => {
      const {
         id,
         nftImage,
         itemName,
         itemDescription,
         collection,
         creatorId,
         addInfo: { externalLink, supply, blockchain, price, priceType },
      } = nftData
      let creatorAvatarLink = profilesData[creatorId].about[Object.keys(profilesData[creatorId].about)[0]].userAvatarLink
      let creatorName = profilesData[creatorId].about[Object.keys(profilesData[creatorId].about)[0]].userName


      let currencySymbol, currencyRate
      switch (blockchain) {
         case "ethereum":
            currencySymbol = "ETH"
            currencyRate = 1916
            break
         case "binance":
            currencySymbol = "BNB"
            currencyRate = 335.20
            break
         case "matic":
            currencySymbol = "MATIC"
            currencyRate = 0.99
            break
         case "solana":
            currencySymbol = "SOL"
            currencyRate = 22.19
            break
         case "cardano":
            currencySymbol = "ADA"
            currencyRate = 0.41
            break
         default:
            currencySymbol = ""
            currencyRate = 1
            break
      }

      const amountUSD = price
      const amountCrypto = funcBit(amountUSD, currencyRate)


      return `
      <div class="browse-card" data-NFTid="${id}" onclick="parent.location.href='/orbitian.html?id=${id}'">
         <div class="img-container">
            <img class="img-NFT-card" src="${nftImage}" alt="">
         </div>
         <div class="browse-card-bottom">
            <h2>${itemName}</h2>
            <div class="browse-info-bottom-card">
               <div class="creator-info">
               <div class="userProfileInfo">
                  <img src="${creatorAvatarLink}" alt="picture">
                  <strong id="profile-username-nft-card">${creatorName}</strong>
               </div>
            </div>
            <div class="price-card-block">
               <div class="highest-bit-block">
                  <span>Highest Bid</span>
               </div>
               <div class="currency-block">
                  <p>~${amountCrypto} ${currencySymbol}</p> ($${amountUSD})
               </div>
            </div>
            </div>
            </div>
         </div>
      </div>
      `
   })
   return nftDataList.join('')
}

async function cardWithdrawal() {
   const localId = getUID()
   if (!localId) {
      window.open('/createAccount.html', '_self')
      return
   }
   fetch(`${BASE_URL}/nfts.json`)
      .then(response => response.json())
      .then(data => {
         fetch(`${BASE_URL}/users.json`)
            .then((response) => response.json())
            .then((profileData) => {
               const cardElement = cardTemplate(data, profileData)
               $container.innerHTML = cardElement
            })
      })
      .catch(error => console.error(error))
}

async function cardWithdrawal2() {
   const localId = getUID()
   if (!localId) {
      window.open('/createAccount.html', '_self')
      return
   }
   fetch(`${BASE_URL}/users/${userProfileId}/nfts.json`)
      .then(response => response.json())
      .then(data => {
         fetch(`${BASE_URL}/users.json`)
            .then((response) => response.json())
            .then((profileData) => {
               const cardElement = cardTemplate(data, profileData)
               $container.innerHTML = cardElement
            })
      })
      .catch(error => console.error(error))
}

function getUID() {
   return localStorage.getItem('localId')
}

// function openNFT(id) {
//    location.href = `orbitian.html?id=${cardId}`
// }
// ------------------------------------------------------------------


// fetch(BASE_URL + '/nfts.json')
//    .then(response => response.json())
//    .then(nfts => {
//       // здесь можно обработать полученные данные
//    })
//    .catch(error => console.error(error));

// fetch(BASE_URL + '/nfts.json')
//    .then(response => response.json())
//    .then(nfts => {
//       Object.values(nfts).forEach(nft => {
//          const nftElement = document.createElement('div');
//          nftElement.classList.add('nft');
//          nftElement.innerHTML = `
//       <div class="browse-card">
//       <div class="imgofnfts">
//         <img class="imgofnfts" src="${nft.nftImage}" alt="${nft.name}">
//       </div>
//       <div class="browse-card-bottom">
//          <div>
//             <h2>${nft.itemName}</h2>
//             <img src="NFTimgs/avatar (2).png" alt=""> <span>BeKind23</span>
//          </div>
//          <div class="browse-card-bottom-bottom">
//             <div>
//             <span>Price</span>
//             <p>1.83 $</p>
//          </div>
//          <div>
//             <span>highest Bid</span>
//             <p>1.22 $</p>
//          </div>
//          </div>
//       </div>
//    </div>
//       `;
//          container.appendChild(nftElement);
//       });
//    })
//    .catch(error => console.error(error));

/* --------------------------===>Convert USD to Bit<===-------------------------- */
function funcBit(amountUSD, ethPricee) {
   const etnPrice = ethPricee
   const amountETN = amountUSD / etnPrice
   return amountETN.toFixed(2)
}