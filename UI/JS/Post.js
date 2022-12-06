let fromLocalStore =JSON.parse(localStorage.getItem("PublishedblogData"));
console.log(fromLocalStore);
const blogTittle = document.getElementById("blogTittleForPost");
const firstLettle = document.getElementById("firstLetter");
const marginLeftContainer = document.getElementById("margin-left");
console.log(marginLeftContainer);


for(let i = 0; i < fromLocalStore.length; i++){
    console.log(fromLocalStore[i]);
    // firstLettle.innerHTML = String.fromCharCode(fromLocalStore[1]["Tittle"].charCodeAt(0));
    // blogTittle.innerHTML = fromLocalStore[i]["Tittle"];
    marginLeftContainer.innerHTML += `
        <a href="Blog.html" class="blogBlock">
            <div class="left">
                <div class="firstLetterSlot">
                    <center>
                        <h1 id="firstLetter">${String.fromCharCode(fromLocalStore[i]["Tittle"].charCodeAt(0))}</h1>
                    </center>
                </div>
                <div class="TittleDotTime">
                    <div class="blogTittle">
                        <h3 id="blogTittlefordraft">${fromLocalStore[i]["Tittle"]}</h3>
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
                    <h4>${fromLocalStore[i]["Author"]}</h4>
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
