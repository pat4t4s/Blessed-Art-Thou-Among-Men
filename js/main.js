import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container3D");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    camera.position.z = 25;

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    let objectPivot;
    const loader = new GLTFLoader();
    loader.load("/Blessed-Art-Thou-Among-Men/scene/webScene.gltf", (gltf) => {
        const object = gltf.scene;
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;

        const size = box.getSize(new THREE.Vector3());
        object.scale.set(5, 5, 5);

        objectPivot = new THREE.Object3D();
        objectPivot.add(object);
        scene.add(objectPivot);
    });

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    const baseX = -20;
    const baseY = 15;
    const baseZ = 150;

    function animate() {
        requestAnimationFrame(animate);
        if (objectPivot) {
            camera.position.x += (baseX + mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (baseY - mouseY * 5 - camera.position.y) * 0.05;
            camera.position.z = baseZ;
            camera.lookAt(65, 2, 0);
        }
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    onWindowResize();
    window.addEventListener("resize", onWindowResize);

    animate();
});