document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const characterForm = document.getElementById("character-form");

    let currentCharacter = null;

    fetch("http://localhost:3000/characters")
        .then((response) => response.json())
        .then((characters) => {
            characters.forEach(addCharacterToBar);
        });

    function addCharacterToBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => showCharacterDetails(character));
        characterBar.appendChild(span);
    }

    function showCharacterDetails(character) {
        currentCharacter = character;
        detailedInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}" />
            <p>Votes: <span id="vote-count">${character.votes}</span></p>
        `;
    }

    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!currentCharacter) {
            alert("Please select a character first!");
            return;
        }

        const newVotes = parseInt(voteInput.value) || 0;
        const voteCount = document.getElementById("vote-count");

        currentCharacter.votes += newVotes;
        voteCount.textContent = currentCharacter.votes;

        voteForm.reset();
    });

    characterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const image = document.getElementById("image-url").value;

        if (!name || !image) {
            alert("Please enter both a name and an image URL!");
            return;
        }

        const newCharacter = { name, image, votes: 0 };
    
        addCharacterToBar(newCharacter);

        showCharacterDetails(newCharacter);

        characterForm.reset();
    });
});
