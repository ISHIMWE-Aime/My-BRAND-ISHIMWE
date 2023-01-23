let tittleTex = JSON.parse(localStorage.getItem("linkData"));//to capture clicked blog
let previewDataFromLocal = JSON.parse(localStorage.getItem("PreviwedblogData"));
let dataFromDataBase 

const blogViewTittle = document.getElementById("BlogViewTittle");
console.log(tittleTex, blogViewTittle);

const paragraphSlot = document.getElementById("paragraph");
const blogImage = document.getElementById("blogImageslot");

let comment = document.getElementById("contentOfNewComent");
const post = document.getElementById("post");
const listOfComents= document.getElementById("listOfComents");
const timeSlot = document.getElementById("time");
const numOfComents = document.getElementById("numOfComents");
const likes = document.querySelector('#numberOfReactor2')
const likeButton = document.querySelector('#likeButton')

let logedInUserDataBase = localStorage.getItem("CurrentUser")

console.log('The loged in user is :',logedInUserDataBase)
console.log('The current blog id is :', tittleTex[2])

if(logedInUserDataBase !== "undefined" ){
    logedInUserDataBase = JSON.parse(logedInUserDataBase);
}
//let UserCredentials = JSON.parse(localStorage.getItem("UserCredentials"));

let commentData = [];
let newComment = {};
let time = new Date();

(async() => {
    let blogDataFromDB = await fetch('https://backendapplication.up.railway.app/publishedBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })

    blogDataFromDB = await blogDataFromDB.json()

    allLikes = await fetch('https://backendapplication.up.railway.app/allLikes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    
    allLikes = await allLikes.json()
    //console.log('allLikes are: ', allLikes.data);

    allComents = await fetch('https://backendapplication.up.railway.app/allComents', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })

    allComents = await allComents.json()
    console.log('allComents are: ', allComents);
    
    if(allLikes.data[0] !== undefined){
        for(let i = 0; i < allLikes.data.length; i++){
            // console.log('for loop is running');
            for(let j = 0; j < blogDataFromDB.data.length; j++){
                //console.log('for in loop is running!', blogDataFromDB.data[j]);
                if(allLikes.data[i]['blogId'] === blogDataFromDB.data[j]['_id']){
                    blogDataFromDB.data[j].likersIds = allLikes.data[i].likersIds
                    //console.log('Updated object is :',blogDataFromDB.data)
    
                    dataFromDataBase = blogDataFromDB.data
                    console.log('dataFromDataBase',dataFromDataBase)
                }
                else{
                    dataFromDataBase = blogDataFromDB.data
                }
            }
        }
    }else{
        dataFromDataBase = blogDataFromDB.data
    }

    distribution(dataFromDataBase)
    displayListOfComents( allComents )
})()

// Data distribution
function distribution(dataFromDataBase){
    console.log('Received data is distribution : ', dataFromDataBase)

    if((JSON.parse(localStorage.getItem("linkData")) !== null) && (tittleTex[0] === true)){
        if(tittleTex[0] == true){    
            blogViewTittle.innerHTML = tittleTex[1];
            for(let i = 0; i < dataFromDataBase.length; i++){
                for(const property in dataFromDataBase[i]){
                    if(dataFromDataBase[i][property] === tittleTex[1]){
                        if(dataFromDataBase[i]["_id"] === tittleTex[2]){//to filter the likes for each blog
                            console.log(dataFromDataBase[i][property]);
                            blogImage.innerHTML = `
                            <img src=${dataFromDataBase[i]["imageUlr"]} alt="" id="blogImage">
                            `
                            paragraphSlot.innerHTML  = dataFromDataBase[i]["content"];
                            if(dataFromDataBase[i]["likersIds"]){
                                likes.innerHTML = dataFromDataBase[i]["likersIds"].length
                            }else{
                                likes.innerHTML = 0
                            }
                        }
                    }
                }
            }
        }
    } else{
        blogViewTittle.innerHTML = previewDataFromLocal[1]["title"];
        paragraphSlot.innerHTML  = previewDataFromLocal[1]["content"];
        blogImage.innerHTML = `
            <img src=${previewDataFromLocal[1]["imageUlr"]} alt="" id="blogImage">
        `
    }

    // Recommended display
    const recommended = document.getElementById("listOfRecommended");
    if(dataFromDataBase !== null)
        for(let i = 0; i < dataFromDataBase.length; i++){
            recommended.innerHTML += `
            <div class="recArticles">
            <div class="recArticleImageSlot">
                <img src=${dataFromDataBase[i]["imageUlr"]} alt="recommended_Article_Image" class="recArticleImage">
            </div>
            <div id="recArticleTittle">
                <h2>${dataFromDataBase[i]["title"]}</h2>
            </div>
            </div>
        `
        }
}

// Add like

likeButton.addEventListener('click', async () => {
    console.log('clicked');

    if(JSON.parse(localStorage.getItem('authorization'))){
        try {
            const res = await fetch('https://backendapplication.up.railway.app/like', {
                method: 'POST',
                body: JSON.stringify({ 'likerId': logedInUserDataBase, 'blogId': tittleTex[2] }),
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('authorization'))
                }
            }) 
    
            const resMessage  = await res.json()
            console.log('response message is this: ',resMessage)
            
            if(resMessage.error){
                alert('Please log in to make any reaction!')
                return 0
            }
    
            let allLikes = await fetch('https://backendapplication.up.railway.app/allLikes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            allLikes = await allLikes.json()
            console.log('allLikes are: ', allLikes);
    
            likesUpdate(allLikes)
        } catch (error) {
            console.log(error)
        }
    }
    else{
        alert('Please log in to add like')
    }
})

const likesUpdate = (allLikes) => {

    if(allLikes.data.length !== 0){
        for(let i = 0; i < allLikes.data.length; i++){
            if(allLikes.data[i]['blogId'] === tittleTex[2]){
                // blogDataFromDB.data[j].likersIds = allLikes.data[i].likersIds
                // console.log('Updated object is :',blogDataFromDB.data)
                console.log('likers are :' ,allLikes.data[i]['likersIds'].length)
    
                likes.innerHTML = allLikes.data[i]["likersIds"].length
                return 0 // to avoid overriding of displayed like value
            }
            else{
                console.log('This is run');
                likes.innerHTML = 0
            }
        }

        // if(tittleTex[0] == true){    
        //     for(let i = 0; i < dataFromDataBase.length; i++){
        //         if(dataFromDataBase[i]["_id"] === tittleTex[2]){//to filter the likes for each blog
        //             //console.log('likers in localStorage are: ', dataFromDataBase[i]["likersIds"])
        //             //console.log('updated likes are: ', allLikes.data[i]["likersIds"])
        //             console.log('Blog selected in drafts',dataFromDataBase[i]['_id'])
        //             console.log('allLIkes.data is :', allLikes.data)
        //             for(let j = 0; j < allLikes.data.length; j++){
        //                 if(allLikes.data[j]['blogId'] === tittleTex[2]){
        //                     likes.innerHTML = allLikes.data[i]["likersIds"].length
        //                     // dataFromDataBase[i]["likersIds"] = allLikes.data[j]["likersIds"]
        //                     // localStorage.setItem("PublishedblogData", JSON.stringify(dataFromDataBase))// for displaying updated likes.
        //                 }
        //                 else{
        //                     console.log('else is run')
        //                     dataFromDataBase[i]["likersIds"] = []
        //                     // localStorage.setItem("PublishedblogData", JSON.stringify(dataFromDataBase))
        //                 }
        //             }
        //         }
        //     }
        // }

    } else {
        likes.innerHTML = 0
        // for(let i = 0; i < dataFromDataBase.length; i++){// resetting all likes to zero in localStorage
        //     dataFromDataBase[i]['likersIds'] = []
        //     //localStorage.setItem("PublishedblogData", JSON.stringify(dataFromDataBase))
        // }
    }

}

// Coment display

const displayC = ( commentDataa ) => {
    for(let i = 0; i < commentDataa.length ; i++){
        if(commentDataa[i]['userId'] ==  logedInUserDataBase ){
            if( commentDataa[i]['blogId'] == tittleTex[2]){
                listOfComents.innerHTML += `
                <div id="commentorAndComment">
                <div id="commentorImageSlot">
                    <img src="images/commentor pict.jpg" alt="commentorImage" id="commentorImage">
                </div>
                <div id="commetorNameTimeAndParagraph">
                    <div id="commentorNameAndTime">
                        <h5 class="commentorName">${commentDataa[i]['name']}</h5>
                        <p id="time">- ${commentDataa[i]["createdAt"]}</p>
                    </div>
                    <p id="comentParagraph">
                        ${commentDataa[i]["comentData"]}
                    </p>
                </div>
                </div>
                `
            }
        }
    }

    comment.value = "";
}

const displayListOfComents = async ( coments ) => {
    console.log( 'The coments is :',coments )

    if( coments.data[0] !== undefined){
        
        userDataFromDB = await fetch('https://backendapplication.up.railway.app/allUsersComentors', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            }
        })
        // console.log('All users from db are: ',userDataFromDB) 

        userDataFromDB = await userDataFromDB.json()
        console.log('All users from db are: ',userDataFromDB.data)

        commentData = coments.data
        
        let numCount = 0;
        let fullName
        // for(let i = 0; i < userDataFromDB.data.users.length ; i++){
        //     if(userDataFromDB.data.users[i]['_id'] ==  logedInUserDataBase ){
        //         if(userDataFromDB.data.users[i].middleName){
        //             fullName = userDataFromDB.data.users[i].firstName +' '+userDataFromDB.data.users[i].middleName+' '+userDataFromDB.data.users[i].lastName
        //         }
        //         else{
        //             fullName = userDataFromDB.data.users[i].firstName +' '+userDataFromDB.data.users[i].lastName
        //         }

        //         console.log('The user full name is: ', fullName)
        //         userDataFromDB.data.users[i]['name'] = fullName
        //         console.log( userDataFromDB.data.users)
        //     }
        // }

    
        console.log('The commentData is :', commentData );
        for(let i = 0; i < commentData.length; i++){
            if( commentData[i]["blogId"] === tittleTex[2]){
                numCount += 1;

                for(let j = 0; j < userDataFromDB.data.users.length ; j++){
                    if(userDataFromDB.data.users[j]['_id'] ==  logedInUserDataBase ){
                        if(userDataFromDB.data.users[j].middleName){
                            fullName = userDataFromDB.data.users[j].firstName +' '+userDataFromDB.data.users[j].middleName+' '+userDataFromDB.data.users[j].lastName
                        }
                        else{
                            fullName = userDataFromDB.data.users[j].firstName +' '+userDataFromDB.data.users[j].lastName
                        }
        
                        console.log('The user full name is: ', fullName)
                        commentData[i]['name'] = fullName
                        console.log('THE COMENTES AFTER ADDING NAME: ',commentData[i])
                    }
                }

            }
        }

        displayC( commentData );
        numOfComents.innerHTML = numCount;
    }
}


// To post a comment
post.addEventListener("click", async function(){
    //remember to ret newComment to empty objet for it click
    // newComment = {};

    // let timeAndYear = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "-" + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear();
    // let currentUserName;

    if(JSON.parse(localStorage.getItem('authorization')) !== ''){

        blogId = tittleTex[2];
        userId = logedInUserDataBase;
        commentData = comment.value;

        newComment = { blogId, userId, 'comentData': commentData };
        console.log(" the created coment is: ", newComment)
        const res = await fetch('https://backendapplication.up.railway.app/createComent', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            },
        })

        const resMessage = await res.json()
        console.log('The user id is:', resMessage)

        if(resMessage.statusCode === 201){
            allComents = await fetch('https://backendapplication.up.railway.app/allComents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(localStorage.getItem('authorization'))
                }
            })
        
            allComents = await allComents.json()
            console.log('allComents are: ', allComents);

            displayListOfComents( allComents )
        }
        // for(let j = 0; j < UserCredentials.length; j++){
        //     if(logedInUserDataBase["email"] === UserCredentials[j]["email"]){
        //         //let commentorName = document.getElementsByClassName("commentorName");
        //         currentUserName = UserCredentials[j]["name"];
        //     }
        // }
        

        // listOfComents.innerHTML += `
        // <div id="commentorAndComment">
        // <div id="commentorImageSlot">
        //     <img src="images/commentor pict.jpg" alt="commentorImage" id="commentorImage">
        // </div>
        // <div id="commetorNameTimeAndParagraph">
        //     <div id="commentorNameAndTime">
        //         <h5 class="commentorName">${currentUserName}</h5>(I think there is a bug here!)
        //         <p id="time">- ${timeAndYear}</p>
        //     </div>
        //     <p id="comentParagraph">
        //         ${comment.value}
        //     </p>
        // </div>
        // </div>
        // `
    
        // newComment["comment"] = comment.value;
        // newComment["blogId"] = tittleTex[2];
        // newComment["blogTittle"] = tittleTex[1];
        // newComment["time"] = timeAndYear;
    
        // commentData.push(newComment);
        // console.log(commentData);
        // localStorage.setItem("comments", JSON.stringify(commentData));
    }else{
        alert("Please login to make a comment");
    }
})

