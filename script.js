const pokemonsName = document.querySelector(".pokemon__name");
const pokemonsNumber = document.querySelector(".pokemon__number");
const pokemonsImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let currentPokemonId = 1; // Controle do Pokémon atual

const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (!APIResponse.ok) throw new Error("Pokémon não encontrado");

    const data = await APIResponse.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renderPokemon = async (pokemonId) => {
  // Ocultar a imagem do Pokémon e mostrar a mensagem de carregamento
  pokemonsName.innerHTML = "Loading...";
  pokemonsNumber.innerHTML = "";
  pokemonsImage.style.display = "none"; // Esconde a imagem

  const data = await fetchPokemon(pokemonId); // Use pokemonId em vez de pokemon

  // Atualizar o conteúdo após o carregamento
  if (data) {
    pokemonsName.innerHTML = data.name; // Nome do Pokémon
    pokemonsNumber.innerHTML = `#${data.id}`; // Número do Pokémon com #
    pokemonsImage.src =
      data.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];

    // Exibir a imagem do Pokémon após carregar
    pokemonsImage.onload = () => {
      pokemonsImage.style.display = "block"; // Exibe a imagem quando estiver carregada
    };

    currentPokemonId = data.id; // Atualiza o ID do Pokémon atual
    btnPrev.disabled = currentPokemonId === 1; // Desabilita o botão "Prev" se for o primeiro Pokémon
  } else {
    pokemonsName.innerHTML = "Not found"; // Se o Pokémon não for encontrado
    pokemonsNumber.innerHTML = "";
    pokemonsImage.style.display = "none"; // Esconde a imagem em caso de erro
  }
};

// Formulário para buscar Pokémon
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = ""; // Limpa o campo de entrada
});

// Botão "Next"
btnNext.addEventListener("click", () => {
  currentPokemonId++;
  renderPokemon(currentPokemonId);
});

// Botão "Prev"
btnPrev.addEventListener("click", () => {
  if (currentPokemonId > 1) {
    currentPokemonId--;
    renderPokemon(currentPokemonId);
  }
});

// Renderiza o Pokémon inicial
renderPokemon(currentPokemonId);
