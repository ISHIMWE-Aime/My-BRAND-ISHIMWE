// let fromLocalStore =JSON.parse(localStorage.getItem("blogData"));
// console.log(fromLocalStore);

(async () => {
    let blogDataFromDB = await fetch('https://important-red-beanie.cyclic.app/allBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    blogDataFromDB = await blogDataFromDB.json()
    console.log(blogDataFromDB.data)
})()



// const blogTittle = document.getElementById("blogTittlefordraft");
// const firstLettle = document.getElementById("firstLetter");
const marginLeftContainer = document.getElementById("margin-left");