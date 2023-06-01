import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {View, ViewProps} from 'react-native';
import {
  EngineView,
  EngineViewCallbacks,
  useEngine,
} from '@babylonjs/react-native';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader';
import {Camera} from '@babylonjs/core/Cameras/camera';
import '@babylonjs/loaders/glTF';
import {Scene} from '@babylonjs/core/scene';
import {HemisphericLight, UniversalCamera, Vector3} from '@babylonjs/core';

const EngineScreen: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();
  const [scene, setScene] = useState<Scene>();
  const [engineViewCallbacks, setEngineViewCallbacks] =
    useState<EngineViewCallbacks>();

  useEffect(() => {
    if (engine) {
      console.log('Engine - Launch  ');

      console.log('GLTF is loaded from static server - started from app.tsx');
      let url = `http://192.168.4.109:8080/blend_seperated2.gltf`;

      console.log(url);
      SceneLoader.loggingLevel = SceneLoader.DETAILED_LOGGING;

      const loader = SceneLoader.LoadAsync(url, null, engine).then(
        scene => {
          console.log('GLTF Loaded - ');

          setScene(scene);

          scene.createDefaultLight(true);
          const light = new HemisphericLight(
            'light',
            new Vector3(1, 0.35, 0),
            scene,
          );
          light.intensity = 0.5;

          light.direction = new Vector3(0, -1, 0);

          const camera = new UniversalCamera(
            'UniversalCamera',
            new Vector3(448, 135.29, 434),
            scene,
          );

          camera.rotation = new Vector3(-0.2, -65, 0);
          camera.setTarget(Vector3.Zero());
          camera.fov = 1.25;
          camera.inertia = 0.5;
          camera.speed = 20;
          camera.angularSensibility = 2000;
          camera.touchAngularSensibility = 5000;
          camera.touchMoveSensibility = 500;
          camera.applyGravity = true;
          camera.ellipsoid = new Vector3(25, 67, 25);
          camera.checkCollisions = true;
          camera.attachControl(scene, true);

          scene.collisionsEnabled = true;

          setCamera(scene.activeCamera!);

          console.log('Loop over material');
          // Each mesh has a material with the file path in it. if the file does not exist the GLTFLoader will error however, they do not show in the Scene
          scene.materials.forEach(mat => {
            console.log(mat);
          });

          const collisonArray = scene.meshes.filter((element, index, array) => {
            return (
              element.id.toLowerCase().includes('shelf') ||
              element.id.toLowerCase().includes('floor') ||
              element.id.toLowerCase().includes('closet') ||
              element.id.toLowerCase().includes('wall') ||
              element.id.toLowerCase().includes('entry') ||
              element.id.toLowerCase().includes('ceiling') ||
              element.id.toLowerCase().includes('door') ||
              element.id.toLowerCase().includes('window') ||
              element.id.toLowerCase().includes('base')
            );
          });

          collisonArray.forEach(function (mesh) {
            mesh.checkCollisions = true;
          });
        },
        data => {
          console.log('|||||||| ERROR |||||||||');
          console.log(data);
        },
      )! as any;
    }
  }, [engine]);

  const onInitialized = useCallback(
    async (engineViewCallbacks: EngineViewCallbacks) => {
      setEngineViewCallbacks(engineViewCallbacks);
    },
    [engine],
  );

  return (
    <>
      <View style={props.style}>
        <View style={{flex: 1}}>
          <EngineView
            camera={camera}
            onInitialized={onInitialized}
            displayFrameRate={true}
          />
        </View>
      </View>
    </>
  );
};

export default EngineScreen;
