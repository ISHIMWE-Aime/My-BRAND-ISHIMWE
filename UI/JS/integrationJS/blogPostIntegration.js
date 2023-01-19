const marginLeftContainer = document.getElementById("margin-left");
const loading = document.querySelector('.loading')
// const blogDeletetionDisplayEl = document.querySelector('#blogDeletetionDisplay')
// const deleteMessage = document.getElementById('deleteMessage')

window.onload = () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
}


let blogDataFromDB2

(async () => {
    
    blogDataFromDB2 = await fetch('https://backendapplication.up.railway.app/publishedBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }
    })
    
    blogDataFromDB2 = await blogDataFromDB2.json()
    console.log('The published blogs are: ',blogDataFromDB2.data)

    if(blogDataFromDB2.data){
        loading.innerHTML = '';
    }
    if(blogDataFromDB2){
        // Display published blogs in my DB
        displayPublished(blogDataFromDB2)
    }

})()

const displayPublished = ( blogDataFromDB ) => {
    console.log('fetched published blogs are: ',blogDataFromDB.data)
    for(i = 0; i < blogDataFromDB.data.length; i++){
        console.log(blogDataFromDB.data[i]);
        // firstLettle.innerHTML = String.fromCharCode(blogDataFromDB.data[1]["Tittle"].charCodeAt(0));
        // blogTittle.innerHTML = blogDataFromDB.data[i]["Tittle"];
        marginLeftContainer.innerHTML += `
            <a href="New Article.html" class="blogBlock" id=${blogDataFromDB.data[i]["_id"]} onmouseover="getid(this)">
                <div class="left">
                    <div class="firstLetterSlot">
                        <center>
                            <h1 id="firstLetter">${String.fromCharCode(blogDataFromDB.data[i]["title"].charCodeAt(0))}</h1>
                        </center>
                    </div>
    
                    <div class="TittleDotTime">
                        <div class="blogTittle">
                            <h3 id=${"blogTittlefordraft" + blogDataFromDB.data[i]["_id"]}>${blogDataFromDB.data[i]["title"]}</h3>
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
                        <h4 id=${"author" + blogDataFromDB.data[i]["_id"]}>${blogDataFromDB.data[i]["author"]}</h4>
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
    }
}

function getid(obj){
    let linkRAM = [];
    let flag = false;
    let flagForEditSignal = [];
    let flagForEdit = false;
    //localStorage.setItem("linkDataForEdit", JSON.stringify(linkRAM));

    let currentLinkId = obj.id;
    console.log("The current link Id:",currentLinkId)
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
        // for(let i = 0; i < blogDataFromDB.data.length; i++){
        //     for(const property in blogDataFromDB.data[i]){
        //         if(blogDataFromDB.data[i][property] === linkTittle){
        //             console.log(blogDataFromDB.data[i][property]); 
        //             //paragraphSlot.innerHTML  = dataFromDataBase[i]["blog"];
        //         }
        //     }
        // }
    flag = true;
    flagForEdit = true;
    // //     previewedRAMdata.splice(0, 1);
    //      linkRAM.unshift(flag);
    linkRAM.push(flag);
    linkRAM.push(linkTittle);
    linkRAM.push(AuthorName);
    flagForEditSignal.push(flagForEdit)
    flagForEditSignal.push(currentLinkId)
    // //    localStorage.setItem("PreviwedblogData", JSON.stringify(previewedRAMdata));
    localStorage.setItem("linkDataForEdit", JSON.stringify(linkRAM));
    localStorage.setItem('flagForEditSignal', JSON.stringify(flagForEditSignal))
    //localStorage.setItem("blogData", JSON.stringify(blogDataFromDB))
    })
}