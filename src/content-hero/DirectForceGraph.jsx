import { useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { useEffect } from 'react'
import { MeshBasicMaterial } from 'three'
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
    // Gen random data
    const N = 300
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    }

    myGraph.graphData(gData)

    myGraph.nodeThreeObjectExtend((it) => {
      if (it.__threeObj) {
        it.__threeObj.material = new MeshBasicMaterial({
          //
        })
        it.__threeObj.__data = it
      }

      return it
    })

    let o3d = new Object3D()

    //
    setO3D(<primitive object={o3d}></primitive>)
    //

    // let array = []
    // myGraph.traverse((it) => {
    //   if (it.geometry) {
    //     array.push(it)
    //   }
    // })

    let cleanDrag = () => {}

    setupDragContorls({
      state: {
        enableNavigationControls: true,
        forceGraph: myGraph,
        onNodeDrag: (node, translate) => {
          //
        },
        onNodeDragEnd: (node, translate) => {
          //
        },
      },
      camera,
      renderer: gl,
      controls,
      graphData: gData,
    }).then(({ clean }) => {
      cleanDrag = clean
    })

    o3d.add(myGraph)

    return () => {
      cleanDrag()
      console.log('dispose')
    }
  }, [camera, controls, gl, myGraph])
  return <>{root}</>
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

  await new Promise((resolve, reject) => {
    //!SECTION

    let tt = setInterval(() => {
      if (gtr.items.length > 0) {
        clearInterval(tt)
        resolve()
      }
    })
  })

  let dragControls = new DragControls(gtr.items, camera, renderer.domElement)

  dragControls.addEventListener('dragstart', function (event) {
    controls.enabled = false // Disable controls while dragging

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
    renderer.domElement.classList.add('grabbable')
  })

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

    state.forceGraph
      .d3AlphaTarget(0) // release engine low intensity
      .resetCountdown() // let the engine readjust after releasing fixed nodes

    controls.enabled = true
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
    renderer.domElement.classList.remove('grabbable')
  })

  return {
    clean,
  }
}
