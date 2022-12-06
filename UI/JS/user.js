localStorage.setItem("AdimnCredatials", JSON.stringify(["fabricei645@gmail.com", "Fab3@2005"]));
const userEmail = document.getElementById("emailinput");
const userpass = document.getElementById("passwordinput");
const emailErrorMessage = document.getElementById("emailErrorMessage");
const passErrorMessage = document.getElementById("passErrorMessage");

let reg = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
let regexp = (/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
let deleted = false;

userEmail.addEventListener("input", function(){
    if( regexp.test(userEmail.value)){
        emailErrorMessage.innerHTML = `
            <p style="color: greenyellow; font-size: 15px;">Valid<p>
        `
        // console.log("Valited");

    }else{
        // console.log("invalid email");
        emailErrorMessage.innerHTML = `
            <p style="color: rgb(255, 100, 0); font-size: 15px;">Inalid email<p>
        `
    }
});

let logedInUser = {};

userpass.addEventListener("input", function(){
    console.log(userpass.value.match(reg));
    if( reg.test(userpass.value)){
        passErrorMessage.innerHTML = `
            <p style="color: greenyellow; font-size: 15px;">Valid<p>
        `
    }else{
        passErrorMessage.innerHTML = `
            <p style="color: rgb(255, 100, 0); font-size: 15px;">Invalid passWord<p>
        `
    }

    const loginButton = document.getElementById("more-button");
    let userData = JSON.parse(localStorage.getItem("UserCredentials"));

    for(let i = 0; i < userData.length; i++){
        if( (userEmail.value === userData[i]["email"]) && (userpass.value === userData[i]["passW"])){
            deleted = true;

            logedInUser["email"] = userData[i]["email"];
            logedInUser["passW"] = userData[i]["passW"];
            logedInUser["backgroundImage"] = "";
            logedInUser["name"] = "";

            console.log("runned", logedInUser);
            localStorage.setItem("CurrentUser", JSON.stringify(logedInUser));

            loginButton.innerHTML = `
            <div id="more" onclick="location.href = 'index.html';">
                <p id="more-text">
                    <button type="submit">Log in</button>
                </p>
                <div id="dashedcycle">
                    <div id="whiteCycle"></div>
                </div>
            </div>
        `
        } //else{ //if the user delete his password make it clear.
            
        //     loginButton.innerHTML = `
        //     <div id="more">
        //         <p id="more-text">
        //             <button type="submit">Log in</button>
        //         </p>
        //         <div id="dashedcycle">
        //             <div id="whiteCycle"></div>
        //         </div>
        //     </div>
        // `
        // }
    }
});

const loginConf = document.getElementById("more");

loginConf.addEventListener("click", function(){
    if(deleted !== true) {
        logedInUser = {};
        localStorage.setItem("CurrentUser", JSON.stringify(logedInUser));
        alert("Your credentials doesn't match any, in our database; My be you are not registered. If you want CREATE ACCOUNT");
    }
})