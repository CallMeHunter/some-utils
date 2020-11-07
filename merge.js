/**
 * 
 * @param {Object} target JSON Object
 * @param {Object} missing JSON flatten Object
 */
export function mergeMissingToTarget (target, missing) {

  for(let key in missing) {
    const keyPaths = key.split('.')
    keyPaths.reduce((obj, path, index) => {
      if (index === keyPaths.length - 1) {
        obj[path] = missing[key]
      } else if (obj[path] === undefined) {
        obj[path] = {}
      }
      return obj[path]
    }, target)
  }
  return target
}
