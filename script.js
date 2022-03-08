var Triss = "triss.png";
var Ciri = "ciri.png";
var Jaskier = "jaskier.png";
var Iorweth = "iorweth.png";
var Geralt = "geralt.png";
var Yen = "yen.png";

var cards = [
  Ciri,
  Geralt,
  Jaskier,
  Jaskier,
  Iorweth,
  Triss,
  Geralt,
  Yen,
  Ciri,
  Triss,
  Yen,
  Iorweth,
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(cards);

var cardsArray = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11];
function init() {
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i] = document
      .getElementById(`c${i}`)
      .addEventListener("click", function () {
        revealCard(i);
      });
  }
}

init();

var oneVisible = false;
var turnCounter = 0;
var visibleNum;
var lock = false;
var pairsLeft = 6;

function revealCard(nr) {
  var opacityValue = $(`#c${nr}`).css("opacity");

  if (opacityValue != 0 && lock == false) {
    lock = true;
    var picture = "url(img/" + cards[nr] + ")";
    $("#c" + nr).css("background-image", picture);
    $("#c" + nr).addClass("cardActive");
    $("#c" + nr).removeClass("card");

    if (oneVisible === false) {
      //first card
      oneVisible = true;
      visibleNum = nr;
      lock = false;
    } else {
      //second card

      if (cards[visibleNum] === cards[nr]) {
        //check for duplicate
        setTimeout(function () {
          hideTwoCards(visibleNum, nr);
        }, 750);
      } else {
        setTimeout(function () {
          reverseCards(visibleNum, nr);
        }, 750);
      }

      turnCounter++;
      oneVisible = false;
      $(".score").html(`Turn counter: ${turnCounter}`);
    }
  }
}

const hideTwoCards = (nr1, nr2) => {
  $("#c" + nr1).css("opacity", "0");
  $("#c" + nr2).css("opacity", "0");
  lock = false;
  pairsLeft--;
  if (pairsLeft === 0) {
    $(".board").html(`<h1>You win!<br> Done in ${turnCounter} turns!`);
  }
};
const reverseCards = (nr1, nr2) => {
  var rev = "url(img/karta.png)";
  $(`#c${nr1}`).css("background-image", rev);
  $(`#c${nr1}`).addClass("card");
  $(`#c${nr1}`).removeClass("cardActive");
  $(`#c${nr2}`).css("background-image", rev);
  $(`#c${nr2}`).addClass("card");
  $(`#c${nr2}`).removeClass("cardActive");
  lock = false;
};
