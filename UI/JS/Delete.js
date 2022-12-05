let fromLocalStore =JSON.parse(localStorage.getItem("blogData"));
let fromLocalStore1 =JSON.parse(localStorage.getItem("PublishedblogData"));
let joinedData =[];
if((JSON.parse(localStorage.getItem("blogData")) !== null) && (JSON.parse(localStorage.getItem("PublishedblogData")) !== null)){
    joinedData = fromLocalStore.concat(fromLocalStore1);
} else if((JSON.parse(localStorage.getItem("blogData")) !== null) && (JSON.parse(localStorage.getItem("PublishedblogData")) == null)){
    joinedData = fromLocalStore;
} else if((JSON.parse(localStorage.getItem("blogData")) == null) && (JSON.parse(localStorage.getItem("PublishedblogData")) !== null)){
    joinedData = fromLocalStore1;
}


console.log(joinedData);
const blogTittle = document.getElementById("blogTittlefordraft");
const firstLettle = document.getElementById("firstLetter");
const marginLeftContainer = document.getElementById("margin-left");
const deleteMessage = document.getElementById("deleteMessage");
console.log(marginLeftContainer);

let pubIDs = publishedIDs();
console.log(pubIDs);

function publishedIDs(){

    let i = 0;
    let IDs = [];

for(i = 0; i < joinedData.length; i++){
        console.log(joinedData[i]);
        // firstLettle.innerHTML = String.fromCharCode(joinedData[1]["Tittle"].charCodeAt(0));
        // blogTittle.innerHTML = joinedData[i]["Tittle"];
        marginLeftContainer.innerHTML += `
            <a href="#" class="blogBlock" id=${joinedData[i]["blogId"]} onmouseover="getid(this)">
                <div class="left">
                    <div class="firstLetterSlot">
                        <center>
                            <h1 id="firstLetter">${String.fromCharCode(joinedData[i]["Tittle"].charCodeAt(0))}</h1>
                        </center>
                    </div>

                    <div class="TittleDotTime">
                        <div class="blogTittle">
                            <h3 id=${"blogTittlefordraft" + joinedData[i]["blogId"]}>${joinedData[i]["Tittle"]}</h3>
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
                        <h4 id=${"author" + joinedData[i]["blogId"]}>${joinedData[i]["Author"]}</h4>
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
                link : joinedData[i]["blogId"],
                tittle: "blogTittlefordraft" + joinedData[i]["blogId"],
                Author: "author" + joinedData[i]["blogId"]
            }
        );
    }    
    
    return IDs;
}

function getid(obj){
    let currentLinkId = obj.id;
    console.log("The currrentLink Id is: ",currentLinkId);

    const link = document.getElementById(currentLinkId);
    console.log("The link is : ", link);

    let currentTittleId = 'blogTittlefordraft' + currentLinkId;
    console.log(currentTittleId);

    const linkTittle = document.getElementById(currentTittleId).innerHTML;
    console.log("the tittle is :",linkTittle);
    
    let currentAuthorId = 'author' + currentLinkId;
    console.log(currentAuthorId);

    const AuthorName = document.getElementById(currentAuthorId).innerHTML;
    console.log("the author name is :",AuthorName);

    
    link.addEventListener("dblclick", function(){
        console.log("clicked");
        for(let i = 0; i < joinedData.length; i++){
           // console.log("The lenght is: ",joinedData.length);
            for(const property in joinedData[i]){
                //console.log("All properties are: ");
                //console.log(joinedData[i], ":", joinedData[i][property]);
                if(joinedData[i][property] === currentLinkId){
                    console.log("The deletetion id is :",joinedData[i][property]);
                    
                    let deleted = joinedData.splice(i, 1);
                    //for(let i = 0; i < ; )
                    console.log(deleted, joinedData);
                    if(fromLocalStore !== null){
                        for(let i = 0; i < deleted.length; i++){
                            for( let property in deleted[i]){
                                for(let j = 0; j < fromLocalStore.length; j++){
                                    for(let properties in fromLocalStore[j]){
                                        if(deleted[i][property] === fromLocalStore[j][properties]){
                                            fromLocalStore.splice(j, 1);
                                            localStorage.setItem("blogData",JSON.stringify(fromLocalStore));
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(fromLocalStore1 !== null){
                        for(let i = 0; i < deleted.length; i++){
                            for( let property in deleted[i]){
                                for(let j = 0; j < fromLocalStore1.length; j++){
                                    for(let properties in fromLocalStore1[j]){
                                        if(deleted[i][property] === fromLocalStore1[j][properties]){
                                            fromLocalStore1.splice(j, 1);
                                            localStorage.setItem("PublishedblogData",JSON.stringify(fromLocalStore1));
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //localStorage.setItem("blogData", JSON.stringify(fromLocalStore));
                    //paragraphSlot.innerHTML  = dataFromDataBase[i]["blog"];
                }
            }
        }
    })
}