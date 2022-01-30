document.addEventListener('DOMContentLoaded', function (event) {

  const container = document.getElementById('container');
  let tile = [];
  let image = [];

  let guessCount = 0;
  let guess1 = '';
  let guess2 = '';
  let matched = [];

  const randomNumber = () => Math.floor((Math.random() + 1) * 100);
  console.log(randomNumber())

  /* Partial fix to duplicating images */

  // const randomNumber = () => Math.floor(Math.random() * 50);
  // let arr = [];
  // let newNr = 0;
  // const randomArray = {
  //   while(arr.length < 50) {
  //     newNr = randomNumber();
  //     if (arr.indexOf(newNr) === -1) {
  //       arr.push(newNr);
  //     }
  //   }
  // return arr;
  // };
  // randomArray();

  const getImages = (n) => {
    for (let i = 1; i <= n / 2; i++) {
      let number = randomNumber()
      image.push(`https://picsum.photos/id/${number}/100/150`);
      image.push(`https://picsum.photos/id/${number}/100/150`);
      console.log(number)
    }
    console.table(image)
  };

  const createTiles = (n) => {
    for (let i = 0; i < n; i++) {
      const newTile = document.createElement('div');
      newTile.innerHTML = `<img src='${image[i]}' class='faceDown'><img src='back.jpg'>`;
      newTile.className = 'tile';
      tile.push(newTile);
    }
  };

  const shuffleTiles = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  function addTiles() {
    tile.forEach(tile => container.appendChild(tile))
  }

  function match(e) {
    if (guessCount === 0) {
      this.classList.toggle('flipper');
      guess1 = this;
      guessCount += 1;
    } else if (guessCount === 1 && guess1 !== this) {
      this.classList.toggle('flipper');
      guess2 = this;
      guessCount += 1;
      if (guess1.firstChild.getAttribute('src') === guess2.firstChild.getAttribute('src')) {
        guess1.removeEventListener('click', match);
        guess2.removeEventListener('click', match);
        guessCount = 0;
        guess1.classList.add('matched');
        guess2.classList.add('matched');
        matched.push(guess1, guess2);
        if (matched.length === tile.length) {
          console.log('winner winner chicken dinner');
        }
      } else {
        window.setTimeout(() => {
          guess1.classList.toggle('flipper');
          guess2.classList.toggle('flipper');
          guessCount = 0;
        }, 2000);
      }
    }
  }

  const addEvent = (e) => {
    for (let i = 0; i < tile.length; i++) {
      tile[i].addEventListener('click', match);
    }
  };

  ((n) => {
    getImages(n);
    createTiles(n);
    shuffleTiles(tile);
    addTiles();
    addEvent();
  })(12);
});