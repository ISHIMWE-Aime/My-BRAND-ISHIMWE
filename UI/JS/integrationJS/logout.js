let userPresense = JSON.parse(localStorage.getItem('authorization'));
let logINB = document.getElementsByClassName('loginB');
console.log(logINB)

console.log(userPresense)
if(userPresense){
    logINB[0].innerHTML = 'Log Out'
    logINB[1].innerHTML = 'Log Out'
}else{
    logINB[0].addEventListener('click', () => {
        location.href = 'userLogin.html'
    })

    logINB[1].addEventListener('click', () => {
        location.href = 'userLogin.html'
    })
}

console.log(logINB[0].innerHTML, logINB[1].innerHTML)

if(logINB[0].innerHTML === 'Log Out'){
    logINB[0].addEventListener('click', () => {
        userPresense = ''

        logINB[0].innerHTML = 'Log in'
        logINB[1].innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })

    logINB[1].addEventListener('click', () => {
        userPresense = ''
        
        logINB[0].innerHTML = 'Log in'
        logINB[1].innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })
}