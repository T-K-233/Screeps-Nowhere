
const UPGRADING = 0;
const TRANSFERING = 1;

var upgrading = {
    assignTask: function(creep) {
        creep.memory.state = 0;
        if (!creep) {
            return;
        }
        
        if (creep.memory.state == UPGRADING && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = TRANSFERING;
        }
        if (creep.memory.state == TRANSFERING && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = UPGRADING;
        }
        
        switch (creep.memory.state) {
            case UPGRADING:
                creep.say("upgrade");
                let target = Game.getObjectById("5bbcb0749099fc012e63c360");
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
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


module.exports = upgrading;
