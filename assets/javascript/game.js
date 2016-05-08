var game = {
	names: ['Glass Joe', 'Little Mac', 'Von Kaiser', 'Piston Honda', 'Don Flamenco', 'King Hippo', 'Great Tiger', 'Mike Tyson'],
	guesses: 12,
	wins: 0,
	loses: 0,
	attempts: [],

	newGameSound: function() {
		var sound = new Audio('http://www.vgmpf.com/Wiki/images/b/b3/04_-_Mike_Tyson%27s_Punch-Out%21%21_-_NES_-_Round_Start.ogg');
		sound.play();
	},

	pickName: function() {
		return this.names[Math.floor(Math.random()*this.names.length)];
	},

	checkLetter: function(name, letter) {
		var arr = name.split();
		for(var i = 0; i < arr.length; i++) {
			if(letter === name[i]) {

			}
		}
	}
}

game.newGameSound();

var gameName = game.pickName();
var arrGameName = gameName.split("");
var lowGameName = gameName.toLowerCase();
console.log(arrGameName);

for(i=0; i<arrGameName.length; i++) {
	if(arrGameName[i] === " ") {
		letterList = "<li style='border-bottom:none;margin:0 15px 0 15px' id='" + i + "'>" + arrGameName[i] + "</li>";
		document.getElementById('game').innerHTML += letterList; 
	} else {
		letterList = "<li id='" + i + "'></li>";
		document.getElementById('game').innerHTML += letterList;
	}
}

function findLetters() {
	
}

console.log(gameName);

document.onkeyup = function(event) {
	var key = String.fromCharCode(event.keyCode).toLowerCase();

	if(event.keyCode > 64 && event.keyCode < 91) {
		if(lowGameName.indexOf(key) > -1) {
			var index = lowGameName.indexOf(key);
			game.attempts.push(key);
			console.log(index);
			document.getElementById(index).innerHTML = key;
		} else {
			game.attempts.push(key);
			game.guesses--;
		}
		console.log(game.guesses);
		console.log(game.attempts);
	}
	var html = '<p>Turns Left: ' + game.guesses + '</p>' + 
	'<p>Guesses: ' + game.attempts.join(',') + '</p>';

	document.querySelector('#stats').innerHTML = html;
}