const search    = document.querySelector('#search');
const number    = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const type = document.querySelector('.types');
const types = document.querySelector('#types')
const statNumber = document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const baseStats = document.querySelector('#base-stats')
const pokedex = document.querySelector('#pokedex')


const typeColors = {
"rock":      [182, 158,  49],
"ghost":     [112, 85,  155],
"steel":     [183, 185, 208],
"water":     [100, 147, 235],
"grass":     [116, 203,  72],
"psychic":   [255, 20,  147],
"ice":       [153, 214, 223],
"dark":      [117,  87,  76],
"fairy":     [230, 158, 172],
"normal":    [170, 166, 127],
"fighting":  [193, 34,   57],
"flying":    [168, 145, 236],
"poison":    [164, 62,  158],
"ground":    [222, 193, 107],
"bug":       [167, 183,  35],
"fire":      [245, 125,  49],
"electric":  [249, 207,  48],
"dragon":    [112, 55,  255],
}


const fetchApi = async (pkmnName) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnName.split(' ').join('-'));
    
    if (response.status === 200) {
        const pkmnData = await response.json(); 
        return pkmnData;
    }

    return false;
}



search.addEventListener('change', async (event) =>{
    const pkmnData = await fetchApi(event.target.value)

    // Alerta de Pokémon não existente
    if (!pkmnData) {
        alert('Pokémon não encontrado');
        return;

    }

    // Cores principais dos Pokémons de acordo com o tema de seu tipo
    const mainColor = typeColors[pkmnData.types[0].type.name];
    baseStats.style.color         = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;


    console.log(pkmnData);
    
    // Coloca # na numeralção no topo da carta
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

    // Muda a imagem do pokemon
    pokemonImage.src = pkmnData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    // Altera a box de "tipo" do Pokémon
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        // t.type.name
        let newTypes = document.createElement('span');
        newTypes.innerHTML = t.type.name;
        newTypes.classList.add('type');

        newTypes.style.backgroundColor = `rgb(${typeColors[t.type.name][0]}, ${typeColors[t.type.name][1]}, ${typeColors[t.type.name][2]})` ;

        types.appendChild(newTypes);
    })

    // Atualização dos status e uma pequena animação das barras
    pkmnData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color           = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    })


})
