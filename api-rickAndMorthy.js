const contenedorDatos = document.getElementById('container-data');
const URL_API = "https://rickandmortyapi.com/api";
const PERSONAJE = "/character"
const cache = {}

var input = document.getElementById("search");

// Execute a function when the user releases a key on the keyboard
const  getInputValue = () => {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myInput").value;

    contenedorDatos.innerHTML ="";
    // Displaying the value
    fetchPersonaje(inputVal)
}

const fetchPersonaje = async(inputVal) => {
    var res;
    console.log(inputVal)
    if (inputVal === undefined) {
        console.log(inputVal +" if")
        res = await fetch(URL_API + PERSONAJE);

    } else {
        console.log(inputVal + " else")
        res = await fetch(URL_API + PERSONAJE + "/?name=" + inputVal);

    }
    const data = await res.json();
    const ResultApi = data.results.map((result, index) => ({
        ...result
    }));
    console.log(ResultApi)
    displayResultApi(ResultApi);
}

const displayResultApi = (ResultApi) => {
    const apiHTMLString = ResultApi
        .map((data) => `
        <li class="card" onclick="selectPersonaje(${data.id})">
            <img class="card-image" src="${data.image}"/>
            <h2 class="card-title">${data.id}. ${data.name}</h2>
        </li>
    `).join('')
    contenedorDatos.innerHTML = apiHTMLString;
}


const selectPersonaje = async(id) => {
    // console.log(id)
    if (!cache[id]) {
        const url = URL_API+PERSONAJE+`/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        cache[id] = data;
        displayPopup(data);
    }

    displayPopup(cache[id]);
}

const displayPopup = (data) => {
    // console.log(pokedata);
    const image = data.image;
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Cerrar</button>
            <div class="card">
                <img class="card-image" src="${image}"/>
                <h2 class="card-title">${data.id}. ${data.name}</h2>
                <p><small>GENDER: </small>${data.gender} | <small>SPECIE: </small> ${data.species}| <small>ORIGIN: </small> ${data.origin["name"]} </p>
            </div>
        </div>`

    // console.log(htmlString);

    contenedorDatos.innerHTML = htmlString + contenedorDatos.innerHTML;
}

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}


fetchPersonaje();