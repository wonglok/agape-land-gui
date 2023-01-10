import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { Html, Plane } from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { useEffect } from 'react'
import { BoxGeometry, InstancedMesh } from 'three'
import { BoxBufferGeometry } from 'three'
import { TorusKnotGeometry } from 'three'
import { Color } from 'three'
import { SphereGeometry } from 'three'
// import { MeshStandardMaterial } from 'three'
// import { MeshBasicMaterial } from 'three'
import { MeshPhysicalMaterial } from 'three'
import { Object3D } from 'three'
import { DragControls } from 'three-stdlib'
// import ThreeRenderObjects from 'three-render-objects'
// import SpriteText from 'three-spritetext'

export function DirectForceGraph({}) {
  let glb = useGLBLoader(`/scene/2023-01-07-skycity/flower-geoonly.glb`)
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
    myGraph?.tickFrame()
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

    //
    // Gen random data
    const N = 150
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({
        id: i,
        size: 15,
        color: '#' + new Color('#ffffff').getHexString(),
      })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => {
          return {
            color: '#ffffff',
            source: id,
            target: Math.round(Math.random() * (id - 1)),
          }
        }),
    }

    gData.nodes.forEach((it) => {
      it.size = gData.links.filter((e) => e.target === it.id).length || 1
      it.size = Math.pow(it.size, 1.1)
      if (it.size <= 2) {
        it.size = 2
      }
      if (it.size >= 5) {
        it.size = 5
      }
      it.size *= 3
    })

    myGraph.graphData(gData)
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
        color: new Color('#ffffff'),
        reflectivity: 1,
        roughness: 0.3,
        metalness: 0.01,
        transmission: 1,
        thickness: 2.5,
        ior: 1.4,
        attenuationColor: new Color('#00ffff'),
        attenuationDistance: 1,
      })

      colorMap.set(color, mat)

      return mat
    }

    let o3d = new Object3D()

    let sphere = new SphereGeometry(1, 32, 32)
    // let torus = new TorusKnotGeometry(1, 0.2, 150, 45, 1, 4)
    let box = new BoxGeometry(2, 2, 2)

    // sphere.translate(0, 0, 0.3)

    let iGeo = sphere

    let array = []

    glb.scene.traverse((it) => {
      //

      if (it.geometry) {
        array.push(it)
        // it.geometry.computeBoundingBox()
        // iGeo = it.geometry.clone()
        // iGeo.rotateX(Math.PI * 0.5)
        // iGeo.scale(0.15, 0.15, 0.15)
        // iGeo.translate(0, 0, 0.8)
        // iMat = it.material
      }
    })

    let inst = new InstancedMesh(
      box,
      getMat({ color: '#ffffff' }),
      array.length
    )
    inst.count = array.length

    let rAFID = 0
    let temp3 = new Object3D()

    let rAF = () => {
      rAFID = requestAnimationFrame(rAF)

      array.forEach((item, i) => {
        if (item) {
          item.getWorldPosition(temp3.position)
          item.getWorldQuaternion(temp3.quaternion)
          item.getWorldScale(temp3.scale)

          temp3.updateMatrix()
          inst.setMatrixAt(i, temp3.matrix)
        }
      })

      inst.instanceMatrix.needsUpdate = true
    }
    rAFID = requestAnimationFrame(rAF)

    o3d.add(inst)

    myGraph.nodeThreeObjectExtend((it) => {
      if (it.__threeObj) {
        it.__threeObj.material = getMat({ color: it.color })
        it.__threeObj.geometry = iGeo

        //!SECTION
        it.__threeObj.scale.setScalar(it.size)
        // it.__threeObj.scale.setScalar(20)
        it.__threeObj.__data = it
        it.__threeObj.visible = true
      }

      return it
    })

    //

    //
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
      window.removeEventListener('focus', resetDAG)
      window.removeEventListener('blur', resetDAG)
      cleanDrag()
      controls.enabled = true
      console.log('dispose')
      cancelAnimationFrame(rAFID)
    }
  }, [camera, controls, gl, glb.scene, myGraph])

  return (
    <>
      <group>
        <Plane
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
        ></Plane>
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
