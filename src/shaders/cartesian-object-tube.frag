varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vTest;

uniform vec3 vLight;
uniform vec4 vLightColor;
uniform sampler2D texture1;
uniform sampler2D normalTexture;
uniform vec2 resolution;

vec3 paramNormal(vec3 inPos){
	vec3 tx = vec3(2.0, 0.0, 8.0 * inPos.x);
	vec3 ty = vec3(0.0, 2.0, -8.0 * inPos.y);
	return cross(tx, ty);
}

void main() 
{
	vec3 light = normalize(vLight);
	vec3 position = paramNormal(vPosition);
	vec3 normal = paramNormal(vNormal);

	vec3 lightVec = light - position; 

	float diff = dot(normalize(vNormal), normalize(vLight));
	diff = max(0.1, diff);

	vec3 specColor = vec3(1.0, 1.0, 1.0);
	float lambertian = max(dot(vLight, vNormal), 0.0);
	float specular = 0.0;
	if(lambertian > 0.0){
		float specAngle = max(dot(reflect(-vLight, vNormal), normalize(vPosition)), 0.0);
		specular = pow(specAngle, 4.0);
	}

	vec4 rTexture = texture2D(texture1, vUv);
	vec3 rLight = lambertian + specular * specColor;

	rTexture.xyz += rLight;

	//normal mapping

	vec4 diffuseColor = texture2D(texture1, vUv);

	vec4 nTexture = texture2D(normalTexture, vUv);
	vec3 nColor = nTexture.rgb * 2.0 - 1.0;

	vec3 vLightDir = vec3(vLight.xy - (gl_FragCoord.xy / resolution.xy), vLight.z);

	vLightDir.x *= resolution.x / resolution.y;

	float D = length(vLightDir);

	vec3 N = normalize(nColor);
	vec3 L = normalize(vLightDir);

	vec3 diffuse = vLightColor.rgb * max(dot(N, L), 0.0);

	vec3 ambient = vec3(1.0, 1.0, 1.0) * (0.8);

	vec3 intensity = ambient + diffuse;
	vec3 finalColor = diffuse.rgb * intensity;

    gl_FragColor = vec4(vPosition, 0.5);
}  