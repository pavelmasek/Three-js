function guiInit(){
	//GUI START
	var gui = new dat.GUI();

	var guiParameters = {
		x: 0
	};

	var coordinatesFolder = gui.addFolder("Coordinates");
	coordinatesFolder.add({x: 0}, 'x');
	coordinatesFolder.add({y: 0}, 'y');
	coordinatesFolder.add({z: 0}, 'z');
	coordinatesFolder.open();
	var functionFolder = gui.addFolder("Function");
	functionFolder.add({func: 'sothers'}, 'func');
	functionFolder.open();

	var cubeColor = gui.addColor({color: "#ff0000"}, 'color');
	cubeColor.onChange(function(value){
		console.log('change')
	});

	gui.open();

	//GUI END
}