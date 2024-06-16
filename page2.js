const names = {
  'Top': ['Bose', 'Sony','Philips', 'Sennheiser', 'Beats', 'JBL', 'Klipsch'],
    'A': ['Astell & Kern', 'AKG', 'Audio-Technica', 'Audeze', 'Apple'],
    'B': ['Bang & Olufsen', 'Bowers & Wilkins', 'Beats', 'Beyerdynamic', 'Bose'],
    'C': ['Cambridge Audio', 'Canton', 'Creative', 'Cerwin-Vega', 'Cyrus'],
    'D': ['Denon', 'Devialet', 'Dali', 'Dual', 'Dan Clark Audio'],
    'E': ['Edifier', 'Etymotic', 'Electro-Voice', 'Epson', 'Elac'],
    'F': ['Focal', 'FiiO', 'Fluance', 'Fostex', 'Fender'],
    'G': ['Grado', 'Genelec', 'Gallo Acoustics', 'Gemini', 'Grundig'],
    'H': ['Harman Kardon', 'HiFiMAN', 'HyperX', 'House of Marley', 'Hifonics'],
    'I': ['iFi Audio', 'IsoAcoustics', 'iHome', 'Incase', 'ION Audio'],
    'J': ['JBL', 'Jabra', 'Jaybird', 'Jamo', 'JDS Labs'],
    'K': ['Klipsch', 'KEF', 'Koss', 'Kicker', 'Kygo'],
    'L': ['Logitech', 'Linn', 'Lyngdorf', 'Libratone', 'Luxman'],
    'M': ['Marshall', 'Marantz', 'McIntosh', 'Monoprice', 'Mackie'],
    'N': ['Naim', 'Nakamichi', 'Numark', 'Nuforce', 'NAD'],
    'O': ['Onkyo', 'Optoma', 'Oppo', 'Origin Acoustics', 'Outdoor Tech'],
    'P': ['Pioneer', 'Polk Audio', 'Philips', 'Peavey', 'Plantronics'],
    'Q': ['QSC', 'Quad', 'Q Acoustics', 'QED', 'Qudelix'],
    'R': ['Razer', 'Roksan', 'Roon', 'Rega', 'RME'],
    'S': ['Sony', 'Sennheiser', 'Shure', 'Sonos', 'Skullcandy'],
    'T': ['Technics', 'Tannoy', 'TEAC', 'Thiel', 'Turtle Beach'],
    'U': ['Ultimate Ears', 'Urbanears', 'Under Armour', 'u-JAYS', 'Ultrasone'],
    'V': ['V-Moda', 'Vizio', 'Victrola', 'VOXX', 'Vifa'],
    'W': ['Wharfedale', 'Westone', 'Westone', 'Wadia', 'Wyred 4 Sound'],
    'X': ['Xiaomi', 'Xduoo', 'X-mini', 'XTZ', 'XOXO'],
    'Y': ['Yamaha', 'Yuin', 'Yurbuds', 'Yongnuo', 'Yatra'],
    'Z': ['Zound Industries', 'Zvox', 'Zolo', 'Zero Audio', 'Zinken']};

let currentLetter = 'Top';

const indexElements = document.querySelectorAll('.index-container div');
const namesList = document.getElementById('names-list');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
var popupMsg = document.getElementById("popupmsg");
const alpha = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','Top','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];



function slideLeft(arr) {
const firstElement = arr.shift();
arr.push(firstElement); 

return arr;}

function slideRight(arr) {
   const firstElement = arr.pop();
arr.unshift(firstElement); 

return arr;}

function createIndexElements(IndexEle) {
const indexContainer = document.querySelector('.index-container');
indexContainer.innerHTML='';
for (let index = 10; index < 17; index++) {
  const div = document.createElement('div');
  div.textContent = IndexEle[index];
  div.id = IndexEle[index];
  div.classList.add('index-item');
  indexContainer.appendChild(div);
}

updateHighlight(3);
}

function displayNames(letter) {
    namesList.innerHTML = '';
    names[letter].forEach((name, i) => {
        const li = document.createElement('li');
        li.textContent = name;
        if (i === 0) li.classList.add('highlight');
        namesList.appendChild(li);
    });
}

function updateHighlight(index) {
  const indexItems = Array.from(document.querySelectorAll('.index-item'));
    indexItems.forEach(item => item.classList.remove('highlight'));
    indexItems[index].classList.add('highlight');
}

function updateArrowBlink(direction) {
    if (direction === 'left') {
        leftArrow.classList.add('blink');
        setTimeout(() => leftArrow.classList.remove('blink'), 500);
    } else if (direction === 'right') {
        rightArrow.classList.add('blink');
        setTimeout(() => rightArrow.classList.remove('blink'), 500);
    }
}

function navigateIndex(direction) {
  
    if (direction === 'left') {
      arr = slideRight(alpha);
      createIndexElements(arr);
        updateArrowBlink('left');
      }
    else if (direction === 'right') {
     
        updateArrowBlink('right');
        arr = slideLeft(alpha);
        createIndexElements(arr);
    }
    currentLetter = document.querySelector('.index .highlight').textContent;
    displayNames(currentLetter);
  }

function navigateNames(direction) {
    const highlightedName = document.querySelector('.names .highlight');
    const namesItems = Array.from(document.querySelectorAll('.names li'));
    let newIndex = namesItems.findIndex(item => item.classList.contains('highlight'));
    if (direction === 'up' ){
      if( newIndex > 0) {
        newIndex--;
    } 
    else{
      newIndex = namesItems.length-1;
    }
  }
    else if (direction === 'down'){
     if( newIndex < namesItems.length - 1) {
        newIndex++;
    }
    else{
      newIndex = 0;
    }
  }
    namesItems.forEach(item => item.classList.remove('highlight'));
    namesItems[newIndex].classList.add('highlight');
}

function selectName() {
    const selectedName = document.querySelector('.names .highlight').textContent;
    popupMsg.innerHTML = `Selected: ${selectedName}`;
    popup.style.display="block";
    setTimeout(() => popup.style.display="none", 1000);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            navigateIndex('left');
            break;
        case 'ArrowRight':
            navigateIndex('right');
            break;
        case 'ArrowUp':
            navigateNames('up');
            break;
        case 'ArrowDown':
            navigateNames('down');
            break;
        case 'Enter':
            selectName();
            break;
    }
});

displayNames(currentLetter);
createIndexElements(alpha);
