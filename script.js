document.addEventListener('DOMContentLoaded', () => {

    // --- CHARACTER DATA ---
    // You can easily add more characters here! Just find a URL for the image.
    const allCharacters = [
        { name: 'T-Rex', image: 'https://pngimg.com/uploads/t-rex/t-rex_PNG114.png' },
        { name: 'Dragon', image: 'https://i.pinimg.com/originals/a9/00/c6/a900c6111a25d8cedc36735235894373.png' },
        { name: 'Giant Ape', image: 'https://comicvine.gamespot.com/a/uploads/scale_small/11135/111352701/8110915-king_kong_png_by_mintmovi3_deggp4p-fullview.png' },
        { name: 'Superhero', image: 'https://pngimg.com/uploads/superman/superman_PNG75.png' },
        { name: 'Giant Robot', image: 'https://raw.githubusercontent.com/Solobolt/OwensArena/refs/heads/main/images/OATest.png' },
        { name: 'Alien Invader', image: 'https://www.pngall.com/wp-content/uploads/2/Alien-PNG-Free-Image.png' },
        { name: 'Sea Monster', image: 'https://www.creativefabrica.com/wp-content/uploads/2021/08/04/Sea-Monster-Cthulhu-Octopus-Kraken-Graphics-15494200-1-1-580x386.png' },
        { name: 'Gryphon', image: 'https://www.pngmart.com/files/22/Griffin-PNG-Isolated-Pic.png' }
    ];

    let currentBracket = [];
    let currentMatchupIndex = 0;

    // --- SCREEN ELEMENTS ---
    const setupScreen = document.getElementById('setup-screen');
    const tournamentScreen = document.getElementById('tournament-screen');
    const winnerScreen = document.getElementById('winner-screen');
    const characterList = document.getElementById('character-list');

    // --- SETUP PHASE ---
    function initialize() {
        allCharacters.forEach((char, index) => {
            const card = document.createElement('div');
            card.classList.add('char-select-card');
            card.dataset.id = index;
            card.innerHTML = `<img src="${char.image}" alt="${char.name}"><p>${char.name}</p>`;
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
            });
            characterList.appendChild(card);
        });
    }

    document.getElementById('start-game-button').addEventListener('click', () => {
        const selectedCards = document.querySelectorAll('.char-select-card.selected');
        if (selectedCards.length < 2) {
            alert('Please select at least 2 champions!');
            return;
        }
        
        currentBracket = Array.from(selectedCards).map(card => {
            return allCharacters[card.dataset.id];
        });
        
        // Shuffle the bracket for random matchups
        currentBracket.sort(() => Math.random() - 0.5);

        setupScreen.classList.add('hidden');
        tournamentScreen.classList.remove('hidden');
        displayNextMatchup();
    });

    // --- TOURNAMENT PHASE ---
    const player1Card = document.getElementById('player1');
    const player2Card = document.getElementById('player2');

    function displayNextMatchup() {
        if (currentBracket.length === 1) {
            displayWinner();
            return;
        }

        if (currentMatchupIndex >= currentBracket.length) {
            currentMatchupIndex = 0; // Next round
        }

        document.getElementById('matchup-title').innerText = `Round ${Math.ceil(currentBracket.length / 2)}, Match ${currentMatchupIndex / 2 + 1}`;

        const player1 = currentBracket[currentMatchupIndex];
        const player2 = currentBracket[currentMatchupIndex + 1];

        player1Card.innerHTML = `<img src="${player1.image}" alt="${player1.name}"><p>${player1.name}</p>`;
        player2Card.innerHTML = `<img src="${player2.image}" alt="${player2.name}"><p>${player2.name}</p>`;

        player1Card.onclick = () => selectWinner(player1);
        player2Card.onclick = () => selectWinner(player2);
    }

    function selectWinner(winner) {
        // Remove the loser from the bracket
        const player1 = currentBracket[currentMatchupIndex];
        const player2 = currentBracket[currentMatchupIndex + 1];
        const loser = (winner === player1) ? player2 : player1;
        
        const loserIndex = currentBracket.findIndex(char => char === loser);
        currentBracket.splice(loserIndex, 1);

        displayNextMatchup();
    }

    // --- WINNER PHASE ---
    function displayWinner() {
        tournamentScreen.classList.add('hidden');
        winnerScreen.classList.remove('hidden');

        const champion = currentBracket[0];
        const championCard = document.getElementById('champion-card');
        championCard.innerHTML = `<img src="${champion.image}" alt="${champion.name}"><p>${champion.name}</p>`;
    }

    // --- PLAY AGAIN ---
    document.getElementById('play-again-button').addEventListener('click', () => {
        winnerScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
        
        // Reset state
        currentBracket = [];
        currentMatchupIndex = 0;
        document.querySelectorAll('.char-select-card.selected').forEach(c => c.classList.remove('selected'));
    });

    // --- INITIALIZE THE GAME ---
    initialize();
});