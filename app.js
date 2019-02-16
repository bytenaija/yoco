'use strict'
let axios = require('axios');



async function downloadFile() {
  let results = await axios.get('https://s3-eu-west-1.amazonaws.com/yoco-testing/tests.json');
  return results.data;
}


//Evaluate the current hand
function playHand(test) {
  let playerA = test.playerA;
  let playerB = test.playerB;

  let playerATotal = playerA.reduce((total, card) => {
    //get the total of the current card in the hand for player A
    return total + assingValueCards(card)
  }, 0)

  let playerBTotal = playerB.reduce((total, card) => {
    //get the total of the current card in the hand for player A
    return total + assingValueCards(card)

  }, 0)

  //Evaluate who worn
  if (playerATotal > 21 && playerBTotal < 21) {
    return 'playerBWins';
  } else if (playerBTotal > 21 && playerATotal < 21) {
    return 'playerAWins';
  } else {
    if (playerATotal > playerBTotal) {
      return 'playerAWins';
    } else if (playerATotal < playerBTotal) {
      return 'playerBWins';
    } else {

      return compareHighest(playerA, playerB)
    }
  }
}

function compareHighest(a, b) {

  a.sort((i, j) => {
    i = assingValueCards(i);
    j = assingValueCards(j);
    return j - i
  })

  b.sort((i, j) => {
    i = assingValueCards(i);
    j = assingValueCards(j);
    return j - i
  })


  if (a.length >= b.length) {
    for (let i = 0; i < a.length; i++) {
      if (assingValueCards(a[i]) > assingValueCards(b[i])) {
        return 'playerAWins'
      } else if (assingValueCards(a[i]) < assingValueCards(b[i])) {
        return 'playerBWins'
      } else {

        if (parseInt(a[i].substr(0, 1)) >= 2 && parseInt(a[i].substr(0, 1)) <= 9 || parseInt(b[i].substr(0, 1)) >= 2 && parseInt(b[i].substr(0, 1)) <= 9) {
          let win = compareHighestSuite(a[i], b[i]);
          if (win === true) {
            return 'playerAWins'
          } else if (win === false) {
            return 'playerBWins'
          } else {
            // console("What the heeksksksksk")
          }
        } else {
          if (compareValue(a[i], b[i]) == true && compareValue(a[i], b[i]) != -1) {
            return 'playerAWins'
          } else if (compareValue(a[i], b[i]) == false) {
            return 'playerBWins'
          } else {
            let win = compareHighestSuite(a[i], b[i]);
            if (win === true) {
              return 'playerAWins'
            } else if (win === false) {
              return 'playerBWins'
            } else {
              // console("What the heeksksksksk")
            }
          }
        }

      }
    }
  } else {
    for (let i = 0; i < b.length; i++) {
      if (assingValueCards(a[i]) > assingValueCards(b[i])) {
        // console("hdhdhddh0000000000000000000")
        return 'playerAWins'
      } else if (assingValueCards(a[i]) < assingValueCards(b[i])) {
        // console("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        return 'playerBWins'
      } else {
        // console("ccccccccccccccccccccccccccccccccccccccccccccc")
        if (parseInt(a[i].substr(0, 1)) >= 2 && parseInt(a[i].substr(0, 1)) <= 9 || parseInt(b[i].substr(0, 1)) >= 2 && parseInt(b[i].substr(0, 1)) <= 9) {
          let win = compareHighestSuite(assingValueCards(a[i]), assingValueCards(b[i]));
          if (win === true) {
            return 'playerAWins'
          } else if (win === false) {
            return 'playerBWins'
          } else {
            // console("What the heeksksksksk")
          }
        } else {
          if (compareValue(a[i], b[i]) == true && compareValue(a[i], b[i]) != -1) {
            return 'playerAWins'
          } else if (compareValue(a[i], b[i]) == false) {
            return 'playerBWins'
          } else {
            let win = compareHighestSuite(a[i], b[i]);
            if (win === true) {
              return 'playerAWins'
            } else if (win === false) {
              return 'playerBWins'
            } else {
              // console("What the heeksksksksk")
            }
          }
        }

      }
    }
  }
}

function assingValueCards(card) {

  let cardData = []
  if (card.length == 2) {
    cardData = card.split('');
  } else {
    cardData[0] = card.substr(0, 2)
  }
  switch (cardData[0]) {
    case '2':
      return 2;

    case '3':
      return 3;

    case '4':
      return 4;

    case '5':
      return 5;

    case '6':
      return 6;

    case '7':
      return 7;

    case '8':
      return 8;

    case '9':
      return 9;

    case '10':
    case 'J':
    case 'Q':
    case 'K':
      return 10;

    case 'A':
      return 11;
  }
}

function checkSuite(cardA, cardB) {
  if (cardA == 'S' && cardB !== 'S') {
    return true;
  } else if (cardB == 'S' && cardA !== 'S') {
    return false;
  } else if (cardB == 'S' && cardA == 'S') {
    return -1
  }

  if (cardA == 'H' && cardB !== 'H') {
    return true;
  } else if (cardB == 'H' && cardA !== 'H') {
    return false;
  } else if (cardB == 'H' && cardA == 'H') {
    return -1
  }

  if (cardA == 'C' && cardB !== 'C') {
    return true;
  } else if (cardB == 'C' && cardA !== 'C') {
    return false;
  } else if (cardB == 'C' && cardA == 'C') {
    return -1
  }

  if (cardA == 'D' && cardB !== 'D') {
    return true;
  } else if (cardB == 'D' && cardA !== 'D') {
    return false;
  } else if (cardB == 'D' && cardA == 'D') {
    return -1
  }
}

function compareValue(a, b) {

  if (a.length > 2) {
    a = a.substr(0, 2)
  } else {
    a = a.substr(0, 1)
  }

  if (b.length > 2) {
    b = b.substr(0, 2)
  } else {
    b = b.substr(0, 1)
  }

  if (a == 'K' && b !== 'K') {
    return a > b
  } else if (b == 'K' && a !== 'K') {
    return b > a
  } else if (b == 'K' && a == 'K') {
    return -1
  }

  if (a == 'Q' && b !== 'Q') {
    return a > b
  } else if (b == 'Q' && a !== 'Q') {
    return b > a
  } else if (b == 'Q' && a == 'Q') {
    return -1
  }

  if (a == 'J' && b !== 'J') {
    return a > b
  } else if (b == 'J' && a !== 'J') {
    return b > a
  } else if (b == 'J' && a == 'J') {
    return -1
  }

  if (a == '10' && b !== '10') {
    return a < b
  } else if (b == '10' && a !== '10') {
    return b < a
  } else if (b == '10' && a == '10') {
    return -1
  }
}

function compareHighestSuite(a, b) {
  if (checkSuite(a.substr(a.length - 1), b.substr(b.length - 1)) === true) {
    return true
  } else if (checkSuite(a.substr(a.length - 1), b.substr(b.length - 1)) === false) {
    return false
  } else {
    return -1
  }
}



// console()

async function playGame() {
  let tests = await downloadFile();

  let winners = []
  let index = 0;

    for(let test of tests){

         let result = playHand(test)
         console.log(result)
         winners.push(result);




  }


    return winners

}

console.log(playGame())