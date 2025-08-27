//base values
    let credits = 0;
    let energy = 100;
    let batteryCapacity = 100;
    let miners = 1;
    let refineries = 1;

    const creditsDisplay = document.getElementById('credits');
    const energyDisplay = document.getElementById('energy');
    const minersDisplay = document.getElementById('miners');
    const refineriesDisplay = document.getElementById('refineries');

//ore
    let oreCoal = 0;
    let oreIron = 0;
    let oreSilver = 0;
    let oreGold = 0;

    const oreCoalDisplay = document.getElementById('oreCoal');
    const oreIronDisplay = document.getElementById('oreIron');
    const oreSilverDisplay = document.getElementById('oreSilver');
    const oreGoldDisplay = document.getElementById('oreGold');
//commodities
    let iron = 0;
    let silver = 0;
    let gold = 0;

    const ironDisplay = document.getElementById('iron');
    const silverDisplay = document.getElementById('silver');
    const goldDisplay = document.getElementById('gold');

//buttons
    const mineButton = document.getElementById('mine');
    const refineButton = document.getElementById('refine');
    const buyMinerButton = document.getElementById('buyMiner');
    const buyRefineryButton = document.getElementById('buyRefinery');

//functions
    function updateDisplays() {
        creditsDisplay.textContent = `Credits: ${credits.toFixed(2)}`;
        energyDisplay.textContent = `Energy: ${energy.toFixed(0)}/${batteryCapacity.toFixed(0)}`;
        minersDisplay.textContent = `Miners: ${miners.toFixed(0)}`;
        refineriesDisplay.textContent = `Refineries: ${refineries.toFixed(0)}`;

        oreCoalDisplay.textContent = `Coal Ore: ${oreCoal.toFixed(2)}T`;
        oreIronDisplay.textContent = `Iron Ore: ${oreIron.toFixed(2)}T`;
        oreGoldDisplay.textContent = `Gold Ore: ${oreGold.toFixed(2)}T`;
        oreSilverDisplay.textContent = `Silver Ore: ${oreSilver.toFixed(2)}T`;

        ironDisplay.textContent = `Steel: ${iron.toFixed(2)}T`;
        silverDisplay.textContent = `Silver: ${silver.toFixed(3)}T`;
        goldDisplay.textContent = `Gold: ${gold.toFixed(4)}T`;
    }

updateDisplays();

// Event listeners for buttons
const startMining = document.getElementById('startMining');

let miningActive = false;

startMining.addEventListener("click", () => {
    oreArray = [
        oreCoal,
        oreIron,
        oreSilver,
        oreGold
    ];

    if (!miningActive) {
        miningActive = true;
        startMining.textContent = "Mining...";
        miningSpeed = setInterval(() => {
            randomOre = Math.floor(Math.random() * 4) + 1;
            switch (randomOre) {
                case 1:
                    oreCoal += minersOutput * miners;
                    energy -= energyConsumption * miners;
                    break;
                case 2:
                    oreIron += minersOutput * miners;
                    energy -= energyConsumption * miners;
                    break;
                case 3:
                    oreSilver += minersOutput * miners;
                    energy -= energyConsumption * miners;
                    break;
                case 4:
                    oreGold += minersOutput * miners;
                    energy -= energyConsumption * miners;
                    break;
            }
            if (energy <= 0) {
                energy = 0;
                alert("Brak energii");
                clearInterval(miningSpeed);
                miningActive = false;
                startMining.textContent = "Start Mining";
            }
            updateDisplays();
        }, workSpeed);
    } else {
        miningActive = false;
        startMining.textContent = "Start Mining";
        clearInterval(miningSpeed);
    }
});


//==================VVVV NOWE DO DOPRACOWANIA VVV===============================================

// rafinerie i minery //NOWE kupowanie i ulepszanie=============================================
const minersBuy = document.getElementById('minersBuy');
const minersUpgrade = document.getElementById('minersUpgrade');

const refineriesBuy = document.getElementById('refineriesBuy');
const refineriesUpgrade = document.getElementById('refineriesUpgrade');

const minerLevelDisplay = document.getElementById('minerLevelDisplay');
const refineryLevelDisplay = document.getElementById('refineryLevelDisplay');

minersBuy.addEventListener("click", () => {
    if (credits >= 1000) {
        miners += 1;
        credits -= 1000;
        updateDisplays();
    } else {
        console.log("za mało kredytów");
    }
});

refineriesBuy.addEventListener("click", () => {
    if (credits >= 5000) {
        refineries += 1;
        credits -= 5000;
        updateDisplays();
    } else {
        console.log("za mało kredytów");
    }
});


// GENEROWANIE ENERGII=============================================
const startEnergy = document.getElementById('startEnergy');

let energyProductionActive = false;

let energyProductionSpeed = 500;
let energyProduced = 1;
let energyConsumption = 0.25;
let coalConsumption = 0.25;

startEnergy.addEventListener("click", () => {
    if (!energyProductionActive) {
        energyProductionActive = true;
        startEnergy.textContent = "Generating...";
        if (oreCoal > 0) {
            energyProduction = setInterval(() => {
                if (energy <= batteryCapacity -1) {
                    energy += energyProduced;
                    oreCoal -= coalConsumption;
                    updateDisplays();                    
                }
                if (energy >= batteryCapacity) {
                    energy = batteryCapacity;
                    updateDisplays();
                }
                if (oreCoal <= 0) {
                    alert("not enough coal");
                    energyProductionActive = false;
                    startEnergy.textContent = "Start Generators";
                    clearInterval(energyProduction);
                    updateDisplays();
                }
            },energyProductionSpeed);
        };

        if (oreCoal <= 0) {
            alert("not enough coal");
            energyProductionActive = false;
            startEnergy.textContent = "Start Generators";
            updateDisplays();
        }

    } else {
        energyProductionActive = false;
        startEnergy.textContent = "Start Generators";
        clearInterval(energyProduction);
    }
});

// RAFINACJA==============================================================

let workSpeed = 1000;
let refineRequirement = 1;
let refineOutput = 1;

const startRefining = document.getElementById('startRefining');

let refiningActive = false;

startRefining.addEventListener("click", () => {
    if (!refiningActive) {
        refiningActive = true;
        startRefining.textContent = "Refining...";
        refining = setInterval(() => {
            if (oreIron >= refineRequirement && refineries > 0) {
                oreIron -= refineRequirement;
                iron += (refineOutput * refineries) * 0.60;
                energy -= energyConsumption;
            }
            if (oreSilver >= refineRequirement && refineries > 0) {
                oreSilver -= refineRequirement;
                silver += (refineOutput * refineries) * 0.015;
                energy -= energyConsumption;
            }
            if (oreGold >= refineRequirement && refineries > 0) {
                oreGold -= refineRequirement;
                gold += (refineOutput * refineries) * 0.0002;
                energy -= energyConsumption;
            }
            if (energy <= 0) {
                alert("Brak energii");
                clearInterval(refining);
                refiningActive = false;
                startRefining.textContent = "Start Refining";
            }
            if (oreIron < refineRequirement && oreSilver < refineRequirement && oreGold < refineRequirement) {
                alert("There is not enough ore to refine");
                clearInterval(refining);
                refiningActive = false;
                startRefining.textContent = "Start Refining";
            }
            updateDisplays();
        }, workSpeed);
    } else {
        startRefining.textContent = "Start Refining"; 
        refiningActive = false;
        clearInterval(refining);
    }

});


let refineryLevel = 0;
let minerLevel = 0;

refineriesUpgrade.addEventListener("click", () => {
    if (credits >= 5000) {
        refineOutput = refineOutput * 1.25;
        refineRequirement = refineRequirement * 1.25;
        credits -= 5000;
        refineryLevelDisplay.textContent = `Refinery Level: ${refineryLevel += 1}`;
        updateDisplays();
    }
    else {
        console.log("za mało kredytów");
    }
});

let minersOutput = 1;

minersUpgrade.addEventListener("click", () => {
    if (credits >= 2500) {
        minersOutput = minersOutput * 1.25;
        credits -= 2500;
        minerLevelDisplay.textContent = `Miner Level: ${minerLevel += 1}`;
        updateDisplays();
    }
    else {
        console.log("za mało kredytów");
    }
});

//selling tab==============================================
const sellIronOre = document.getElementById('sellIronOre');
const sellSilverOre = document.getElementById('sellSilverOre');
const sellGoldOre = document.getElementById('sellGoldOre');
const sellIron = document.getElementById('sellIron');
const sellSilver = document.getElementById('sellSilver');
const sellGold = document.getElementById('sellGold');


// selling ore========
sellIronOre.addEventListener("click", () => {
    if (oreIron > 0) {
        credits += oreIron * 50;
        oreIron = 0;
        updateDisplays();
    } else {
        console.log("za mało ironOre");
    }
});

sellSilverOre.addEventListener("click", () => {
    if (oreSilver > 0) {
        credits += oreSilver * 100;
        oreSilver = 0;
        updateDisplays();
    } else {
        console.log("za mało silverOre");
    }
});

sellGoldOre.addEventListener("click", () => {
    if (oreGold > 1) {
        credits += oreGold * 200;
        oreGold = 0;
        updateDisplays();
    } else {
        console.log("za mało goldOre");
    }
});

// selling alloys========
sellIron.addEventListener("click", () => {
    if (iron > 0) {
        credits += iron * 1000; //za tonę
        iron = 0;
        updateDisplays();
    } else {
        console.log("za mało iron");
    }
});

sellSilver.addEventListener("click", () => {
    if (silver > 0) {
        credits += silver * 2500; //za tonę
        silver = 0;
        updateDisplays();
    } else {
        console.log("za mało silver");
    }
});

sellGold.addEventListener("click", () => {
    if (gold > 0) {
        credits += gold * 100000; //za tonę
        gold = 0;
        updateDisplays();
    } else {
        console.log("za mało gold");
    }
});