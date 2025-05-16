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
    "Yli 2\nkieltä\nlaulussa",
    "Tuulikone",
    "Asunvaihto\nlavalla",
    "Euroviisu DVD",
    "Laulaja on\npää\nalaspäin",
    "Lentosuukko",
    "Silmänisku\nkameralle",
    "Joku\nitkee",
    "Esityksessä kansallispuku",
    "Sade-efekti",
    "Sydänmerkki\nkameralle",
    "Joku\nrikkoo\nsääntöjä",
    "\"Kiitos\nhienosta\nshowsta!\"",
    "Tekninen\nongelma",
    "Puhuttu\nosuus\nlaulussa",
    "Juontajat\npuhuvat\nuseilla\nkielillä",
    "Esiintyjä on paljain\njaloin",
    "Tanssijat\nnostavat\nlaulajan\nilmaan",
    "Laulua\nnuotin\nvierestä",
    "Jodlaus\nmainittu",
    "Ruotsin\nvoittojen\nmäärä\nmainittu",
    "Irlannin\nvoittojen\nmäärä\nmainittu",
    "Pyrotekniikkaa",
    "\"Kiitos\nEurooppa!\"",
    "12 pistettä\nnaapurimaalle",
    "Akrobatiaa\nlavalla",
    "Erikoiset\nkameraperspektiivit",
    "Puolialastomat\ntanssijat",
    "Balladi",
    "Laulajalla\nyliampuva\nasu",
    "Maailmanrauha sanoituksessa",
    "Laulua\npaikkaava\npyrotekniikka",
    "Huono\nvitsi\njuontajalta",
    "Liikkuvat\nseinät\nlavasteissa",
    "Esiintyjä\nmainitsee\nmaansa\nnimen",
    "Suomea ei taaskaan\nymmärretty",
    "Kommentaattori mainitsee politiikan",
    "Harvinainen\nsoitin",
    "Menneiden\naikojen\neuroviisutähdet",
    "Täysin\nvalkoinen\nesiintymisasu",
    "Täysin\nhopeinen\nesiintymisasu",
    "Laulu\nrakkaudesta",
    "Hidastettu\njuoksu",
    "Nahka-asu",
    "Esiintyjä on\nentinen\n\"Idols\"\nkilpailija",
    "Technotausta",
    "Savuefekti"
  ],
  en: [
    "Key change",
    "More than 2\nlanguages\nin a song",
    "Wind\nmachine",
    "Costume\nchange on\nstage",
    "Eurovision\nDVD\nmentioned",
    "Singer is\nupside\ndown",
    "Blown kiss",
    "Wink at\nthe camera",
    "Someone\ncries",
    "National\ncostume in\nperformance",
    "Rain\neffect",
    "Heart sign\nto the\ncamera",
    "Someone\nbreaks the\nrules",
    "\"Thank\nyou for a\ngreat\nshow!\"",
    "Technical\ndifficulty",
    "Spoken\nword\nsection in\na song",
    "Hosts\nspeak in\nmultiple\nlanguages",
    "Performer\nis\nbarefoot",
    "Dancers\nlift the\nsinger in\nthe air",
    "Singing\noff-key",
    "Yodeling\nmentioned",
    "Number of\nSwedish\nwins\nmentioned",
    "Number of\nIrish wins\nmentioned",
    "Pyrotechnics",
    "\"Thank you\nEurope!\"",
    "12 points\nto\nneighboring\ncountry",
    "Acrobatics\non stage",
    "Unusual\ncamera\nangles",
    "Scantily\nclad\nbackup\ndancers",
    "Ballad",
    "Singer\nwith over-\nthe-top\noutfit",
    "World\npeace in\nlyrics",
    "Pyrotechnics\ncompensating\nfor poor\nsinging",
    "Bad joke\nfrom the\nhost",
    "Moving\nwalls in\nstage\nprops",
    "Performer\nmentions\ntheir\ncountry",
    "Finland\nwas mis-\nunderstood\nagain",
    "Commentator\nmentions\npolitics",
    "Rare\ninstrument",
    "Eurovision\nstars from\nthe past",
    "All-white\noutfit",
    "All-silver\noutfit",
    "Love song",
    "Slow-\nmotion\nrunning",
    "Leather\noutfit",
    "Former\n\"Idols\"\ncontestant",
    "Techno\nbacking\ntrack",
    "Smoke\neffect"
  ],
  fr: [
    "Changement\nde tonalité",
    "Plus de 2\nlangues\ndans la\nchanson",
    "Machine à\nvent",
    "Changement\nde costume\nsur scène",
    "DVD de\nl'Eurovision\nmentionné",
    "Chanteur\nla tête\nen bas",
    "Baiser\nsoufflé",
    "Clin d'œil\nà la\ncaméra",
    "Quelqu'un\npleure",
    "Costume\ntraditionnel",
    "Effet de\npluie",
    "Signe de\ncœur à la\ncaméra",
    "Règles\nenfreintes",
    "\"Merci\npour ce\nmagnifique\nspectacle!\"",
    "Problème\ntechnique",
    "Passage\nparlé dans\nla chanson",
    "Présentateurs\nmultilingues",
    "Artiste\npieds nus",
    "Chanteur\nsoulevé\npar les\ndanseurs",
    "Chant faux",
    "Mention\ndu yodel",
    "Victoires\nsuédoises\nmentionnées",
    "Victoires\nirlandaises\nmentionnées",
    "Pyrotechnie",
    "\"Merci\nl'Europe!\"",
    "12 points\nau pays\nvoisin",
    "Acrobaties\nsur scène",
    "Angles de\ncaméra\ninhabituels",
    "Danseurs\npeu vêtus",
    "Ballade",
    "Tenue\nextravagante",
    "Paroles\nsur la paix\nmondiale",
    "Pyrotechnie\ncompensant\nun chant\nmédiocre",
    "Blague\nratée du\nprésentateur",
    "Murs\nmobiles\nsur scène",
    "Artiste\nmentionne\nson pays",
    "Finlande\nencore\nincomprise",
    "Commentateur\névoque la\npolitique",
    "Instrument\nrare",
    "Anciennes\nstars de\nl'Eurovision",
    "Tenue\nentièrement\nblanche",
    "Tenue\nentièrement\nargentée",
    "Chanson\nd'amour",
    "Course au\nralenti",
    "Tenue en\ncuir",
    "Ancien\ncandidat\nd'\"Idols\"",
    "Fond\nmusical\ntechno",
    "Effet de\nfumée"
  ]
};

function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    testFromStorage = localStorage.getItem(test);
    
    if (testFromStorage !== test) {
      console.warn('Failed to retrieve test item from local storage');
      return false;
    }
    
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}

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
  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this browser');
    return;
  }

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
    console.log('State saved successfully, seed:', currentSeed);
  } catch (e) {
    console.warn('Failed to save game state to localStorage:', e);
  }
}

// Function to load state from local storage
function loadState() {
  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this browser');
    return;
  }

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

// Function to check if any cells are selected
function hasSelectedCells() {
  return document.querySelectorAll('.bingo-cell.selected').length > 0;
}

// Function to show the reset confirmation modal
function showResetModal() {
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.classList.add('active');
    // Update modal text content based on current language
    updateTextContent(currentLang);
  }
}

// Function to hide the reset confirmation modal
function hideResetModal() {
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Function to actually reset the bingo card
function resetBingoCard() {
  currentSeed = generateSeed();
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem('euroviisubingo');
    } catch (e) {
      console.warn('Failed to remove item from localStorage:', e);
    }
  }
  generateBingoCard();
  hideResetModal();
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
      if (hasSelectedCells()) {
        showResetModal();
      } else {
        resetBingoCard();
      }
    });
  }
  
  // Set up modal buttons
  const cancelButton = document.getElementById('cancel-reset');
  if (cancelButton) {
    cancelButton.addEventListener('click', hideResetModal);
  }
  
  const confirmButton = document.getElementById('confirm-reset');
  if (confirmButton) {
    confirmButton.addEventListener('click', resetBingoCard);
  }
  
  // Allow clicking outside the modal to cancel
  const modalOverlay = document.getElementById('reset-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        hideResetModal();
      }
    });
  }
  
  // Add keyboard support for the modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      hideResetModal();
    }
  });
  
  // Check if localStorage is available before attempting to load saved state
  if (isLocalStorageAvailable()) {
    try {
      const saved = localStorage.getItem('euroviisubingo');
      if (saved) {
        const parsedState = JSON.parse(saved);
        console.log('Loading saved state, seed:', parsedState.seed);

        loadState();

        // Force a re-save after loading to ensure state is preserved
        // This fixes the issue with reloading twice without making selections
        setTimeout(saveState, 100);
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
  } else {
    console.warn('localStorage is not available, starting with a new game');
    currentSeed = generateSeed();
    generateBingoCard();
  }
}); 