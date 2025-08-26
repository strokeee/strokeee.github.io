//base values
    let credits = 10000;
    let energy = 95;
    let batteryCapacity = 100;
    let miners = 1;
    let refineries = 1;

    const creditsDisplay = document.getElementById('credits');
    const energyDisplay = document.getElementById('energy');
    const minersDisplay = document.getElementById('miners');
    const refineriesDisplay = document.getElementById('refineries');

//ore
    let oreCoal = 1000;
    let oreIron = 1000;
    let oreSilver = 1000;
    let oreGold = 1000;

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
        creditsDisplay.textContent = `Credits: ${credits}`;
        energyDisplay.textContent = `Energy: ${energy}/${batteryCapacity}`;
        minersDisplay.textContent = `Miners: ${miners}`;
        refineriesDisplay.textContent = `Refineries: ${refineries}`;

        oreCoalDisplay.textContent = `Coal Ore: ${oreCoal}T`;
        oreIronDisplay.textContent = `Iron Ore: ${oreIron}T`;
        oreGoldDisplay.textContent = `Gold Ore: ${oreGold}T`;
        oreSilverDisplay.textContent = `Silver Ore: ${oreSilver}T`;

        ironDisplay.textContent = `Iron: ${iron}T`;
        silverDisplay.textContent = `Silver: ${silver}T`;
        goldDisplay.textContent = `Gold: ${gold}T`;
    }

updateDisplays();

// Event listeners for buttons
const startMining = document.getElementById('startMining');

startMining.addEventListener("click", () => {
    oreArray = [
        oreCoal,
        oreIron,
        oreSilver,
        oreGold
    ]

    miningSpeed = setInterval(() => {
        randomOre = Math.floor(Math.random() * 4) + 1;
        switch (randomOre) {
            case 1:
                oreCoal += (minersOutput * miners) * 1;
                energy -= energyConsumption * miners;
                break;
            case 2:
                oreIron += (minersOutput * miners) * 0.5;
                energy -= energyConsumption * miners;
                break;
            case 3:
                oreSilver += (minersOutput * miners) * 0.25;
                energy -= energyConsumption * miners;
                break;
            case 4:
                oreGold += (minersOutput * miners) * 0.1;
                energy -= energyConsumption * miners;
                break;
        }
        if (energy <= 0) {
            energy = 0;
            alert("Brak energii");
            clearInterval(miningSpeed);
        }
        updateDisplays();
    }, workSpeed); //NOWE zamiast manulanie wpisanej wartości wpisałem workSpeed-------------------------------------------
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

let workSpeed = 1000;
let refineRequirement = 1;
let refineOutput = 0.1;

let energyProduced = 10;
let energyConsumption = 0.5;
let coalConsumption = 1;

const startEnergy = document.getElementById('startEnergy');

startEnergy.addEventListener("click", () => {
    energyProduction = setInterval(() => {
        if (energy < batteryCapacity && oreCoal > 0) {
            energy += energyProduced;
            oreCoal -= coalConsumption;
            if (energy > batteryCapacity) {
                energy = batteryCapacity;
            }
            updateDisplays();
        }
        else {
            clearInterval(energyProduction);
        }
    }, workSpeed);
});

const startRefining = document.getElementById('startRefining');

startRefining.addEventListener("click", () => {
    refining = setInterval(() => {
        if (oreIron >= refineRequirement && refineries > 0) {
            oreIron -= refineRequirement;
            iron += refineOutput * refineries;
            energy -= energyConsumption;
        }
        if (oreSilver >= refineRequirement && refineries > 0) {
            oreSilver -= refineRequirement;
            silver += refineOutput * refineries;
            energy -= energyConsumption;
        }
        if (oreGold >= refineRequirement && refineries > 0) {
            oreGold -= refineRequirement;
            gold += refineOutput * refineries;
            energy -= energyConsumption;
        }

        if (energy <= 0) {
            energy = 0;
            alert("Brak energii");
            clearInterval(refining);
        }
        updateDisplays();
    }, workSpeed);
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


