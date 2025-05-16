let currentLang = 'fi';           // Default language
let currentGridIndices = [];      // Store current grid indices
let currentBingoCount = 0;        // Track current number of completed bingos
let currentSeed;                  // Store current seed for reproducible grid generation

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

// Eurovision bingo possibilities - Finnish, English, French
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

// Function to generate a hash of the bingo items
function generateContentHash() {
  const items = Object.values(bingoItems).flat();
  // Simple but effective string hashing algorithm
  return items.reduce((hash, item) => {
    for (let i = 0; i < item.length; i++) {
      hash = ((hash << 5) - hash) + item.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }, 0).toString(36);
}

// Function to generate a random seed
function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

// Function to shuffle array with a seed (Fisher-Yates algorithm)
function shuffleArrayWithSeed(array, seed) {
  const newArray = [...array];
  Math.seedrandom(seed);
  
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

// Function to update language UI elements
function updateLanguageUI(lang) {
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  
  // Update URL
  const url = new URL(window.location.href);
  if (lang === 'fi') {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', lang);
  }
  window.history.replaceState({}, '', url);
  
  // Update bingo grid language attribute
  const bingoGrid = document.getElementById('bingo-grid');
  if (bingoGrid) {
    bingoGrid.setAttribute('lang', lang);
  }
}

// Function to save state to local storage
function saveState() {
  // Don't save if grid indices haven't been generated yet
  if (!currentGridIndices.length || !document.querySelectorAll('.bingo-cell').length) {
    return;
  }

  const state = {
    lang: currentLang,
    seed: currentSeed,
    contentHash: generateContentHash(),
    selected: Array.from(document.querySelectorAll('.bingo-cell'))
      .map((cell, index) => cell.classList.contains('selected') ? index : -1)
      .filter(index => index !== -1)
  };
  
  try {
    localStorage.setItem('euroviisubingo', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save game state to localStorage:', e);
  }
}

// Function to load state from local storage
function loadState() {
  let saved;
  
  try {
    saved = localStorage.getItem('euroviisubingo');
  } catch (e) {
    console.warn('Failed to load game state from localStorage:', e);
    return;
  }
  
  if (!saved) return;
  
  let state;
  try {
    state = JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to parse saved game state:', e);
    return;
  }
  
  // Load language first
  if (state.lang && ['fi', 'en', 'fr'].includes(state.lang)) {
    currentLang = state.lang;
    updateTextContent(state.lang);
    updateLanguageUI(state.lang);
  }
  
  // Check if content has changed
  const contentChanged = state.contentHash !== generateContentHash();
  
  // Handle grid generation
  if (contentChanged) {
    console.log('Content has changed, generating new card');
    currentSeed = generateSeed();
    generateBingoCard();
  } else if (state.seed) {
    currentSeed = state.seed;
    generateBingoCard();
    
    // Restore selected cells only if content hasn't changed
    if (Array.isArray(state.selected) && state.selected.length > 0) {
      const cells = document.querySelectorAll('.bingo-cell');
      state.selected.forEach(index => {
        if (cells[index]) {
          cells[index].classList.add('selected');
        }
      });
      // Update bingo count
      currentBingoCount = 0;
      checkForBingo();
    }
  } else {
    // Fallback if no seed is found
    currentSeed = generateSeed();
    generateBingoCard();
  }
}

// Function to change language
function changeLanguage(lang) {
  if (currentLang === lang) return; // Skip if same language
  
  currentLang = lang;
  updateTextContent(lang);
  updateLanguageUI(lang);

  // Update cell content without regenerating the grid
  const cells = document.querySelectorAll('.bingo-cell-content');
  if (cells.length > 0 && currentGridIndices.length > 0) {
    cells.forEach((cell, index) => {
      if (index < currentGridIndices.length) {
        cell.textContent = bingoItems[lang][currentGridIndices[index]];
      }
    });
    saveState();
  } else {
    // If grid is empty, generate it
    generateBingoCard();
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
  // Check if confetti library is available
  if (typeof confetti !== 'function') {
    console.warn('Confetti library not loaded');
    return;
  }

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
function generateBingoCard() {
  const bingoGrid = document.getElementById('bingo-grid');
  if (!bingoGrid) {
    console.error('Bingo grid element not found');
    return;
  }
  
  // Check if seedrandom is available
  if (typeof Math.seedrandom !== 'function') {
    console.warn('seedrandom library not loaded, using standard Math.random');
  }
  
  bingoGrid.innerHTML = '';
  currentBingoCount = 0;
  
  // Ensure we have a valid language
  if (!bingoItems[currentLang]) {
    currentLang = 'fi'; // Fallback to Finnish if language is invalid
  }
  
  // Set the language attribute on the grid
  bingoGrid.setAttribute('lang', currentLang);
  
  try {
    // Generate new random indices using seed
    currentGridIndices = shuffleArrayWithSeed(
      Array.from({ length: bingoItems[currentLang].length }, (_, i) => i),
      currentSeed
    ).slice(0, 25);
    
    // Create 5x5 grid
    currentGridIndices.forEach((itemIndex, i) => {
      if (typeof bingoItems[currentLang][itemIndex] === 'undefined') {
        console.warn(`Missing item at index ${itemIndex} for language ${currentLang}`);
        return;
      }
      
      const cell = document.createElement('div');
      cell.className = 'bingo-cell';
      
      const content = document.createElement('div');
      content.className = 'bingo-cell-content';
      content.textContent = bingoItems[currentLang][itemIndex];
      
      cell.appendChild(content);
      cell.addEventListener('click', function() {
        this.classList.toggle('selected');
        if (checkForBingo()) {
          setTimeout(createConfetti, 200);
        }
        saveState();
      });
      
      bingoGrid.appendChild(cell);
    });

    saveState();
  } catch (e) {
    console.error('Error generating bingo card:', e);
  }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  // Check if required elements exist
  if (!document.getElementById('bingo-grid')) {
    console.error('Required element #bingo-grid not found');
    return;
  }
  
  if (!document.getElementById('reset-button')) {
    console.warn('Reset button element not found');
  }
  
  // Check URL parameters for language
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['fi', 'en', 'fr'].includes(langParam)) {
      currentLang = langParam;
      updateTextContent(langParam);
      updateLanguageUI(langParam);
    }
  } catch (e) {
    console.warn('Error parsing URL parameters:', e);
  }
  
  // Set up language toggle
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => changeLanguage(btn.getAttribute('data-lang')));
  });
  
  // Set up reset button
  const resetButton = document.getElementById('reset-button');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      currentSeed = generateSeed();
      try {
        localStorage.removeItem('euroviisubingo');
      } catch (e) {
        console.warn('Failed to remove item from localStorage:', e);
      }
      generateBingoCard();
    });
  }
  
  // Load saved state or generate initial card
  try {
    const saved = localStorage.getItem('euroviisubingo');
    if (saved) {
      loadState();
    } else {
      currentSeed = generateSeed();
      generateBingoCard(); 
    }
  } catch (e) {
    console.warn('Error during initialization:', e);
    // Fallback to ensure something is shown
    currentSeed = generateSeed();
    generateBingoCard();
  }
}); 