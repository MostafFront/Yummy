let rowData = document.getElementById("rowData");
let searchMeal = document.getElementById("searchMeal");
let submitBtn;


$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})



function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-links").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu .open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})


function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="md:w-1/4 px-4 py-4">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal relative overflow-hidden rounded-2xl cursor-pointer">
                    <img class="w-full" src="${arr[i].strMealThumb}">
                    <div class="meal-layer absolute flex justify-center items-center text-black p-2 w-full h-full bg-[#f9f6f6ca] top-full  duration-500 ">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="md:w-1/4 px-4 py-4">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal relative overflow-hidden rounded-2xl cursor-pointer">
                    <img class="w-full" src="${arr[i].strCategoryThumb}" >
                    <div class="meal-layer absolute text-center text-black p-2 w-full h-full bg-[#f9f6f6ca] top-full  duration-500">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}

function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="md:w-1/4 px-4 py-4">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2xl text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="md:w-1/4 px-4 py-4">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2xl text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}



async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1 ">${tags[i]}</li>`
    }



    let cartoona = `
            
                <div class="w-1/3">
                    <img class="min-w-full rounded-3xl" src="${meal.strMealThumb}">
                    <h2 class='text-3xl'>${meal.strMeal}</h2>
                </div>
                <div class="w-2/3 pl-10">
                    <h2 class='text-3xl pb-4 font-medium'>Instructions</h2>
                    <p class='pb-4'>${meal.strInstructions}</p>
                    <h3 class="text-3xl font-bold><span class=" pb-4 text-3xl font-bold">Area : </span ">${meal.strArea}</h3>
                    <h3 class="text-3xl font-bold><span class=" pb-4 text-3xl font-bold">Category : </span >${meal.strCategory}</h3>
                    <h3 class='pb-4 text-3xl font-bold'>Recipes :</h3>
                    <ul class="bg-[#cff4fc] text-[#055160] font-bold rounded  flex  flex-wrap mx-2 ">
                        ${ingredients}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="bg-[#cff4fc] text-[#055160] font-bold rounded mb-2 ">
                        ${tagsStr}
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-3">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Youtube</a>
                </div>
               	
    `

    rowData.innerHTML = cartoona
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="w-full flex pt-10 md:flex-row justify-center items-center pb-4 ">
        <div class="w-full md:w-1/2 pr-4">
            <input onkeyup="searchByName(this.value)" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-blue-500 duration-500" type="text" placeholder="Search By Name">
        </div>
        <div class="w-full md:w-1/2">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-blue-500 duration-500" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

function showContacts() {
    rowData.innerHTML = `
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-3/4 text-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Enter Your Name">
                <div id="nameAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                Special characters and numbers not allowed
                </div>
            </div>
            <div>
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Enter Your Email">
                <div id="emailAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div>
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                Enter valid Phone Number
                </div>
            </div>
            <div>
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Enter Your Age">
                <div id="ageAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                    Enter valid age
                </div>
            </div>
            <div>
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Enter Your Password">
                <div id="passwordAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div>
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded focus:outline-none focus:border-gray-400" placeholder="Repassword">
                <div id="repasswordAlert" class="bg-red-500 text-white w-full mt-2 px-4 py-2 rounded hidden">
                    Enter valid repassword
                </div>
            </div>
            </div>
            <button id="submitBtn" disabled class="bg-transparent text-red-500 border border-red-500 px-4 py-2 mt-3 rounded hover:bg-red-500 hover:text-white ">Submit</button>
        </div>
    </div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("block", "hidden")

        } else {
            document.getElementById("nameAlert").classList.replace("hiddene", "block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("emailAlert").classList.replace("hidden", "block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("phoneAlert").classList.replace("hidden", "block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("ageAlert").classList.replace("hidden", "block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("passwordAlert").classList.replace("hidden", "block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("repasswordAlert").classList.replace("hidden", "block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}