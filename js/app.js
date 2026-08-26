const GRID_COLS = 10;
const GRID_ROWS = 10;
const TEAM_SIZE = 4;

const SPEED_TO_MOVEMENT = [
  { min: 1, max: 3, cells: 1 },
  { min: 4, max: 5, cells: 2 },
  { min: 6, max: 7, cells: 3 },
  { min: 8, max: 9, cells: 4 },
  { min: 10, max: 10, cells: 5 }
];

const ICONS = {
  negro: "🖤",
  nico: "🧮",
  juan: "🔑",
  zurdo: "⚽",
  lauti: "🏓",
  yenien: "💻",
  santi: "🚬",
  lulo: "🥖",
  ivan: "🏃",
  zombie_vecino: "🧟",
  arana_comun: "🕷️",
  zombie_arana: "🕷️",
  zombie_vacunado: "🧟‍♂️",
  zombie_recien: "🏃",
  zombie_blandito: "🤢",
  zombie_barrevereda: "🧹",
  zombie_picado: "⚽",
  zombie_arana_grande: "🕷️",
  zombie_asador: "🥩",
  zombie_delivery: "🛵"
};

const characterTemplates = [
  {
    id: "negro",
    name: "El Negro",
    role: "Entrenador fisico",
    stats: { hp: 100, strength: 9, defense: 7, accuracy: 7, speed: 5 },
    passives: ["dolor_lumbar"],
    abilities: {
      basic: { name: "Correa", kind: "damage", target: "enemy", range: 1, power: 10, chargeNeeded: 0 },
      special: { name: "Poder Negro", kind: "damage", target: "enemy", range: 1, power: 26, chargeNeeded: 2, critBonus: 35, voice: "PIUM" },
      ultimate: { name: "Ataque Jauria", kind: "multi_damage", target: "enemies", range: 2, power: 20, maxTargets: 2, chargeNeeded: 4 }
    }
  },
  {
    id: "nico",
    name: "Nico",
    role: "Profesor de matematicas",
    stats: { hp: 85, strength: 5, defense: 5, accuracy: 9, speed: 6 },
    passives: ["dolor_lumbar"],
    abilities: {
      basic: { name: "Fibron", kind: "damage", target: "enemy", range: 4, power: 8, chargeNeeded: 0 },
      special: { name: "Acertijo", kind: "stun", target: "enemy", range: 4, power: 0, chargeNeeded: 2, stunChance: 0.7, allyConfuseChance: 0.2 },
      ultimate: { name: "Ataque Furioso", kind: "multi_damage", target: "enemies", range: 1, power: 22, maxTargets: 2, chargeNeeded: 3 }
    }
  },
  {
    id: "juan",
    name: "Juan",
    role: "Inmobiliario",
    stats: { hp: 105, strength: 7, defense: 7, accuracy: 8, speed: 5 },
    passives: ["aracnofobia"],
    abilities: {
      basic: { name: "Llaves del auto", kind: "damage", target: "enemy", range: 4, power: 9, chargeNeeded: 0 },
      special: { name: "Llaves de departamento", kind: "aoe_all", target: "enemies", range: 99, power: 14, chargeNeeded: 2 },
      ultimate: { name: "La vieja", kind: "damage", target: "enemy", range: 1, power: 34, chargeNeeded: 4, guaranteedCrit: true }
    }
  },
  {
    id: "zurdo",
    name: "Zurdo",
    role: "Vendedor",
    stats: { hp: 90, strength: 6, defense: 5, accuracy: 6, speed: 9 },
    passives: ["aracnofobia"],
    abilities: {
      basic: { name: "Doble patada", kind: "zurdo_basic", target: "enemy", range: 4, power: 12, chargeNeeded: 0 },
      special: { name: "Broly", kind: "aoe_cone", target: "enemies", range: 4, power: 16, chargeNeeded: 2 },
      ultimate: { name: "Esta a la moda", kind: "heal", target: "ally", range: 4, healPower: 30, chargeNeeded: 3 }
    }
  },
  {
    id: "lauti",
    name: "Lauti",
    role: "Heroe de la Gaona",
    stats: { hp: 100, strength: 8, defense: 6, accuracy: 8, speed: 8 },
    passives: [],
    abilities: {
      basic: { name: "Paleta", kind: "damage", target: "enemy", range: 1, power: 11, chargeNeeded: 0 },
      special: { name: "Pelotazo", kind: "damage", target: "enemy", range: 4, power: 21, chargeNeeded: 2, critBonus: 20 },
      ultimate: { name: "Heroe de la Gaona", kind: "execute", target: "enemy", range: 3, chargeNeeded: 5 }
    }
  },
  {
    id: "yenien",
    name: "Yenien",
    role: "Programador web",
    stats: { hp: 80, strength: 4, defense: 8, accuracy: 7, speed: 3 },
    passives: [],
    abilities: {
      basic: { name: "Nada", kind: "nothing", target: "none", range: 0, chargeNeeded: 0 },
      special: { name: "Delegar", kind: "delegate", target: "enemy", range: 5, chargeNeeded: 2 },
      ultimate: { name: "Padre de todos", kind: "taunt", target: "enemies", range: 99, chargeNeeded: 4, duration: 2 }
    }
  },
  {
    id: "santi",
    name: "Santi",
    role: "Tester",
    stats: { hp: 95, strength: 6, defense: 6, accuracy: 7, speed: 7 },
    passives: [],
    abilities: {
      basic: { name: "Puno", kind: "damage", target: "enemy", range: 1, power: 10, chargeNeeded: 0 },
      special: { name: "Tuca", kind: "heal_self", target: "self", range: 0, healPower: 28, chargeNeeded: 2, smoking: true, smokingGula: 10 },
      ultimate: { name: "Compra porro", kind: "heal_all", target: "allies", range: 99, healPower: 24, chargeNeeded: 4, smoking: true, smokingGula: 10 }
    }
  },
  {
    id: "lulo",
    name: "Lulo",
    role: "Panadero",
    stats: { hp: 115, strength: 7, defense: 7, accuracy: 5, speed: 4 },
    passives: [],
    abilities: {
      basic: { name: "Puno", kind: "damage", target: "enemy", range: 1, power: 9, chargeNeeded: 0 },
      special: { name: "Criollitos", kind: "gula_reduce_all", target: "allies", range: 99, gulaReduce: 25, chargeNeeded: 2 },
      ultimate: { name: "Furia de la noche", kind: "lulo_fury", target: "enemies", range: 99, power: 22, chargeNeeded: 4 }
    }
  },
  {
    id: "ivan",
    name: "Ivan",
    role: "Profesor de educacion fisica",
    stats: { hp: 100, strength: 6, defense: 8, accuracy: 7, speed: 6 },
    passives: ["dolor_lumbar"],
    abilities: {
      basic: { name: "Pelotazo", kind: "damage", target: "enemy", range: 4, power: 10, chargeNeeded: 0 },
      special: { name: "Saltos", kind: "slow", target: "enemy", range: 3, power: 12, chargeNeeded: 2, duration: 1 },
      ultimate: { name: "Se termino la joda", kind: "team_buff", target: "allies", range: 99, chargeNeeded: 4, duration: 2 }
    }
  }
];

const enemyTemplates = [
  {
    id: "zombie_vecino",
    name: "Zombie Vecino",
    role: "Basico",
    ai: "agresivo",
    stats: { hp: 60, strength: 4, defense: 4, accuracy: 5, speed: 3 },
    passives: [],
    abilities: {
      basic: { name: "Manotazo", kind: "damage", target: "enemy", range: 1, power: 8, chargeNeeded: 0 },
      special: { name: "Mordida", kind: "infect_damage", target: "enemy", range: 1, power: 12, chargeNeeded: 2, infectChance: 0.45, infectTurns: 3 },
      ultimate: { name: "Furia Viral", kind: "damage", target: "enemy", range: 1, power: 14, chargeNeeded: 3 }
    }
  },
  {
    id: "arana_comun",
    name: "Arana Comun",
    role: "Molestia / control",
    ai: "control",
    stats: { hp: 10, strength: 2, defense: 1, accuracy: 6, speed: 8 },
    passives: [],
    abilities: {
      basic: { name: "Mordida", kind: "damage", target: "enemy", range: 1, power: 4, chargeNeeded: 0 },
      special: { name: "Telarana", kind: "web_slow", target: "enemy", range: 3, power: 2, chargeNeeded: 2, duration: 1 },
      ultimate: { name: "Picadura", kind: "infect_damage", target: "enemy", range: 1, power: 5, chargeNeeded: 3, infectChance: 0.4, infectTurns: 2 }
    }
  },
  {
    id: "zombie_vacunado",
    name: "Zombie Vacunado",
    role: "Tanque",
    ai: "tanque",
    stats: { hp: 110, strength: 7, defense: 8, accuracy: 5, speed: 2 },
    passives: [],
    abilities: {
      basic: { name: "Golpe pesado", kind: "damage", target: "enemy", range: 1, power: 18, chargeNeeded: 0 },
      special: { name: "Embestida", kind: "charge_strike", target: "enemy", range: 2, power: 22, chargeNeeded: 2 },
      ultimate: { name: "Aplastar", kind: "damage", target: "enemy", range: 1, power: 24, chargeNeeded: 4 }
    }
  },
  {
    id: "zombie_recien",
    name: "Zombie Recien Convertido",
    role: "Rapido",
    ai: "cazador",
    stats: { hp: 75, strength: 5, defense: 3, accuracy: 6, speed: 10 },
    passives: [],
    abilities: {
      basic: { name: "Zarpazo", kind: "damage", target: "enemy", range: 1, power: 10, chargeNeeded: 0 },
      special: { name: "Carrera descontrolada", kind: "dash_strike", target: "enemy", range: 5, power: 16, chargeNeeded: 2 },
      ultimate: { name: "Rasgado brutal", kind: "damage", target: "enemy", range: 1, power: 19, chargeNeeded: 3 }
    }
  },
  {
    id: "zombie_blandito",
    name: "Zombie Blandito",
    role: "Rango / infeccion",
    ai: "hostigador",
    stats: { hp: 45, strength: 5, defense: 2, accuracy: 6, speed: 1 },
    passives: ["explosion_descomposicion"],
    abilities: {
      basic: { name: "Vomito", kind: "infect_damage", target: "enemy", range: 4, power: 7, chargeNeeded: 0, infectChance: 0.35, infectTurns: 3 },
      special: { name: "Ampolla", kind: "aoe_infect", target: "enemy", range: 4, power: 10, chargeNeeded: 2, infectChance: 0.65, infectTurns: 3 },
      ultimate: { name: "Escupitajo toxico", kind: "infect_damage", target: "enemy", range: 5, power: 11, chargeNeeded: 3, infectChance: 0.5, infectTurns: 3 }
    }
  },
  {
    id: "zombie_delivery",
    name: "Zombie Delivery",
    role: "Movilidad",
    ai: "cazador",
    stats: { hp: 70, strength: 4, defense: 3, accuracy: 7, speed: 9 },
    passives: [],
    abilities: {
      basic: { name: "Delivery", kind: "delivery_dash", target: "enemy", range: 1, power: 9, chargeNeeded: 0, dashCells: 1 },
      special: { name: "Pedido equivocado", kind: "greasy_throw", target: "enemy", range: 4, power: 9, chargeNeeded: 2, duration: 1 },
      ultimate: { name: "Reparto expres", kind: "damage", target: "enemy", range: 1, power: 18, chargeNeeded: 3 }
    }
  },
  {
    id: "zombie_barrevereda",
    name: "Zombie Barre Vereda",
    role: "Soporte / Zona",
    ai: "hostigador",
    stats: { hp: 55, strength: 3, defense: 3, accuracy: 8, speed: 5 },
    passives: ["chusmerio_aura"],
    abilities: {
      basic: { name: "Escobazo", kind: "damage", target: "enemy", range: 1, power: 6, chargeNeeded: 0 },
      special: { name: "Yo vi todo", kind: "buff_str_radius", target: "enemies", range: 3, chargeNeeded: 2, duration: 2, strBonus: 2 },
      ultimate: { name: "Escobazo doble", kind: "damage", target: "enemy", range: 1, power: 14, chargeNeeded: 3 }
    }
  },
  {
    id: "zombie_picado",
    name: "Zombie del Picado",
    role: "Control",
    ai: "agresivo",
    stats: { hp: 80, strength: 6, defense: 4, accuracy: 7, speed: 8 },
    passives: [],
    abilities: {
      basic: { name: "Patada", kind: "damage", target: "enemy", range: 1, power: 10, chargeNeeded: 0 },
      special: { name: "Pelotazo", kind: "push_damage", target: "enemy", range: 4, power: 14, chargeNeeded: 2, pushCells: 1 },
      ultimate: { name: "Falta", kind: "sweep_adjacent", target: "enemies", range: 1, power: 8, chargeNeeded: 3, duration: 1 }
    }
  },
  {
    id: "zombie_arana_grande",
    name: "Zombie Arana",
    role: "Invocador",
    ai: "control",
    stats: { hp: 75, strength: 4, defense: 4, accuracy: 7, speed: 6 },
    passives: [],
    abilities: {
      basic: { name: "Aranazo", kind: "damage", target: "enemy", range: 1, power: 9, chargeNeeded: 0 },
      special: { name: "Salgan", kind: "summon_spiders", target: "none", range: 0, chargeNeeded: 2, summonCount: 2, maxSpiders: 4 },
      ultimate: { name: "Enjambre furioso", kind: "damage", target: "enemy", range: 1, power: 13, chargeNeeded: 3 }
    }
  },
  {
    id: "zombie_asador",
    name: "Zombie Asador",
    role: "Control de Gula",
    ai: "tanque",
    stats: { hp: 95, strength: 6, defense: 6, accuracy: 5, speed: 2 },
    passives: ["olor_asado_aura"],
    abilities: {
      basic: { name: "Escobillazo", kind: "damage", target: "enemy", range: 1, power: 9, chargeNeeded: 0 },
      special: { name: "Brasas", kind: "aoe_burn", target: "enemy", range: 4, power: 10, chargeNeeded: 2 },
      ultimate: { name: "Explosion de brasas", kind: "aoe_all", target: "enemies", range: 99, power: 12, chargeNeeded: 4 }
    }
  }
];

const els = {
  playerPickerGrid: document.getElementById("playerPickerGrid"),
  enemyPickerGrid: document.getElementById("enemyPickerGrid"),
  randomTeamsBtn: document.getElementById("randomTeamsBtn"),
  startBtn: document.getElementById("startBtn"),
  resetBtn: document.getElementById("resetBtn"),
  aiSpeedSelect: document.getElementById("aiSpeedSelect"),
  playerStrip: document.getElementById("playerStrip"),
  roundValue: document.getElementById("roundValue"),
  turnValue: document.getElementById("turnValue"),
  spiderValue: document.getElementById("spiderValue"),
  activeUnitLabel: document.getElementById("activeUnitLabel"),
  grid: document.getElementById("grid"),
  playerActionsContainer: document.getElementById("playerActionsContainer"),
  aiActionsContainer: document.getElementById("aiActionsContainer"),
  targetSelect: document.getElementById("targetSelect"),
  endTurnBtn: document.getElementById("endTurnBtn"),
  unitDetails: document.getElementById("unitDetails"),
  log: document.getElementById("log"),
  gulaList: document.getElementById("gulaList"),
  houseResetBtn: document.getElementById("houseResetBtn"),
  foodSelect: document.getElementById("foodSelect"),
  eatBtn: document.getElementById("eatBtn")
};

const state = {
  units: [],
  turnOrder: [],
  turnIndex: 0,
  round: 1,
  activeUnitId: null,
  movedThisTurn: false,
  actionUsed: false,
  battleStarted: false,
  selectedUnitId: null,
  draftTeams: {
    playerIds: [],
    enemyIds: []
  },
  aiSpeed: "normal",
  preview: {
    mode: "none",
    abilityKey: null
  },
  aiPlan: {
    activeUid: null,
    step: ""
  }
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getAiTiming() {
  if (state.aiSpeed === "slow") {
    return { preMove: 650, moveStep: 300, preAction: 760, postAction: 580, noTarget: 450 };
  }

  if (state.aiSpeed === "fast") {
    return { preMove: 220, moveStep: 120, preAction: 280, postAction: 220, noTarget: 180 };
  }

  return { preMove: 450, moveStep: 220, preAction: 520, postAction: 360, noTarget: 320 };
}

function setPreview(mode, abilityKey = null) {
  state.preview = { mode, abilityKey };
  renderGrid();
}

function clearPreview() {
  state.preview = { mode: "none", abilityKey: null };
  renderGrid();
}

function movementFromSpeed(speed) {
  const found = SPEED_TO_MOVEMENT.find((r) => speed >= r.min && speed <= r.max);
  return found ? found.cells : 1;
}

function sampleWithoutReplacement(arr, count) {
  const copy = [...arr];
  const result = [];
  for (let i = 0; i < count; i += 1) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function setupSelectors() {
  renderPickers();
}

function toggleDraftSelection(group, id) {
  const key = group === "player" ? "playerIds" : "enemyIds";
  const draft = state.draftTeams[key];
  const already = draft.includes(id);

  if (already) {
    state.draftTeams[key] = draft.filter((item) => item !== id);
  } else {
    if (draft.length >= TEAM_SIZE) {
      pushLog(`Maximo ${TEAM_SIZE} seleccionados en ${group === "player" ? "jugador" : "zombies"}.`, "warn");
      return;
    }
    state.draftTeams[key] = [...draft, id];
  }

  renderPickers();
  renderPlayerStrip();
}

function renderPickers() {
  const playerSet = new Set(state.draftTeams.playerIds);
  const enemySet = new Set(state.draftTeams.enemyIds);

  els.playerPickerGrid.innerHTML = characterTemplates
    .map((tpl) => {
      const active = playerSet.has(tpl.id) ? "active" : "";
      const icon = ICONS[tpl.id] || "🎮";
      return `
        <button class="picker-btn ${active}" data-group="player" data-id="${tpl.id}">
          <span class="i">${icon}</span>
          <span class="t">${tpl.name}</span>
        </button>
      `;
    })
    .join("");

  els.enemyPickerGrid.innerHTML = enemyTemplates
    .map((tpl) => {
      const active = enemySet.has(tpl.id) ? "active" : "";
      const icon = ICONS[tpl.id] || "👾";
      return `
        <button class="picker-btn ${active}" data-group="enemy" data-id="${tpl.id}">
          <span class="i">${icon}</span>
          <span class="t">${tpl.name}</span>
        </button>
      `;
    })
    .join("");

  els.playerPickerGrid.querySelectorAll(".picker-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleDraftSelection("player", btn.dataset.id);
    });
  });

  els.enemyPickerGrid.querySelectorAll(".picker-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleDraftSelection("enemy", btn.dataset.id);
    });
  });
}

function renderPlayerStrip() {
  const selectedIds = state.draftTeams.playerIds;
  const cards = selectedIds
    .map((id) => characterTemplates.find((c) => c.id === id))
    .filter(Boolean)
    .map((tpl) => {
      const icon = ICONS[tpl.id] || "🎮";
      return `
        <div class="player-card">
          <span class="icon">${icon}</span>
          <span class="txt"><strong>${tpl.name}</strong><br>${tpl.role}</span>
        </div>
      `;
    })
    .join("");

  els.playerStrip.innerHTML = cards || "<small>Selecciona 4 personajes para mostrar iconos.</small>";
}

function randomTeams() {
  const playerIds = characterTemplates.map((c) => c.id);
  const enemyIds = enemyTemplates.map((c) => c.id);
  state.draftTeams.playerIds = sampleWithoutReplacement(playerIds, TEAM_SIZE);
  state.draftTeams.enemyIds = sampleWithoutReplacement(enemyIds, TEAM_SIZE);
  renderPickers();
  renderPlayerStrip();
}

function findTemplate(id, group) {
  if (group === "enemy") return enemyTemplates.find((c) => c.id === id);
  return characterTemplates.find((c) => c.id === id);
}

function createSpawnRows(count) {
  return Array.from({ length: count }, (_, idx) => {
    const raw = Math.round(((idx + 1) * GRID_ROWS) / (count + 1)) - 1;
    return Math.max(0, Math.min(GRID_ROWS - 1, raw));
  });
}

function createUnit(template, team, idx, teamSize, controller) {
  const spawnRows = createSpawnRows(teamSize);
  const startPos = team === "A"
    ? { x: 1, y: spawnRows[idx] }
    : { x: GRID_COLS - 2, y: spawnRows[idx] };

  return {
    uid: `${team}_${template.id}_${idx}_${Math.floor(Math.random() * 9999)}`,
    team,
    templateId: template.id,
    controller,
    ai: template.ai || null,
    name: template.name,
    role: template.role,
    stats: deepClone(template.stats),
    currentHp: template.stats.hp,
    pos: startPos,
    isAlive: true,
    passives: [...template.passives],
    abilities: deepClone(template.abilities),
    charge: { special: 0, ultimate: 0 },
    gula: 0,
    statuses: {
      skipTurn: 0,
      stunned: 0,
      tauntedBy: null,
      tauntTurns: 0,
      movePenalty: 0,
      infectionTurns: 0,
      infectionDamage: 0,
      buffTurns: 0,
      auraSpeed: 0,
      auraAccuracy: 0,
      buff: { defensePct: 0, accuracyPct: 0, extraMove: 0, strFlat: 0 }
    }
  };
}

function spawnUnitNear(template, nearUnit) {
  if (!template) return null;
  const candidates = [];

  for (let radius = 1; radius <= 3 && !candidates.length; radius += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      for (let dy = -radius; dy <= radius; dy += 1) {
        const cell = { x: nearUnit.pos.x + dx, y: nearUnit.pos.y + dy };
        if (manhattan(cell, nearUnit.pos) === radius && isWalkable(cell, null)) {
          candidates.push(cell);
        }
      }
    }
  }

  if (!candidates.length) return null;
  const pos = candidates[Math.floor(Math.random() * candidates.length)];
  const unit = createUnit(template, nearUnit.team, state.units.length, 1, "ai");
  unit.uid = `${nearUnit.team}_${template.id}_spawn_${Math.floor(Math.random() * 99999)}`;
  unit.pos = pos;
  state.units.push(unit);
  return unit;
}

function startBattle() {
  const teamAIds = [...state.draftTeams.playerIds];
  const teamBIds = [...state.draftTeams.enemyIds];

  if (teamAIds.length !== TEAM_SIZE || teamBIds.length !== TEAM_SIZE) {
    pushLog(`Selecciona exactamente ${TEAM_SIZE} unidades por lado.`, "warn");
    return;
  }

  state.units = [];
  state.turnOrder = [];
  state.turnIndex = 0;
  state.round = 1;
  state.activeUnitId = null;
  state.battleStarted = true;
  state.selectedUnitId = null;
  state.preview = { mode: "none", abilityKey: null };
  state.aiPlan = { activeUid: null, step: "" };

  teamAIds.forEach((id, idx) => {
    const tpl = findTemplate(id, "player");
    state.units.push(createUnit(tpl, "A", idx, TEAM_SIZE, "human"));
  });

  teamBIds.forEach((id, idx) => {
    const tpl = findTemplate(id, "enemy");
    state.units.push(createUnit(tpl, "B", idx, TEAM_SIZE, "ai"));
  });

  recomputeAuras();
  recalculateTurnOrder();
  pushLog("Comienza el combate 4v4.", "ok");
  beginTurn();
}

function resetBattle() {
  state.units = [];
  state.turnOrder = [];
  state.turnIndex = 0;
  state.round = 1;
  state.activeUnitId = null;
  state.movedThisTurn = false;
  state.actionUsed = false;
  state.battleStarted = false;
  state.selectedUnitId = null;
  state.preview = { mode: "none", abilityKey: null };
  state.aiPlan = { activeUid: null, step: "" };
  els.log.innerHTML = "";
  els.targetSelect.innerHTML = "";
  renderAll();
}

function getUnit(uid) {
  return state.units.find((u) => u.uid === uid);
}

function aliveUnits(team) {
  return state.units.filter((u) => u.isAlive && (!team || u.team === team));
}

function enemyTeam(team) {
  return team === "A" ? "B" : "A";
}

function recalculateTurnOrder() {
  state.turnOrder = state.units
    .filter((u) => u.isAlive)
    .map((u) => ({ uid: u.uid, initiative: effectiveSpeed(u) }))
    .sort((a, b) => b.initiative - a.initiative)
    .map((x) => x.uid);
}

function totalSpeed(unit) {
  return unit.stats.speed + unit.statuses.auraSpeed;
}

function effectiveSpeed(unit) {
  const slow = unit.statuses.movePenalty > 0 ? 1 : 0;
  return Math.max(1, totalSpeed(unit) - slow);
}

function effectiveMovementCells(unit) {
  const base = movementFromSpeed(totalSpeed(unit));
  const penalty = unit.statuses.movePenalty > 0 ? 1 : 0;
  const gulaPenalty = gulaMovePenalty(unit);
  const extra = unit.statuses.buff.extraMove || 0;
  return Math.max(1, base - penalty - gulaPenalty + extra);
}

function isSpiderAlive() {
  return state.units.some((u) => u.isAlive && u.templateId === "arana_comun");
}

function applyAsadorAura(unit) {
  if (unit.controller !== "human") return;
  const asadors = state.units.filter((u) => u.isAlive && u.templateId === "zombie_asador");
  if (asadors.some((asador) => manhattan(asador.pos, unit.pos) <= 3)) {
    pushLog(`${unit.name} siente olor a asado...`, "warn");
    addGula(unit, 5);
  }
}

function recomputeAuras() {
  state.units.forEach((unit) => {
    unit.statuses.auraSpeed = 0;
    unit.statuses.auraAccuracy = 0;
  });

  state.units
    .filter((unit) => unit.isAlive && unit.passives.includes("chusmerio_aura"))
    .forEach((barre) => {
      aliveUnits(barre.team).forEach((unit) => {
        if (unit.uid !== barre.uid && manhattan(unit.pos, barre.pos) <= 3) {
          unit.statuses.auraSpeed += 1;
          unit.statuses.auraAccuracy += 1;
        }
      });
    });
}

function processStatusTick(unit) {
  applyAsadorAura(unit);
  if (unit.statuses.movePenalty > 0) unit.statuses.movePenalty -= 1;

  if (unit.statuses.buffTurns > 0) {
    unit.statuses.buffTurns -= 1;
    if (unit.statuses.buffTurns === 0) {
      unit.statuses.buff = { defensePct: 0, accuracyPct: 0, extraMove: 0, strFlat: 0 };
      pushLog(`${unit.name} pierde los buffs de Ivan.`, "warn");
    }
  }

  if (unit.statuses.tauntTurns > 0) {
    unit.statuses.tauntTurns -= 1;
    if (unit.statuses.tauntTurns === 0) unit.statuses.tauntedBy = null;
  }

  if (unit.statuses.infectionTurns > 0) {
    unit.statuses.infectionTurns -= 1;
    const tickDamage = Math.max(1, unit.statuses.infectionDamage || 3);
    unit.currentHp = Math.max(0, unit.currentHp - tickDamage);
    pushLog(`${unit.name} sufre infeccion y pierde ${tickDamage} HP.`, "bad");
    if (unit.currentHp === 0 && unit.isAlive) {
      unit.isAlive = false;
      pushLog(`${unit.name} cae por infeccion.`, "bad");
      handleOnDeath(unit);
    }
  }
}

function processPassiveTrigger(unit) {
  if (unit.passives.includes("dolor_lumbar") && Math.random() < 0.15) {
    unit.statuses.skipTurn = 1;
    pushLog(`${unit.name} sufre dolor lumbar y salta el turno.`, "warn");
  }

  if (unit.passives.includes("aracnofobia") && isSpiderAlive()) {
    unit.statuses.skipTurn = 1;
    pushLog(`${unit.name} no actua por aracnofobia (araña viva).`, "warn");
  }
}

function checkBattleEnd() {
  const aliveA = aliveUnits("A");
  const aliveB = aliveUnits("B");

  if (!aliveA.length || !aliveB.length) {
    state.battleStarted = false;
    const winner = aliveA.length ? "Jugador" : "IA";
    pushLog(`Fin del combate. Gana ${winner}.`, "bad");
    renderAll();
    return true;
  }

  return false;
}

function beginTurn() {
  if (!state.battleStarted) return;
  if (checkBattleEnd()) return;

  recomputeAuras();

  if (state.turnIndex >= state.turnOrder.length) {
    state.turnIndex = 0;
    state.round += 1;
    recalculateTurnOrder();
  }

  const activeUid = state.turnOrder[state.turnIndex];
  const active = getUnit(activeUid);

  if (!active || !active.isAlive) {
    state.turnIndex += 1;
    beginTurn();
    return;
  }

  state.activeUnitId = active.uid;
  state.movedThisTurn = false;
  state.actionUsed = false;
  state.preview = { mode: "none", abilityKey: null };
  state.aiPlan = { activeUid: active.controller === "ai" ? active.uid : null, step: "" };

  processStatusTick(active);
  processPassiveTrigger(active);

  if (!active.isAlive) {
    endTurn();
    return;
  }

  if (active.statuses.skipTurn > 0 || active.statuses.stunned > 0) {
    const reason = active.statuses.skipTurn > 0 ? "pierde turno" : "esta aturdido";
    pushLog(`${active.name} ${reason}.`, "warn");
    active.statuses.skipTurn = Math.max(0, active.statuses.skipTurn - 1);
    active.statuses.stunned = Math.max(0, active.statuses.stunned - 1);
    endTurn();
    return;
  }

  populateTargets();
  renderAll();

  if (active.controller === "ai") {
    performAiTurn(active.uid);
  }
}

function populateTargets() {
  const active = getUnit(state.activeUnitId);
  if (!active) return;

  const opts = [];
  const enemies = aliveUnits(enemyTeam(active.team));
  const allies = aliveUnits(active.team);

  opts.push({ label: "(sin objetivo)", value: "" });
  enemies.forEach((u) => opts.push({ label: `[Enemigo] ${u.name} (${u.currentHp} HP)`, value: u.uid }));
  allies.forEach((u) => opts.push({ label: `[Aliado] ${u.name} (${u.currentHp} HP)`, value: u.uid }));

  els.targetSelect.innerHTML = opts
    .map((o) => `<option value="${o.value}">${o.label}</option>`)
    .join("");

  els.targetSelect.value = "";
}

function actionButton(label, classes = "") {
  const btn = document.createElement("button");
  btn.className = `action-btn ${classes}`.trim();
  btn.textContent = label;
  return btn;
}

function renderActions() {
  const active = getUnit(state.activeUnitId);
  els.playerActionsContainer.innerHTML = "";
  els.aiActionsContainer.innerHTML = "";

  const playerMoveBtn = actionButton("Mover");
  const playerBasicBtn = actionButton("Basico");
  const playerSpecialBtn = actionButton("Especial");
  const playerUltBtn = actionButton("Habilidad");

  const aiMoveBtn = actionButton("Mover", state.aiPlan.step === "move" ? "picking" : "");
  const aiBasicBtn = actionButton("Basico", state.aiPlan.step === "basic" ? "picking" : "");
  const aiSpecialBtn = actionButton("Especial", state.aiPlan.step === "special" ? "picking" : "");
  const aiUltBtn = actionButton("Habilidad", state.aiPlan.step === "ultimate" ? "picking" : "");

  els.playerActionsContainer.append(playerMoveBtn, playerBasicBtn, playerSpecialBtn, playerUltBtn);
  els.aiActionsContainer.append(aiMoveBtn, aiBasicBtn, aiSpecialBtn, aiUltBtn);

  if (!active || !state.battleStarted) {
    els.playerActionsContainer.querySelectorAll("button").forEach((b) => { b.disabled = true; });
    els.aiActionsContainer.querySelectorAll("button").forEach((b) => { b.disabled = true; });
    return;
  }

  const canMove = !state.movedThisTurn;
  playerMoveBtn.classList.toggle("on", canMove);
  playerMoveBtn.disabled = !canMove || active.controller !== "human";

  if (active.controller === "human") {
    playerBasicBtn.textContent = `Basico: ${active.abilities.basic.name}`;
    playerSpecialBtn.textContent = `Especial: ${active.abilities.special.name} (${active.charge.special}/${active.abilities.special.chargeNeeded})${gulaBlocksSpecial(active) ? " - hambre" : ""}`;
    playerUltBtn.textContent = `Habilidad: ${active.abilities.ultimate.name} (${active.charge.ultimate}/${active.abilities.ultimate.chargeNeeded})${gulaBlocksUltimate(active) ? " - hambre" : ""}`;

    playerBasicBtn.classList.add("on");
    playerSpecialBtn.classList.toggle("on", active.charge.special >= active.abilities.special.chargeNeeded);
    playerUltBtn.classList.toggle("on", active.charge.ultimate >= active.abilities.ultimate.chargeNeeded);

    playerBasicBtn.disabled = state.actionUsed;
    playerSpecialBtn.disabled = state.actionUsed || active.charge.special < active.abilities.special.chargeNeeded || gulaBlocksSpecial(active);
    playerUltBtn.disabled = state.actionUsed || active.charge.ultimate < active.abilities.ultimate.chargeNeeded || gulaBlocksUltimate(active);

    playerMoveBtn.addEventListener("click", () => setPreview("move", null));
    playerBasicBtn.addEventListener("click", () => useAbility("basic"));
    playerSpecialBtn.addEventListener("click", () => useAbility("special"));
    playerUltBtn.addEventListener("click", () => useAbility("ultimate"));

    playerMoveBtn.addEventListener("mouseenter", () => setPreview("move", null));
    playerMoveBtn.addEventListener("mouseleave", () => clearPreview());
    playerBasicBtn.addEventListener("mouseenter", () => setPreview("ability", "basic"));
    playerBasicBtn.addEventListener("mouseleave", () => clearPreview());
    playerSpecialBtn.addEventListener("mouseenter", () => setPreview("ability", "special"));
    playerSpecialBtn.addEventListener("mouseleave", () => clearPreview());
    playerUltBtn.addEventListener("mouseenter", () => setPreview("ability", "ultimate"));
    playerUltBtn.addEventListener("mouseleave", () => clearPreview());

    els.aiActionsContainer.querySelectorAll("button").forEach((b) => { b.disabled = true; });
  } else {
    playerBasicBtn.disabled = true;
    playerSpecialBtn.disabled = true;
    playerUltBtn.disabled = true;
    els.aiActionsContainer.querySelectorAll("button").forEach((b) => { b.disabled = false; });

    aiBasicBtn.textContent = `Basico: ${active.abilities.basic.name}`;
    aiSpecialBtn.textContent = `Especial: ${active.abilities.special.name} (${active.charge.special}/${active.abilities.special.chargeNeeded})`;
    aiUltBtn.textContent = `Habilidad: ${active.abilities.ultimate.name} (${active.charge.ultimate}/${active.abilities.ultimate.chargeNeeded})`;

    aiBasicBtn.classList.add("on");
    aiSpecialBtn.classList.toggle("on", active.charge.special >= active.abilities.special.chargeNeeded);
    aiUltBtn.classList.toggle("on", active.charge.ultimate >= active.abilities.ultimate.chargeNeeded);
  }
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function canHitTarget(actor, target, ability) {
  if (!target || !target.isAlive) return false;
  return manhattan(actor.pos, target.pos) <= ability.range;
}

function applyInfection(target, turns, damagePerTurn) {
  target.statuses.infectionTurns = Math.max(target.statuses.infectionTurns, turns);
  target.statuses.infectionDamage = Math.max(target.statuses.infectionDamage, damagePerTurn);
  pushLog(`${target.name} queda infectado (${damagePerTurn} HP por ${turns} turnos).`, "bad");
}

function handleOnDeath(unit) {
  if (!unit.passives.includes("explosion_descomposicion")) return;
  const nearby = state.units.filter(
    (u) => u.isAlive && u.team !== unit.team && manhattan(u.pos, unit.pos) <= 1
  );
  nearby.forEach((u) => applyInfection(u, 3, 3));
  if (nearby.length) {
    pushLog(`${unit.name} explota al morir y contagia alrededor.`, "bad");
  }
}

function applyDamage(attacker, defender, ability) {
  if (!attacker || !defender || !defender.isAlive) return;

  const hitChance = ability.forceHit
    ? 1
    : Math.min(0.95, ((attacker.stats.accuracy + attacker.statuses.auraAccuracy) * (1 + attacker.statuses.buff.accuracyPct)) / 10);

  if (Math.random() > hitChance) {
    pushLog(`${attacker.name} falla ${ability.name} sobre ${defender.name}.`, "warn");
    return;
  }

  const critChance = ability.guaranteedCrit ? 1 : Math.min(0.8, 0.1 + (ability.critBonus || 0) / 100);
  const isCrit = Math.random() < critChance;

  const base = (attacker.stats.strength + (attacker.statuses.buff.strFlat || 0)) * 6 + (ability.power || 0);
  const defValue = defender.stats.defense * (1 + defender.statuses.buff.defensePct);
  const reduced = Math.max(4, base - defValue * 3 + (Math.random() * 8 - 4));
  const dmg = Math.round(isCrit ? reduced * 1.5 : reduced);

  defender.currentHp = Math.max(0, defender.currentHp - dmg);
  if (defender.currentHp === 0 && defender.isAlive) {
    defender.isAlive = false;
    handleOnDeath(defender);
  }

  const critTxt = isCrit ? " CRITICO" : "";
  pushLog(`${attacker.name} usa ${ability.name} y hace ${dmg} a ${defender.name}.${critTxt}`, isCrit ? "bad" : "ok");
}

function applyHeal(healer, target, amount) {
  if (!target || !target.isAlive) return;
  const before = target.currentHp;
  target.currentHp = Math.min(target.stats.hp, target.currentHp + amount);
  const healed = target.currentHp - before;
  pushLog(`${healer.name} cura ${healed} HP a ${target.name}.`, "ok");
}

function pickNearestUnits(from, pool, maxTargets, maxRange) {
  return pool
    .map((u) => ({ unit: u, d: manhattan(from.pos, u.pos) }))
    .filter((x) => x.d <= maxRange)
    .sort((a, b) => a.d - b.d)
    .slice(0, maxTargets)
    .map((x) => x.unit);
}

function isWalkable(cell, moverUid) {
  if (cell.x < 0 || cell.x >= GRID_COLS || cell.y < 0 || cell.y >= GRID_ROWS) return false;
  return !state.units.some((u) => u.isAlive && u.uid !== moverUid && u.pos.x === cell.x && u.pos.y === cell.y);
}

function moveTowards(unit, target, maxSteps) {
  if (!target) return false;
  let moved = false;

  for (let i = 0; i < maxSteps; i += 1) {
    const options = [
      { x: unit.pos.x + 1, y: unit.pos.y },
      { x: unit.pos.x - 1, y: unit.pos.y },
      { x: unit.pos.x, y: unit.pos.y + 1 },
      { x: unit.pos.x, y: unit.pos.y - 1 }
    ].filter((cell) => isWalkable(cell, unit.uid));

    if (!options.length) break;

    const best = options.sort((a, b) => manhattan(a, target.pos) - manhattan(b, target.pos))[0];
    if (manhattan(best, target.pos) >= manhattan(unit.pos, target.pos)) break;

    unit.pos = best;
    moved = true;
  }

  return moved;
}

async function animateMoveTowards(unit, target, maxSteps, msPerStep = 240) {
  if (!target) return false;
  let moved = false;

  for (let i = 0; i < maxSteps; i += 1) {
    const options = [
      { x: unit.pos.x + 1, y: unit.pos.y },
      { x: unit.pos.x - 1, y: unit.pos.y },
      { x: unit.pos.x, y: unit.pos.y + 1 },
      { x: unit.pos.x, y: unit.pos.y - 1 }
    ].filter((cell) => isWalkable(cell, unit.uid));

    if (!options.length) break;

    const best = options.sort((a, b) => manhattan(a, target.pos) - manhattan(b, target.pos))[0];
    if (manhattan(best, target.pos) >= manhattan(unit.pos, target.pos)) break;

    unit.pos = best;
    moved = true;
    renderAll();
    await sleep(msPerStep);
  }

  return moved;
}

function moveStraightToward(unit, target, maxSteps) {
  if (!target) return false;
  const dx = Math.sign(target.pos.x - unit.pos.x);
  const dy = Math.sign(target.pos.y - unit.pos.y);
  const axisX = Math.abs(target.pos.x - unit.pos.x) >= Math.abs(target.pos.y - unit.pos.y);
  let moved = false;

  for (let i = 0; i < maxSteps; i += 1) {
    const next = axisX
      ? { x: unit.pos.x + dx, y: unit.pos.y }
      : { x: unit.pos.x, y: unit.pos.y + dy };

    if (!isWalkable(next, unit.uid)) break;
    unit.pos = next;
    moved = true;
    if (manhattan(unit.pos, target.pos) <= 1) break;
  }

  return moved;
}

function pushTargetFromAttacker(attacker, target, cells) {
  const dx = Math.sign(target.pos.x - attacker.pos.x);
  const dy = Math.sign(target.pos.y - attacker.pos.y);

  for (let i = 0; i < cells; i += 1) {
    const next = { x: target.pos.x + dx, y: target.pos.y + dy };
    if (!isWalkable(next, target.uid)) return;
    target.pos = next;
  }
}

function resolveAbility(actor, target, ability) {
  switch (ability.kind) {
    case "damage":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      return true;
    case "multi_damage": {
      const enemies = pickNearestUnits(actor, aliveUnits(enemyTeam(actor.team)), ability.maxTargets, ability.range);
      if (!enemies.length) return false;
      enemies.forEach((enemy) => applyDamage(actor, enemy, ability));
      return true;
    }
    case "aoe_all": {
      aliveUnits(enemyTeam(actor.team)).forEach((enemy) => applyDamage(actor, enemy, ability));
      return true;
    }
    case "aoe_cone": {
      const enemies = pickNearestUnits(actor, aliveUnits(enemyTeam(actor.team)), 3, ability.range);
      if (!enemies.length) return false;
      enemies.forEach((enemy) => applyDamage(actor, enemy, ability));
      pushLog(`${actor.name} grita BROLY y entra el perro.`, "ok");
      return true;
    }
    case "stun":
      if (!canHitTarget(actor, target, ability)) return false;
      if (Math.random() < ability.stunChance) {
        target.statuses.stunned = 1;
        pushLog(`${target.name} queda pensando el acertijo y pierde turno.`, "ok");
      } else {
        pushLog(`${target.name} resolvio el acertijo.`, "warn");
      }
      if (Math.random() < ability.allyConfuseChance) {
        const allies = aliveUnits(actor.team).filter((u) => u.uid !== actor.uid);
        const accidental = allies[Math.floor(Math.random() * allies.length)];
        if (accidental) {
          accidental.statuses.stunned = 1;
          pushLog(`El acertijo tambien confunde a ${accidental.name}.`, "bad");
        }
      }
      return true;
    case "heal":
      if (!canHitTarget(actor, target, ability)) return false;
      applyHeal(actor, target, ability.healPower);
      return true;
    case "heal_self":
      applyHeal(actor, actor, ability.healPower);
      return true;
    case "heal_all":
      aliveUnits(actor.team).forEach((ally) => applyHeal(actor, ally, ability.healPower));
      return true;
    case "gula_reduce_all":
      aliveUnits(actor.team).forEach((ally) => reduceGula(ally, ability.gulaReduce));
      pushLog(`${actor.name} reparte criollitos. El grupo reduce su Gula.`, "ok");
      return true;
    case "delivery_dash":
      moveTowards(actor, target, ability.dashCells || 0);
      if (!canHitTarget(actor, target, { ...ability, range: 1 })) return false;
      applyDamage(actor, target, ability);
      return true;
    case "greasy_throw":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      if (target.isAlive) {
        target.statuses.movePenalty = Math.max(target.statuses.movePenalty, ability.duration || 1);
        pushLog(`${target.name} queda grasoso y se mueve menos.`, "warn");
      }
      return true;
    case "buff_str_radius": {
      const affected = aliveUnits(actor.team).filter((unit) => manhattan(unit.pos, actor.pos) <= ability.range);
      if (!affected.length) return false;
      affected.forEach((unit) => {
        unit.statuses.buffTurns = Math.max(unit.statuses.buffTurns, ability.duration);
        unit.statuses.buff.strFlat = (unit.statuses.buff.strFlat || 0) + ability.strBonus;
      });
      pushLog(`${actor.name} mejora la fuerza de los zombies cercanos.`, "bad");
      return true;
    }
    case "push_damage":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      if (target.isAlive) pushTargetFromAttacker(actor, target, ability.pushCells || 1);
      return true;
    case "sweep_adjacent": {
      const impacted = aliveUnits(enemyTeam(actor.team)).filter((unit) => manhattan(unit.pos, actor.pos) <= 1);
      if (!impacted.length) return false;
      impacted.forEach((unit) => {
        applyDamage(actor, unit, ability);
        if (unit.isAlive) unit.statuses.movePenalty = Math.max(unit.statuses.movePenalty, ability.duration || 1);
      });
      return true;
    }
    case "summon_spiders": {
      const currentSpiders = state.units.filter((unit) => unit.isAlive && unit.templateId === "arana_comun").length;
      const room = Math.max(0, (ability.maxSpiders || 4) - currentSpiders);
      const spiderTpl = findTemplate("arana_comun", "enemy");
      let spawned = 0;
      for (let index = 0; index < Math.min(ability.summonCount || 2, room); index += 1) {
        if (spawnUnitNear(spiderTpl, actor)) spawned += 1;
      }
      pushLog(`${actor.name} invoca ${spawned} arana(s).`, "bad");
      return true;
    }
    case "aoe_burn": {
      if (!canHitTarget(actor, target, ability)) return false;
      const impacted = aliveUnits(enemyTeam(actor.team)).filter((unit) => manhattan(unit.pos, target.pos) <= 1);
      if (!impacted.length) return false;
      impacted.forEach((unit) => applyDamage(actor, unit, ability));
      return true;
    }
    case "delegate": {
      if (!canHitTarget(actor, target, ability)) return false;
      const ally = aliveUnits(actor.team).find((u) => u.uid !== actor.uid);
      if (!ally) return false;
      pushLog(`${actor.name} delega el ataque en ${ally.name}.`, "ok");
      applyDamage(ally, target, { ...ally.abilities.basic, name: `${ally.abilities.basic.name} (delegado)` });
      return true;
    }
    case "taunt":
      aliveUnits(enemyTeam(actor.team)).forEach((enemy) => {
        enemy.statuses.tauntedBy = actor.uid;
        enemy.statuses.tauntTurns = ability.duration;
      });
      pushLog(`${actor.name} provoca a todos los enemigos.`, "ok");
      return true;
    case "execute":
      if (!canHitTarget(actor, target, ability)) return false;
      target.currentHp = 0;
      target.isAlive = false;
      handleOnDeath(target);
      pushLog(`${actor.name} elimina a ${target.name} de un golpe.`, "bad");
      return true;
    case "slow":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      target.statuses.movePenalty = ability.duration;
      pushLog(`${target.name} queda cansado y se mueve menos.`, "warn");
      return true;
    case "team_buff":
      aliveUnits(actor.team).forEach((ally) => {
        ally.statuses.buffTurns = ability.duration;
        ally.statuses.buff = { defensePct: 0.1, accuracyPct: 0.1, extraMove: 1, strFlat: 0 };
      });
      pushLog(`${actor.name} ordena al equipo: +defensa, +precision y +movimiento.`, "ok");
      return true;
    case "lulo_fury":
      aliveUnits(enemyTeam(actor.team)).forEach((enemy) => applyDamage(actor, enemy, ability));
      actor.statuses.skipTurn = 1;
      actor.currentHp = Math.max(1, actor.currentHp - 12);
      pushLog(`${actor.name} entra en furia, luego queda de resaca y pierde vida.`, "bad");
      return true;
    case "zurdo_basic":
      if (!canHitTarget(actor, target, ability)) return false;
      pushLog(`${actor.name} primera patada falla: no estaba bien parado.`, "warn");
      applyDamage(actor, target, { ...ability, power: Math.floor(ability.power * 0.5), forceHit: true });
      return true;
    case "infect_damage":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      if (target.isAlive && Math.random() < (ability.infectChance || 0)) {
        applyInfection(target, ability.infectTurns || 3, 3);
      }
      return true;
    case "web_slow":
      if (!canHitTarget(actor, target, ability)) return false;
      applyDamage(actor, target, ability);
      target.statuses.movePenalty = ability.duration || 1;
      pushLog(`${target.name} queda enredado por telarana.`, "warn");
      return true;
    case "aoe_infect": {
      if (!canHitTarget(actor, target, ability)) return false;
      const impacted = aliveUnits(enemyTeam(actor.team)).filter((u) => manhattan(u.pos, target.pos) <= 1);
      if (!impacted.length) return false;
      impacted.forEach((unit) => {
        applyDamage(actor, unit, ability);
        if (unit.isAlive && Math.random() < (ability.infectChance || 0)) {
          applyInfection(unit, ability.infectTurns || 3, 3);
        }
      });
      return true;
    }
    case "charge_strike": {
      moveTowards(actor, target, 2);
      if (!canHitTarget(actor, target, { ...ability, range: 1 })) return false;
      pushLog(`${actor.name} embiste violentamente.`, "warn");
      applyDamage(actor, target, ability);
      return true;
    }
    case "dash_strike": {
      moveStraightToward(actor, target, 5);
      if (!canHitTarget(actor, target, { ...ability, range: 1 })) return false;
      pushLog(`${actor.name} corre sin control.`, "warn");
      applyDamage(actor, target, ability);
      if (target.isAlive) pushTargetFromAttacker(actor, target, 1);
      return true;
    }
    case "nothing":
      pushLog(`${actor.name} no hace nada. Literal.`, "warn");
      return true;
    default:
      pushLog("Tipo de habilidad no implementado.", "warn");
      return false;
  }
}

function spendCharge(actor, abilityKey) {
  if (abilityKey === "special") actor.charge.special = 0;
  if (abilityKey === "ultimate") actor.charge.ultimate = 0;
}

function useAbility(abilityKey, forcedTargetId = null) {
  if (!state.battleStarted) return false;
  if (state.actionUsed) return false;

  const actor = getUnit(state.activeUnitId);
  if (!actor || !actor.isAlive) return false;

  const ability = actor.abilities[abilityKey];
  if (!ability) return false;

  if (abilityKey === "special" && actor.charge.special < ability.chargeNeeded) return false;
  if (abilityKey === "ultimate" && actor.charge.ultimate < ability.chargeNeeded) return false;

  if (abilityKey === "special" && gulaBlocksSpecial(actor)) {
    if (actor.controller === "human") pushLog(`${actor.name} tiene demasiada hambre para usar ${ability.name}.`, "warn");
    return false;
  }
  if (abilityKey === "ultimate" && gulaBlocksUltimate(actor)) {
    if (actor.controller === "human") pushLog(`${actor.name} esta en Gula maxima y no puede usar ${ability.name}.`, "warn");
    return false;
  }

  const selected = forcedTargetId !== null ? forcedTargetId : els.targetSelect.value;
  if (!["none", "allies", "enemies", "self"].includes(ability.target) && !selected) {
    if (actor.controller === "human") pushLog("Debes elegir objetivo.", "warn");
    return false;
  }

  const target = getUnit(selected);
  const applied = resolveAbility(actor, target, ability);
  if (!applied) {
    if (actor.controller === "human") pushLog("Objetivo fuera de alcance o invalido.", "warn");
    return false;
  }

  spendCharge(actor, abilityKey);
  state.actionUsed = true;

  if (actor.controller === "human") {
    const actionGula = abilityKey === "special" ? 5 : abilityKey === "ultimate" ? 10 : 0;
    const smokingGula = ability.smoking ? (ability.smokingGula || 10) : 0;
    addGula(actor, actionGula + smokingGula);
  }

  if (ability.voice && Math.random() < 0.5) {
    pushLog(`${actor.name} grita ${ability.voice}.`, "ok");
  }

  renderAll();
  checkBattleEnd();
  return true;
}

function chooseAiTarget(actor) {
  const enemies = aliveUnits(enemyTeam(actor.team));
  if (!enemies.length) return null;

  if (actor.statuses.tauntedBy) {
    const taunter = getUnit(actor.statuses.tauntedBy);
    if (taunter && taunter.isAlive) return taunter;
  }

  if (actor.ai === "cazador") {
    return enemies.sort((a, b) => a.currentHp - b.currentHp)[0];
  }

  if (actor.ai === "hostigador") {
    return enemies.sort((a, b) => b.currentHp - a.currentHp)[0];
  }

  return enemies
    .map((u) => ({ unit: u, d: manhattan(actor.pos, u.pos) }))
    .sort((a, b) => a.d - b.d)[0].unit;
}

function pickAiTargetForAbility(actor, ability) {
  if (ability.target === "self") return actor.uid;
  if (["allies", "enemies", "none"].includes(ability.target)) return "";

  if (ability.target === "ally") {
    const allies = aliveUnits(actor.team).filter((u) => u.uid !== actor.uid);
    if (!allies.length) return actor.uid;
    const mostWounded = allies.sort(
      (a, b) => a.currentHp / a.stats.hp - b.currentHp / b.stats.hp
    )[0];
    return mostWounded.uid;
  }

  const target = chooseAiTarget(actor);
  return target ? target.uid : "";
}

async function performAiTurn(aiUid) {
  const actor = getUnit(aiUid);
  if (!state.battleStarted || !actor || !actor.isAlive || actor.uid !== state.activeUnitId) return;
  const timing = getAiTiming();

  const target = chooseAiTarget(actor);
  if (!target) {
    pushLog(`${actor.name} no encuentra objetivo.`, "warn");
    await sleep(timing.noTarget);
    endTurn();
    return;
  }

  state.aiPlan = { activeUid: actor.uid, step: "move" };
  renderAll();
  await sleep(timing.preMove);

  const moveCells = effectiveMovementCells(actor);
  const moved = await animateMoveTowards(actor, target, moveCells, timing.moveStep);
  state.movedThisTurn = moved;
  renderAll();
  await sleep(timing.postAction);

  const order = [];
  if (actor.charge.ultimate >= actor.abilities.ultimate.chargeNeeded) order.push("ultimate");
  if (actor.charge.special >= actor.abilities.special.chargeNeeded) order.push("special");
  order.push("basic");

  let used = false;
  for (const key of order) {
    state.aiPlan = { activeUid: actor.uid, step: key };
    renderAll();
    await sleep(timing.preAction);

    const ability = actor.abilities[key];
    const targetId = pickAiTargetForAbility(actor, ability);
    used = useAbility(key, targetId);
    if (used) break;
  }

  if (!used) {
    pushLog(`${actor.name} duda y no ejecuta un ataque valido.`, "warn");
  }

  state.aiPlan = { activeUid: actor.uid, step: "" };
  renderAll();
  await sleep(timing.postAction);
  endTurn();
}

function endTurn() {
  const active = getUnit(state.activeUnitId);
  if (active) {
    active.charge.special = Math.min(active.abilities.special.chargeNeeded, active.charge.special + 1);
    active.charge.ultimate = Math.min(active.abilities.ultimate.chargeNeeded, active.charge.ultimate + 1);
  }

  state.turnIndex += 1;
  beginTurn();
}

function canReachCell(unit, cell) {
  const move = effectiveMovementCells(unit);
  const distance = manhattan(unit.pos, cell);
  return distance <= move;
}

function renderGrid() {
  els.grid.innerHTML = "";
  const active = getUnit(state.activeUnitId);

  let previewRange = 0;
  let previewAbility = null;
  if (active && active.controller === "human") {
    if (state.preview.mode === "move") {
      previewRange = effectiveMovementCells(active);
    }
    if (state.preview.mode === "ability" && state.preview.abilityKey) {
      previewAbility = active.abilities[state.preview.abilityKey] || null;
      previewRange = previewAbility ? previewAbility.range : 0;
    }
  }

  for (let y = 0; y < GRID_ROWS; y += 1) {
    for (let x = 0; x < GRID_COLS; x += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);

      if (active && active.pos.x === x && active.pos.y === y) {
        cell.classList.add("active");
      }

      if (active && previewRange > 0) {
        const dist = manhattan(active.pos, { x, y });
        if (dist <= previewRange && !(active.pos.x === x && active.pos.y === y)) {
          cell.classList.add("preview-range");
        }
      }

      if (active && active.controller === "human" && !state.movedThisTurn && canReachCell(active, { x, y })) {
        cell.classList.add("reachable");
      }

      const occupant = state.units.find((u) => u.isAlive && u.pos.x === x && u.pos.y === y);
      if (occupant) {
        if (
          active &&
          previewAbility &&
          occupant.team !== active.team &&
          manhattan(active.pos, occupant.pos) <= (previewAbility.range || 0)
        ) {
          cell.classList.add("preview-target");
        }

        const unitEl = document.createElement("div");
        unitEl.className = `unit team${occupant.team}`;
        const icon = ICONS[occupant.templateId] || "🎮";
        unitEl.textContent = `${icon} ${occupant.name}\n${occupant.currentHp} HP`;
        unitEl.addEventListener("click", (ev) => {
          ev.stopPropagation();
          state.selectedUnitId = occupant.uid;
          renderDetails();
        });
        cell.appendChild(unitEl);
      }

      cell.addEventListener("click", () => {
        if (!active || !state.battleStarted || active.controller !== "human" || state.movedThisTurn) return;
        if (!canReachCell(active, { x, y })) return;
        if (!isWalkable({ x, y }, active.uid)) return;

        active.pos = { x, y };
        state.movedThisTurn = true;
        pushLog(`${active.name} se mueve a (${x}, ${y}).`, "ok");
        populateTargets();
        renderAll();
      });

      els.grid.appendChild(cell);
    }
  }
}

function formatStatuses(unit) {
  const bag = [];
  if (unit.statuses.skipTurn > 0) bag.push("salta turno");
  if (unit.statuses.stunned > 0) bag.push("aturdido");
  if (unit.statuses.movePenalty > 0) bag.push("cansado");
  if (unit.statuses.infectionTurns > 0) bag.push("infectado");
  if (unit.statuses.tauntTurns > 0) bag.push("provocado");
  if (unit.statuses.buffTurns > 0) bag.push("buff Ivan");
  return bag.length ? bag.join(", ") : "ninguno";
}

function renderDetails() {
  const unit = getUnit(state.selectedUnitId) || getUnit(state.activeUnitId);
  if (!unit) {
    els.unitDetails.textContent = "Selecciona una unidad en el tablero.";
    return;
  }

  const move = effectiveMovementCells(unit);
  const side = unit.controller === "human" ? "Jugador" : "IA";

  els.unitDetails.innerHTML = `
    <strong>${unit.name}</strong> (${unit.role})<br>
    Lado: ${side}<br>
    HP: ${unit.currentHp}/${unit.stats.hp}<br>
    STR ${unit.stats.strength} | DEF ${unit.stats.defense} | ACC ${unit.stats.accuracy} | SPD ${unit.stats.speed}<br>
    Movimiento actual: ${move} casillas<br>
    Carga especial: ${unit.charge.special}/${unit.abilities.special.chargeNeeded}<br>
    Carga habilidad: ${unit.charge.ultimate}/${unit.abilities.ultimate.chargeNeeded}<br>
    Gula: ${unit.gula ?? 0}<br>
    Estados: ${formatStatuses(unit)}
  `;
}

function gulaStateOf(value) {
  const safeValue = Number(value) || 0;
  if (safeValue >= 100) return "maxima";
  if (safeValue >= 80) return "mucha";
  if (safeValue >= 50) return "hambre";
  return "normal";
}

function gulaMovePenalty(unit) {
  if (unit.controller !== "human") return 0;
  if (unit.gula >= 80) return 2;
  if (unit.gula >= 50) return 1;
  return 0;
}

function gulaBlocksSpecial(unit) {
  return unit.controller === "human" && unit.gula >= 80;
}

function gulaBlocksUltimate(unit) {
  return unit.controller === "human" && unit.gula >= 100;
}

function checkGulaThresholdCross(unit, before) {
  const previous = gulaStateOf(before);
  const current = gulaStateOf(unit.gula);
  if (previous === current) return;
  const messages = {
    hambre: `${unit.name} empieza a sentir hambre (Gula ${unit.gula}).`,
    mucha: `${unit.name} tiene mucha hambre. Especial bloqueado.`,
    maxima: `${unit.name} llego a Gula maxima. Especial y habilidad bloqueados.`,
    normal: `${unit.name} vuelve a un nivel de Gula normal.`
  };
  pushLog(messages[current], current === "normal" ? "ok" : "bad");
}

function addGula(unit, amount) {
  if (!unit || unit.controller !== "human" || amount === 0) return;
  const before = unit.gula;
  unit.gula = Math.min(100, Math.max(0, unit.gula + amount));
  checkGulaThresholdCross(unit, before);
}

function reduceGula(unit, amount) {
  addGula(unit, -Math.abs(amount));
}

function renderGulaList() {
  const players = state.units.filter((u) => u.controller === "human");
  if (!players.length) {
    els.gulaList.innerHTML = "<small>Selecciona jugadores e inicia el combate.</small>";
    return;
  }

  els.gulaList.innerHTML = players
    .map((u) => {
      const st = gulaStateOf(u.gula);
      return `
        <div class="gula-row state-${st}">
          <span>${u.name}</span>
          <span class="gula-bar-wrap"><span class="gula-bar-fill"></span></span>
          <span>${u.gula}</span>
        </div>
      `;
    })
    .join("");

  els.gulaList.querySelectorAll(".gula-row").forEach((row, index) => {
    const unit = players[index];
    if (!unit) return;
    const fill = row.querySelector(".gula-bar-fill");
    if (fill) {
      fill.style.setProperty("--gula-width", `${Math.max(0, Math.min(100, Number(unit.gula || 0)))}%`);
    }
  });
}

function renderHeader() {
  els.roundValue.textContent = String(state.round);
  els.turnValue.textContent = state.turnOrder.length ? `${state.turnIndex + 1}/${state.turnOrder.length}` : "-";
  els.spiderValue.textContent = isSpiderAlive() ? "Si" : "No";

  const active = getUnit(state.activeUnitId);
  if (!active || !state.battleStarted) {
    els.activeUnitLabel.textContent = "Esperando inicio...";
  } else {
    const move = effectiveMovementCells(active);
    const tag = active.controller === "ai" ? "IA" : "Jugador";
    els.activeUnitLabel.textContent = `Turno de ${active.name} [${tag}] - mov ${move}`;
  }
}

function pushLog(text, type = "ok") {
  const line = document.createElement("p");
  line.className = "entry";
  line.innerHTML = `<span class="badge ${type}">${type.toUpperCase()}</span> ${text}`;
  els.log.prepend(line);
}

function renderAll() {
  renderHeader();
  renderGrid();
  renderActions();
  renderDetails();
  renderGulaList();
}

function wireEvents() {
  els.randomTeamsBtn.addEventListener("click", randomTeams);
  els.startBtn.addEventListener("click", startBattle);
  els.resetBtn.addEventListener("click", resetBattle);

  els.aiSpeedSelect.addEventListener("change", () => {
    state.aiSpeed = els.aiSpeedSelect.value;
    pushLog(`Velocidad IA ajustada a ${els.aiSpeedSelect.options[els.aiSpeedSelect.selectedIndex].text}.`, "ok");
  });

  els.houseResetBtn.addEventListener("click", () => {
    state.units.filter((u) => u.controller === "human").forEach((u) => { u.gula = 0; });
    pushLog("El grupo vuelve a la casa de Nico. La Gula se resetea para todos.", "ok");
    renderAll();
  });

  els.eatBtn.addEventListener("click", () => {
    const active = getUnit(state.activeUnitId);
    if (!state.battleStarted || !active || active.controller !== "human") {
      pushLog("Solo se puede comer en el turno de un personaje jugador.", "warn");
      return;
    }
    const amount = Number(els.foodSelect.value);
    reduceGula(active, amount);
    pushLog(`${active.name} come (${els.foodSelect.options[els.foodSelect.selectedIndex].text}).`, "ok");
    renderAll();
  });

  els.endTurnBtn.addEventListener("click", () => {
    const active = getUnit(state.activeUnitId);
    if (!state.battleStarted || !active || active.controller !== "human") return;
    endTurn();
    renderAll();
  });
}

setupSelectors();
wireEvents();
randomTeams();
renderPlayerStrip();
renderAll();
