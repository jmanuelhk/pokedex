var URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

async function getContent() {
    await fetch(URL_POKEMON)
        .then(async response => await response.json())
        .then(async dataPokemon => {
            for (let index = 0; index < dataPokemon.results.length; index++) {
                console.log(dataPokemon.results[index])
                let urlDatosPokemon = dataPokemon.results[index].url;
                await fetch(urlDatosPokemon)
                    .then(async response => await response.json())
                    .then(descPokemon => {
                        
                        let contenedorDatos = document.getElementById('poke-container')
                        let pokeEnlaceId = document.createElement("a")
                        pokeEnlaceId.classList.add("img-hover-zoom--colorize");
                        pokeEnlaceId.href = "pokemon/information.html"
                        let pokeContainerName = document.createElement("div")
                        pokeContainerName.classList.add('card', 'text-center');

                        let pokeImgDiv = document.createElement("div");
                        // pokeImgDiv.classList.add("img-hover-zoom--colorize");
                        let pokeImg = document.createElement("img")
                        pokeImg.classList.add('card-img-top', 'img-fluid', 'rounded');
                        pokeImg.srcset = descPokemon.sprites.front_default
                        pokeImgDiv.append(pokeImg)

                        let pokeName = createPokeData(dataPokemon.results[index].name);
                        // let pokeName = document.createElement("h3")
                        // pokeName.innerText = dataPokemon.results[index].name

                        pokeContainerName.append(pokeImgDiv, pokeName)
                        pokeEnlaceId.append(pokeContainerName)
                        contenedorDatos.appendChild(pokeEnlaceId);
                    })
            }
            // dataPokemon.results.forEach(async function (pokemon) {
            //     console.log(pokemon.name)
            //     //obtener imagenes pokemon
            //     let urlDatosPokemon = pokemon.url;
            //     await fetch(urlDatosPokemon)
            //         .then(response => response.json())
            //         .then(descPokemon => {
            //             let pokeImg = document.createElement("img")
            //             pokeImg.srcset = descPokemon.sprites.front_default
            //             console.log(descPokemon)

            //             let contenedorDatos = document.getElementById('poke-container')
            //             let pokeContainerName = document.createElement("div")

            //             let pokeName = document.createElement("h3")
            //             pokeName.innerText = pokemon.name

            //             pokeContainerName.append(pokeImg, pokeName)
            //             contenedorDatos.appendChild(pokeContainerName);
            //         })
            // })
        })
}

function createPokeData(pokeNm) {

    let pokeCard = document.createElement('div');
    pokeCard.classList.add('card-body');

    let pokeTitle = document.createElement('h5');
    pokeTitle.classList.add('card-title');
    pokeTitle.innerText = `${pokeNm}`;

    // let pokeName = document.createElement('p');
    // pokeName.classList.add('card-text')
    // pokeName.innerText = `${pokeNm}`;


    pokeCard.append(pokeTitle)

    return pokeCard
}