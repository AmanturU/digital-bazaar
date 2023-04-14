const API_KEY = 'AIzaSyBP63xmWHVgulhy_myC2lXnJtdPXlTJvNc'
const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

// const $usernameInput = document.querySelector('.signUp-username-Input')
const $emailInput = document.querySelector('.signUp-email-Input')
const $passwordInput = document.querySelector('.signUp-password-Input')
const $confirmPasswordInput = document.querySelector('.signUp-confirm-password-Input')
const $registerBtn = document.querySelector('#signUp-Button')
const $formAccRegister = document.querySelector('#signUp-form-Register')

const passwordRegex = /^[\w!@#$%^&*()\-+={}[\]:";'<>,.?/~`]+$/;

// ----Валидация поля для пароля
function validatePassword() {
   const password = $passwordInput.value.trim();
   if (password.length < 8 || !passwordRegex.test(password)) {
      $passwordInput.setCustomValidity('Password should be at least 8 characters long and contain only letters, digits and special characters: !@#$%^&*()-+={}[]:";\'<>,.?/~`')
   } else {
      $passwordInput.setCustomValidity('')
   }
}
$passwordInput.addEventListener('blur', validatePassword);


// ----Проверка на схожесть паролей
$confirmPasswordInput.addEventListener('blur', () => {
   if ($passwordInput.value.trim() !== $confirmPasswordInput.value.trim()) {
      $confirmPasswordInput.setCustomValidity('Passwords do not match')
   } else {
      $confirmPasswordInput.setCustomValidity('')
   }
})

window.addEventListener('DOMContentLoaded', () => {
   const localId = localStorage.getItem('localId')

   if (localId) {
      window.open('../homePage.html', '_self')
   }
})

async function signUp(email, password) {
   $registerBtn.disabled = true
   try {
      const body = {
         email,
         password,
         returnSecureToken: true,
      }

      const response = await fetch(SIGN_UP_URL, {
         method: 'POST',
         body: JSON.stringify(body),
      })

      const res = await response.json()


      if (response.ok) {
         window.location.href = '../log-in.html';
      } else {
         throw new Error(res.error.errors.at(0).message)
      }

   } catch (e) {
      alert(e)
   } finally {
      $registerBtn.disabled = false
      $emailInput.value = ''
      $passwordInput.value = ''
   }
}


$formAccRegister.addEventListener('submit', (event) => {
   event.preventDefault()

   if ($emailInput.validity.valid && $passwordInput.validity.valid) {
      signUp($emailInput.value, $passwordInput.value)
   }
})

