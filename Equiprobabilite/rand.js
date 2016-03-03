// Création d'un tableau rempli de valeurs aléatoires
rands = [];
for(var a = 0; a < 999999; a++){
	rands.push(Math.floor(Math.random() * 10));
}
rands.sort();

// Compter combien de fois apparaît une valeur
var xTimes = [];
var current = null;
var count = 0;
for(var i = 0; i < rands.length; i++){
	if(rands[i] != current){
		if(count > 0){
			xTimes[current.toString()] = count;
		}
		current = rands[i];
		count = 1;
	}else{
		count++;
	}
}
if(count > 0){
	xTimes[current.toString()] = count;
}

// Générer le graphique
var data = {
	labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	datasets: [
		{
			fillColor: "rgba(255, 0, 0, 0.5)",
			data: xTimes
		}
	]
};
var ctx = document.getElementById("chart").getContext("2d");
var myNewChart = new Chart(ctx).Bar(data);
