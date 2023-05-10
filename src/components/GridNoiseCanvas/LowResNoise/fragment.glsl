uniform float uTime;
uniform float uNoiseSize;
uniform float uAspectRatio;
uniform float uNoiseOpacity;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	// Format grid noise to accommodate aspect ratio
  vec2 squareUv = vec2(uv.x * uAspectRatio, uv.y); // Maintain aspect ratio to get perfect squares

	// Make noise with a lower resolution
  vec2 lowResUv = vec2((floor(squareUv.x * uNoiseSize) / uNoiseSize), (floor(squareUv.y * uNoiseSize) / uNoiseSize));
  lowResUv = mod(lowResUv, vec2(1.)); // Repeat to fill screen
  float noise = clamp(random(sin(lowResUv + mod(uTime, 10.))), 0., uNoiseOpacity);

  outputColor = vec4(vec3(noise), inputColor.a);
}
