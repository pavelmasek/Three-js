var light;
var wireframe = false;

var textures = [{
	name: "rock",
	diffuse: "img/textures/rock-texture_DIFFUSE.png",
	normal: "img/textures/rock-texture_NORMAL.png",
	disp: "img/textures/rock-texture_DISP.png",
	specular: "img/textures/rock-texture_SPEC.png"
},{
	name: "brick",
	diffuse: "img/textures/brick-texture_DIFFUSE.png",
	normal: "img/textures/brick-texture_NORMAL.png",
	disp: "img/textures/brick-texture_DISP.png",
	specular: "img/textures/brick-texture_SPEC.png"
},{
	name: "metal",
	diffuse: "img/textures/metal-texture_DIFFUSE.png",
	normal: "img/textures/metal-texture_NORMAL.png",
	disp: "img/textures/metal-texture_DISP.png",
	specular: "img/textures/metal-texture_SPEC.png"
}]
var textureType = textures[1];
var textureMode = 1;

function createObject(){


	var geometry = new t.PlaneGeometry(2, 2, 100, 100);

	var texture = setTexture(textureType.diffuse);

	var normalTexture = setTexture(textureType.normal);

	var heightTexture = setTexture(textureType.disp);

	var specTexture = setTexture(textureType.specular)

	var resolution = new t.Vector2(window.innerWidth, window.innerHeight);

	light = {
		position: new t.Vector3(5,5,5),
		color: new t.Color(0xffffff)
	}

	

	var uniforms1 = {
		"vLight": { type: 'v3', value: light.position},
		"vLightColor": {type: 'c', value: light.color},
		"texture": { type: 't', value: texture},
		"normalTexture": {type: 't', value: normalTexture},
		"heightTexture": {type: 't', value: heightTexture},
		"specTexture": {type: 't', value: specTexture},
		"camPosition": {type: 'v3', value: camera.position},
		"textureMode": {type: 'f', value: textureMode}
	}

	var attributes = {
		"pi": {type: 'f', value: Math.PI}
	};

	var material = new t.ShaderMaterial({
		uniforms: uniforms1,
		vertexShader: document.getElementById('vertexShaderCartesian').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
		attributes: attributes,
		wireframe: wireframe,
		side: t.DoubleSide
	})
	return new t.Mesh(geometry, material);
}

function setTexture(texturePath){
	var texture = new t.ImageUtils.loadTexture(texturePath);
	texture.wrapS = textureWrapT = t.RepeatWrapping;
	texture.repeat.set(0.5,0.5);
	return texture;
}