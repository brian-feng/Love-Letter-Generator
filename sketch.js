console.log(dict)

var own = {}.hasOwnProperty

var words = []

Object.keys(dict).forEach(function(word) {
  words.push({word: word, pron: dict[word]})
})


function rhymes(value) {
  var results = []
  var pron

  if (!value) return results

  value = String(value).toLowerCase()

  if (!own.call(dict, value)) return results

  pron = dict[value]

  words.forEach(check)

  return results.sort(sortt).slice(0, 20)

  function check(other) {
    var score = countMatchingTrailingSyllables(pron, other.pron)

    if (score > 1) {
      results.push({
        score: score,
        pron: other.pron,
        word: cleanAlternative(other.word)
      })
    }
  }
}

function countMatchingTrailingSyllables(a, b) {
  var left = reverseSyllables(a)
  var right = reverseSyllables(b)
  var length = Math.max(left.length, right.length)
  var index = -1
  var score = 0

  while (++index < length) {
    if (left[index] !== right[index]) {
      return score
    }

    score++
  }

  // Do not return words with exactly the same pronunciation (`kat` for `cat`)
  return 0
}

// `donkey(1)` -> `donkey`
function cleanAlternative(word) {
  var pos = word.indexOf('(')
  return pos === -1 ? word : word.slice(0, pos)
}

function reverseSyllables(d) {
  return d.split(' ').reverse()
}

function sortt(a, b) {
  return pick(b) - pick(a) || a.word.localeCompare(b.word)
}

function pick(d) {
  return d.score
}


function setup() {
  createCanvas(600, 800);
  rhymesList = rhymes("blue");
  background(235);
  fill(0)
	textAlign(CENTER);
  textSize(44);
  greeting = createElement('h2', 'Import blobs:');
  greeting.position(20, 5);
	greeting.style("color", "white");
	
	instructions = createElement('h2', 'Press SPACE to clear')
	instructions.position(20, 105);
	instructions.style("color", "white");
	
	instructions2 = createElement('h2', 'Press S to save')
	instructions2.position(20, 135);
	instructions2.style("color", "white");
}

function draw() {

}