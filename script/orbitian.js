const urlParams = new URLSearchParams(window.location.search)
const nftCardId = urlParams.get('id')


const $imgElementNftCard = document.getElementById('img-nft-card')
const $titleElementNftCard = document.getElementById('title-nft-card')
const $createdTimeElementNftCard = document.getElementById('created-time-nft-card')
// const $profileImgElementNftCard = document.getElementById('profile-img-nft-card')
// const $profileUsernameElementNftCard = document.getElementById('profile-username-nft-card')
const $descriptionElementNftCard = document.getElementById('description-nft-card')
const $priceElementNftCard = document.getElementById('price-nft-card')

const $auctionBlockNftCard = document.getElementById('auction-block-nft-card')
const $finalPriceBlockNftCard = document.getElementById('final-price-block-nft-card')
const $createdByBlockNftCard = document.getElementById('createdBy-profile-nft-card')
const $originalLink = document.getElementById('original-link')
const $pricePerNftCard = document.getElementById('price-per-NFT-card')
/* --------------------------===>timerAuc<===-------------------------- */
const timer = document.getElementsByClassName("timer-button")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")


document.addEventListener('DOMContentLoaded', () => {
   // changeProfileBy()
   cardWithdrawalOrbitian()
})


/* --------------------------===>Шаблон для createdBy block<===-------------------------- */
// function profileByTemplate(userProfile) {
//    const profile = {
//       userName,
//       userAvatarLink,
//       personalInfo: {
//          firstName,
//          lastName,
//          description,
//          telephone,
//       },
//       socialMedia: socialMediaArr,
//    } = userProfile

//    return `
//    <img src="${userAvatarLink}" alt="picture" id="profile-img-nft-card">
//    <strong id="profile-username-nft-card">${userName}</strong>
//    `
// }

/* --------------------------===>Шаблон для вывода nfts пользователя<===-------------------------- */
function nftCardTemplateSite(nftDataFromFB) {
   console.log(nftDataFromFB)
   const nftDataForGlobal = {
      creatorId,
      nftImage,
      itemName,
      itemDescription,
      collection,
      auctionEndDate,
      addInfo: {
         externalLink,
         supply,
         blockchain,
         price,
         priceType,
      },
      createdAt,
   } = nftDataFromFB
   
   $titleElementNftCard.innerText = itemName
   $imgElementNftCard.src = nftImage
   $createdTimeElementNftCard.innerText = formatDate1(createdAt)
   $descriptionElementNftCard.innerText = itemDescription
   $priceElementNftCard.innerText = `$${price}`
   $originalLink.href = `${externalLink}`
   if (priceType === "FixedPrice") {
      $finalPriceBlockNftCard.style.display = "block"
      $auctionBlockNftCard.style.display = "none"
      console.log(blockchain)
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
      $pricePerNftCard.innerHTML = `<span>~${amountCrypto} ${currencySymbol}</span> ($${amountUSD})`
      } else if (priceType === "Auction") {
      $finalPriceBlockNftCard.style.display = "none"
      $auctionBlockNftCard.style.display = "block"
   }
   setCountdownTimer(createdAt, auctionEndDate)

         fetch(`${BASE_URL}/users/${creatorId}.json`)
         .then(response => response.json())
         .then(data => {
            const aboutData = Object.values(data.about)[0]
            const html = setProfileImgAndUsername(aboutData)
            $createdByBlockNftCard.innerHTML = html
         })
         .catch(error => console.error(error))
   
}

async function cardWithdrawalOrbitian() {
   const localId = getUID()
   if(!localId) {
      window.open('/createAccount.html', '_self')
      return
   }
   if(nftCardId) {
      fetch(`${BASE_URL}/nfts/${nftCardId}.json`)
      .then(response => response.json())
      .then(data => {
         const cardHTML = nftCardTemplateSite(data)
         
      })
      .catch(error => console.error(error))
   }
}

/* --------------------------===>Функция для получение innerHtml for block $createdByBlockNftCard<===-------------------------- */

function setProfileImgAndUsername(profileObj) {
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
   } = profileObj

   return `
   <img src="${userAvatarLink}" alt="picture" id="profile-img-nft-card">
   <strong id="profile-username-nft-card">${userName}</strong>
   `
}


function formatDate1(timestamp) { // Apr 15, 2023
   const options = { month: "short", day: "numeric", year: "numeric" }
   const date = new Date(timestamp)
   return date.toLocaleDateString("en-US", options)
}

function formatDate2(timestamp) { // 15.04.23
   const date = new Date(timestamp)
   const day = date.getDate().toString().padStart(2, "0")
   const month = (date.getMonth() + 1).toString().padStart(2, "0")
   const year = date.getFullYear().toString().slice(-2)
   return `${day}.${month}.${year}`
}

function setCountdownTimer(createdAt, auctionEndDate) {
   const endTime = new Date(auctionEndDate).getTime()
   let remainingTime = Math.floor((endTime - createdAt) / 1000)
   const timerInterval = setInterval(updateTimer, 1000)

   function updateTimer() {
      const now = new Date().getTime();
      const timeLeft = endTime - now;
      if (timeLeft >= 0) {
        const hoursValue = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesValue = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secondsValue = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
         hours.textContent = hoursValue < 10 ? "0" + hoursValue : hoursValue;
         minutes.textContent = minutesValue < 10 ? "0" + minutesValue : minutesValue;
         seconds.textContent = secondsValue < 10 ? "0" + secondsValue : secondsValue;
      } else {
         clearInterval(timerInterval);
         timer[0].textContent = "Time's up!";
      }
   }
}

/* --------------------------===>Convert USD to Bit<===-------------------------- */
function funcBit(amountUSD, ethPricee) {
   const etnPrice = ethPricee
   const amountETN = amountUSD / etnPrice
   return amountETN.toFixed(2)
}



















// const $card = document.querySelectorAll('.browse-card')
// const $modal = document.querySelector('.modal')
// const $closeBtn = document.querySelector('.close-btn')


// for (let i = 0; i < $card.length; i++) {
//     $card[i].addEventListener('click', () => {
  
//       $modal.style.display = 'block';

//     });
// }

// $closeBtn.addEventListener('click', () => {
//     $modal.style.display = 'none'
// })