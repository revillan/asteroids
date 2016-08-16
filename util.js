const Util = {
  inherits(childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;

    childClass.prototype = new Surrogate ;

    childClass.prototype.constructor = childClass;
  },

  randomVec (length) {
    let dx = Math.random() * 10 - 5;
    let dy =  Math.sqrt((length * length) - (dx * dx)) * Math.random()*2 - 1;
    return [dx, dy];
  },

  distance (pos1, pos2) {
    return Math.sqrt(((pos1[0]-pos2[0])*(pos1[0]-pos2[0])) + ((pos1[1]-pos2[1])*(pos1[1]-pos2[1])))
  }
};



module.exports = Util;
