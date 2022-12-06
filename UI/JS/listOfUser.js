const userTableContainer = document.getElementById("margin-left");
let dataFromLocalStore;

if(JSON.parse(localStorage.getItem("UserCredentials")) !== null){
    dataFromLocalStore = JSON.parse(localStorage.getItem("UserCredentials"));
    for(let i = 0; i < dataFromLocalStore.length; i++){
        userTableContainer.innerHTML += `
        <div id="userInfo" style="background: #141335;">
        <div id="count">
            <p id="countContent">${i + 1}</p>
        </div>
        <div id="nameSlot">
            <p id="userName">${dataFromLocalStore[i]["name"]}</p>
        </div>
        <div id="emailSlot">
            <p id="email">
            ${dataFromLocalStore[i]["email"]}
            </p>
        </div>
        <div id="phoneNumSlot">
            <p id="phoneNumber">
            ${dataFromLocalStore[i]["phone"]}
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
