
// Get creeps by name
_.filter(Game.creeps, (creep) => creep.name == "name");


// Get creeps by role
_.filter(Game.creeps, (creep) => creep.memory.role == "role");

// Get creep cost
_.sum([WORK, WORK, WORK, WORK, WORK], b => BODYPART_COST[b]);
_.sum([WORK, WORK, MOVE], b => BODYPART_COST[b]);
_.sum([WORK, WORK, WORK, WORK], b => BODYPART_COST[b]);
_.sum([CARRY, CARRY, MOVE, MOVE], b => BODYPART_COST[b]);
_.sum([ATTACK, HEAL, MOVE], b => BODYPART_COST[b]);
_.sum([ATTACK, ATTACK, MOVE, MOVE], b => BODYPART_COST[b]);
_.sum([CLAIM, MOVE], b => BODYPART_COST[b]);

Game.spawns["Nowhere"].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], "Attacker");
Game.spawns["Nowhere"].spawnCreep([ATTACK, CLAIM, MOVE, MOVE], "Claimer");
Game.getObjectById("62623a4142951f0e5c8baf77").attack(Game.getObjectById("626234e2325061812e0f40d0"))