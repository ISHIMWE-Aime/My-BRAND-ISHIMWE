
const form = document.querySelector('form')
const selectedCode = document.getElementsByClassName("iti__selected-dial-code")[0].innerHTML
const confirmInput = document.getElementById("passwordinputConfirm");
const userpass = document.getElementById("passwordinput");
const subButton = document.querySelector('#more-button')
const loading = document.querySelector('.loading')

const firstNameErrorEl = document.querySelector('#firstNameErrorMessage')
const middleNameErrorEl = document.querySelector('#middleNameErrorMessage')
const lastNameErrorEl = document.querySelector('#lastNameErrorMessage')
const emailErrorEl = document.querySelector('#emailErrorMessage')
const phoneNumberErrorEl = document.querySelector('#phoneNumberErrorMessage')
const passwordErrorEl = document.querySelector('#passErrorMessage')


let password
confirmInput.addEventListener("input", function(){
    if(userpass.value !== confirmInput.value){
        passConfirmErrorMessage.innerHTML = `
        <p style="color: rgb(255, 100, 0); font-size: 15px;">The passWord not matching.<p>
        `
    } else{
        if( confirmInput.value.length !== 0){

            password = form.password.value

            passConfirmErrorMessage.innerHTML = `
            <p style="color: greenyellow; font-size: 15px;">Match.<p>
            `
        }
    }
})

subButton.addEventListener('click', () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // console.log(selectedCode);
    // console.log(form.email.value, form.userPreference.value)

    // reset error messages
    firstNameErrorEl.innerHTML = ''
    middleNameErrorEl.innerHTML = ''
    lastNameErrorEl.innerHTML = ''
    emailErrorEl.innerHTML = ''
    phoneNumberErrorEl.innerHTML = ''
    passwordErrorEl.innerHTML = ''

    // get values of inputs
    const firstName = form.firstName.value
    const middleName = form.middleName.value
    const lastName = form.lastName.value
    const email = form.email.value
    const userPreference = form.userPreference.value
    const phoneCountryCode = selectedCode
    const phone = form.phone.value            

    const newUser = { firstName, middleName, lastName, email, userPreference, phoneCountryCode, phone, password }
    
    try {
        const res = await fetch('https://important-red-beanie.cyclic.app/userRegister', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' },
        })

        const resMessage = await res.json()
        console.log(resMessage)
            
        if(resMessage){
            loading.innerHTML = '';
        }

        if(!resMessage.statusCode){
            console.log(resMessage.password)

            if((!resMessage.firstName)){
                firstNameErrorEl.innerHTML = ''
            }
            else{
                firstNameErrorEl.innerHTML = resMessage.firstName
            }

            if((!resMessage.lastName)){
                lastNameErrorEl.innerHTML = ''
            }
            else{
                lastNameErrorEl.innerHTML = resMessage.lastName
            }

            if((!resMessage.phone)){
                phoneNumberErrorEl.innerHTML = ''
            }
            else{
                phoneNumberErrorEl.innerHTML = resMessage.phone
            }

            emailErrorEl.innerHTML = resMessage.email
            passwordErrorEl.innerHTML = resMessage.password
        }

        if(resMessage.statusCode === 400){
            emailErrorEl.innerHTML = resMessage.message
        }

        if(resMessage.statusCode === 200){
            location.href = 'userLogin.html'
            //location.assign('/index.html')
        }
    } catch (error) {
        console.log(error);
    }
})