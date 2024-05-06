// File: stage-lighting.js

// 初始化场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 设置摄像机位置
camera.position.set(0, 10, 30);

// 添加舞台地板
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x202020, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// 添加聚光灯
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 15, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
spotLight.intensity = 2;
spotLight.decay = 2;
spotLight.distance = 50;
spotLight.castShadow = true;
scene.add(spotLight);

// 聚光灯辅助线，用于可视化
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// 更新聚光灯位置
function updateLightPosition(mouseX, mouseY) {
    const x = (mouseX / window.innerWidth) * 2 - 1;
    const y = -(mouseY / window.innerHeight) * 2 + 1;
    spotLight.position.x = x * 20;
    spotLight.position.z = y * 20;
    spotLightHelper.update();
}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// 监听鼠标移动
document.addEventListener('mousemove', (event) => {
    updateLightPosition(event.clientX, event.clientY);
});
