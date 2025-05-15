let currentLang = 'fi';           // Default language
let currentGridIndices = [];      // Store current grid indices
let completedBingos = new Map();  // Track completed bingo patterns and their states

// Confetti configuration
const CONFETTI_CONFIG = {
  default: {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  },
  side: {
    particleCount: 2,
    spread: 55,
    colors: ['#00008B', '#FFFFFF']
  },
  delayed: {
    particleCount: 100,
    spread: 160,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#FFD700', '#FFC0CB', '#00CED1', '#FF1493', '#00BFFF']
  }
};

// Eurovision bingo possibilities - Finnish and English
const bingoItems = {
  fi: [
    "Modulaatio",
    "Yli 2 kieltä laulussa",
    "Tuulikone",
    "Asunvaihto lavalla",
    "Euroviisu DVD",
    "Laulaja on pää alaspäin",
    "Lentosuukko",
    "Silmänisku kameralle",
    "Joku itkee",
    "Esityksessä kansallispuku",
    "Sade-efekti",
    "Sydänmerkki kameralle",
    "Joku rikkoo sääntöjä",
    "\"Kiitos hienosta showsta!\"",
    "Tekninen ongelma",
    "Puhuttu osuus laulussa",
    "Juontajat puhuvat useilla kielillä",
    "Esiintyjä on paljain jaloin",
    "Tanssijat nostavat laulajan ilmaan",
    "Laulua nuotin vierestä",
    "Jodlaus mainittu",
    "Ruotsin voittojen määrä mainittu",
    "Irlannin voittojen määrä mainittu",
    "Pyrotekniikkaa",
    "\"Kiitos Eurooppa!\"",
    "12 pistettä naapurimaalle",
    "Akrobatiaa lavalla",
    "Erikoiset kameraperspektiivit",
    "Puolialastomat tanssijat",
    "Balladi",
    "Laulajalla yliampuva asu",
    "Maailmanrauha sanoituksessa",
    "Laulua paikkaava pyrotekniikka",
    "Huono vitsi juontajalta",
    "Liikkuvat seinät lavasteissa",
    "Esiintyjä mainitsee maansa nimen",
    "Suomea ei taaskaan ymmärretty",
    "Kommentaattori mainitsee politiikan",
    "Harvinainen soitin",
    "Menneiden aikojen euroviisutähdet",
    "Täysin valkoinen esiintymisasu",
    "Täysin hopeinen esiintymisasu",
    "Laulu rakkaudesta",
    "Hidastettu juoksu",
    "Nahka-asu",
    "Esiintyjä on entinen Idols kilpailija",
    "Technotausta",
    "Savuefekti"
  ],
  en: [
    "Key change",
    "More than 2 languages in a song",
    "Wind machine",
    "Costume change on stage",
    "Eurovision DVD mentioned",
    "Singer is upside down",
    "Blown kiss",
    "Wink at the camera",
    "Someone cries",
    "National costume in performance",
    "Rain effect",
    "Heart sign to the camera",
    "Someone breaks the rules",
    "\"Thank you for a great show!\"",
    "Technical difficulty",
    "Spoken word section in a song",
    "Hosts speak in multiple languages",
    "Performer is barefoot",
    "Dancers lift the singer in the air",
    "Singing off-key",
    "Yodeling mentioned",
    "Number of Swedish wins mentioned",
    "Number of Irish wins mentioned",
    "Pyrotechnics",
    "\"Thank you Europe!\"",
    "12 points to neighboring country",
    "Acrobatics on stage",
    "Unusual camera angles",
    "Scantily clad backup dancers",
    "Ballad",
    "Singer with over-the-top outfit",
    "World peace in lyrics",
    "Pyrotechnics compensating for poor singing",
    "Bad joke from the host",
    "Moving walls in stage props",
    "Performer mentions their country's name",
    "Finland was misunderstood again",
    "Commentator mentions politics",
    "Rare instrument",
    "Eurovision stars from the past",
    "All-white outfit",
    "All-silver outfit",
    "Love song",
    "Slow-motion running",
    "Leather outfit",
    "Former Idol contestant",
    "Techno backing track",
    "Smoke effect"
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

// Function to update text content based on language
function updateTextContent(lang) {
  document.querySelectorAll(`[data-${lang}]`).forEach(element => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });
}

// Function to change language
function changeLanguage(lang) {
  if (currentLang === lang) return; // Skip if same language
  
  currentLang = lang;
  updateTextContent(lang);
  
  // Update language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update bingo grid language attribute and content
  const bingoGrid = document.getElementById('bingo-grid');
  bingoGrid.setAttribute('lang', lang);

  if (currentGridIndices.length > 0) {
    bingoGrid.querySelectorAll('.bingo-cell-content').forEach((cell, index) => {
      cell.textContent = bingoItems[lang][currentGridIndices[index]];
    });
  }
}

// Function to check for bingo
function checkForBingo() {
  const cells = document.querySelectorAll('.bingo-cell');
  const gridSize = 5;
  const grid = Array.from({ length: gridSize }, (_, row) => 
    Array.from({ length: gridSize }, (_, col) => 
      cells[row * gridSize + col].classList.contains('selected')
    )
  );
  
  let newBingos = [];
  
  // Check rows
  for (let i = 0; i < gridSize; i++) {
    const isComplete = grid[i].every(cell => cell);
    const pattern = `row${i}`;
    const wasComplete = completedBingos.get(pattern);
    
    if (isComplete && !wasComplete) {
      newBingos.push(pattern);
    }
    completedBingos.set(pattern, isComplete);
  }
  
  // Check columns
  for (let i = 0; i < gridSize; i++) {
    const isComplete = grid.every(row => row[i]);
    const pattern = `col${i}`;
    const wasComplete = completedBingos.get(pattern);
    
    if (isComplete && !wasComplete) {
      newBingos.push(pattern);
    }
    completedBingos.set(pattern, isComplete);
  }
  
  // Check main diagonal
  const mainDiagComplete = grid.every((row, i) => grid[i][i]);
  const wasMainDiagComplete = completedBingos.get('mainDiag');
  if (mainDiagComplete && !wasMainDiagComplete) {
    newBingos.push('mainDiag');
  }
  completedBingos.set('mainDiag', mainDiagComplete);
  
  // Check anti-diagonal
  const antiDiagComplete = grid.every((row, i) => grid[i][gridSize - 1 - i]);
  const wasAntiDiagComplete = completedBingos.get('antiDiag');
  if (antiDiagComplete && !wasAntiDiagComplete) {
    newBingos.push('antiDiag');
  }
  completedBingos.set('antiDiag', antiDiagComplete);
  
  return newBingos.length > 0;
}

// Function to create confetti celebration
function createConfetti() {
  // Initial burst
  confetti(CONFETTI_CONFIG.default);
  
  // Continuous side effects
  const duration = 500;
  const end = Date.now() + duration;
  
  (function frame() {
    confetti({
      ...CONFETTI_CONFIG.side,
      angle: 60,
      origin: { x: 0 }
    });
    
    confetti({
      ...CONFETTI_CONFIG.side,
      angle: 120,
      origin: { x: 1 }
    });
    
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  
  // Delayed bursts - adjusted timing
  setTimeout(() => {
    confetti({
      ...CONFETTI_CONFIG.default,
      spread: 100,
      origin: { x: 0.5, y: 0.5 }
    });
  }, 100);
  
  setTimeout(() => confetti(CONFETTI_CONFIG.delayed), 250);
}

// Function to generate bingo card
function generateBingoCard(lang = currentLang) {
  const bingoGrid = document.getElementById('bingo-grid');
  bingoGrid.innerHTML = '';
  // Reset completed bingos when generating new card
  completedBingos.clear();
  
  // Generate new random indices
  currentGridIndices = shuffleArray(Array.from(
    { length: bingoItems[lang].length },
    (_, i) => i
  )).slice(0, 25);
  
  // Create 5x5 grid
  currentGridIndices.forEach((itemIndex, i) => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    
    const content = document.createElement('div');
    content.className = 'bingo-cell-content';
    content.textContent = bingoItems[lang][itemIndex];
    
    cell.appendChild(content);
    cell.addEventListener('click', function() {
      this.classList.toggle('selected');
      if (checkForBingo()) {
        setTimeout(createConfetti, 200);
      }
    });
    
    bingoGrid.appendChild(cell);
  });
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  // Set up language toggle
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => changeLanguage(btn.getAttribute('data-lang')));
  });
  
  // Set up reset button
  document.getElementById('reset-button').addEventListener('click', () => generateBingoCard());
  
  // Generate initial card
  generateBingoCard();
}); 