function createObject(){

	var geometry = new t.PlaneGeometry(2, 2, 20, 20);

	var texture = new t.ImageUtils.loadTexture("img/textures/rock.jpg");
	texture.wrapS = textureWrapT = t.RepeatWrapping;

	var normalTexture = new t.ImageUtils.loadTexture("img/textures/rock-normal.png")
	normalTexture.wrapS = textureWrapT = t.RepeatWrapping;

	var resolution = new t.Vector2(window.innerWidth, window.innerHeight);

	var uniforms1 = {
		"vLight": { type: 'v3', value: light.position},
		"vLightColor": {type: 'c', value: light.color},
		"texture1": { type: 't', value: texture},
		"normalTexture": {type: 't', value: normalTexture},
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
		wireframe: false,
		side: t.DoubleSide,
		lights: false
	})
	return new t.Mesh(geometry, material);
}