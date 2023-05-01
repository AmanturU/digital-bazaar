const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

const $container = document.querySelector('.top3-card-container')
const $topCreatorContainer = document.querySelector('.top-creators-block')

document.addEventListener('DOMContentLoaded', () => {
   cardWithdrawal()
   usersWithdrawal()
})

/* --------------------------===>Шаблон для вывода nfts пользователя<===-------------------------- */
function cardTemplate(nftDataFromFB, profilesData) {
   const nftDataWithId = Object.keys(nftDataFromFB).map((id) => ({
      id,
      ...nftDataFromFB[id],
   }))

   const firstThreeNFTs = nftDataWithId.slice(0, 3)

   const nftDataList = firstThreeNFTs.map((nftData) => {
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
/* --------------------------===>Вывод nft пользователей<===-------------------------- */
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

/* --------------------------===>Шаблон для вывода топ создателей<===-------------------------- */
function userCardTemplate(topUsers) {
   const userList = topUsers.map(({ user, total, userId }, index) => {
      const { about } = user
      const avatarLink = about[Object.keys(about)[0]].userAvatarLink
      const username = about[Object.keys(about)[0]].userName
      return `
      <div class="top-creators-card-block" onclick="parent.location.href='/artistPage.html?profileId=${userId}'">
         <h1 class="top-creators-num">${index + 1}</h1>
         <img class="top-creators-img" src="${avatarLink}" alt="Profile Image">
         <div>
            <h2 class="top-creators-username">${username}</h2>
            <p class="top-creators-sales">Total Sales: <span>${total} ETN</span></p>
         </div>
      </div>
      `
   })

   return userList.join('')
}

/* --------------------------===>Вывод топ создателей<===-------------------------- */
async function usersWithdrawal() {
   const nftResponse = await fetch(`${BASE_URL}/nfts.json`)
   const nftData = await nftResponse.json()

   const usersResponse = await fetch(`${BASE_URL}/users.json`)
   const userData = await usersResponse.json()

   const combinedData = Object.entries(nftData).reduce((acc, [nftId, nft]) => {
      const userId = nft.creatorId
      if (!acc[userId]) {
         acc[userId] = {
            user: userData[userId],
            total: 0,
            userId,
         }
      }

      acc[userId].total += parseFloat(nft.addInfo.price)

      return acc
   }, {})

   const sortedUsers = Object.values(combinedData).sort((a, b) => b.total - a.total)

   const topUsers = sortedUsers.slice(0, 10)

   const cardElement = userCardTemplate(topUsers)

   $topCreatorContainer.innerHTML = cardElement
}


/* --------------------------===>Получение userId<===-------------------------- */
function getUID() {
   return localStorage.getItem('localId')
}

/* --------------------------===>Convert USD to Bit<===-------------------------- */
function funcBit(amountUSD, ethPricee) {
   const etnPrice = ethPricee
   const amountETN = amountUSD / etnPrice
   return amountETN.toFixed(2)
}


/* --------------------------===>Шаблон вывода topcreators<===-------------------------- */
// function userCardTemplate(data, profileData) {
//    // const users = Object.entries(data).map(([uid, user]) => ({
//    //    uid,
//    //    user,
//    //    username: data[user.about].userName
//    // }));

//    console.log(data)
//    console.log(profileData)
// }

/* --------------------------===>Вывод top creator<===-------------------------- */
// async function usersWithdrawal() {
//    fetch(`${BASE_URL}/nfts.json`)
//       .then(response => response.json())
//       .then(data => {
//          fetch(`${BASE_URL}/users.json`)
//             .then((response) => response.json())
//             .then((profileData) => {
//                const cardElement = userCardTemplate(data, profileData)
//             })
//       })
//       .catch(error => console.error(error))
// }
