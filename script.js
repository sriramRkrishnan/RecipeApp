let list = document.querySelector('.list')
let listCat = document.querySelector('.listCat')
let cat = document.querySelector('.cat')
let cats = document.querySelector('.cats')
let FavCount = document.querySelector('.count')
//  list by category
let findCat = ''
let catURL = "https://www.themealdb.com/api/json/v1/1/categories.php"
let catListUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`

// get catogory list
let categories = []
let catList = []

let Fav = []



async function fetchData() {
    try {
        const response = await fetch(catURL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        categories = data.categories
        categories.forEach((item)=>{
            let link = document.createElement('div')
            let thumb = document.createElement('img')
            let head = document.createElement('p')
            let desc = document.createElement('p')
            let ViewBtn = document.createElement('button')
            
            link.classList.add("card")
            desc.classList.add("desc")
            head.classList.add("head")
            ViewBtn.classList.add("view")

            head.innerText = item.strCategory
            desc.innerText = item.strCategoryDescription.slice(0, 150);
            thumb.src = item.strCategoryThumb
            // link.href = 'cat.html'
            ViewBtn.innerText = "View Foods"
        
            link.appendChild(thumb)
            link.appendChild(head)
            link.appendChild(desc)
            link.appendChild(ViewBtn)
        
            list.appendChild(link)

            ViewBtn.addEventListener("click" , async ()=>{
                
                findCat =await item.strCategory
                console.log(findCat);
                window.location.href = `cat.html?category=${encodeURIComponent(findCat)}`;
            })
        
        })

        return console.log(categories);
    } catch (error) {
        console.error('Error fetching data:', error);
        // You might want to handle errors here, like showing an error message to the user
        throw error;
    }
}
if (window.location.pathname.includes("")) {
    // If yes, fetch cat data
    fetchData()
}


// Check if the current page is cat.html
if (window.location.pathname.includes("cat.html")) {
    // If yes, fetch cat data
    fetchCatData();
}


async function fetchCatData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        console.log(category);
        const response = await fetch(`${catListUrl}`+`${category}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        catList = data.meals
        cat.innerHTML = category
        catList.forEach((item)=>{
            let link = document.createElement('a')
            let thumb = document.createElement('img')
            let head = document.createElement('p')
            // let desc = document.createElement('p')
            let ViewBtn = document.createElement('button')
            
            link.classList.add("card")
            // desc.classList.add("desc")
            head.classList.add("head")
            ViewBtn.classList.add("view")

            head.innerText = item.strMeal
            // desc.innerText = item.strCategoryDescription.slice(0, 150);
            thumb.src = item.strMealThumb
            // link.href = 'cat.html'
            ViewBtn.innerText = "Add to Fav"
        
            link.appendChild(thumb)
            link.appendChild(head)
            // link.appendChild(desc)
            link.appendChild(ViewBtn)
        
            listCat.appendChild(link)

            ViewBtn.addEventListener("click" , ()=>{
                FavCount.innerText = Fav.length+1
                Fav.push({
                   head :  item.strMeal,
                   thumb : item.strMealThumb
                })
                console.log(Fav);
            })
        
        })

        return console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // You might want to handle errors here, like showing an error message to the user
        throw error;
    }
}

let searchItem = document.querySelector(".searchInp")
let searchBtn = document.querySelector(".searchBtn")

let searchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

async function fetchSearchData() {
    try {
        const response = await fetch(`${searchUrl}`+`${searchItem.value}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        categories = []
        cats.innerText = "Search-Result"
        list.innerHTML = ''
        categories = data.meals
        categories.forEach((item)=>{
            let link = document.createElement('div')
            let thumb = document.createElement('img')
            let head = document.createElement('p')
            // let desc = document.createElement('p')
            let ViewBtn = document.createElement('button')
            
            link.classList.add("card")
            // desc.classList.add("desc")
            head.classList.add("head")
            ViewBtn.classList.add("view")

            head.innerText = item.strMeal

            // desc.innerText = item.strCategoryDescription.slice(0, 150);
            thumb.src = item.strMealThumb

            // link.href = 'cat.html'
            ViewBtn.innerText = "View Foods"
        
            link.appendChild(thumb)
            link.appendChild(head)
            // link.appendChild(desc)
            link.appendChild(ViewBtn)
        
            list.appendChild(link)

            // ViewBtn.addEventListener("click" , async ()=>{
                
            //     findCat =await item.strCategory
            //     console.log(findCat);
            //     window.location.href = `cat.html?category=${encodeURIComponent(findCat)}`;
            // })
        
        })

        return console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // You might want to handle errors here, like showing an error message to the user
        throw error;
    }
}

searchBtn.addEventListener("click" , fetchSearchData )
