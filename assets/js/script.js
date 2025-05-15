// Language support
let currentLang = 'fi'; // Default language
let currentGridIndices = []; // Store current grid indices

// Eurovision bingo possibilities - Finnish and English
const bingoItems = {
  fi: [
    "Sävelkorkeuden muutos",
    "Pyrotekniikkaa",
    "Tuulikone",
    "Asun paljastus",
    "Joku sanoo 'Kiitos Eurooppa!'",
    "Täydet 12 pistettä",
    "Tekninen ongelma",
    "Sateessa tanssimisen efekti",
    "Joku itkee",
    "Lipun heilutusta",
    "Juontajat tekevät kiusallisen vitsin",
    "Joku laulaa omalla äidinkielellään",
    "Rekvisiittaa lavalla",
    "Yleisö villiintyy",
    "Joku mainitsee rauhan",
    "Tulkki tekee virheen",
    "Kommentaattori mainitsee politiikan",
    "Kilpailija käyttää kansallispukua",
    "Joku mainitsee aiemmat voittajat",
    "Yliampuva lavastus",
    "Kiusallinen hiljaisuus äänestyksen aikana",
    "Dramaattinen tauko ennen pisteiden ilmoitusta",
    "Joku laulaa nuotin vierestä",
    "Glitter-räjähdys",
    "Puhuttu osuus laulussa",
    "Joku pukeutunut kokonaan valkoiseen",
    "Taustatanssijat oudoissa asuissa",
    "Kamera leikkaa tanssivaan yleisön jäseneen",
    "Hidastusefekti",
    "Maa antaa 12 pistettä naapurilleen",
    "Artisti mainitsee maansa nimen",
    "Joku soittaa epätavallista soitinta",
    "Kolme tai useampi kieli yhdessä laulussa",
    "Akrobatiaa lavalla",
    "LED-näytön toimintahäiriö",
    "Joku rikkoo sääntöjä",
    "Juontajat puhuvat useilla kielillä",
    "Viittaus aiempaan Euroviisu-kappaleeseen",
    "Sydämen muoto tehdään käsillä",
    "Dramaattinen sävelkorkeuden muutos lopussa",
    "Pisteiden antaja käyttää liikaa aikaa",
    "Joku mainitsee kuinka kauan he ovat odottaneet",
    "Joku puhkeaa kyyneliin",
    "Erikoiset kameraperspektiivit",
    "Kansallisia symboleita lavalla"
  ],
  en: [
    "Key change",
    "Pyrotechnics",
    "Wind machine",
    "Costume reveal",
    "Someone says 'Thank you Europe!'",
    "Perfect 12 points",
    "Technical difficulty",
    "Dancing in the rain effect",
    "Someone cries",
    "Flag waving",
    "Hosts make an awkward joke",
    "Someone sings in their native language",
    "Props on stage",
    "Crowd goes wild",
    "Someone mentions peace",
    "Interpreter makes a mistake",
    "Commentator mentions politics",
    "Contestant wears national costume",
    "Someone mentions previous winners",
    "Over-the-top staging",
    "Awkward silence during voting",
    "Dramatic pause before announcing points",
    "Someone sings off-key",
    "Glitter explosion",
    "Spoken word section in a song",
    "Someone wearing all white",
    "Backing dancers in odd costumes",
    "Camera cuts to audience member dancing",
    "Slow-motion effect",
    "Country gives 12 points to neighbor",
    "Artist mentions their country's name",
    "Someone plays unusual instrument",
    "Three or more languages in one song",
    "Acrobatics on stage",
    "LED screen malfunction",
    "Someone breaks the rules",
    "Hosts speak in multiple languages",
    "Previous Eurovision song referenced",
    "Heart shape made with hands",
    "Dramatic key change at the end",
    "Spokesperson takes too long",
    "Someone mentions how long they've waited",
    "Someone bursts into tears",
    "Unusual camera angles",
    "National symbols on stage"
  ]
};

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to change language
function changeLanguage(lang) {
  currentLang = lang;
  
  // Update all text elements with data attributes
  document.querySelectorAll('[data-' + lang + ']').forEach(element => {
    element.textContent = element.getAttribute('data-' + lang);
  });
  
  // Update language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update bingo grid language attribute
  const bingoGrid = document.getElementById('bingo-grid');
  bingoGrid.setAttribute('lang', lang);

  // Update cell content language without changing order
  if (currentGridIndices.length > 0) {
    const cells = bingoGrid.querySelectorAll('.bingo-cell-content');
    cells.forEach((cell, index) => {
      cell.textContent = bingoItems[lang][currentGridIndices[index]];
    });
  }
}

// Function to check for bingo
function checkForBingo() {
  const cells = document.querySelectorAll('.bingo-cell');
  const gridSize = 5;
  
  // Create a 2D representation of the grid with selected state
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(false));
  
  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    grid[row][col] = cell.classList.contains('selected');
  });
  
  // Check rows
  for (let row = 0; row < gridSize; row++) {
    if (grid[row].every(cell => cell)) return true;
  }
  
  // Check columns
  for (let col = 0; col < gridSize; col++) {
    if (Array(gridSize).fill().map((_, row) => grid[row][col]).every(cell => cell)) return true;
  }
  
  // Check diagonals
  if (Array(gridSize).fill().map((_, i) => grid[i][i]).every(cell => cell)) return true;
  if (Array(gridSize).fill().map((_, i) => grid[i][gridSize - 1 - i]).every(cell => cell)) return true;
  
  return false;
}

// Function to create confetti celebration
function createConfetti() {
  // Initial burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  
  // Continuous effect
  const duration = 5000;
  const end = Date.now() + duration;
  
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#00008B', '#FFFFFF']
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#00008B', '#FFFFFF']
    });
    
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  
  // Delayed bursts
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 }
    });
  }, 1000);
  
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFD700', '#FFC0CB', '#00CED1', '#FF1493', '#00BFFF']
    });
  }, 2000);
}

// Function to generate bingo card
function generateBingoCard(lang = currentLang) {
  const bingoGrid = document.getElementById('bingo-grid');
  bingoGrid.innerHTML = '';
  
  // Generate new random indices
  currentGridIndices = shuffleArray([...Array(bingoItems[lang].length).keys()]).slice(0, 25);
  
  // Create 5x5 grid
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    
    const content = document.createElement('div');
    content.className = 'bingo-cell-content';
    content.textContent = bingoItems[lang][currentGridIndices[i]];
    
    // Add click handler
    cell.addEventListener('click', function() {
      this.classList.toggle('selected');
      
      // Check if player has a bingo
      if (checkForBingo()) {
        setTimeout(() => {
          createConfetti();
        }, 200);
      }
    });
    
    cell.appendChild(content);
    bingoGrid.appendChild(cell);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  generateBingoCard();
  
  // Add event listeners to buttons
  document.getElementById('reset-button').addEventListener('click', () => {
    generateBingoCard(currentLang);
  });
  
  document.getElementById('clear-button').addEventListener('click', function() {
    document.querySelectorAll('.bingo-cell').forEach(cell => {
      cell.classList.remove('selected');
    });
  });
  
  // Language toggle
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      if (lang !== currentLang) {
        changeLanguage(lang);
      }
    });
  });
}); 