

var carrierTask = {
  assign: function(creep) {
      if (!creep) {
          return;
      }
      if (creep.store[RESOURCE_ENERGY] == 0) { /*creep.store.getFreeCapacity() > 0*/
          creep.say("pickup");
          let sources = creep.room.find(FIND_DROPPED_RESOURCES);
          let source = null;
          for (let i in sources) {
              if (sources[i].amount > 200) {
                  source = sources[i];
              }
          }
          if (!source) {
              source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: function(structure) { return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500}
              });
              
              if (source) {
                  if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(source);
                  }
              }
              else {
              // source = Game.getObjectById("6260a715313abb3d0ad84d08");
                  creep.moveTo(new RoomPosition(28, 1, "E57N56"));
              }
          }
          else {
              if(creep.pickup(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(source);
              }   
          }
      }
      else {
          creep.say("transfer");
          let target = creep.pos.findClosestByRange(FIND_STRUCTURES, { 
              filter: function (structure) {
                  return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
              }
          });
          if (!target) {
              target = Game.getObjectById("6260353bb369a7088a8a6d8f");
          }
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
          }
      }
  }
};


module.exports = carrierTask;
