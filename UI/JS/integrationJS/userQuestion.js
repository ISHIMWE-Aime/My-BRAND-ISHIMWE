const form = document.querySelector('form')
const element = document.getElementsByClassName('element')
const subButton = document.querySelector('#more-button')
const loading = document.querySelector('.loading')
const errorMessagesElements = document.getElementsByClassName('errorMessages')

// console.log(errorMessagesElements, element);
subButton.addEventListener('click', () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Sending...<p>
    `
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // reset error messages
    for(let i = 0; i < errorMessagesElements.length; i++){
        errorMessagesElements[i].innerHTML = ''
    }

    // get input values

    const email = form.email.value;
    const fullname = form.fullname.value;
    const UserMessage = form.message.value;

    const messageInfo = { email, fullname , UserMessage };

    console.log(messageInfo)
    try { //https://important-red-beanie.cyclic.app
        const res = await fetch('https://important-red-beanie.cyclic.app/sendMessage', {
            method: 'POST',
            body: JSON.stringify(messageInfo),
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            },
        })

        const resMessage = await res.json()
        console.log(resMessage)

        if(resMessage.error){
            alert(`${resMessage.error}`)
        }

        if(resMessage.statusCode === 400){
            loading.innerHTML = ''

            console.log(resMessage.message[0].fullname)

            if(resMessage.message[0].fullname){
                errorMessagesElements[0].innerHTML = resMessage.message[0].fullname
            }
            if(resMessage.message[0].email){
                errorMessagesElements[1].innerHTML = resMessage.message[0].email
            }
            if(resMessage.message[0].UserMessage){
                errorMessagesElements[2].innerHTML = resMessage.message[0].UserMessage
            }
        }

        if(resMessage.statusCode === 200){
            loading.innerHTML = `
            <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Sent...<p>
            `
            location.href = 'index.html'
            //location.assign('/index.html')
        }
    } catch (error) {
        console.log(error)
    }
})