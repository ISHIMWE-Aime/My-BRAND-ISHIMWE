let fromLocalStore =JSON.parse(localStorage.getItem("PublishedblogData"));
let previewedRAMdata = JSON.parse(localStorage.getItem("PreviwedblogData"));
console.log(fromLocalStore);
const grid = document.getElementById("blogGridLink");

let pubIDs = publishedIDs();
console.log(pubIDs);

// let me = new Date().getTime()
// console.log(me)

function publishedIDs(){

    let i = 0;
    let IDs = [];
    for( i = 0; i < fromLocalStore.length; i++){
        console.log(i);
        grid.innerHTML += `
        <a href="Blog view.html" class="blogLink" id="${ "blogLink" + i}" onmouseover="getid(this)"> <!-- change this into id -->
                <div class="tittleAndReactions">
                    <h2 id="${ "BlogTittle" + i }">${fromLocalStore[i]["Tittle"]}</h2>
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
                        <div class="signAndP" id="comment">
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
        IDs.push(
            {
                link : "blogLink" + i,
                tittle: "BlogTittle" + i
            }
        );
    }
    return IDs;
}


// ;
// 

// console.log(link, linkTittle);
// link.addEventListener("click" ,function(){
//     
// });

/* Codes from heaven*/

function getid(obj){
    let currentLinkId = obj.id;
    console.log(currentLinkId)
    const link = document.getElementById(currentLinkId);
    console.log(link);

    let currentTittleId = "BlogTittle" + String.fromCharCode(currentLinkId.charCodeAt(currentLinkId.length - 1));
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
        localStorage.setItem("PreviwedblogData", JSON.stringify(previewedRAMdata));
        localStorage.setItem("linkData", JSON.stringify(linkRAM));
    })
}