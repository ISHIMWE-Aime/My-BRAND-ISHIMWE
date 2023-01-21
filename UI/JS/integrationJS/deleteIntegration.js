const marginLeftContainer = document.getElementById("margin-left");
const loading = document.querySelector('.loading')
const deleteMessage = document.getElementById('deleteMessage')
let displayOfContentToBeDeleted = document.getElementById('displayOfContentToBeDeleted')

window.onload = () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
}

let blogDataFromDB1
let blogDataFromDB2


(async () => {
    var style = document.createElement('style');
    style.innerHTML = `
    #blogs {
            background: linear-gradient(180deg, rgba(20, 19, 53, 0.83) 0%, #B7BDC7 54.69%, rgba(20, 19, 53, 0.5) 100%);
            border-radius: 10px;
            padding: 10px;
            border: 2px solid black;
            color: white;
            font-weight: 500;
        }
    `
    style.innerHTML += `
    #users {
            background: none;
            border-radius: 10px;
            padding: 10px;
            border: 2px solid black;
            color: white;
            font-weight: 500;
        }
    `
    document.head.appendChild(style);

    blogDataFromDB1 = await fetch('https://backendapplication.up.railway.app/allBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    blogDataFromDB1 = await blogDataFromDB1.json()
    console.log(blogDataFromDB1.data)
    
    blogDataFromDB2 = await fetch('https://backendapplication.up.railway.app/publishedBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }
    })
    
    blogDataFromDB2 = await blogDataFromDB2.json()
    console.log('The published blogs are: ',blogDataFromDB2.data)

    if(blogDataFromDB1.data || blogDataFromDB2.data){
        loading.innerHTML = '';
    }
    
    if(blogDataFromDB2){
        // Display published blogs in my DB
        displayPublished(blogDataFromDB2)
    }

    if(blogDataFromDB1){
        // Display draft blogs in my DB
        displayDrafts(blogDataFromDB1)
    }
})()

const displayDrafts = ( blogDataFromDB ) => {

    for(i = 0; i < blogDataFromDB.data.length; i++){
        console.log(blogDataFromDB.data[i]);
        // firstLettle.innerHTML = String.fromCharCode(blogDataFromDB.data[1]["Tittle"].charCodeAt(0));
        // blogTittle.innerHTML = blogDataFromDB.data[i]["Tittle"];
        displayOfContentToBeDeleted.innerHTML += `
            <a  class="blogBlock" id=${blogDataFromDB.data[i]["_id"]} onmouseover="getid(this)">
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
                            <h5>Daft</h5>
                        </div>
                    </div>
                </div>
            </a>
    
    `
    }
}

const displayPublished = ( blogDataFromDB ) => {
    for(i = 0; i < blogDataFromDB.data.length; i++){
        console.log(blogDataFromDB.data[i]);
        // firstLettle.innerHTML = String.fromCharCode(blogDataFromDB.data[1]["Tittle"].charCodeAt(0));
        // blogTittle.innerHTML = blogDataFromDB.data[i]["Tittle"];
        displayOfContentToBeDeleted.innerHTML += `
            <a class="blogBlock" id=${blogDataFromDB.data[i]["_id"]} onmouseover="getid(this)">
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

    link.addEventListener("dblclick", async function(){
        const res = await fetch(`https://backendapplication.up.railway.app/deleteOneBlog/${currentLinkId}`, {
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
                    padding: 20px;
                    width: 200px;
                    border: 2px solid black;
                    color: white;
                    font-weight: 600;
                }
            `
            document.head.appendChild(style);

            console.log(deleteMessage.innerHTML)
            deleteMessage.innerHTML = resMessage.message
            link.remove()
        }
    })
}