const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'

const $topCreatorContainer = document.querySelector('.card-container')
document.addEventListener('DOMContentLoaded', () => {
   usersWithdrawal()
})

/* --------------------------===>Шаблон для вывода топ создателей<===-------------------------- */
function userCardTemplate(topUsers) {
   const userList = topUsers.map(({ user, total, userId, nftQuantity }, index) => {
      const { about } = user
      const avatarLink = about[Object.keys(about)[0]].userAvatarLink
      const name = about[Object.keys(about)[0]].personalInfo.firstName
      const lastName = about[Object.keys(about)[0]].personalInfo.lastName
      const fullName = `${name} ${lastName}`
      const activityPercentage = (Math.random() * 100).toFixed(2)

      return `
         <div class="card" onclick="parent.location.href='/artistPage.html?profileId=${userId}'">
         <div>
            <li><a href="#">${index + 1}</a></li>
            <li><img class="img-logo" src="${avatarLink}" alt=""></li>
            <li><a href="#">${fullName}</a></li>
         </div>
         <li><a href="#">+${activityPercentage}%</a></li>
         <li><a href="#">${nftQuantity}</a></li>
         <li><a href="#">${total} ETH</a></li>
      </div>
         `
   })

   return userList.join('')
}

/* --------------------------===>Вывод топ создателей<===-------------------------- */
async function usersWithdrawal() {
   const nftResponse = await fetch(`${BASE_URL}/nfts.json`)
   const nftData = await nftResponse.json()
   const nftQuantity = nftData.length
   const usersResponse = await fetch(`${BASE_URL}/users.json`)
   const userData = await usersResponse.json()

   const combinedData = Object.entries(nftData).reduce((acc, [nftId, nft]) => {
      const userId = nft.creatorId
      console.log(nft)
      if (!acc[userId]) {
         acc[userId] = {
            user: userData[userId],
            total: 0,
            userId,
            nftQuantity: 0,
         }
      }
      acc[userId].total += parseFloat(nft.addInfo.price)
      acc[userId].nftQuantity += nft.creatorId === userId ? 1 : 0

      return acc
   }, {})

   const sortedUsers = Object.values(combinedData).sort((a, b) => b.total - a.total)

   const topUsers = sortedUsers.slice(0, 10)

   const cardElement = userCardTemplate(topUsers)
   $topCreatorContainer.innerHTML = cardElement
}