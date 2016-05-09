var game = {
	names: ['Glass Joe', 'Little Mac', 'Von Kaiser', 'Piston Honda', 'Don Flamenco', 'Soda Popinski', 'Mr Sandman', 'King Hippo', 'Great Tiger', 'Mike Tyson'],
	pics: ['assets/images/glass.png', 'assets/images/mac.png', 'assets/images/von.png', 'assets/images/piston.png', 'assets/images/don.png', 'assets/images/soda.png', 'assets/images/sandman.png', 'assets/images/hippo.png', 'assets/images/tiger.png', 'assets/images/mike.png'];
	guesses: 12,
	wins: 0,
	losses: 0,
	correct: [],
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

	winSound: function() {
		var sound = new Audio('http://www.vgmpf.com/Wiki/images/9/97/07_-_Mike_Tyson%27s_Punch-Out%21%21_-_NES_-_You_Won.ogg');
		sound.play();
	},

	pickName: function() {
		return this.names[Math.floor(Math.random()*this.names.length)];
	},


}

var sound = new Audio('http://www.vgmpf.com/Wiki/images/2/2d/05_-_Mike_Tyson%27s_Punch-Out%21%21_-_NES_-_Boxing.ogg');
game.newGameSound();
setTimeout(function(){sound.play();}, 4000);

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
				game.correct.push(key);
				var index = lowGameName.indexOf(key);
				document.getElementById(index).innerHTML = key;
				if(lowGameName.indexOf(key, index + 1) > -1) {
					var otherIndex = lowGameName.indexOf(key, index + 1);
					game.correct.push(key);
					document.getElementById(otherIndex).innerHTML = key;
				}
				console.log(lowGameName.length);
				console.log(game.correct.length);
				if(lowGameName.length-1 === game.correct.length) {
					console.log('working');
					sound.pause();
					sound.currentTime = 0;
					game.winSound();
					game.wins++;
					game.guesses = 12;
					game.attempts = [];
					game.correct = [];
					setTimeout(function(){document.getElementById('game').innerHTML = "";}, 500);
					gameName = game.pickName();
					arrGameName = gameName.split("");
					lowGameName = gameName.toLowerCase();
					setTimeout(function(){createBoard();}, 500);
					setTimeout(function(){alert('YOU WON!!!!'); }, 500);
					setTimeout(function(){sound.play();}, 1000);

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
		sound.pause();
		sound.currentTime = 0;
		game.defeatSound();
		setTimeout(function(){alert('YOU LOST :('); }, 500);
		setTimeout(function(){sound.play();}, 1000);
		game.losses++;
		game.guesses = 12;
		game.attempts = [];
		game.correct = [];
		document.getElementById('game').innerHTML = "";
		gameName = game.pickName();
		arrGameName = gameName.split("");
		lowGameName = gameName.toLowerCase();
		createBoard();
		console.log(gameName);
	}
	var html = '<p>Turns Left: ' + game.guesses + '</p>' + 
	'<p>Guessed Letters: ' + game.attempts.join(',') + '</p>' + 
	'<p>Wins: ' + game.wins + '</p>' + 
	'<p>Losses: ' + game.losses + '</p>';

	document.querySelector('#stats').innerHTML = html;
}
