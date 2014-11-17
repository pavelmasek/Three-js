var light;
var wireframe = false;

var textures = [{
	name: "rock",
	diffuse: "img/textures/rock-texture_DIFFUSE.png",
	normal: "img/textures/rock-texture_NORMAL.png",
	disp: "img/textures/rock-texture_DISP.png"
},{
	name: "brick",
	diffuse: "img/textures/brick-texture_DIFFUSE.png",
	normal: "img/textures/brick-texture_NORMAL.png",
	disp: "img/textures/brick-texture_DISP.png"
},{
	name: "metal",
	diffuse: "img/textures/metal-texture_DIFFUSE.png",
	normal: "img/textures/metal-texture_NORMAL.png",
	disp: "img/textures/metal-texture_DISP.png"
}]
var textureType = textures[1];
var objectPosition = t.Vector3(0, 0, 0);

function createObject(){


	var geometry = new t.PlaneGeometry(2, 2, 50, 50);
	geometry.verticesNeedUpdate = true;
	geometry.position = objectPosition;

	var texture = new t.ImageUtils.loadTexture(textureType.diffuse);
	texture.wrapS = textureWrapT = t.RepeatWrapping;

	var normalTexture = new t.ImageUtils.loadTexture(textureType.normal);
	normalTexture.wrapS = textureWrapT = t.RepeatWrapping;

	var heightTexture = new t.ImageUtils.loadTexture(textureType.disp);
	heightTexture.wrapS = textureWrapT = t.RepeatWrapping;

	var resolution = new t.Vector2(window.innerWidth, window.innerHeight);

	light = {
		position: new t.Vector3(5,5,5),
		color: new t.Color(0xffffff)
	}

	var sphere = new t.Mesh(new t.SphereGeometry(2, 32, 32), new t.MeshNormalMaterial({ 
		color: light.color,
		autoUpdate: true 
	}));
	sphere.position.set(light.position);
	scene.add(sphere);

	var uniforms1 = {
		"vLight": { type: 'v3', value: light.position},
		"vLightColor": {type: 'c', value: light.color},
		"texture": { type: 't', value: texture},
		"normalTexture": {type: 't', value: normalTexture},
		"heightTexture": {type: 't', value: heightTexture},
		"resolution": {type: 'v2', value: resolution }
	}

	var attributes = {
		"pi": {type: 'f', value: Math.PI},
		// "width": {type: 'f', value: geometry.width},
		// "triangleNumber": {type: 'f', value: geometry.widthSegments}
	};

	var material = new t.ShaderMaterial({
		uniforms: uniforms1,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
		attributes: attributes,
		wireframe: wireframe,
		side: t.DoubleSide,
		autoUpdate: true
	})
	return new t.Mesh(geometry, material);
}