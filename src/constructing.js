
const CONSTRUCTING = 0;
const TRANSFERING = 1;

var constructing = {
    assignTask: function(creep) {
        creep.memory.state = 0;
        if (!creep) {
            return;
        }
        
        if (creep.memory.state == CONSTRUCTING && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = TRANSFERING;
        }
        if (creep.memory.state == TRANSFERING && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = CONSTRUCTING;
        }
        
        
        switch (creep.memory.state) {
            case CONSTRUCTING:
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
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
                    // let target = Game.getObjectById("6260535fc59df2a2540266b7");
                    if (target) {
                        creep.say("construct");
                        if (creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        creep.say("no nothing");
                        creep.moveTo(34, 43);
                    }
                }
                break;
                
            case TRANSFERING:
                creep.say("sourcing");
                let source = Game.getObjectById("6260353bb369a7088a8a6d8f");
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
                break;
        }
    }
};


module.exports = constructing;
