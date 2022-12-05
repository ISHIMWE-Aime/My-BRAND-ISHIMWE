let fromLocalStore =JSON.parse(localStorage.getItem("blogData"));
console.log(fromLocalStore);
const blogTittle = document.getElementById("blogTittlefordraft");
const firstLettle = document.getElementById("firstLetter");
const marginLeftContainer = document.getElementById("margin-left");
console.log(marginLeftContainer);

let pubIDs = publishedIDs();
console.log(pubIDs);

function publishedIDs(){

    let i = 0;
    let IDs = [];

    for(i = 0; i < fromLocalStore.length; i++){
        console.log(fromLocalStore[i]);
        // firstLettle.innerHTML = String.fromCharCode(fromLocalStore[1]["Tittle"].charCodeAt(0));
        // blogTittle.innerHTML = fromLocalStore[i]["Tittle"];
        marginLeftContainer.innerHTML += `
            <a href="New Article.html" class="blogBlock" id=${fromLocalStore[i]["blogId"]} onmouseover="getid(this)">
                <div class="left">
                    <div class="firstLetterSlot">
                        <center>
                            <h1 id="firstLetter">${String.fromCharCode(fromLocalStore[i]["Tittle"].charCodeAt(0))}</h1>
                        </center>
                    </div>

                    <div class="TittleDotTime">
                        <div class="blogTittle">
                            <h3 id=${"blogTittlefordraft" + fromLocalStore[i]["blogId"]}>${fromLocalStore[i]["Tittle"]}</h3>
                        </div>
                        <div class="DotTime">
                            <div class="dot" id="d3"></div>
                            <div class="TimeOfevent">
                                <h6>From Js</h6> <!--from Js-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AdminNameBlogStatus">
                    <div class="adminName">
                        <h4 id=${"author" + fromLocalStore[i]["blogId"]}>${fromLocalStore[i]["Author"]}</h4>
                    </div>
                    <div class="BlogStatus">
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
                        <div class="blogStatusWord">
                            <h5>Published</h5>
                        </div>
                    </div>
                </div>
            </a>

    `
        IDs.push(
            {
                link : fromLocalStore[i]["blogId"],
                tittle: "blogTittlefordraft" + i,
                Author: "author" + i
            }
        );
    }    
    
    return IDs;
}


// const gh = document.getElementById("gh");

// console.log(firstLettle);

// console.log(fromLocalStore[0]["Tittle"].charCodeAt(0));


function getid(obj){
    let linkRAM = [];
    let flag = false;
    localStorage.setItem("linkDataForEdit", JSON.stringify(linkRAM));

    let currentLinkId = obj.id;
    console.log(currentLinkId)
     const link = document.getElementById(currentLinkId);
    console.log(link);

    let currentTittleId = 'blogTittlefordraft' + currentLinkId;
    console.log(currentTittleId);

    const linkTittle = document.getElementById(currentTittleId).innerHTML;
    console.log("the tittle is :",linkTittle);
    
    let currentAuthorId = 'author' + currentLinkId;
    console.log(currentAuthorId);

    const AuthorName = document.getElementById(currentAuthorId).innerHTML;
    console.log("the author name is :",AuthorName);

    link.addEventListener("click", function(){
        for(let i = 0; i < fromLocalStore.length; i++){
            for(const property in fromLocalStore[i]){
                if(fromLocalStore[i][property] === linkTittle){
                    console.log(fromLocalStore[i][property]); 
                    //paragraphSlot.innerHTML  = dataFromDataBase[i]["blog"];
                }
            }
        }
         flag = true;
    //     previewedRAMdata.splice(0, 1);
         linkRAM.unshift(flag);
    //     linkRAM.push(flag);
         linkRAM.push(linkTittle);
         linkRAM.push(AuthorName);
    //    localStorage.setItem("PreviwedblogData", JSON.stringify(previewedRAMdata));
         localStorage.setItem("linkDataForEdit", JSON.stringify(linkRAM));
    })
}