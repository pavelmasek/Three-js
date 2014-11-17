function guiInit(){
	//GUI START
	var gui = new dat.GUI();

	var guiParameters = {
		x: 0
	};

	var coordinatesFolder = gui.addFolder("Coordinates");
	coordinatesFolder.add({x: 0}, 'x').onChange(function(value){
		shape.position.x = value;
	});
	coordinatesFolder.add({y: 0}, 'y').onChange(function(value){
		shape.position.y = value;
	});
	coordinatesFolder.add({z: 0}, 'z').onChange(function(value){
		shape.position.z = value;
	});
	coordinatesFolder.open();
	
	var textureOption = gui.add({texture: 'brick'}, 'texture', ['brick', 'metal', 'rock']).listen();
	textureOption.onChange(function(value){
		switch(value){
			case "brick": 
				textureType = textures[1];
				changeTexture(textureType);
				break;
			case "metal": 
				textureType = textures[2];
				changeTexture(textureType);
				break;
			case "rock": 
				textureType = textures[0];
				changeTexture(textureType);
				break;
			default:
				console.log('default texture'); 	
		}
	});

	// var wireFrame = gui.add(wireframe,'wireframe');

	var shapeOption = gui.add({shape: 'tube'}, 'shape', ['tube', 'other']).listen();
	shapeOption.onChange(function(value){
		switch(value){
			case "tube": 
				shape.material.vertexShader = document.getElementById('vertexShader').textContent;
				shape.material.fragmentShader = document.getElementById('fragmentShader').textContent;
				shape.material.needsUpdate = true;
				break;
			case "other":
				shape.material.vertexShader = document.getElementById('vertexShader2').textContent;
				shape.material.fragmentShader = document.getElementById('fragmentShader').textContent;
				shape.material.needsUpdate = true;
				break;
			case "other":
				shape.material.vertexShader = document.getElementById('vertexShader2').textContent;
				shape.material.fragmentShader = document.getElementById('fragmentShader').textContent;
				shape.material.needsUpdate = true;
				break;
			default: 
				console.log('default');
		}
	});

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

	function changeTexture(textureType){
		shape.material.uniforms.texture.value = setTexture(textureType.diffuse);
		shape.material.uniforms.normalTexture.value = setTexture(textureType.normal);
		shape.material.uniforms.heightTexture.value = setTexture(textureType.height);
	}

	//GUI END
}