function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]"
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

export function flatArray(array, deep = 0) {
  if (deep === 0) {
    return array;
  }
  return array.reduce((result, item) => {
    if (isArray(item)) {
      result.push(...flatArray(item, deep - 1));
    } else if (isObject(item)) {
      result.push(flatObject(item, deep - 1))
    } else {
      result.push(item);
    }
    return result;
  }, [])
}

export function flatObject(originObj, deep = Infinity) {
  const copyObj = {};
  if (deep === 0) {
    Object.assign(copyObj, originObj);
  } else {
    for (const [property, value] of Object.entries(originObj)) {
      if (isObject(value)) {  // recursion if it is a object 
        const innerFlatObj = flatObject(value, deep - 1);
        Object.keys(innerFlatObj).forEach(key => copyObj[property + '.' + key] = innerFlatObj[key]);
      } else if (isArray(value)) {
        copyObj[property] = flatArray(value, deep - 1);
      } else {
        copyObj[property] = value;
      }
    }
  }
  return copyObj;
}

/* 
// test example: 
var obj = {
  a: 1,
  b: {
    c: 3,
    d: {
      e: 4,
      f: {
        g: 5,
        i: [1, 2, 3, [4, 5]]
      }
    },
    j: [1, 2, {
      k: {
        l: 'l'
      }
    }]
  },
  m: [1, 2, [3, {
    n: 'n',
    o: [1, 2, [3, 4, [5]]]
  }]],
  h: 2
};

flatObject(obj)
 */