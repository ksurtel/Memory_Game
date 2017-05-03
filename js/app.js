document.addEventListener("DOMContentLoaded", function (event) {

  var container = document.getElementById('container');
  var tile = [];
  var image = [];

  var guessCount = 0;
  var guess1 = "";
  var guess2 = "";
  var matched = [];

  function createGrid(n) {
    getImages(n);
    createTiles(n);
    shuffleTiles(tile);
    addTiles();
    addEvent();
  }

  function getImages(n) {
    for (var i = 1; i <= n / 2; i++) {
      var rand = Math.floor(Math.random() * (500 - 0)) + 0;
      image.push(`https://unsplash.it/100/150?image=+${rand}`);
      image.push(`https://unsplash.it/100/150?image=+${rand}`);
    }
  }

  function createTiles(n) {
    for (var i = 0; i < n; i++) {
      var newTile = document.createElement("div");
      newTile.innerHTML = `<img src='${image[i]}' class='faceDown'><img src='back.jpg'>`;
      newTile.className = "tile";
      tile.push(newTile);
    }
  }

  function shuffleTiles(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function addTiles() {
    for (var i = 0; i < tile.length; i++) {
      container.appendChild(tile[i]);
    }
  }

  function match() {
    if (guessCount === 0) {
      this.classList.toggle("flipper");
      guess1 = this;
      guessCount += 1;
    } else if (guessCount === 1 && guess1 !== this) {
      this.classList.toggle('flipper');
      guess2 = this;
      guessCount += 1;
      if (guess1.firstChild.getAttribute("src") === guess2.firstChild.getAttribute("src")) {
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
        window.setTimeout(function () {
          guess1.classList.toggle('flipper');
          guess2.classList.toggle('flipper');
          guessCount = 0;
        }, 2000);
      }
    }
  }

  function addEvent() {
    for (var i = 0; i < tile.length; i++) {
      tile[i].addEventListener('click', match);
    }
  }
  createGrid(6);
});