const userEmail = document.getElementById("emailinput");
const userpass = document.getElementById("passwordinput");
const confirmInput = document.getElementById("passwordinputConfirm");
const firstNameInput = document.getElementById("firstNameInput");
const middleNameInput = document.getElementById("middleNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const firstNameErrorMessage = document.getElementById("firstName");
const middleNameErrorMessage = document.getElementById("middleName");
const lastNameErrorMessage = document.getElementById("lastName");
const emailErrorMessage = document.getElementById("emailErrorMessage");
const passErrorMessage = document.getElementById("passErrorMessage");
const passConfirmErrorMessage = document.getElementById("passConfirmErrorMessage");
const phoneNumber = document.getElementById("phone");
const phoneNumberErrorMessage = document.getElementById("phoneNumberErrorMessage");
const button = document.getElementById("more-button");
const fiedsInput = document.getElementById("fieldsInput");

let name1Flag = false;
let name2Flag = false;
let name3Flag = false;
let passFlag = false;
let passCFlag = false;
let phoneFlag = false;
let emailFlag = false;
let users = [];
let newUser = {};

if((JSON.parse(localStorage.getItem("UserCredentials"))) !== null){
    users = JSON.parse(localStorage.getItem("UserCredentials"));
}

document.cookie = "witcher=Geralt; SameSite=None; Secure"
var input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true
});


let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
let reg = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
let regexp = (/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

userEmail.addEventListener("input", function(){
    if( regexp.test(userEmail.value)){
        emailFlag = true;
        emailErrorMessage.innerHTML = `
            <p style="color: greenyellow; font-size: 15px;">Valid.<p>
        `
        // console.log("Valited");

    }else{
        // console.log("invalid email");
        emailErrorMessage.innerHTML = `
            <p style="color: rgb(255, 100, 0); font-size: 15px;">Inalid email.<p>
        `
    }
});

userpass.addEventListener("input", function(){
    if( reg.test(userpass.value)){
        passFlag = true;
        passErrorMessage.innerHTML = `
            <p style="color: greenyellow; font-size: 15px;">Valid.<p>
        `
        // console.log("Valited");

    }else{
        passErrorMessage.innerHTML = `
            <p style="color: rgb(255, 100, 0); font-size: 15px;">Invalid passWord.<p>
        `
        // console.log("invalid passWord");
    }
});

confirmInput.addEventListener("input", function(){
    if(userpass.value !== confirmInput.value){
        passConfirmErrorMessage.innerHTML = `
        <p style="color: rgb(255, 100, 0); font-size: 15px;">The passWord not matching.<p>
        `
    } else{
        if( confirmInput.value.length !== 0){
            passCFlag = true;
            passConfirmErrorMessage.innerHTML = `
        <p style="color: greenyellow; font-size: 15px;">Match.<p>
        `
        }
    }
})

phoneNumber.addEventListener("input", function(){
    console.log(phoneNumber.value);

  if(phoneRegex.test(phoneNumber.value)){
    phoneFlag = true;
        phoneNumberErrorMessage.innerHTML = `
        <p style="color: greenyellow; font-size: 15px;">Valid Number.<p>
        `
    }else{
        phoneNumberErrorMessage.innerHTML = `
        <p style="color: rgb(255, 100, 0); font-size: 15px;">Invalid Number.<p>
        `
    }
})
 
button.addEventListener("click", function(){
    if(firstNameInput.value === ""){
        firstNameErrorMessage.innerHTML = `
        <p style="color: rgb(255, 100, 0); font-size: 15px;">Your first Name is require.<p>
        `
    }else{
        name1Flag = true;
    }
    if(middleNameInput.value === ""){
        // middleNameErrorMessage.innerHTML = `
        // <p style="color: rgb(255, 100, 0); font-size: 15px;">Your middle Name is required.<p>
        // `
    }else {
        name2Flag = true
    }
    if(lastNameInput.value === ""){
        lastNameErrorMessage.innerHTML = `
        <p style="color: rgb(255, 100, 0); font-size: 15px;">Your last Name is required.<p>
        `
    }else{
        name3Flag = true;
    }

    console.log(name1Flag, name2Flag, name3Flag, emailFlag, passFlag, passCFlag, phoneFlag);

    if( phoneFlag && name1Flag && name3Flag && passFlag && passCFlag && emailFlag){
        newUser = {};
        let name = "";
        const selectedCode = document.getElementsByClassName("iti__selected-dial-code")[0].innerHTML;

        if( name2Flag ){
            name = firstNameInput.value +" "+ middleNameInput.value +" "+ lastNameInput.value;
        }else{
            name = firstNameInput.value +" "+ lastNameInput.value;
        }

        console.log("The name is : ");
        newUser["name"] = name;
        newUser["email"] = userEmail.value;
        newUser["passW"] = userpass.value;
        newUser["phoneCountryCode"] = selectedCode;
        newUser["phone"] = phoneNumber.value;
        newUser["field"] = fiedsInput.value;

        users.push(newUser);
        console.log(users);
        localStorage.setItem("UserCredentials", JSON.stringify(users));
    }
})


// GENERATE A CODE FROM COUNTRY CODE
// let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
// console.log(regionNames.of('RW'));