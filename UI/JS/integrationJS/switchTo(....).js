const switchToBlogs = () => {

    var style = document.createElement('style');
    style.innerHTML = `
    #blogs {
            background: linear-gradient(180deg, rgba(20, 19, 53, 0.83) 0%, #B7BDC7 54.69%, rgba(20, 19, 53, 0.5) 100%);
            border-radius: 10px;
            padding: 20px;
            border: 2px solid black;
            color: white;
            font-weight: 600;
        }
    `
    style.innerHTML += `
    #users {
            background: none;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid black;
            color: white;
            font-weight: 600;
        }
    `
    document.head.appendChild(style);

    displayOfContentToBeDeleted.innerHTML = ''
    if(blogDataFromDB2){
        // Display published blogs in my DB
        displayPublished(blogDataFromDB2)
    }

    if(blogDataFromDB1){
        // Display draft blogs in my DB
        displayDrafts(blogDataFromDB1)
    }
}

const switchToUsers = () => {
    
    var style = document.createElement('style');
    style.innerHTML = `
    #blogs {
            background: none;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid black;
            color: white;
            font-weight: 600;
        }
    `
    style.innerHTML += `
    #users {
            background: linear-gradient(180deg, rgba(20, 19, 53, 0.83) 0%, #B7BDC7 54.69%, rgba(20, 19, 53, 0.5) 100%);
            border-radius: 10px;
            padding: 20px;
            border: 2px solid black;
            color: white;
            font-weight: 600;
        }
    `

    // style.innerHTML += `
    // .userInfo:hover {
    //     background: linear-gradient(180deg, rgba(20, 19, 53, 0.83) 0%, #B7BDC7 54.69%, rgba(20, 19, 53, 0.5) 100%);
    // }
    // `
    document.head.appendChild(style);

    displayOfContentToBeDeleted.innerHTML = ''

    const userInfoCategory = document.createElement("div");
    
    userInfoCategory.className = 'userInfoCategory'

    userInfoCategory.innerHTML = `
        <div id="count">
            <p id="countContent">S/N</p>
        </div>
        <div id="nameSlot">
            <p id="userName">Name</p>
        </div>
        <div id="emailSlot">
            <p id="email">
                Email address
            </p>
        </div>
        <div id="phoneNumSlot">
            <p id="phoneNumber">
                Phone number
            </p>
        </div>
        <div id="statusSlot">
            <p id="status">
                Status
            </p>
        </div>
    `
    displayOfContentToBeDeleted.appendChild(userInfoCategory);

    let userDataFromDB;

    (async() => {
        userDataFromDB = await fetch('https://backendapplication.up.railway.app/allusers', {
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

                displayOfContentToBeDeleted.innerHTML += `
                <div id=${userDataFromDB.data.users[i]["_id"]} class="userInfo" onmouseover="getidOfUser(this)">
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

}

function getidOfUser(obj){

    let currentLinkId = obj.id;
    console.log("The current link Id:",currentLinkId)
    const link = document.getElementById(currentLinkId);
    console.log(link);


    link.addEventListener("dblclick", async function(){
        console.log('delete is runing')
        const res = await fetch(`https://backendapplication.up.railway.app/deleteOneUser/${currentLinkId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            }
        }) 

        const resMessage  = await res.json()
        console.log('response message is this: ',resMessage)
        
        console.log(resMessage)

        if(resMessage.error){
            alert('Please log in to be sure that your are admin!')
            return 0
        }

        if(resMessage.statusCode === 200){

            var style = document.createElement('style');
            style.innerHTML += `
            #deleteMessage {
                    background: green;
                    border-radius: 10px;
                    width:200px
                    padding: 20px;
                    border: 2px solid black;
                    color: white;
                    font-weight: 600;
                }
            `
            document.head.appendChild(style);

            console.log(deleteMessage.innerHTML)
            deleteMessage.innerHTML = resMessage.message
            link.remove()
            return 0
        }
    })
}