uniform float uTime;
uniform float uNoiseSize;
uniform float uNoiseOpacity;
uniform float uAspectRatio;
uniform vec3 uLightColor;
uniform float uLightDistortionSpeed;
uniform float uLightDistortionStrength;
uniform float uLightDistortionWaving;

varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
	// Format grid noise to accommodate aspect ratio
  float pixels = uNoiseSize;
  vec2 fixedUv = vec2(vUv.x * uAspectRatio, vUv.y); // Maintain aspect ratio to get perfect squares

	// Make noise with a lower resolution
  vec2 gridUv = vec2((floor(fixedUv.x * pixels) / pixels), (floor(fixedUv.y * pixels) / pixels));
  gridUv = mod(gridUv, vec2(1.)); // Repeat to fill screen
  float gridNoise = clamp(random(sin(gridUv + mod(uTime, 10.))), 0., 1.) * uNoiseOpacity;

  // Colored light - right bottom side
  float distortion = sin((vUv.x + uTime * uLightDistortionSpeed) * uLightDistortionWaving) * uLightDistortionStrength;
  float lightPos = sin((((1. - vUv.x) + vUv.y + (distortion * 0.2)) + uTime) * 2.);
  lightPos = smoothstep(0., 1.8, lightPos);
  vec3 black = vec3(0.);

  vec3 coloredLight = mix(black, uLightColor, lightPos);

  float verticalLineNoise = random(vec2(.0, vUv.y));
  verticalLineNoise = smoothstep(0.6, 1., verticalLineNoise);
  float line = smoothstep(0.97, 1., 1. - abs(vUv.x - .5));
  line = line * sin(vUv.x + vUv.y + uTime);

  gl_FragColor = vec4(mix(vec3(gridNoise), coloredLight, lightPos), 1.);
}
