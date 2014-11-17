function guiInit(){
	//GUI START
	var gui = new dat.GUI();

	var guiParameters = {
		x: 0
	};

	var coordinatesFolder = gui.addFolder("Coordinates");
	coordinatesFolder.add({x: 0}, 'x').onChange(function(value){
		objectPosition.x = value;
	});
	coordinatesFolder.add({y: 0}, 'y');
	coordinatesFolder.add({z: 0}, 'z');
	coordinatesFolder.open();
	
	var textureOption = gui.add({texture: 'metal'}, 'texture', ['brick', 'metal', 'rock']).listen();
	textureOption.onChange(function(value){
		switch(value){
			case "brick": 
				textureType = textures[1];
				break;
			case "metal": 
				textureType = textures[2];
				break;
			case "rock": 
				textureType = textures[0];
				break;
			default:
				console.log('default texture'); 	
		}
	});

	// var wireFrame = gui.add(wireframe,'wireframe');

	var lightPosition = gui.addFolder("Light position");
	lightPosition.add({x: 5}, 'x').onChange(function(value){
		light.position.x = value;
	});
	lightPosition.add({y: 5}, 'y').onChange(function(value){
		light.position.y = value;
	});
	lightPosition.add({z: 5}, 'z').onChange(function(value){
		light.position.z = value;
	});
	lightPosition.open();

	var cubeColor = gui.addColor({color: "#ffffff"}, 'color');
	cubeColor.onChange(function(value){
		light.color = value;
	});

	gui.open();

	//GUI END
}