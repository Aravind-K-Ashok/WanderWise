import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=13;
const scene = new THREE.Scene();
let bee;
const loader = new GLTFLoader();
let mixer;
loader.load('bee.glb', 
    function (gltf) {
        bee=gltf.scene;
        bee.scale.set(0.05, 0.05, 0.05);
        modelMove();
        scene.add(bee);
        

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[1]).play();
        

    }, function (xhr){},function (error){
        console.log('An error happened', error);
    }
);
const renderer = new THREE.WebGLRenderer({alpha :true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container1').appendChild(renderer.domElement);
const reRender3D=() => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.01);
}
reRender3D();
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
let arrPositionModel=[
    {
        
    id: 'id1',
    position: { x: -1.9, y: -1, z: -4 },
    rotation: { x: 0.2, y: 0.5, z: 0 }
    },
    {
        id:'pt',
       position:{x:1.5,y:-1,z:-5},
        rotation:{x:0.5,y:-0.5,z:0} 
    },
    {
        id:'wtd',
        position:{x:-1.9,y:-1,z:0},
        rotation:{x:0,y:0.5,z:0}
    },
    {
        id:'newid',
        position:{x:1.7,y:-1,z:-5},
        rotation:{x:0.5,y:-0.5,z:0} 
    },
    {
        id:'htr',
        position: { x: 1.2, y: -1, z: -3.5 },
        rotation: { x: 0.3, y: -0.6, z: 0 }
    },
    {
        id:'rec',
        position:{x:-1.8,y:-1.1,z:-.5},
        rotation:{x:0.3,y:.7,z:0}
    }

];
const modelMove=()=>{
    let currentSection = null;
    const sections = document.querySelectorAll('.section');
    sections.forEach((section)=>{
        const rect=section.getBoundingClientRect();
        if (rect.top<=window.innerHeight/3){
            currentSection=section.id
        }
    });
    let position_active=arrPositionModel.findIndex(
        val => val.id==currentSection
    );
    if (position_active>=0){
        let new_coordinates=arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease:"power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease:"power1.out"
        });
    }
}
window.addEventListener('scroll',()=>{
    if(bee){
        modelMove();
    }
}
) 
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})