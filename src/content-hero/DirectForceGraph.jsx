import { Plane } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { useEffect } from 'react'
import { TorusKnotGeometry } from 'three'
import { SphereBufferGeometry } from 'three'
import { Color } from 'three'
import { SphereGeometry } from 'three'
// import { MeshStandardMaterial } from 'three'
// import { MeshBasicMaterial } from 'three'
import { MeshPhysicalMaterial } from 'three'
import { Object3D } from 'three'
import { DragControls } from 'three-stdlib'
// import ThreeRenderObjects from 'three-render-objects'

export function DirectForceGraph() {
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
      if (it.size <= 1.5) {
        it.size = 1.5
      }
      it.size *= 4
    })

    myGraph.graphData(gData)
    myGraph.numDimensions(2)
    myGraph.nodeRelSize(15)
    myGraph.dagLevelDistance(20)

    let DagMode = 'bu'
    // myGraph.dagMode('bu')

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
        color: new Color(color),
        reflectivity: 0.5,
        roughness: 0.3,
        metalness: 0.0,
        transmission: 1,
        thickness: 1.5,
        ior: 1.3,
        // attenuationColor: new Color(color).setHSL(0, 1, 0.6),
        // attenuationDistance: 1.5,
      })

      colorMap.set(color, mat)
      return mat
    }

    let torus = new TorusKnotGeometry(1, 0.15, 150, 45, 3, 4)
    let sphere = new SphereGeometry(1, 32, 32)
    let iGeo = sphere

    myGraph.nodeThreeObjectExtend((it) => {
      if (it.__threeObj) {
        it.__threeObj.material = getMat({ color: it.color })
        it.__threeObj.__data = it
        it.__threeObj.geometry = iGeo
        it.__threeObj.scale.setScalar(it.size)
      }

      return it
    })

    //
    let o3d = new Object3D()

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
    }
  }, [camera, controls, gl, myGraph])

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
      .d3AlphaTarget(0) // release engine low intensity
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
