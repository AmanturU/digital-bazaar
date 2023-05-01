const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

const $formCreateNFT = document.querySelector('.content-main-form')
const $nftImageInput = document.getElementById('nft-image-input')
const $itemNameInput = document.getElementById('item-name')
const $collectionInput = document.getElementById('collection')
const $blockchainSelect = document.getElementById('blockchain')
const $externalLinkInput = document.getElementById('external-link')
const $supplyInput = document.getElementById('supply')
const $itemDescriptionInput = document.getElementById('item-description')
const $saveChangesBtn = document.getElementsByClassName('save-changes-NFT')
const $nftPriceInput = document.querySelector('.nft-price-input')
const $fixedPriceRadioInput = document.querySelector('#fixed-price-radio-input')
const $auctionRadioInput = document.querySelector('#auction-radio-Input')
const $auctionEndDateInput = document.getElementById("auction-end-date")
/* --------------------------===>Проверка на авторизованность<===-------------------------- */
window.addEventListener('DOMContentLoaded', () => {
   const localId = localStorage.getItem('localId')
   if (!localId) {
      window.open('/createAccount.html', '_self')
   }
})

/* --------------------------===>Подготовка инфы для отправки<===-------------------------- */
$formCreateNFT.addEventListener('submit', (event) => {
   event.preventDefault()
   const auctionEndDateInf = new Date($auctionEndDateInput.value).getTime()
   const priceType = $fixedPriceRadioInput.checked ? "FixedPrice" : $auctionRadioInput.checked ? "Auction" : "Not selected";
   if ($itemNameInput.validity.valid && $collectionInput.validity.valid && $blockchainSelect.validity.valid && $externalLinkInput.validity.valid && $supplyInput.validity.valid && $itemDescriptionInput.validity.valid) {
      createNFT({
         nftImage: $nftImageInput.value,
         itemName: $itemNameInput.value,
         itemDescription: $itemDescriptionInput.value,
         collection: $collectionInput.value,
         auctionEndDate: auctionEndDateInf,
         addInfo: {
            externalLink: $externalLinkInput.value,
            supply: $supplyInput.value,
            blockchain: $blockchainSelect.value,
            price: $nftPriceInput.value,
            priceType: priceType,
         }
      })
   }
})

/* --------------------------===>Отправка nft в FireBase<===-------------------------- */
async function createNFT({ nftImage, itemName, itemDescription, collection, auctionEndDate, addInfo: { externalLink, supply, blockchain, price, priceType } }) {
   const uid = getUID()
   const nftData = {
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
      createdAt: createTimestamp(),
   };

   const nftDataForGlobal = {
      creatorId: uid,
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
      createdAt: createTimestamp(),
   }
   try {

      const response = await fetch(`${BASE_URL}/users/${uid}/nfts.json`, {
         method: 'POST',
         body: JSON.stringify(nftData),
      })
      const response2 = await fetch(`${BASE_URL}/nfts.json`, {
         method: 'POST',
         body: JSON.stringify(nftDataForGlobal),
      })


      if (response.ok) {
         window.open('/homePage.html', '_self')
      }
      if (response2.ok) {
         localStorage.setItem('formSubmitted', true)
      }
   } catch (e) {
      console.error(e)
   }
}





/* --------------------------===>Фунция для получания uid<===-------------------------- */
function getUID() {
   return localStorage.getItem('localId')
}

/* --------------------------===>Функция для получения даты создания<===-------------------------- */
function createTimestamp() {
   const timestamp = new Date().getTime()
   return timestamp
}