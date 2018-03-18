import React from 'react';
import React3 from 'react-three-renderer';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const helper = {
  easeInOutQuint: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
};
export default class ThreeBackground extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(0, 0, 0),
      cameraPosition: new THREE.Vector3(0, 0, 3),
      counter: 120,
      counterHome: 0,
      rotationComplete: false,
    };

    this.incrementCountHome = () => {
      this.setState(prevState => ({
        counterHome: prevState.counterHome + 1,
      }));
    };

    this.onAnimate = () => {
      // we will get this callback every frame      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      if (this.props.transitionFromHome && this.state.counterHome < this.state.counter) {
        this.incrementCountHome();
        const x = this.state.counterHome / this.state.counter;
        const speed = helper.easeInOutQuint(x) - helper.easeInOutQuint(x - 0.01);
        this.setState({
          cubeRotation: new THREE.Euler(
            this.state.cubeRotation.x - speed,
            0,
            0,
          ),
        });
      } else if (this.props.transitionFromHome) {
        if (!this.state.rotationComplete) {
          this.setState(prevState => ({
            rotationComplete: !prevState.rotationComplete,
          }));
        }
        if (this.state.cameraPosition.z < -15) {
          this.setState({
            cameraPosition: new THREE.Vector3(0, 0, 3),
          });
        } else {
          this.setState(prevState => ({
            cameraPosition: new THREE.Vector3(
              0, prevState.cameraPosition.y + (0.0003825 * 2),
              prevState.cameraPosition.z - 0.002,
            ),
          }));
        }
      }
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
        {/* }
        <mesh
          rotation={this.state.cubeRotation}
          position={new THREE.Vector3(-5,20,-50)}
        >
          <sphereGeometry
          radius={5}
          widthSegments={32}
          heightSegments={32}
        />
          <meshBasicMaterial
            color={0xEF642D}
          />
        </mesh>*/}
      </scene>
    </React3>);
  }
}

ThreeBackground.propTypes = {
  transitionFromHome: PropTypes.bool.isRequired,
};
