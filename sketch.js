let input, button, greeting;
let font;

// yoinked from https://github.com/words/rhymes
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

  return 0
}

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

// yoinked from https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function ground() {
  fill(170, 150, 146, 240);
  rect(0, 530, 600, 530);
}

// yoinked from https://editor.p5js.org/son/sketches/SkJJxG2Cm
function flower() {
  let max = Math.floor(Math.random()*3+3)
  for(let i = 0; i < max; i++){
    let randx = Math.floor(Math.random()*20+(550*i)/max+50);
    let randy = Math.floor(Math.random()*40+630)
    stroke(85,107,47,20);
    strokeWeight(3);
    line(randx, 800, randx, randy+30);

    push();
    fill(color(Math.floor(Math.random()*55+170), Math.floor(Math.random()*55+170), Math.floor(Math.random()*55+170)));
    translate(randx, randy);
    noStroke();
    for (var r1 = 0; r1 < 10; r1++) {
      ellipse(0, 40, 25, 50);
      rotate(PI / 5);
    }
    pop();
  }
}


function getter() {
  background(color(Math.floor(Math.random()*15+240), Math.floor(Math.random()*15+240), Math.floor(Math.random()*15+240)));

  stroke(color(Math.floor(Math.random()*150+10), Math.floor(Math.random()*150+10), Math.floor(Math.random()*150+10)))
  strokeWeight(5);
  line(25, 25, 575, 25);
  line(575, 25, 575, 775);
  line(575, 775, 25, 775);
  line(25, 775, 25, 25);

  let array = rhymes(input.value().toLowerCase());
  fill(0);
  stroke(0);
  strokeWeight(1);
  textSize(44);
  textAlign(CENTER);
  textFont(font);
  let roll = Math.floor(Math.random()*2);
  if(array.length == 0){
    text("Roses are red", 300, 250);
    text("This word has no rhymes", 300, 350);
    text("Pick another word, and", 300, 450);
    text("Try another time!", 300, 550);
    return;
  }
  if(roll == 0){
    text("Roses are red", 300, 250);
    text("Violets are " + input.value().toLowerCase(), 300, 350);
    text("You look like a monkey", 300, 450);
    text("And you smell like " + array[Math.floor(Math.random() * array.length)].word, 300, 550);
  }
  if(roll == 1){
    text("Roses are red", 300, 250);
    text("Violets are " + input.value().toLowerCase(), 300, 350);
    text("Sugar is sweet", 300, 450);
    text("And so is " + array[Math.floor(Math.random() * array.length)].word, 300, 550);
  }

  fill(color(Math.floor(Math.random()*55+200), Math.floor(Math.random()*90+10), Math.floor(Math.random()*90+10)))
  let max = Math.floor(Math.random()*3+3)
  for(let i = 1; i < max; i++){
    heart(Math.floor(Math.random()*30+i*(600/max)), Math.floor(Math.random()*40+60), Math.floor(Math.random()*30+60));
  }
  flower();
}


function preload() {
  font = loadFont('font.ttf');
}

function setup() {
  createCanvas(600, 800);
  rhymesList = rhymes("blue");
  background(255);
  fill(0)
	textAlign(CENTER);
  textSize(44);

  input = createInput();
  input.position(50, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(getter);
  
  greeting = createElement('h2', 'Enter an Adjective');
  greeting.position(50, 10);
	greeting.style("color", "black");
	
}

function draw() {

}