localStorage.setItem("AdimnCredatials", JSON.stringify(["fabricei645@gmail.com", "Fab3@2005"]));
const userEmail = document.getElementById("emailinput");
const userpass = document.getElementById("passwordinput");
// const confirmInput = document.getElementById("passwordinputConfirm");
const emailErrorMessage = document.getElementById("emailErrorMessage");
const passErrorMessage = document.getElementById("passErrorMessage");
// const passConfirmErrorMessage = document.getElementById("passConfirmErrorMessage");
// const phoneNumber = document.getElementById("phone");
// const phoneNumberErrorMessage = document.getElementById("phoneNumberErrorMessage");
// document.cookie = "witcher=Geralt; SameSite=None; Secure"
// var input = document.querySelector("#phone");
// window.intlTelInput(input, {
//   separateDialCode: true
// });
// // Cookies.set('name', 'value', {
// //     sameSite: 'none',
// //     secure: true
// // })

// let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
let reg = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
// let regex = /\w+[!@#\$%\^&\*]{1,}[0-9]+/;
let regexp = (/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

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
    let adminData = JSON.parse(localStorage.getItem("AdimnCredatials"));

    if( (userEmail.value === adminData[0]) && (userpass.value === adminData[1])){
        console.log("runned");
        loginButton.innerHTML = `
        <div id="more" onclick="location.href = 'Dashboard.html';">
            <p id="more-text">
                <button type="submit">Log in</button>
            </p>
            <div id="dashedcycle">
                <div id="whiteCycle"></div>
            </div>
        </div>
    `
    }
});


