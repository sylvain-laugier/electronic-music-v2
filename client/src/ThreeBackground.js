import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

const helper = {
  easeInOutQuint: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
};
export default class ThreeBackground extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(),
      cameraPosition: new THREE.Vector3(0, 0, 3),
      counter: 120,
    };


    this.onAnimate = () => {
      // we will get this callback every frame      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      if (this.props.transitionFromHome && this.props.counterHome < this.state.counter) {
        this.props.incrementCountHome();
        const x = this.props.counterHome / this.state.counter;
        const speed = helper.easeInOutQuint(x) - helper.easeInOutQuint(x - 0.01);
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x - speed,
            0,
            0,
          ),
        });
      }

    /*this.setState({
      cameraPosition: new THREE.Vector3(0, 0, this.state.cameraPosition.z += 0.01),
    });*/

    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const style = {
      position: 'absolute',
      zIndex: -10,
      top: '0px',
    };

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      onAnimate={this.onAnimate}
      canvasStyle={style}
    >
      <scene >
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.state.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <planeGeometry
            width={100}
            height={100}
            widthSegments={150}
            heightSegments={150}
          />
          <meshBasicMaterial
            color={0xFB00EE}
            wireframe
          />
        </mesh>
      </scene>
    </React3>);
  }
}
