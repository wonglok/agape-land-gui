import {
  EventDispatcher,
  Matrix4,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from 'three'

import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { Plane as DRPlane } from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { useEffect } from 'react'
// import { BoxGeometry, InstancedMesh } from 'three'
// import { BoxBufferGeometry } from 'three'
import { TorusKnotGeometry } from 'three'
import { Color } from 'three'
import { SphereGeometry } from 'three'
// import { MeshStandardMaterial } from 'three'
// import { MeshBasicMaterial } from 'three'
import { MeshPhysicalMaterial } from 'three'
import { Object3D } from 'three'
import { InstancedMesh } from 'three'
import { MeshNormalMaterial } from 'three'
import { BoxGeometry } from 'three'
import { CylinderGeometry } from 'three'
// import ThreeRenderObjects from 'three-render-objects'
// import SpriteText from 'three-spritetext'

export function DirectForceGraph({}) {
  let glb = useGLBLoader(`/scene/2023-01-07-skycity/taipei101.glb`)
  let [root, setO3D] = useState(null)

  /** @type {[import('three-forcegraph').default, () =>{}]} */
  let [myGraph, setMyGraph] = useState()
  useEffect(() => {
    import('three-forcegraph').then((v) => {
      setMyGraph(() => {
        return new v.default()
      })
    })
  }, [])

  useFrame(() => {
    if (myGraph) {
      myGraph?.tickFrame()
      myGraph
        .d3AlphaTarget(0.2) // release engine low intensity
        .resetCountdown()
    }
  })

  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)
  let controls = useThree((s) => s.controls)
  useEffect(() => {
    if (!myGraph) {
      return
    }
    if (!controls) {
      return
    }

    const N = 200
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({
        id: i,
        connection: 1,
        size: 15,
        color: '#' + new Color('#ffffff').getHexString(),
      })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => {
          return {
            color: '#000000',
            source: id,
            target: Math.round(Math.random() * (id - 1)),
          }
        }),
    }

    gData.nodes.forEach((it) => {
      it.connection = gData.links.filter((e) => e.target === it.id).length || 1
      it.size = gData.links.filter((e) => e.target === it.id).length || 1
      it.size = Math.pow(it.size, 0.6)
      // if (it.size <= 1.5) {
      //   it.size = 1.5
      // }
      // if (it.size >= 7) {
      //   it.size = 7
      // }
      it.size *= 5.5
    })

    myGraph.graphData(gData)

    myGraph.linkColor('color')
    myGraph.linkOpacity(0.5)
    myGraph.linkWidth(0.5)

    // myGraph.nodeRelSize(15)
    // myGraph.dagLevelDistance(20)

    // myGraph.linkDirectionalParticles(1)
    // myGraph.linkDirectionalParticleSpeed(10)
    // myGraph.linkDirectionalParticleWidth(5)
    // myGraph.linkDirectionalParticleColor(0xfffff)
    // myGraph.linkDirectionalParticleResolution(3)
    // myGraph.dagMode('zin')

    myGraph.numDimensions(2)

    let resetDAG = () => {
      // myGraph.dagMode(DagMode)
      myGraph.d3ReheatSimulation()
    }

    let colorMap = new Map()
    let getMat = ({ color }) => {
      if (colorMap.has(color)) {
        colorMap.get(color)
      }

      let mat = new MeshPhysicalMaterial({
        //
        // color: new Color(color),
        color: new Color(color),
        reflectivity: 0,
        roughness: 0.3,
        metalness: 0.0,
        transmission: 1,
        thickness: 3,
        ior: 1.5,
        attenuationColor: new Color(color),
        attenuationDistance: 2,
      })

      colorMap.set(color, mat)

      return mat
    }

    let o3d = new Object3D()

    let sphere = new SphereGeometry(1, 32, 32)

    sphere.scale(1, 1, 1)

    let torus = new TorusKnotGeometry(1, 0.15, 150, 45, 5, 3)
    torus.scale(0.6, 0.6, 4.0)
    torus.translate(0, 0, 4.0 / 2)

    let box = new CylinderGeometry(0.4, 0.4, 10, 32, 32, false)
    box.rotateX(Math.PI * -0.5)
    box.translate(0, 0, 10 / 2)

    let glbGeo = false
    let glbMat = false
    glb.scene.traverse((it) => {
      if (!glbGeo) {
        if (it.geometry) {
          glbGeo = it.geometry.clone()
          glbGeo.center()
          glbGeo.computeBoundingSphere()
          glbGeo.rotateX(Math.PI * 0.5)
          glbGeo.translate(0, 0, glbGeo.boundingSphere.radius)
          glbGeo.scale(0.1, 0.1, 0.1)
          glbGeo.rotateZ(Math.PI * 0.25 * 0.0)
          glbMat = new MeshPhysicalMaterial({
            map: it.material.map,
            normalMap: it.material.normalMap,
            roughness: 0,
            transmission: 1,
            thickness: 3,
            ior: 1.4,
          })
        }
      }
    })

    let sphere2 = new SphereGeometry(10, 32, 32)
    let iMesh = new InstancedMesh(
      sphere2,
      new MeshNormalMaterial(),
      gData.nodes.length
    )
    iMesh.count = gData.nodes.length
    let i = 0
    myGraph.nodeThreeObjectExtend((it) => {
      if (it.__threeObj) {
        if (it.connection >= 4) {
          it.__threeObj.geometry = glbGeo
          it.__threeObj.material = glbMat

          it.__threeObj.geometry = box
        } else if (it.connection >= 3) {
          it.__threeObj.geometry = torus
          it.__threeObj.material = getMat({ color: '#00ffcc' })
        } else {
          it.__threeObj.geometry = sphere
          it.__threeObj.material = getMat({ color: '#00ffcc' })
        }

        if (it.__threeObj) {
          iMesh.setMatrixAt(i, it.__threeObj.matrix)
        }
        i++
        i = i % iMesh.count

        //!SECTION
        it.__threeObj.scale.setScalar(it.size)
        it.__threeObj.__data = it
        it.__threeObj.visible = true
      }
      return it
    })

    //

    let cleanDrag = () => {}

    setupDragContorls({
      state: {
        enableNavigationControls: true,
        forceGraph: myGraph,
        onNodeDragStart: (node) => {
          //
        },
        onNodeDrag: (node, translate) => {
          //
        },
        onNodeDragEnd: (node, translate) => {
          //
          resetDAG()
        },
      },
      camera,
      renderer: gl,
      controls,
      graphData: gData,
    }).then(({ clean }) => {
      cleanDrag()
      cleanDrag = clean
    })

    o3d.add(myGraph)

    window.addEventListener('focus', resetDAG)
    window.addEventListener('blur', resetDAG)

    setO3D(<primitive object={o3d}></primitive>)

    return () => {
      myGraph.nodeThreeObjectExtend((it) => {
        if (it.__threeObj) {
          delete it.__threeObj.it
        }

        return it
      })

      //
      console.log('dispose')
      window.removeEventListener('focus', resetDAG)
      window.removeEventListener('blur', resetDAG)
      cleanDrag()
      controls.enabled = true

      // cancelAnimationFrame(rAFID)
    }
  }, [camera, controls, gl, glb.scene, myGraph])

  return (
    <>
      <group>
        <DRPlane
          ref={(item) => {
            setInterval(() => {
              item?.lookAt(camera.position)
            })
          }}
          onPointerOut={(ev) => {
            controls.enabled = true
            document.body.style.cursor = ''
          }}
          onPointerOver={(ev) => {
            controls.enabled = true
            document.body.style.cursor = 'grab'
          }}
          scale={10000000}
          visible={false}
        ></DRPlane>
      </group>
      <group
        onPointerEnter={(ev) => {}}
        onPointerOut={(ev) => {
          controls.enabled = true
          document.body.style.cursor = ''
        }}
        onPointerOver={(ev) => {
          controls.enabled = true
          document.body.style.cursor = 'grab'
        }}
        onPointerDown={(ev) => {
          controls.enabled = false
          document.body.style.cursor = 'move'
          document.body.style.cursor = ''
        }}
      >
        {root}
      </group>
    </>
  )
}

function getGraphObj(object) {
  let obj = object
  // recurse up object chain until finding the graph object
  while (obj && !obj.hasOwnProperty('__data')) {
    obj = obj.parent
  }
  return obj
}

async function setupDragContorls({
  graphData,
  state,
  camera,
  renderer,
  controls,
}) {
  let gtr = {
    get items() {
      return graphData.nodes.map((node) => node.__threeObj).filter((obj) => obj)
    },
  }

  let clean = () => {}

  await new Promise((resolve) => {
    //!SECTION reject

    let tt = setInterval(() => {
      if (gtr.items.length > 0) {
        clearInterval(tt)
        resolve()
      }
    })
  })

  //!SECTION

  let dragControls = new DragControls(gtr.items, camera, renderer.domElement)
  dragControls.addEventListener('dragstart', function (event) {
    // track drag object movement
    event.object.__initialPos = event.object.position.clone()
    event.object.__prevPos = event.object.position.clone()

    const node = getGraphObj(event.object).__data
    !node.__initialFixedPos &&
      (node.__initialFixedPos = { fx: node.fx, fy: node.fy, fz: node.fz })
    !node.__initialPos &&
      (node.__initialPos = { x: node.x, y: node.y, z: node.z })

    // lock node
    ;['x', 'y', 'z'].forEach((c) => (node[`f${c}`] = node[c]))

    // drag cursor
    // renderer.domElement.classList.add('grabbable')

    state.onNodeDragStart(node, event.object.position)

    // controls.enabled = false // Disable controls while dragging

    // setTimeout(() => {
    //   controls.enabled = true // Disable controls while dragging
    // })
  })

  // let ttR = 0
  // dragControls.addEventListener('hoveron', () => {
  //   controls.enabled = true
  // })
  // dragControls.addEventListener('hoveroff', () => {
  //   controls.enabled = true
  // })
  dragControls.addEventListener('drag', function (event) {
    const nodeObj = getGraphObj(event.object)

    if (!event.object.hasOwnProperty('__data')) {
      // If dragging a child of the node, update the node object instead
      const initPos = event.object.__initialPos
      const prevPos = event.object.__prevPos
      const newPos = event.object.position

      nodeObj.position.add(newPos.clone().sub(prevPos)) // translate node object by the motion delta
      prevPos.copy(newPos)
      newPos.copy(initPos) // reset child back to its initial position
    }

    const node = nodeObj.__data
    const newPos = nodeObj.position
    const translate = {
      x: newPos.x - node.x,
      y: newPos.y - node.y,
      z: newPos.z - node.z,
    }
    // Move fx/fy/fz (and x/y/z) of nodes based on object new position
    ;['x', 'y', 'z'].forEach((c) => (node[`f${c}`] = node[c] = newPos[c]))

    state.forceGraph
      .d3AlphaTarget(0.3) // keep engine running at low intensity throughout drag
      .resetCountdown() // prevent freeze while dragging

    node.__dragged = true
    state.onNodeDrag(node, translate)
  })

  dragControls.addEventListener('dragend', function (event) {
    controls.enabled = true

    delete event.object.__initialPos // remove tracking attributes
    delete event.object.__prevPos

    const node = getGraphObj(event.object).__data

    // dispose previous controls if needed
    if (node.__disposeControlsAfterDrag) {
      dragControls.dispose()
      delete node.__disposeControlsAfterDrag
    }

    const initFixedPos = node.__initialFixedPos
    const initPos = node.__initialPos
    const translate = {
      x: initPos.x - node.x,
      y: initPos.y - node.y,
      z: initPos.z - node.z,
    }
    if (initFixedPos) {
      ;['x', 'y', 'z'].forEach((c) => {
        const fc = `f${c}`
        if (initFixedPos[fc] === undefined) {
          delete node[fc]
        }
      })
      delete node.__initialFixedPos
      delete node.__initialPos
      if (node.__dragged) {
        delete node.__dragged
        state.onNodeDragEnd(node, translate)
      }
    }

    //

    state.forceGraph
      .d3AlphaTarget(0.4) // release engine low intensity
      .resetCountdown() // let the engine readjust after releasing fixed nodes
    // controls.enabled = true
    // clearInterval(ttR)
    // ttR = setTimeout(() => {
    //   controls.enabled = true
    // }, 10)
    //
    // if (state.enableNavigationControls) {
    //   controls.enabled = true // Re-enable controls
    //   controls.domElement &&
    //     controls.domElement.ownerDocument &&
    //     controls.domElement.ownerDocument.dispatchEvent(
    //       // simulate mouseup to ensure the controls don't take over after dragend
    //       new PointerEvent('pointerup', { pointerType: 'touch' })
    //     )
    // }

    // clear cursor
    // renderer.domElement.classList.remove('grabbable')
  })

  return {
    clean,
  }
}

const _plane = new Plane()
const _raycaster = new Raycaster()

const _pointer = new Vector2()
const _offset = new Vector3()
const _intersection = new Vector3()
const _worldPosition = new Vector3()
const _inverseMatrix = new Matrix4()

class DragControls extends EventDispatcher {
  constructor(_objects, _camera, _domElement) {
    super()

    _domElement.style.touchAction = 'none' // disable touch scroll

    let _selected = null,
      _hovered = null

    const _intersections = []

    //

    const scope = this

    function activate() {
      _domElement.addEventListener('pointermove', onPointerMove)
      _domElement.addEventListener('pointerdown', onPointerDown)
      _domElement.addEventListener('pointerup', onPointerCancel)
      _domElement.addEventListener('pointerleave', onPointerCancel)
    }

    function deactivate() {
      _domElement.removeEventListener('pointermove', onPointerMove)
      _domElement.removeEventListener('pointerdown', onPointerDown)
      _domElement.removeEventListener('pointerup', onPointerCancel)
      _domElement.removeEventListener('pointerleave', onPointerCancel)

      _domElement.style.cursor = ''
    }

    function dispose() {
      deactivate()
    }

    function getObjects() {
      return _objects
    }

    function getRaycaster() {
      return _raycaster
    }

    let yUp = new Vector3(0, 1, 0)
    function onPointerMove(event) {
      if (scope.enabled === false) return

      updatePointer(event)

      _raycaster.setFromCamera(_pointer, _camera)

      if (_selected) {
        if (_raycaster.ray.intersectPlane(_plane, _intersection)) {
          _selected.position.copy(
            _intersection.sub(_offset).applyMatrix4(_inverseMatrix)
          )
        }

        scope.dispatchEvent({ type: 'drag', object: _selected })

        return
      }

      // hover support

      if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
        _intersections.length = 0

        _raycaster.setFromCamera(_pointer, _camera)
        _raycaster.intersectObjects(_objects, true, _intersections)

        if (_intersections.length > 0) {
          const object = _intersections[0].object

          // _plane.setFromNormalAndCoplanarPoint(
          //   _camera.getWorldDirection(_plane.normal),
          //   _worldPosition.setFromMatrixPosition(object.matrixWorld)
          // )

          // lok
          _plane.normal.copy(yUp)
          _plane.setFromNormalAndCoplanarPoint(
            yUp,
            _worldPosition.setFromMatrixPosition(object.matrixWorld)
          )

          if (_hovered !== object && _hovered !== null) {
            scope.dispatchEvent({ type: 'hoveroff', object: _hovered })

            _domElement.style.cursor = 'auto'
            _hovered = null
          }

          if (_hovered !== object) {
            scope.dispatchEvent({ type: 'hoveron', object: object })

            _domElement.style.cursor = 'pointer'
            _hovered = object
          }
        } else {
          if (_hovered !== null) {
            scope.dispatchEvent({ type: 'hoveroff', object: _hovered })

            _domElement.style.cursor = 'auto'
            _hovered = null
          }
        }
      }
    }

    function onPointerDown(event) {
      if (scope.enabled === false) return

      updatePointer(event)

      _intersections.length = 0

      _raycaster.setFromCamera(_pointer, _camera)
      _raycaster.intersectObjects(_objects, true, _intersections)

      if (_intersections.length > 0) {
        _selected =
          scope.transformGroup === true ? _objects[0] : _intersections[0].object

        // _plane.setFromNormalAndCoplanarPoint(
        //   _camera.getWorldDirection(_plane.normal),
        //   _worldPosition.setFromMatrixPosition(_selected.matrixWorld)
        // )

        // _plane.setFromNormalAndCoplanarPoint(
        //   _camera.getWorldDirection(_plane.normal),
        //   _worldPosition.setFromMatrixPosition(_selected.matrixWorld)
        // )

        // lok
        _plane.normal.copy(yUp)
        _plane.setFromNormalAndCoplanarPoint(
          yUp,
          _worldPosition.setFromMatrixPosition(_selected.matrixWorld)
        )

        if (_selected && _selected.parent) {
          if (_raycaster.ray.intersectPlane(_plane, _intersection)) {
            _inverseMatrix.copy(_selected.parent.matrixWorld).invert()
            _offset
              .copy(_intersection)
              .sub(_worldPosition.setFromMatrixPosition(_selected.matrixWorld))
          }
        }

        _domElement.style.cursor = 'move'

        scope.dispatchEvent({ type: 'dragstart', object: _selected })
      }
    }

    function onPointerCancel() {
      if (scope.enabled === false) return

      if (_selected) {
        scope.dispatchEvent({ type: 'dragend', object: _selected })

        _selected = null
      }

      _domElement.style.cursor = _hovered ? 'pointer' : 'auto'
    }

    function updatePointer(event) {
      const rect = _domElement.getBoundingClientRect()

      _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      _pointer.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
    }

    activate()

    // API

    this.enabled = true
    this.transformGroup = false

    this.activate = activate
    this.deactivate = deactivate
    this.dispose = dispose
    this.getObjects = getObjects
    this.getRaycaster = getRaycaster
  }
}
