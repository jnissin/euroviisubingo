let currentLang = 'fi';           // Default language
let currentGridIndices = [];      // Store current grid indices
let currentBingoCount = 0;        // Track current number of completed bingos

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
    "Esiintyjä on entinen \"Idols\" kilpailija",
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
    "Former \"Idols\" contestant",
    "Techno backing track",
    "Smoke effect"
  ],
  fr: [
    "Changement de tonalité",
    "Plus de 2 langues dans la chanson",
    "Machine à vent",
    "Changement de costume sur scène",
    "DVD de l'Eurovision mentionné",
    "Chanteur la tête en bas",
    "Baiser soufflé",
    "Clin d'œil à la caméra",
    "Quelqu'un pleure",
    "Costume traditionnel",
    "Effet de pluie",
    "Signe de cœur à la caméra",
    "Règles enfreintes",
    "\"Merci pour ce magnifique spectacle!\"",
    "Problème technique",
    "Passage parlé dans la chanson",
    "Présentateurs multilingues",
    "Artiste pieds nus",
    "Chanteur soulevé par les danseurs",
    "Chant faux",
    "Mention du yodel",
    "Victoires suédoises mentionnées",
    "Victoires irlandaises mentionnées",
    "Pyrotechnie",
    "\"Merci l'Europe!\"",
    "12 points au pays voisin",
    "Acrobaties sur scène",
    "Angles de caméra inhabituels",
    "Danseurs peu vêtus",
    "Ballade",
    "Tenue extravagante",
    "Paroles sur la paix mondiale",
    "Pyrotechnie excessive",
    "Blague ratée du présentateur",
    "Murs mobiles sur scène",
    "Artiste mentionne son pays",
    "Finlande encore incomprise",
    "Commentateur évoque la politique",
    "Instrument rare",
    "Anciennes stars de l'Eurovision",
    "Tenue entièrement blanche",
    "Tenue entièrement argentée",
    "Chanson d'amour",
    "Course au ralenti",
    "Tenue en cuir",
    "Ancien candidat d'\"Idols\"",
    "Fond musical techno",
    "Effet de fumée"
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
  
  let totalBingos = 0;
  
  // Check rows
  for (let i = 0; i < gridSize; i++) {
    if (grid[i].every(cell => cell)) {
      totalBingos++;
    }
  }
  
  // Check columns
  for (let i = 0; i < gridSize; i++) {
    if (grid.every(row => row[i])) {
      totalBingos++;
    }
  }
  
  // Check main diagonal
  if (grid.every((row, i) => grid[i][i])) {
    totalBingos++;
  }
  
  // Check anti-diagonal
  if (grid.every((row, i) => grid[i][gridSize - 1 - i])) {
    totalBingos++;
  }
  
  // If the number of bingos has changed, update the counter and trigger confetti if increased
  if (totalBingos !== currentBingoCount) {
    const shouldTriggerConfetti = totalBingos > currentBingoCount;
    currentBingoCount = totalBingos;
    return shouldTriggerConfetti;
  }
  
  return false;
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
  // Reset bingo count when generating new card
  currentBingoCount = 0;
  
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