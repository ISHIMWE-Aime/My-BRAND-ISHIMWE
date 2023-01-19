let messagesFromDB
let currentState = [];
let previusState;

if(JSON.parse(localStorage.getItem('previusState')) !== null){
    previusState = JSON.parse(localStorage.getItem('previusState'))
}

(async() => {
    messagesFromDB = await fetch('https://backendapplication.up.railway.app/allMessages', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    messagesFromDB = await messagesFromDB.json()
    console.log(messagesFromDB.data)
    
    currentState = [...messagesFromDB.data]

    notification( previusState )
    localStorage.setItem('previusState', JSON.stringify(currentState))
})()


const notification = ( previusStateInfo ) => {
    console.log('notification function is running!!!');

    if(previusStateInfo){
        if(previusStateInfo.length !== messagesFromDB.data.length){
            const notDisplay = document.getElementsByClassName('notCycle');
            console.log("the notdisplay is :",notDisplay);
            notDisplay[0].innerHTML = ( messagesFromDB.data.length - previusStateInfo.length);
            notDisplay[1].innerHTML = ( messagesFromDB.data.length - previusStateInfo.length);

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
                background-color: green;
                border: 2px solid rgb(225, 225, 225);
            }
            `
            document.head.appendChild(style);
        }
    }
}