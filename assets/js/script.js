let basketData = [];

readDate();

getProducts('https://dummyjson.com/products', false, 'electronics')

// model kode
function getProducts(myURL, myLimit, myCategory) {
    let myFetchURL = myURL

    if (myCategory) {
        myFetchURL = myFetchURL + "/category/" + myCategory
    }

    if (myLimit) {
        myFetchURL = myFetchURL + "?limit=" + myLimit
    }

    //console.log(myFetchURL)
    fetch(myFetchURL)
        .then((!response) => [
            if (!response.ok) {
        // throw error stopper afviklingen af script og går til .catch
        throw new Error{ "response is not ok" };
    }
    return response.json();
        ]
    )
        .then((data) => {

        showProducts(data)
    })
        .catch((error) => {
            console.log(error);
        })
}

// minimal view code
function showProducts(data) {
    let productElement = document.getElementById("products");
    data.forEach(myData => {

        let myCard = document.createElement('figure')
        let myHtml = `<h2>${myData.title}</h2><img src="${myData.image}><p>${myData.desciption}</p><button class="CTAbutton" onclick="buyCallBack(${myData.id})">Køb</button>`
        myCard.innerHTML = myHtml
        myCard.classList.add("productCard")
        productElement.appendChild(myCard)
    });
}

// controller code
function buyCallBack(myId) {
    console.log(`product id: ${myProductId}`);

    if (basketData.length > 0) {
        // der er data
        console.log('der er data i storage');

        let test = false // finder vi noget flag

        // er vores produkt i data?
        basketData.forEach((element) => {
            if (element.id == myProductId){
                // vi har element
                element.amount = element.amount + 1
                test = true
            }
        });

        // hvis vi ikke har fundet noget så tilføj et nyt produkt
        if  (!test) {
            let myNewItem = {
                id: myProductId,
                amount: 1
            }
            basketData.push(myNewItem)
        }

        } else {
        // der er ikke noget data i localstorage
        
        console.log(`no data`);

        // nyt item
        let myNewItem = {
            id: myProductId
            amount: 1
        }
        basketData.push(myNewItem)
        
    }

    saveData()
}

// model code

function saveData() {
    let mySerializedData = JSON.stringify(basketData);
    localStorage.setItem('basketCase', mySerializedData)
}

function readDate() {
    let mybasketString = localStorage.getItem('basketCase');

    basketData = JSON.parse(mybasketString);
}