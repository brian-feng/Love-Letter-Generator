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
  createCanvas(640, 480);
  console.log(rhymes("bye"));
}

function draw() {
  background(100);
}