    await fetch(URL_POKEMON)
        .then(async response => await response.json())
        .then(async dataPokemon => {
            // console.log(dataPokemon)
            for (let index = 0; index < dataPokemon.results.length; index++) {

                let urlDatosPokemon = dataPokemon.results[index].url;
                await fetch(urlDatosPokemon)
                    .then(async response => await response.json())
                    .then(descPokemon => {
                        // console.log(descPokemon.id)
                        let contenedorDatos = document.getElementById('poke-container')
                        let pokeEnlaceId = document.createElement("li")
                        pokeEnlaceId.classList.add("img-hover-zoom--colorize");
                        pokeEnlaceId.setAttribute("onclick", `selectPokemon(${descPokemon.id})`)
                        let pokeContainerName = document.createElement("div")
                        pokeContainerName.classList.add('card', 'text-center');

                        let pokeImgDiv = document.createElement("div");
                        let pokeImg = document.createElement("img")
                        pokeImg.classList.add('card-img-top', 'img-fluid', 'rounded');
                        pokeImg.srcset = descPokemon.sprites.front_default
                        pokeImgDiv.append(pokeImg)

                        let pokeName = createPokeData(dataPokemon.results[index].name);
                        // let pokeName = document.createElement("h3")
                        // pokeName.innerText = dataPokemon.results[index].name

                        pokeContainerName.append(pokeImgDiv, pokeName)
                        pokeEnlaceId.append(pokeContainerName)
                        contenedorDatos.appendChild(pokeEnlaceId)
                    })
            }
        })