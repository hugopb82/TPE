function terrain(size, roughness){
	this.size = Math.pow(2, size) + 1;
	this.roughness = roughness;
	this.textures = {
		water: {
			start: {
				r: 0,
				g: 0,
				b: 255,
			},
			end: {
				r: 0,
				g: 255,
				b: 255,
			}
		},
		sand: {
			start: {
				r: 255,
				g: 100,
				b: 0,
			},
			end: {
				r: 255,
				g: 255,
				b: 0,
			}
		},
		grass: {
			start: {
				r: 0,
				g: 255,
				b: 0,
			},
			end: {
				r: 50,
				g: 150,
				b: 50,
			}
		},
		stone: {
			start: {
				r: 90,
				g: 90,
				b: 90,
			},
			end: {
				r: 180,
				g: 180,
				b: 180,
			}
		}
	};
	
	this.map;

	this.generate = function(){
		this.map = create2DArray(this.size, this.size);

		
		var tl 	= this.map[0][0] 							= Math.random();
		var tr 	= this.map[this.size - 1][0] 				= Math.random();
		var bl	= this.map[0][this.size - 1] 				= Math.random();
		var br 	= this.map[this.size - 1][this.size - 1]	= Math.random();

		var c 	= this.map[(this.size - 1) / 2][(this.size - 1) / 2] = this.height((tl + tr + bl + br) / 4);

		var tc	= this.map[(this.size - 1) / 2][0] 					= this.height((tl + tr + c) / 3);
		var lc	= this.map[0][(this.size - 1) / 2] 					= this.height((tl + bl + c) / 3);
		var rc	= this.map[(this.size - 1)][(this.size - 1) / 2] 	= this.height((tr + br + c) / 3);
		var bc	= this.map[(this.size - 1) / 2][this.size - 1]		= this.height((bl + br + c) / 3);

		var dimension = (this.size - 1) / 2;
		while(dimension > 1){

			for(var i = dimension ; i < this.size ; i += dimension){
				for(var j = dimension ; j < this.size ; j += dimension){
					
					var x = i - (dimension / 2);
					var y = j - (dimension / 2);

					var tl = this.map[i][j - dimension];
					var tr = this.map[i - dimension][j - dimension];
					var bl = this.map[i - dimension][j];
					var br = this.map[i][j];

					var c 	= this.map[x][y] = this.height((tl + tr + bl + br) / 4);

					var tc	= this.map[x][y - (dimension / 2)] = this.height((tl + tr + c) / 3);
					var lc	= this.map[x - (dimension / 2)][y] = this.height((tl + bl + c) / 3);
					var rc	= this.map[x + (dimension / 2)][y] = this.height((tr + br + c) / 3);
					var bc	= this.map[x][y + (dimension / 2)] = this.height((bl + br + c) / 3);
				}
			}

			dimension /= 2;
		}
	}

	this.draw = function(canvas){
		canvas.width = this.size;
		canvas.height = this.size;
		var ctx = canvas.getContext('2d');

		for(var i = 0 ; i < this.size ; i++){
			for(var j = 0 ; j < this.size ; j++){
				var height = this.map[i][j];
				if(height == 1){
					ctx.fillStyle = "rgb(255,255,255)";
				}else if(height > 0.8){
					ctx.fillStyle = this.texture(height / 0.3, 10, this.textures.stone);
				}else if(height > 0.4){
					ctx.fillStyle = this.texture((height - 0.4) / 0.40, 20, this.textures.grass);
				}else if(height > 0.3){
					ctx.fillStyle = "rgb(255,255,0)";
				}else{
					ctx.fillStyle = this.texture(height / 0.3, 10, this.textures.water);
				}
				//ctx.fillStyle = "rgba(0,0,0," + Math.round(this.map[i][j] * 10) / 10 + ")";
				ctx.fillRect(i, j, 1, 1);
			}
		}
	}

	/* Return a pseudo-random height based on the average of the corners */
	this.height = function(average){
		return Math.max(Math.min(average + (Math.random() * this.roughness * 2) - this.roughness, 1), 0);
	}

	this.texture = function(step, steps, texture){
		var step = step * steps;
		var r = Math.round(texture.start.r + (texture.end.r - texture.start.r) * step / steps);
		var g = Math.round(texture.start.g + (texture.end.g - texture.start.g) * step / steps);
		var b = Math.round(texture.start.b + (texture.end.b - texture.start.b) * step / steps);
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}
var map = new terrain(8, 0.3);
map.generate();
map.draw(document.getElementById('map'));