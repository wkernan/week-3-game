var game = {
	names: ['Glass Joe', 'Little Mac', 'Von Kaiser', 'Piston Honda', 'Don Flamenco', 'King Hippo', 'Great Tiger', 'Mike Tyson'],
	guesses: 12,
	wins: 0,
	losses: 0,
	attempts: [],
	gameOver: false,


	newGameSound: function() {
		var sound = new Audio('http://www.vgmpf.com/Wiki/images/b/b3/04_-_Mike_Tyson%27s_Punch-Out%21%21_-_NES_-_Round_Start.ogg');
		sound.play();
	},

	hitSound: function() {
		var sound = new Audio('assets/images/hit.mp3');
		sound.play();
	},

	missSound: function() {
		var sound = new Audio('assets/images/miss.mp3');
		sound.play();
	},

	defeatSound: function() {
		var sound = new Audio('assets/images/defeat.mp3');
		sound.play();
	},

	pickName: function() {
		return this.names[Math.floor(Math.random()*this.names.length)];
	},


}

game.newGameSound();

var gameName = game.pickName();
var arrGameName = gameName.split("");
var lowGameName = gameName.toLowerCase();
console.log(arrGameName);

function createBoard() {
	for(i=0; i<arrGameName.length; i++) {
		if(arrGameName[i] === " ") {
			letterList = "<li style='border-bottom:none;margin:0 15px 0 15px' id='" + i + "'>" + arrGameName[i] + "</li>";
			document.getElementById('game').innerHTML += letterList; 
		} else {
			letterList = "<li id='" + i + "'></li>";
			document.getElementById('game').innerHTML += letterList;
		}
	}
}

function findLetters(str) {

}

createBoard();
console.log(gameName);

document.onkeyup = function(event) {
	var key = String.fromCharCode(event.keyCode).toLowerCase();

	if(event.keyCode > 64 && event.keyCode < 91) {
		if(game.attempts.indexOf(key) === -1) {
			if(lowGameName.indexOf(key) > -1) {
				game.hitSound();
				game.attempts.push(key);
				var index = lowGameName.indexOf(key);
				document.getElementById(index).innerHTML = key;
				if(lowGameName.indexOf(key, index + 1) > -1) {
					var otherIndex = lowGameName.indexOf(key, index + 1);
					document.getElementById(otherIndex).innerHTML = key;
				}
				console.log(index);
			} else {
				game.missSound();
				game.attempts.push(key);
				game.guesses--;
			}
			console.log(game.guesses);
			console.log(game.attempts);
		}
	}
	if(game.guesses === 0) {
		game.defeatSound();
		game.losses++;
		game.guesses = 12;
		game.attempts = [];
		document.getElementById('game').innerHTML = "";
		gameName = game.pickName();
		arrGameName = gameName.split("");
		lowGameName = gameName.toLowerCase();
		createBoard();
		console.log(gameName);
	}
	var html = '<p>Turns Left: ' + game.guesses + '</p>' + 
	'<p>Guesses: ' + game.attempts.join(',') + '</p>' + 
	'<p>Wins: ' + game.wins + '</p>' + 
	'<p>Losses: ' + game.losses + '</p>';

	document.querySelector('#stats').innerHTML = html;
}
