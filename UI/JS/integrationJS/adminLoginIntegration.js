const form = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const subButton = document.querySelector('#more-button')
const loading = document.querySelector('.loading')

const emailErrorEl = document.querySelector('#emailErrorMessage')
const passwordErrorEl = document.querySelector('#passErrorMessage')

subButton.addEventListener('click', () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // reset error messages
    emailErrorEl.innerHTML = ''
    passwordErrorEl.innerHTML = ''

    // get input values

    const email = form.email.value
    const password = form.password.value

    const user = { email, password }

    try {
        const res = await fetch('https://important-red-beanie.cyclic.app/adminLogin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        })

        const resMessage = await res.json()
        console.log(resMessage.jwt)

        localStorage.setItem('authorization', JSON.stringify(resMessage.jwt))
        localStorage.setItem('CurrentUser', JSON.stringify(resMessage.userId))

        if(resMessage){
            loading.innerHTML = '';
        }

        if(resMessage.statusCode === 400){
            emailErrorEl.innerHTML = resMessage.message.email
            if(!resMessage.message.password){
                passwordErrorEl.innerHTML = ''
            } else {
                passwordErrorEl.innerHTML = resMessage.message.password
            }
        }

        if(resMessage.statusCode === 200){
            location.href = 'Dashboard.html'
            //location.assign('/index.html')
        }
    } catch (error) {
        console.log(error)
    }
})