const userTableContainer = document.getElementById("margin-left");
let userDataFromDB
let currentState = [];
let previusState;

if(JSON.parse(localStorage.getItem('previusState')) !== null){
    previusState = JSON.parse(localStorage.getItem('previusState'))
}

(async() => {
    userDataFromDB = await fetch('https://important-red-beanie.cyclic.app/allMessages', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    userDataFromDB = await userDataFromDB.json()
    console.log(userDataFromDB.data)
    
    currentState = [...userDataFromDB.data]

    notification( previusState )
    displayUserMessages( userDataFromDB )
})()

const displayUserMessages = ( userDataFromDB ) => {
    console.log('messages are: ', userDataFromDB.data)
    
    if(userDataFromDB.data[0] !== undefined){
        // userDataFromDB = JSON.parse(localStorage.getItem("UserCredentials"));
        for(let i = 0; i < userDataFromDB.data.length; i++){

            userTableContainer.innerHTML += `
            <div class="userInfo" style="background: #141335;">
            <div id="count">
                <p id="countContent">${i + 1}</p>
            </div>
            <div id="nameSlot">
                <p id="userName">${userDataFromDB.data[i]["fullname"]}</p>
            </div>
            <div id="emailSlot">
                <p id="email">
                ${userDataFromDB.data[i]["email"]}
                </p>
            </div>
            <div id="phoneNumSlot">
                <p id="phoneNumber">
                ${userDataFromDB.data[i]["UserMessage"]}
                </p>
            </div>
            <div id="statusSlot">
                <p id="status">
                    Status
                </p>
            </div>
            </div>
            `
        }
    }else{
        alert("There are no messages received!");
    }

    localStorage.setItem('previusState', JSON.stringify(currentState))
}

const notification = ( previusStateInfo ) => {
    console.log('notification function is running!!!');

    if(previusStateInfo){
        if(previusStateInfo.length !== userDataFromDB.data.length){
            const notDisplay = document.getElementsByClassName('notCycle');
            console.log("the notdisplay is :",notDisplay);
            notDisplay[0].innerHTML = ( userDataFromDB.data.length - previusStateInfo.length);
            notDisplay[1].innerHTML = ( userDataFromDB.data.length - previusStateInfo.length);

            var style = document.createElement('style');
            style.innerHTML = `
            .notCycle{
                position: relative;
                top: -10px;
                left: -18px;
                border-radius: 50%;
                width: 18px;
                min-width: 10px;
                color: white;
                text-align: center;
                background-color: red;
                border: 2px solid rgb(225, 225, 225);
            }
            `
            document.head.appendChild(style);
        }
    }
}