const userTableContainer = document.getElementById("margin-left");
let userDataFromDB;

(async() => {
    userDataFromDB = await fetch('https://important-red-beanie.cyclic.app/allusers', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    userDataFromDB = await userDataFromDB.json()
    console.log(userDataFromDB.data)
    
    displayUsers( userDataFromDB )
})()

const displayUsers = ( userDataFromDB ) => {
    console.log('firstName', userDataFromDB.data.users[0].firstName)
    console.log('firstName', userDataFromDB.data.users[0].middleName)
    console.log('firstName', userDataFromDB.data.users[0].lastName)
    
    if(userDataFromDB.data.users !== null){
        // userDataFromDB = JSON.parse(localStorage.getItem("UserCredentials"));
        for(let i = 0; i < userDataFromDB.data.users.length; i++){

            let fullName
            if(userDataFromDB.data.users[i].middleName){
                fullName = userDataFromDB.data.users[i].firstName +' '+userDataFromDB.data.users[i].middleName+' '+userDataFromDB.data.users[i].lastName
            }
            else{
                fullName = userDataFromDB.data.users[i].firstName +' '+userDataFromDB.data.users[i].lastName
            }

            userTableContainer.innerHTML += `
            <div class="userInfo" style="background: #141335;">
            <div id="count">
                <p id="countContent">${i + 1}</p>
            </div>
            <div id="nameSlot">
                <p id="userName">${fullName}</p>
            </div>
            <div id="emailSlot">
                <p id="email">
                ${userDataFromDB.data.users[i]["email"]}
                </p>
            </div>
            <div id="phoneNumSlot">
                <p id="phoneNumber">
                ${userDataFromDB.data.users[i]["phone"]}
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
        alert("There are no registered user yet!");
    }
}
