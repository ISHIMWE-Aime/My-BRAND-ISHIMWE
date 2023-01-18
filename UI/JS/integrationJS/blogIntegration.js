const grid = document.getElementById("blogGridLink");// to insert a blog.

const loading = document.querySelector('.loading')

window.onload = () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
}

let blogDataFromDB
let allLikes
let allComents

(async () => {
    blogDataFromDB = await fetch('https://important-red-beanie.cyclic.app/publishedBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }
    })
    
    blogDataFromDB = await blogDataFromDB.json()
    console.log('The published blogs are: ',blogDataFromDB.data)

    allLikes = await fetch('https://important-red-beanie.cyclic.app/allLikes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    allLikes = await allLikes.json()
    console.log('allLikes are: ', allLikes.data);

    allComents = await fetch('https://important-red-beanie.cyclic.app/allComents', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    allComents = await allComents.json()
    console.log('allComents are: ', allComents);
    
    if(blogDataFromDB.data){
        loading.innerHTML = '';
    }
    
    for(let i = 0; i < allLikes.data.length; i++){
        // console.log('for loop is running');
        for(let j = 0; j < blogDataFromDB.data.length; j++){
            //console.log('for in loop is running!', blogDataFromDB.data[j]);
            if(allLikes.data[i]['blogId'] === blogDataFromDB.data[j]['_id']){
                blogDataFromDB.data[j].likersIds = allLikes.data[i].likersIds
                console.log('Updated object is :',blogDataFromDB.data)
            }
        }
    }
    
    let pubIDs = publishedIDs();
    console.log(pubIDs);
    
})()


function publishedIDs(){
    
    let i = 0;
    let IDs = [];
    
    if(blogDataFromDB.data !== undefined){
        for( i = 0; i < blogDataFromDB.data.length; i++){
            console.log(blogDataFromDB.data[i]["imageUlr"]);
            console.log(i);
            
            if(!blogDataFromDB.data[i]['likersIds']){
                blogDataFromDB.data[i]['likersIds'] = [] // for setting default value of likes as zero(0)
            }

            grid.innerHTML += `
            <a onclick="location.href = 'Blog view.html';" class="blogLink" id=${blogDataFromDB.data[i]["_id"]} onmouseover="getid(this)" style="background: url(${blogDataFromDB.data[i]["imageUlr"]}); background-size: cover;"> <!-- change this into id -->
            <div class="tittleAndReactions">
            <h2 id=${ "BlogTittle" + blogDataFromDB.data[i]["_id"] }>${blogDataFromDB.data[i]["title"]}</h2>
            <div class="reactionSet">
            <div class="signAndP" id="share">
            <button type="button" class="reactionsSlots">
            <img src="images/icons/Vectorshare.png" alt="" class="reactionIcons">
            </button>
            <p id=${"numberOfReactors1" + blogDataFromDB.data[i]["_id"]} class="numberOfReactors"></p>
            </div>
            <div class="signAndP" id="like">
            <button type="button" class="reactionsSlots">
            <img src="images/icons/Vector 6like.png" alt="" class="reactionIcons">
            </button>
            <p id=${"numberOfReactors2" + blogDataFromDB.data[i]["_id"]} class="numberOfReactors">${blogDataFromDB.data[i]['likersIds'].length}</p>
            </div>
            <div class="signAndP" id="comment" onclick="location.href = 'Blog view.html';">
            <button type="button" class="reactionsSlots">
            <img src="images/icons/Vectorcoments.png" alt="" class="reactionIcons">
            </button>
            <p id=${"numberOfReactors3" + blogDataFromDB.data[i]["_id"]} class="numberOfReactors"></p>
            </div>
            <div class="signAndP" id="views">
            <button type="button" class="reactionsSlots">
            <img src="images/icons/Remove red eyeeye.png" alt="" class="reactionIcons">
            </button>
            <p id=${"numberOfReactors4" + blogDataFromDB.data[i]["_id"]} class="numberOfReactors"></p>
            </div>
            </div>
            </div>
            </a>
            `
        }
        IDs.push(
            {
                link : "blogLink" + i,
                tittle: "BlogTittle" + i
            }
            );
        }else{
            alert("I am sorry; there is no blogs published yet!");
            location.href = 'index.html'    
        }
        
        return IDs;
        
    }
    
    
    function getid(obj){
        let currentLinkId = obj.id;
        console.log(currentLinkId)
        const link = document.getElementById(currentLinkId);
        // console.log(link);
        
        let currentTittleId = "BlogTittle" + currentLinkId;
        console.log(currentTittleId);
        
        const linkTittle = document.getElementById(currentTittleId).innerHTML;
        console.log(linkTittle)
        
        const numberOfReactorsElId = 'numberOfReactors2' + currentLinkId
        console.log(numberOfReactorsElId)
        
        const numberOfReactors = document.getElementById(numberOfReactorsElId).innerHTML;
        console.log(numberOfReactors)
        
        let linkRAM = [];
        let flag = false;
        console.log(blogDataFromDB.data)
        
        link.addEventListener("click", function(){
            flag = true;
            // if(JSON.parse(localStorage.getItem("PreviwedblogData")) !== null){
            //     previewedRAMdata.splice(0, 1);
            //     previewedRAMdata.unshift(flag);
            // }
            linkRAM.push(flag);
            linkRAM.push(linkTittle);
            linkRAM.push(currentLinkId);
            linkRAM.push(numberOfReactors)
            localStorage.setItem("linkData", JSON.stringify(linkRAM))
            // localStorage.setItem('PublishedblogData', JSON.stringify(blogDataFromDB.data))
        })

}