var symbolSize = 26;
var streams = [];

function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	var x = 0;
	for (var i = 9; i<= width/symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x, random(-1000,0));
		streams.push(stream);
		x += symbolSize;
	}
}

function draw() {
	background(0, 80);
	streams.forEach(function(stream) {
		stream.render();
	});

}

function Symbol(x, y, speed, first) {
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2,20));
	this.first = first;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval ==0){
			this.value = String.fromCharCode(
			  0x30A0 + round(random(0,96))
			);
		}
	}

	this.rain = function() {

		this.y = (this.y >= height) ? 0 : this.y+= this.speed;
	}
}

function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(5,30));
	this.speed = random(5,15);

	this.generateSymbols = function(x,y) {
		var first = round(random(0,3)) == 1;
		for (var i = 0; i <= this.totalSymbols; i++) {
			symbol = new Symbol(x, y, this.speed, first);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}
	}
	this.render = function() {
		this.symbols.forEach(function(symbol) {
			if(symbol.first) {
				fill(200,255,200);
				textSize(30);
			} else {
				fill(0,255,70);
				textSize(symbolSize);
		  }
			text(symbol.value,symbol.x,symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		})
	}
}
