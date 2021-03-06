﻿// Création d'un tableau rempli de valeurs aléatoires
var rands = [];
var reper = [];
var labels = [];

for(var a = 0; a < 300; a++){
	rands[a] = (Math.floor(Math.random() * 2));
	labels[a] = '';
	reper[a] = 0;
}

// Compter les proportions
var prop = [];
var somme = 0;
for(var i = 0 ; i < rands.length ; i++){

	for(var j = 0 ; j < (i + 1) ; j++){
		if(rands[j] == 1){
			somme += 1;
		}else{
			somme -= 1;
		}
	
	}

	prop[i] = somme / (i + 1) * 100;
	somme = 0;
}

// Générer un graphique
var data = {
	labels: labels,
	datasets: [
		{
			strokeColor: "rgba(255, 0, 0, 0.5)",
			fillColor: "rgba(0, 0, 0, 0)",
			data: reper,
			
		},
		{
			strokeColor: "rgba(0, 0, 0, 0.5)",
			data: prop,
		}
	]
}
var options = {
	showXLabels: 10,
	scaleOverride : true,
	scaleSteps : 10,
	scaleStepWidth : 20,
	scaleStartValue : -100,
	animation : false,
	datasetStrokeWidth : 5,
	pointDot : false,
	showTooltips: false,

}
var ctx = document.getElementById("chart").getContext("2d");
var myNewChart = new Chart(ctx).Line(data, options);
