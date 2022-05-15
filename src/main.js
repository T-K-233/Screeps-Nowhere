
var mining = require("mining");
var carrierTask = require("carrierTask");
var upgrading = require("upgrading");
var runBuildingTask = require("task_build");

var N_CARRIERS = 0;
var N_UPGRADERS = 0;
var N_BUILDERS = 3;



var act = function(obj) {
    Source.prototype.isPrototypeOf(Game.getObjectById("5bbcb0619099fc012e63c10c"));
}


module.exports.loop = function() {
    // Game.getObjectById("6264213f2d23e5df7d44343a");
    
    let attack_target = Game.getObjectById("62683d207ff0d785b5f3b154");
    let attacker = Game.getObjectById("62809a60a3d5f585583d1f6e");
    
    if (attacker) {
        if (!attack_target) {
            attacker.moveTo(new RoomPosition(29, 28, "E54N59"), {visualizePathStyle: {stroke: '#FF0000'}});
        }
        else {
            let ret_ = attacker.attack(attack_target);
            if (ret_ != 0) {
                console.log(ret_);
                attacker.moveTo(attack_target, {visualizePathStyle: {stroke: '#FF0000'}});
            }
            // let ret_ = attacker.claimController(attack_target);
            // if (ret_ != 0) {
            //     console.log(ret_);
            //     attacker.moveTo(attack_target, {visualizePathStyle: {stroke: '#FF0000'}});
            // }
        }
    }
    
    //
    // ======== Mining Unit ========
    //
    
    // [WORK, WORK, WORK, WORK] cost is 400
    var mining_unit_0 = _.filter(Game.creeps, function (creep) { return creep.name == "Miner_0"; })[0];
    if (!mining_unit_0) {
        // this means that mining unit 0 has died. We generate new one
        // let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, WORK, WORK, WORK, WORK], "Miner_0", {directions: [BOTTOM]});
        let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, WORK, WORK], "Miner_0", {directions: [BOTTOM]});
        console.log("trying to spawn Miner 0, return code: " + status_code);
    }
    else {
        if (mining_unit_0.store.getFreeCapacity() == 0) {
            // mining_unit_0.say("transfer");
            mining_unit_0.transfer(Game.spawns["Nowhere"], RESOURCE_ENERGY);
        }
        else {
            // mining_unit_0.say("mine");
            mining_unit_0.harvest(Game.getObjectById("5bbcb0619099fc012e63c10c"));    
        }
    }
    
    //
    // ======== Upgrade Unit ========
    //
    
    var upgrade_unit_0 = _.filter(Game.creeps, function (creep) { return creep.name == "Upgrade_0"; })[0];
    if (!upgrade_unit_0 && mining_unit_0) {
        // this means that upgrade unit 0 has died. We generate new one
        let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, WORK, CARRY], "Upgrade_0", {directions: [BOTTOM_LEFT, BOTTOM_RIGHT]});
        console.log("trying to spawn Upgrade 0, return code: " + status_code);
    }
    else {
        if (upgrade_unit_0.store[RESOURCE_ENERGY] == 0) {
            let source = upgrade_unit_0.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (source) {
                upgrade_unit_0.say("resource overflow!");
                upgrade_unit_0.pickup(source, RESOURCE_ENERGY);
            }
            else {
                // fetch energy from miner container
                upgrade_unit_0.withdraw(Game.getObjectById("6262a042df53ef9b345d727a"), RESOURCE_ENERGY);
            }
        }
        else {
            
            let target = upgrade_unit_0.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; }
            });
            if (!target) {
                // upgrade controller
                upgrade_unit_0.transfer(Game.getObjectById("5bbcb0619099fc012e63c10d"), RESOURCE_ENERGY);
            }
            else {
                // transfer energy to room
                if (upgrade_unit_0.transfer(target, RESOURCE_ENERGY) != 0) {
                    upgrade_unit_0.transfer(Game.getObjectById("5bbcb0619099fc012e63c10d"), RESOURCE_ENERGY);
                }
            }
        }
    }
    
    var upgrade_unit_1 = _.filter(Game.creeps, function (creep) { return creep.name == "Upgrade_1"; })[0];
    if (!upgrade_unit_1 && mining_unit_0) {
        // this means that upgrade unit 1 has died. We generate new one
        let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, WORK, WORK, WORK, CARRY], "Upgrade_1", {directions: [BOTTOM_LEFT, BOTTOM_RIGHT]});
        console.log("trying to spawn Upgrade 1, return code: " + status_code);
    }
    else {
        if (upgrade_unit_1.store[RESOURCE_ENERGY] == 0) {
            let source = upgrade_unit_1.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (source) {
                upgrade_unit_1.say("resource overflow!");
                upgrade_unit_1.pickup(source, RESOURCE_ENERGY);
            }
            else {
                // fetch energy from miner container
                upgrade_unit_1.withdraw(Game.getObjectById("6262a042df53ef9b345d727a"), RESOURCE_ENERGY);
            }
        }
        // else if (Game.getObjectById("6264213f2d23e5df7d44343a").store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        //     upgrade_unit_1.transfer(Game.getObjectById("6264213f2d23e5df7d44343a"), RESOURCE_ENERGY);
        // }
        else {
            let target = upgrade_unit_1.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; }
            });
            if (!target) {
                // upgrade controller
                upgrade_unit_1.transfer(Game.getObjectById("5bbcb0619099fc012e63c10d"), RESOURCE_ENERGY);
            }
            else {
                // transfer energy to room
                if (upgrade_unit_1.transfer(target, RESOURCE_ENERGY) != 0) {
                    upgrade_unit_1.transfer(Game.getObjectById("5bbcb0619099fc012e63c10d"), RESOURCE_ENERGY);
                }
            }
        }
    }
    //
    // ======== Building Unit ========
    //
    
    var builder_units = _.filter(Game.creeps, function (creep) { return creep.memory.role == "builder"; });
    if (builder_units.length < N_BUILDERS && mining_unit_0) {
        // this means that upgrade unit 0 has died. We generate new one
        let name = "Builder_"+Game.spawns["Nowhere"].memory.builder_id;
        let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, WORK, CARRY, MOVE], name, {directions: [TOP, TOP_RIGHT, TOP_LEFT], memory: {role: "builder"}});
        console.log("trying to spawn "+name+", return code: " + status_code);
        if (status_code == 0) {
            Game.spawns["Nowhere"].memory.builder_id += 1;
        }
    }
    else {
        for (let i in builder_units) {
            runBuildingTask(builder_units[i]);    
        }
    }
    
    //
    // ======== Carrier Unit ========
    //
    
    var carrier_unit_0 = _.filter(Game.creeps, function (creep) { return creep.name == "Carrier_0"; })[0];
    if (!carrier_unit_0) {
        // this means that upgrade unit 0 has died. We generate new one
        let status_code = Game.spawns["Nowhere"].spawnCreep([WORK, CARRY, MOVE], "Carrier_0", {directions: [TOP, TOP_RIGHT, TOP_LEFT], memory: {role: "carrier"}});
        console.log("trying to spawn Carrier_0, return code: " + status_code);
    }
    else {
        if (carrier_unit_0.store.getFreeCapacity() > 0) {
            // fetch energy from miner container
            if (carrier_unit_0.harvest(Game.getObjectById("5bbcb0739099fc012e63c358"), RESOURCE_ENERGY) != 0) {
                carrier_unit_0.moveTo(new RoomPosition(19, 8, "E57N59"));
            }
        }
        else {
            // transfer energy to room
            if (carrier_unit_0.transfer(Game.getObjectById("62623c56b369a7fcf38a8604"), RESOURCE_ENERGY) != 0) {
                carrier_unit_0.moveTo(new RoomPosition(35, 2, "E56N59"));
            }
        }
    }
    
    
    //
    // ======== Logging ========
    //
    
    if (Game.getObjectById("5bbcb0619099fc012e63c10c").ticksToRegeneration == 1) {
        Game.spawns["Nowhere"].memory.mining_rate = 1 - (1.0 * Game.getObjectById("5bbcb0619099fc012e63c10c").energy / Game.getObjectById("5bbcb0619099fc012e63c10c").energyCapacity);
    }
    
    
    
    console.log("================================================================");
    let rooms_stat = " ";
    for (var name in Game.rooms) { rooms_stat += name+": "+Game.rooms[name].energyAvailable+" energy\t"; }
    console.log(rooms_stat);
    console.log(" Mining rate: "+Game.spawns["Nowhere"].memory.mining_rate);
    console.log(" Builders: "+builder_units.length+"/"+N_BUILDERS);
    console.log("================================================================");
    console.log();
}
