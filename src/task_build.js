
var runBuildingTask = function (creep) {
  if (creep.store[RESOURCE_ENERGY] == 0) {
      creep.say("fetch");
      if (creep.withdraw(Game.spawns["Nowhere"], RESOURCE_ENERGY) != 0) {
          creep.moveTo(Game.spawns["Nowhere"]);
      }
  }
  else {
      let targets = creep.room.find(FIND_STRUCTURES, {
          filter: function (structure) { return structure.hits < structure.hitsMax && structure.hits < 100000; }
      });
      
      targets.sort((a,b) => a.hits - b.hits);
      
      if (targets.length > 0) {
          creep.say("repair");
          if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
      }
      else {
          target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
          if (target) {
              creep.say("construct");
              if (creep.build(target) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
          }
          else {
              // creep.say("no nothing");
              creep.moveTo(new RoomPosition(1, 43, "E57N60"));
          }
      }
  }
};

module.exports = runBuildingTask;