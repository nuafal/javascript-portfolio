import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// Configuration Constants
const CONFIG = {
    moveSpeed: 10,
    rotationSpeed: 0.05,
    colors: {
        sphere: 0x00FF00,
        torus: 0xffff00,
        platform: 0x00ff00,
        background: 0x000000
    }
};

let camera, scene, renderer, effect, controls;
let sphere, torus, platform;
const keys = {};
const startTime = Date.now();

const init = () => {
    // 1. Scene & Camera Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.colors.background);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 500);

    // 2. Lighting
    const pLight1 = new THREE.PointLight(0xffffff, 3);
    pLight1.position.set(500, 500, 500);
    const pLight2 = new THREE.PointLight(0xffffff, 1);
    pLight2.position.set(-500, -500, -500);
    scene.add(pLight1, pLight2);

    // 3. Objects (Grouped for clarity)
    const boxGeo = new THREE.BoxGeometry(200, 200, 200);
    const boxMat = new THREE.MeshPhongMaterial({ color: CONFIG.colors.sphere, flatShading: true });
    sphere = new THREE.Mesh(boxGeo, boxMat);
    
    torus = new THREE.Mesh(
        new THREE.TorusGeometry(100, 30, 16, 100),
        new THREE.MeshPhongMaterial({ color: CONFIG.colors.torus })
    );
    torus.position.set(300, 0, 0);

    platform = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshBasicMaterial({ color: CONFIG.colors.platform, side: THREE.DoubleSide })
    );
    platform.position.y = -200;
    platform.rotation.x = -Math.PI / 2;

    scene.add(sphere, torus, platform);

    // 4. Renderer & ASCII Effect
    renderer = new THREE.WebGLRenderer();
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.className = 'ascii-canvas';

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    effect.domElement.style.color = isDarkMode ? '#08f' : '#444'; 
    effect.domElement.style.backgroundColor = isDarkMode ? '#111' : '#eee';

    document.body.appendChild(effect.domElement);

    // 5. Controls & Events
    controls = new TrackballControls(camera, effect.domElement);
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', (e) => keys[e.code] = true);
    document.addEventListener('keyup', (e) => keys[e.code] = false);

    renderer.setAnimationLoop(animate);
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
};

const handleMovement = () => {
    if (keys["ArrowUp"]) camera.position.z -= CONFIG.moveSpeed;
    if (keys["ArrowDown"]) camera.position.z += CONFIG.moveSpeed;
    if (keys["ArrowLeft"]) camera.position.x -= CONFIG.moveSpeed;
    if (keys["ArrowRight"]) camera.position.x += CONFIG.moveSpeed;
    if (keys["KeyA"]) camera.rotation.y -= CONFIG.rotationSpeed;
    if (keys["KeyD"]) camera.rotation.y += CONFIG.rotationSpeed;
};

const animate = () => {
    const elapsed = Date.now() - startTime;

    // Animations
    sphere.position.y = Math.abs(Math.sin(elapsed * 0.002)) * 150;
    sphere.rotation.x = elapsed * 0.0003;
    sphere.rotation.z = elapsed * 0.0002;

    handleMovement();
    controls.update();
    effect.render(scene, camera);
};

init();