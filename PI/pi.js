// Mise en place du graphique
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var ctx = document.getElementById('canvas').getContext("2d");
ctx.strokeRect(0, 0, 600, 600);
ctx.arc(0, 0, 600, 0, Math.PI*2);
ctx.stroke();

// Initialisation des variables
var iterations = 0;
var perIterations = 10000;
var inside = 0;
var pi = 0;

// Cette fonction est délenchée + de 30x/sec et se base sur les résultats obtenus précédemment
// ainsi la précision des déciamles de PI s'améliore
function recursive(){
	
	iterations++;

	for(var i = 0 ; i < perIterations ; i++){
	
		// On tire un couple (x,y), si il est dans le cercle on incrémente la variable inside
		var randx = Math.random();
		var randy = Math.random();

		if(Math.pow(randx, 2) + Math.pow(randy, 2) <= 1){
			inside++;
			ctx.fillStyle = "rgba(0, 0, 255, .2)";
		}else{
			ctx.fillStyle = "silver";
		}
		ctx.fillRect(Math.round(randx*600), Math.round(randy*600), 1, 1);

	}
	
	// On "calcule" pi
	pi = inside / (perIterations * iterations) * 4;
	
	// On actualise les valeurs sur la page
	document.querySelector("#iterations").textContent = iterations + " > " + (perIterations * iterations);
	document.querySelector("#pi").textContent = pi;
	
	// On relance la fonction dès que le navigateur le permet (environ 30x/sec)
	window.requestAnimationFrame(recursive);

}

// On relance la fonction dès que le navigateur le permet (environ 30x/sec)
window.requestAnimationFrame(recursive);
