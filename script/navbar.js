
$btnOrProfileDiv = document.querySelector('.btn-or-profile-Div')


const API_KEY = 'AIzaSyBOMG-k0X65yHLtDcl2E8rYzj6oCZKAhug'
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const BASE_URL = 'https://digital-bazaar-01-default-rtdb.asia-southeast1.firebasedatabase.app/'


document.addEventListener('DOMContentLoaded', () => {
   changeNavbar()
})



function profileNavTemplate(userProfile) {
   const profile = {
      userName,
      userAvatarLink,
      personalInfo: {
         firstName,
         lastName,
         description,
         telephone,
      },
      socialMedia: socialMediaArr,
   } = userProfile

   return `
   <a class="profile-navbar" href="#" onclick="parent.location.href='/artistPage.html'">
      <img class="img-profile" src="${userAvatarLink}" alt="User Avatar">
      <span class="username">${userName}</span>
   </a>`
}



function changeNavbar() {
   const localId = localStorage.getItem('localId')
   if (localId) {
      fetch(`${BASE_URL}/users/${localId}.json`)
         .then(response => response.json())
         .then(data => {
            const aboutData = Object.values(data.about)[0];
            const html = profileNavTemplate(aboutData)
            $btnOrProfileDiv.innerHTML = html;
         })
         .catch(error => console.error(error))
   }
}

/* --------------------------===>Фунция для получания uid<===-------------------------- */
function getUID() {
   return localStorage.getItem('localId')
}
