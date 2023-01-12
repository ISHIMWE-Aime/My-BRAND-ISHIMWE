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
        const res = await fetch('https://backendapplication.up.railway.app/adminLogin', {
            method: 'POST',
            credentials:'include',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        })

        console.log(res.jwt)
        const resMessage = await res.json()
        console.log(res)
        console.log(resMessage)

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