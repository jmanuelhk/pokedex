// https://www.cssscript.com/pagination-component-tui/  +
// PARA LA PAGINACION DE LA PGINA WEB Y LA LISTA DE LOS ELEMENTOS


const pokedex = document.getElementById('pokedex');
const pokeCache = {}

const fetchPokemon = async() => {
    const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=40";

    const res = await fetch(URL_POKEMON);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${index+1}.png`
    }));
    displayPokemon(pokemon);
}

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map((pokemonData) => `
        <li class="card" onclick="selectPokemon(${pokemonData.id})">
            <img class="card-image" src="${pokemonData.image}"/>
            <h2 class="card-title">${pokemonData.id}. ${pokemonData.name}</h2>
        </li>
    `).join('')
    pokedex.innerHTML = pokemonHTMLString;
}

// const createPokeData = (pokeNm) => {

//     let pokeCard = document.createElement('div');
//     pokeCard.classList.add('card-body');

//     let pokeTitle = document.createElement('h5');
//     pokeTitle.classList.add('card-title');
//     pokeTitle.innerText = `${pokeNm}`;

//     // let pokeName = document.createElement('p');
//     // pokeName.classList.add('card-text')
//     // pokeName.innerText = `${pokeNm}`;

//     pokeCard.append(pokeTitle)

//     return pokeCard
// }

const selectPokemon = async(id) => {
    // console.log(id)
    if (!pokeCache[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokedata = await res.json();
        pokeCache[id] = pokedata;
        displayPopup(pokedata);
    }

    displayPopup(pokeCache[id]);
}

const displayPopup = (pokedata) => {
    // console.log(pokedata);
    const type = pokedata.types.map((type) => type.type.name).join(', ');
    const image = pokedata.sprites['front_default'];
    const image2 = pokedata.sprites['back_default'];
    const image3 = pokedata.sprites['front_shiny'];
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Cerrar</button>
            <div class="card">
                <img class="card-image" src="${image}"/>
                <img class="card-image" src="${image2}"/>
                <img class="card-image" src="${image3}"/>
                <h2 class="card-title">${pokedata.id}. ${pokedata.name}</h2>
                <p><small>Height: </small>${pokedata.height} | <small>Weight: </small> ${pokedata.weight}| <small>Type: </small> ${type} </p>
            </div>
        </div>`

    // console.log(htmlString);

    pokedex.innerHTML = htmlString + pokedex.innerHTML;
}

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}


fetchPokemon();