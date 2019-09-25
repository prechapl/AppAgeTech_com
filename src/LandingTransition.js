import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";

export default function LandingTransition(renderer, clearColor, toggleTransitionFunc) {
    // Initial variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    //this.clearColor = clearColor;
    // Scene & Camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    this.camera.position.z = 7.5;
    const scene = new THREE.Scene();

    // Object callback function
    const startTransition = (objectName) => {
        console.log('Objected has been clicked:' + objectName)
        toggleTransitionFunc();
    }

    // Objects
    let cubeGenerator, type, icon
    // load HDR, then Models
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_01o.hdr", function(texture) {
        cubeGenerator = new EquirectangularToCubeGenerator(texture, {
          resolution: 5000
        });

        cubeGenerator.update(renderer);

        const pmremGenerator = new PMREMGenerator(
            cubeGenerator.renderTarget.texture
        );
        pmremGenerator.update(renderer);
        const pmremCubeUVPacker = new PMREMCubeUVPacker(
            pmremGenerator.cubeLods
        );
        pmremCubeUVPacker.update(renderer);

        const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        // Models
        new GLTFLoader()
            .setPath("/models/")
            .load("Logo_Type_Large_2.glb", function(gltf) {
                gltf.scene.traverse(function(child) {
                    if (child.isMesh) {
                    type = child;
                    console.log("type ", type);
                    child.material = new THREE.MeshStandardMaterial({
                        envMap: envMap,
                        envMapIntensity: 2,
                        color: 0x000000,
                        metalness: 1,
                        roughness: 0.2
                    });
                    }
                });
            type.callback = () => startTransition('Type');
            scene.add(gltf.scene);
            });

        new GLTFLoader()
            .setPath("/models/")
            .load("Logo_Icon_Large.glb", function(gltf) {
                gltf.scene.traverse(function(child) {
                    if (child.isMesh) {
                    icon = child;
                    child.material = new THREE.MeshStandardMaterial({
                        envMap: envMap,
                        envMapIntensity: 0.9,
                        // emissive: 0x9af8fb,
                        // emissiveIntensity: 0.1,
                        color: 0xfddf73,
                        metalness: 1,
                        roughness: 0.1
                    });
                    }
                });
            icon.callback = () => startTransition('Icon');
            scene.add(gltf.scene);
            });
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        // scene.background = cubeGenerator.renderTarget;
        scene.background = new THREE.Color(0x000000);
    });

    this.removeLandingMouseDown = () => {
        document.removeEventListener('mousedown', onDocumentMouseDown, false);
    }

    // Document functions --> should be moved to parent component
    const onDocumentMouseDown = event => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        let intersects = raycaster.intersectObjects([icon], true);
        if (intersects.length > 0) {
            if (intersects[0].object.callback) {
                intersects[0].object.callback();
                this.removeLandingMouseDown();
            }
        }
    }
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    const starForge = () => {
        var starQty = 800000;
        const starGeometry = new THREE.SphereGeometry(200, 10, 10);
    
        const materialOptions = {
          size: 0.06, //I know this is the default, it's for you.  Play with it if you want.
          transparency: true,
          opacity: 0.7
        };
    
        const starStuff = new THREE.PointCloudMaterial(materialOptions);
    
        for (var i = 0; i < starQty; i++) {
          var starVertex = new THREE.Vector3();
          starVertex.x = Math.random() * 200 - 100;
          starVertex.y = Math.random() * 200 - 100;
          starVertex.z = Math.random() * 100 - 100;
    
          starGeometry.vertices.push(starVertex);
        }
    
        const stars = new THREE.PointCloud(starGeometry, starStuff);
        scene.add(stars);
    };
    starForge();

    this.render = function ( rtt ) {
        if (icon && type) {
            icon.rotation.y += 0.009;
            type.rotation.y += 0.009;
        }
        renderer.render( scene, this.camera );
    }
};
