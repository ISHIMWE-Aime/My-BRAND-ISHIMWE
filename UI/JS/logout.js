let userPresense = JSON.parse(localStorage.getItem('authorization'));
let logINB = document.getElementById('loginB');
console.log(logINB)

console.log(userPresense)

if(userPresense){
    logINB.innerHTML = 'Log Out'
}else{
    logINB.addEventListener('click', () => {
        location.href = "userLogin.html"
    })
}

// console.log(logINB[0].innerHTML, logINB[1].innerHTML)

// below are for dropDown
if(logINB.innerHTML === 'Log Out'){
    logINB.addEventListener('click', () => {
        userPresense = ''

        logINB.innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })
}

// this below are for side bar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById('bufferBlock').style.display = "none"
}

function w3_close() {
    document.getElementById('bufferBlock').style.display = "block"
    document.getElementById("mySidebar").style.display = "none";
}