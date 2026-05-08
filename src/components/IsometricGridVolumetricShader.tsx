import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_vignetteIntensity;
uniform float u_dustMotesIntensity;

varying vec2 vUv;

#define TILING_FACTOR 3.0
#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash1(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec3 sdgBox(vec2 p, vec2 b) {
  vec2 w = abs(p) - b;
  float gDist = max(w.x, w.y);
  float s = (w.x > 0.0 && w.y > 0.0) ? length(w) : (w.x > w.y ? w.x : w.y);
  if (gDist < 0.0) gDist = s;
  vec2 ipos = vec2(
    p.x > 0.0 ? abs(s - w.x) : 0.0,
    p.y > 0.0 ? abs(s - w.y) : 0.0
  );
  if (s == 0.0) return vec3(gDist, 0.0, 0.0);
  vec2 grad = vec2(
    p.x > 0.0 ? 1.0 : -1.0,
    p.y > 0.0 ? 1.0 : -1.0
  ) * ipos / length(ipos).xxyy;
  return vec3(gDist, grad.x, grad.y);
}

vec3 sdgCircle(vec2 p, float r) {
  float d = length(p) - r;
  if (length(p) > 0.0001) {
    return vec3(d, normalize(p));
  }
  return vec3(-r, 0.0, 0.0);
}

vec3 sdgLine(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  vec2 pa = p - a;
  float h = clamp(dot(pa, ab) / dot(ab, ab), 0.0, 1.0);
  vec2 q = pa - ab * h;
  float d = length(q);
  if (d > 0.0001) {
    return vec3(d, q / d);
  }
  return vec3(0.0, 0.0, 0.0);
}

int getStage(float t) {
  float s0 = 0.0;
  float s1 = 4.0;
  float s2 = 8.0;
  float s3 = 10.0;
  float s4 = 12.0;
  float s5 = 14.0;
  float s6 = 16.0;
  int st = 0;
  if (t >= s1) st = 1;
  if (t >= s2) st = 2;
  if (t >= s3) st = 3;
  if (t >= s4) st = 4;
  if (t >= s5) st = 5;
  if (t >= s6) st = 6;
  return st;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);

  float aspect = u_resolution.x / u_resolution.y;
  float globalScale = 0.05 + 0.05 * (0.5 + 0.5 * sin(u_time * 0.2));

  float centerX = sin(u_time * 0.3) * 0.1;
  float centerY = cos(u_time * 0.25) * 0.08;

  vec2 mouseOffset = -(u_mouse - 0.5) * 0.15;
  centerX += mouseOffset.x;
  centerY += mouseOffset.y;

  vec2 p = uv - vec2(centerX, centerY);

  float t = u_time;
  int animStage = getStage(t);

  float angle = PI * 0.25 + sin(t * 0.15) * PI * 0.1;
  vec2 ax1 = vec2(cos(angle), sin(angle));
  vec2 ax2 = vec2(cos(angle + PI * 0.5), sin(angle + PI * 0.5));

  vec2 gridP = vec2(dot(p, ax1), dot(p, ax2)) / globalScale;

  vec2 tileId = floor(gridP / TILING_FACTOR);
  vec2 tileCoord = gridP - tileId * TILING_FACTOR;

  float h0 = hash(tileId * 73.156);
  float h1 = hash(tileId * 127.843 + 3.7);

  float cDist = 1e9;
  vec2 cGrad = vec2(0.0);
  float edgeWidth = 0.04;
  float glowWidth = 0.08;
  float glowIntensity = 0.0;
  float edgeIntensity = 0.0;
  float featureType = 0.0;
  float animDelay = h1 * 2.0;
  float localT = max(0.0, t - animDelay);
  float bounce = exp(-localT * 2.0) * sin(localT * 6.0) * 0.4;

  if (animStage == 0 || animStage == 1 || animStage == 6) {
    float circleR = 0.35 + 0.05 * bounce;
    cDist = sdgCircle(tileCoord - vec2(1.5, 1.5), circleR).x;
    featureType = 0.0;
  } else if (animStage == 2 || animStage == 3) {
    float innerScale = 0.2 + 0.1 * sin(localT * 1.5 + h0 * TAU);
    float scale = 0.8 + innerScale;
    vec3 c1 = sdgBox(tileCoord - vec2(1.5, 1.5), vec2(scale * 0.5));
    vec3 c2 = sdgBox(tileCoord - vec2(1.5, 1.5), vec2(scale * 0.5 - 0.12));
    cDist = max(c1.x, -c2.x);
    featureType = 1.0;
  } else if (animStage == 4 || animStage == 5) {
    float lParam = clamp(0.3 + 0.4 * bounce, 0.0, 1.0);
    float boxOff = lParam * 0.6;
    vec2 lCoord = tileCoord - vec2(1.5, 1.5);
    float lAngle = t * 0.5 + h0 * TAU;
    vec2 rotL = rot2(lAngle) * lCoord;
    vec3 l0 = sdgLine(rotL, vec2(-boxOff, 0.0), vec2(boxOff, 0.0));
    vec3 l1 = sdgLine(rotL, vec2(0.0, -boxOff), vec2(0.0, boxOff));
    vec3 l2 = sdgLine(rotL, vec2(-boxOff, -boxOff), vec2(boxOff, boxOff));
    cDist = min(l0.x, min(l1.x, l2.x));
    featureType = 2.0;
  }

  float glowFade = clamp(localT * 0.8, 0.0, 1.0) * clamp((16.0 - localT) * 0.5, 0.0, 1.0);

  if (featureType == 0.0) {
    glowWidth = 0.1;
    edgeWidth = 0.02;
  }
  if (featureType == 1.0) {
    glowWidth = 0.05;
    edgeWidth = 0.03;
  }
  if (featureType == 2.0) {
    glowWidth = 0.06;
    edgeWidth = 0.025;
  }

  glowIntensity = exp(-abs(cDist) / max(glowWidth, 0.001)) * glowFade;
  edgeIntensity = exp(-abs(cDist) / max(edgeWidth, 0.001)) * glowFade;

  vec3 bgCol = vec3(0.03, 0.03, 0.03);
  vec3 col = bgCol;

  float accentHue = mod(h0 * 0.15 + t * 0.02, 1.0);
  float accentSat = 0.05 + 0.05 * sin(h0 * TAU);
  float accentBri = 0.6;

  vec3 accentCol = vec3(
    accentBri * (1.0 + accentSat * (cos(accentHue * TAU) - 1.0) * 0.5),
    accentBri * (1.0 + accentSat * (cos((accentHue - 0.333) * TAU) - 1.0) * 0.5),
    accentBri * (1.0 + accentSat * (cos((accentHue - 0.667) * TAU) - 1.0) * 0.5)
  );
  col += accentCol * glowIntensity * 0.2;

  float dust = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 dustOffset = vec2(
      hash1(fi * 13.7 + 1.0) * TAU,
      hash1(fi * 29.3 + 5.0) * TAU
    ) * 3.0;
    vec2 dustCoord = (gl_FragCoord.xy + dustOffset) * 1.5;
    float dustTime = t * (0.3 + fi * 0.1);
    float dustNoise = noise(dustCoord * 0.01 + dustTime);
    dust += dustNoise * (0.25 - fi * 0.04);
  }
  dust = clamp(dust, 0.0, 1.0);

  vec2 vigUV = uv * vec2(1.0, 1.0);
  float vig = 1.0 - dot(vigUV, vigUV) * u_vignetteIntensity;
  vig = clamp(vig, 0.0, 1.0);

  col += vec3(0.7, 0.7, 0.7) * dust * u_dustMotesIntensity * 0.15;
  col *= 0.5 + 0.5 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function IsometricGridVolumetricShader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const heroTextSpans = document.querySelectorAll('.hero-title span');
    void heroTextSpans;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0.5, 0.5);

    const uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: mouse },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_vignetteIntensity: { value: 1.2 },
      u_dustMotesIntensity: { value: 0.4 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight;
    }

    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.x = window.innerWidth;
      material.uniforms.u_resolution.value.y = window.innerHeight;
    }

    function animate() {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value = performance.now() * 0.001;
      renderer.render(scene, camera);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000',
      }}
    />
  );
}
