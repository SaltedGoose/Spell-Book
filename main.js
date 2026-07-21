let character = {
    knownSpells : ["acid-splash", "blade-ward"]
}

let currentSpells = []

function showSpells(spellId, level){
    const spell = currentSpells.find(
        spell => spell.id === spellId
    );

    let damageDice = "";

    if (spell.effects !== "" && spell.effects.damage.dice) {
        for (const level in spell.effects.damage.dice) {
            const dice = spell.effects.damage.dice[level];

            damageDice += `
                <p class="fantasy-text-normal">
                    Level ${level}: ${dice}
                </p>
            `;
        }
    }

    let app = document.getElementById("app");
    app.innerHTML = `
        <img id="background-image"
            src="images/spell-book-background.png"
            alt="spell-book-background">

        <h1 id="spell-book-heading" class="enchanting-text" onclick=showLevel(${level})>${spell.name}</h1>
        <h2 id="spell-book-sub-heading" class="fantasy-text-normal">(${spell.name})</h2>
        <h2 id="spell-book-sub-heading" class="fantasy-text-normal">${spell.school}</h2>
        <div id="spell-details">
            <div class="spell-detail-div">
                <p class="fantasy-text-normal">Casting Time: ${spell.castingTime.value}</p>
                <p class="fantasy-text-normal" style="padding-bottom: 20px;">Range: ${spell.range.value}</p>
                <p class="fantasy-text-normal">Components:</p>
                <p class="fantasy-text-normal">Verbal: ${spell.components.verbal}</p>
                <p class="fantasy-text-normal">Somatic: ${spell.components.somatic}</p>
                <p class="fantasy-text-normal">Material: ${spell.components.material}</p>
                ${spell.components.material
                    ?
                    `
                    <p class="fantasy-text-normal" style="padding-bottom: 20px;">Material Description: ${spell.components.materialDescription}</p>
                    <p class="fantasy-text-normal">Duration: ${spell.duration.concentration ? "Concentration - " : ""}${spell.duration.value}</p>
                    `
                    :
                    `
                    <p class="fantasy-text-normal" style="padding-bottom: 20px;">Duration: ${spell.duration.concentration ? "Concentration - " : ""}${spell.duration.value}</p>
                    `
                }
            </div>
            <div class="spell-detail-div">
                ${spell.effects != "" ? `
                <p class="fantasy-text-normal">Damage:</p>
                ${damageDice}
                <p class="fantasy-text-normal" style="padding-top: 10px;">Type: ${spell.effects.type}</p>
                <div id="toHitDiv">
                    ${spell.toHitThrow != "" ? 
                        `<p class="fantasy-text-normal">ToHit: ${spell.effects.toHitThrow}</p>`:""
                    }
                    ${spell.effects.savingThrow != "" ?
                        `<p class="fantasy-text-normal">SavingThrow: ${spell.effects.savingThrow}</p>`:""
                    }
                    ${spell.effects.areaOfEffect != "" ?
                        `<p class="fantasy-text-normal">Area of Effect: ${spell.effects.areaOfEffect.shape} - ${spell.effects.areaOfEffect.size}</p>`:""
                    }
                </div>
                ` : ""}
            </div>
            <div class="spell-detail-div" id="description-div">
                    <div id="description-div-text">
                        <p class="fantasy-text-normal" style="padding-bottom: 10px;">${spell.description}</p>
                        <p class="fantasy-text-normal">${spell.higherLevels}</p>
                    </div>
                    <div id=image-div>
                        <img src="images/Mythrax-Tempestborn.png">
                    </div>
            </div>
        </div>
    `;
}

async function showLevel(level){
    const response = await fetch(`jsons/level-${level}.json`);
    const spells = await response.json();

    const knownSpells = spells.filter(spell =>
        character.knownSpells.includes(spell.id)
    );

    currentSpells = knownSpells;

    const spellButtons = knownSpells.map(spell => {
        return `
            <button onclick="showSpells('${spell.id}', '${level}')" class="fantasy-text-normal">
                ${spell.name}
            </button>
        `;
    }).join("");

    let app = document.getElementById("app");
    app.innerHTML = `
        <img id="background-image"
            src="images/spell-book-background.png"
            alt="spell-book-background">

        <h1 id="spell-book-heading" class="fantasy-text-heading" onclick=showContents()>Mythrax Tempestborn's Book of Spells</h1>

        <div id="spell-list">
            ${spellButtons}
        </div>
    `;
}

function showContents(){
    let app = document.getElementById("app");
    app.innerHTML = `
        <img id="background-image" src="images/spell-book-background.png" alt="spell-book-background">
        <h1 id="spell-book-heading" class="fantasy-text-heading">Mythrax Tempestborn's Book of Spells</h1>

        <div id="level-list">
            <button onclick="showLevel(0)" class="fantasy-text-normal">Cantrips...</button>
            <button onclick="showLevel(1)" class="fantasy-text-normal">Level I Spells...</button>
            <button onclick="showLevel(2)" class="fantasy-text-normal">Level II Spells...</button>
            <button onclick="showLevel(3)" class="fantasy-text-normal">Level III Spells...</button>
            <button onclick="showLevel(4)" class="fantasy-text-normal">Level IV Spells...</button>
            <button onclick="showLevel(5)" class="fantasy-text-normal">Level V Spells...</button>
            <button onclick="showLevel(6)" class="fantasy-text-normal">Level VI Spells...</button>
            <button onclick="showLevel(7)" class="fantasy-text-normal">Level VII Spells...</button>
            <button onclick="showLevel(8)" class="fantasy-text-normal">Level VIII Spells...</button>
            <button onclick="showLevel(9)" class="fantasy-text-normal">Level IX Spells...</button>
        </div>
    `
}

showContents()

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register(
        "./service-worker.js"
    );

}