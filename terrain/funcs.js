function create2DArray(size1, size2){
	var array = new Array(size1);
	
	for(var i = 0 ; i < size1 ; i++){
		array[i] = new Array(size2);
	}

	for(var i = 0 ; i < size1 ; i++){
		for(var j = 0 ; j < size2 ; j++){
			array[i][j] = 0;
		}
	}

	return array;
}