//
export let useTweaksDisable = (name, props) => {
  let o = {}

  o._name = name
  for (let kn in props) {
    o[kn] = props[kn].value
  }
  return o
}
