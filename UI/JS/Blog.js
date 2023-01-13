let fromLocalStore =JSON.parse(localStorage.getItem("PublishedblogData"));
let previewedRAMdata = JSON.parse(localStorage.getItem("PreviwedblogData"));//for changing a signal
let logedInUserDataBase = JSON.parse(localStorage.getItem("CurrentUser"));//for login check

/*if(logedInUserDataBase === null){
    alert("Please login to make reactions and write a comment on blog");
}*/

console.log(fromLocalStore);

const grid = document.getElementById("blogGridLink");// to insert a blog.

let pubIDs = publishedIDs();
console.log(pubIDs);

function publishedIDs(){

    let i = 0;
    let IDs = [];

    if(fromLocalStore !== null){
        for( i = 0; i < fromLocalStore.length; i++){
            console.log(fromLocalStore[i]["backgroundImage"]);
            console.log(i);
            if(logedInUserDataBase !== null){
                grid.innerHTML += `
                <a onclick="location.href = 'Blog view.html';" class="blogLink" id=${fromLocalStore[i]["blogId"]} onmouseover="getid(this)" style="background: url(${fromLocalStore[i]["backgroundImage"]}); background-size: cover;"> <!-- change this into id -->
                    <div class="tittleAndReactions">
                        <h2 id=${ "BlogTittle" + fromLocalStore[i]["blogId"] }>${fromLocalStore[i]["Tittle"]}</h2>
                        <div class="reactionSet">
                            <div class="signAndP" id="share">
                                <button type="button" class="reactionsSlots">
                                    <img src="images/icons/Vectorshare.png" alt="" class="reactionIcons">
                                </button>
                                <p class="numberOfReactors">34</p>
                            </div>
                            <div class="signAndP" id="like">
                                <button type="button" class="reactionsSlots">
                                    <img src="images/icons/Vector 6like.png" alt="" class="reactionIcons">
                                </button>
                                <p class="numberOfReactors">34</p>
                            </div>
                            <div class="signAndP" id="comment" onclick="location.href = 'Blog view.html';">
                                <button type="button" class="reactionsSlots">
                                    <img src="images/icons/Vectorcoments.png" alt="" class="reactionIcons">
                                </button>
                                <p class="numberOfReactors">34</p>
                            </div>
                            <div class="signAndP" id="views">
                                <button type="button" class="reactionsSlots">
                                    <img src="images/icons/Remove red eyeeye.png" alt="" class="reactionIcons">
                                </button>
                                <p class="numberOfReactors">34</p>
                            </div>
                        </div>
                    </div>
                </a>
            `
            }else{
                grid.innerHTML += `
                <a onclick="location.href = 'Blog view.html';" class="blogLink" id=${fromLocalStore[i]["blogId"]} onmouseover="getid(this)" style="background: url(${fromLocalStore[i]["backgroundImage"]}); background-size: cover;"> <!-- change this into id -->
                        <div class="tittleAndReactions">
                            <h2 id=${ "BlogTittle" + fromLocalStore[i]["blogId"] }>${fromLocalStore[i]["Tittle"]}</h2>
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
        }
    }else{
        alert("I am sorry; there is no blogs published yet!");
        location.href = 'index.html'    }
    return IDs;
}

/* Codes from heaven*/

function getid(obj){
    let currentLinkId = obj.id;
    console.log(currentLinkId)
    const link = document.getElementById(currentLinkId);
    console.log(link);

    let currentTittleId = "BlogTittle" + currentLinkId;
    console.log(currentTittleId);

    const linkTittle = document.getElementById(currentTittleId).innerHTML;
    console.log(linkTittle)

    let linkRAM = [];
    let flag = false;

    link.addEventListener("click", function(){
        flag = true;
        if(JSON.parse(localStorage.getItem("PreviwedblogData")) !== null){
            previewedRAMdata.splice(0, 1);
            previewedRAMdata.unshift(flag);
        }
        linkRAM.push(flag);
        linkRAM.push(linkTittle);
        linkRAM.push(currentLinkId);
        localStorage.setItem("PreviwedblogData", JSON.stringify(previewedRAMdata));
        localStorage.setItem("linkData", JSON.stringify(linkRAM));
    })
}

