var game = {
	names: [['Glass Joe', 'assets/images/glass.png'], ['Little Mac', 'assets/images/mac.png'], ['Von Kaiser', 'assets/images/von.png'], ['Piston Honda', 'assets/images/piston.png'], ['Don Flamenco', 'assets/images/don.png'], ['Soda Popinski', 'assets/images/soda.png'], ['Mr Sandman', 'assets/images/sandman.png'], ['King Hippo', 'assets/images/hippo.png'], ['Great Tiger', 'assets/images/tiger.png'], ['Mike Tyson', 'assets/images/mike.png']],
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
		var sound = new Audio('assets/sounds/hit.wav');
		sound.play();
	},

	missSound: function() {
		var sound = new Audio('assets/sounds/miss.wav');
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
		return [Math.floor(Math.random()*this.names.length)];
	},


}

var fightSound = new Audio('assets/sounds/fight.wav');
var sound = new Audio('http://www.vgmpf.com/Wiki/images/2/2d/05_-_Mike_Tyson%27s_Punch-Out%21%21_-_NES_-_Boxing.ogg'); 
game.newGameSound(); //start music on load up
//setTimeout(function(){sound.play();}, 4000);// wait 4s and then play the background theme

var fighter = game.pickName();//pick an index from fighter.length
var gameName = game.names[fighter][0];//pick fighter name given index
var picture = game.names[fighter][1];//pick fighter picture given index
var arrGameName = gameName.split("");//split fighter name into array
var lowGameName = gameName.toLowerCase();//make all letters in fighter name lowercase

function createBoard() {//create game board function, based on name chosen
	for(i=0; i<arrGameName.length; i++) {
		if(arrGameName[i] === " ") {//check if there is a blank space in array, if so run statement
			letterList = "<li style='border-bottom:none;margin:0 15px 0 15px' id='" + i + "'>" + arrGameName[i] + "</li>";//add <li> and class for blank space with id=i
			document.getElementById('game').innerHTML += letterList; 
		} else {//if not black space add <li> with id=i
			letterList = "<li id='" + i + "'></li>";
			document.getElementById('game').innerHTML += letterList;
		}
	}
}

createBoard();//create game board

document.onkeyup = function(event) {//on keyup function
	var key = String.fromCharCode(event.keyCode).toLowerCase();//turn event of key into lowercase

	if(event.keyCode > 64 && event.keyCode < 91) {//check for only letter keys
		if(sound.currentTime === 0) {//start theme music on first click
			setTimeout(function(){sound.play();}, 1000);
		} else if(sound.ended === true) {//check if theme music has ended, if so play again
			sound.play();
		}
		if(fightSound.currentTime === 0) {
			fightSound.play();
		}
		if(game.attempts.indexOf(key) === -1) {//if attempts array does not contain letter chosen then continue
			if(lowGameName.indexOf(key) > -1) {//if letter chosen is part of fighter name continue
				game.hitSound();
				game.attempts.push(key);//push letter into attempts array
				game.correct.push(key);//push letter into correct letters array
				var index = lowGameName.indexOf(key);//check for double letters by setting index equal to place where first letter appeared
				document.getElementById(index).innerHTML = key;//add letter in html using id
				if(lowGameName.indexOf(key, index + 1) > -1) {//check for same letter in fighter name. Since all fighter names only have 2 max of same letter just do once.
					var otherIndex = lowGameName.indexOf(key, index + 1);//find other index of same letter
					game.correct.push(key);//also add same letter to correct since I'm using .length to check for a win
					document.getElementById(otherIndex).innerHTML = key;//add same letter in html using id
				}
				if(lowGameName.length-1 === game.correct.length) {//check for win. Since each name only has 1 space check lowGameName.length agains correct.length-1
					document.getElementById('you').innerHTML = "YOU";
					document.getElementById('win-lose').innerHTML = "WIN!!";//tell user they won html
					sound.pause();//pause theme music
					sound.currentTime = 0;//set time back to 0
					fightSound.currentTime = 0;
					game.winSound();//play win music
					document.getElementById('win-img').src = picture;//change picture to fighter 
					game.wins++;//increment wins by 1
					game.guesses = 12;//reset guesses
					game.attempts = [];//reset attempts array
					game.correct = [];//reset correct array
					setTimeout(function(){document.getElementById('game').innerHTML = "";}, 3000);//wait 1s and clear board html
					fighter = game.pickName();//pick new random fighter
					gameName = game.names[fighter][0];
					picture = game.names[fighter][1];
					arrGameName = gameName.split("");
					lowGameName = gameName.toLowerCase();
					setTimeout(function(){createBoard();}, 4000);//recreate board
					//setTimeout(function(){sound.play();}, 5000);//restart theme music

				}
			} else {                           //if user picks wrong letter, run this
				game.missSound();              //play miss sound
				game.attempts.push(key);       //add missed letter to attempts array
				game.guesses--;                //increment guesses down 1
			}
		}
	}
	if(game.guesses === 0) {//if user runs out of guesses, loses
		sound.pause();//stop theme music
		sound.currentTime = 0;//reset theme music
		fightSound.currentTime = 0;
		game.defeatSound();//play defeat sound
		document.getElementById('you').innerHTML = "YOU";//display they lose
		document.getElementById('win-lose').innerHTML = "LOSE";
		//setTimeout(function(){sound.play();}, 6000);
		game.losses++;//increment loses up 1
		game.guesses = 12;//reset guesses
		game.attempts = [];//reset attempt array
		game.correct = [];//reset correct array
		document.getElementById('game').innerHTML = "";//clear html of #game
		fighter = game.pickName();//choose fighter index
		gameName = game.names[fighter][0];//name of fighter
		picture = game.names[fighter][1];//pic of fighter
		arrGameName = gameName.split("");//make array
		lowGameName = gameName.toLowerCase();//lowercase the array
		setTimeout(function(){createBoard();}, 5000);//make board after 2s
	}
	var html = '<p>Turns Left: ' + game.guesses + '</p>' +       //html to display once user clicks and updates with clicks
	'<p>Guessed Letters: ' + game.attempts.join(',') + '</p>' + 
	'<p>Wins: ' + game.wins + '</p>' + 
	'<p>Losses: ' + game.losses + '</p>';

	document.querySelector('#stats').innerHTML = html;
}
