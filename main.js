let character = {
    knownSpells: [
        "acid-splash",
        "blade-ward"
    ]
};

let currentSpells = [];


// ========================================
// HELPER FUNCTIONS
// ========================================

function showIfExists(label, value) {

    if (value === undefined || value === null || value === "") {
        return "";
    }

    return `
        <p class="spell-text fantasy-text-normal">
            ${label}: ${value}
        </p>
    `;
}


function showDamage(damage) {

    if (!damage || !damage.dice) {
        return "";
    }

    let damageDice = "";

    for (const level in damage.dice) {

        const dice = damage.dice[level];

        if (!dice) {
            continue;
        }

        damageDice += `
            <p class="spell-text fantasy-text-normal">
                Level ${level}: ${dice}
            </p>
        `;
    }

    if (damageDice === "") {
        return "";
    }

    return `
        <p class="spell-text fantasy-text-normal">
            Damage:
        </p>

        ${damageDice}

        ${
            damage.type
            ?
            `
            <p class="spell-text fantasy-text-normal">
                Type: ${damage.type}
            </p>
            `
            :
            ""
        }
    `;
}


function showAreaOfEffect(areaOfEffect) {

    if (!areaOfEffect || areaOfEffect === "") {
        return "";
    }

    if (!areaOfEffect.shape || !areaOfEffect.size) {
        return "";
    }

    return `
        <p class="spell-text fantasy-text-normal">
            Area of Effect:
            ${areaOfEffect.shape} -
            ${areaOfEffect.size}
        </p>
    `;
}


// ========================================
// SHOW SPELL
// ========================================

function showSpells(spellId, level) {

    const spell = currentSpells.find(
        spell => spell.id === spellId
    );

    if (!spell) {
        console.error("Spell not found:", spellId);
        return;
    }

    const effects = spell.effects || {};

    let app = document.getElementById("app");

    app.innerHTML = `

        <img
            id="background-image"
            src="images/spell-book-background.png"
            alt="spell-book-background"
        >


        <!-- SPELL NAME -->

        <h1
            id="spell-book-heading"
            class="enchanting-text"
            onclick="showLevel(${level})">

            ${spell.name || "Unknown Spell"}

        </h1>

        <h2 id="spell-book-sub-heading" class="fantasy-text-normal">
            (${spell.name})
        </h2>


        <!-- SCHOOL -->

        ${
            spell.school
            ?
            `
            <h2
                id="spell-book-sub-heading"
                class="fantasy-text-normal">

                ${spell.school}

            </h2>
            `
            :
            ""
        }


        <div id="spell-details">


            <!-- ======================================== -->
            <!-- BASIC INFORMATION -->
            <!-- ======================================== -->

            <div class="spell-detail-div">


                <!-- CASTING TIME -->

                ${
                    spell.castingTime
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">
                        Casting Time:
                        ${spell.castingTime.value || ""}
                    </p>
                    `
                    :
                    ""
                }


                <!-- RANGE -->

                ${
                    spell.range
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">
                        Range:
                        ${spell.range.value || ""}
                    </p>
                    `
                    :
                    ""
                }


                <!-- COMPONENTS -->

                ${
                    spell.components
                    ?
                    `

                    <p class="spell-text fantasy-text-normal">
                        Components:
                    </p>


                    ${
                        spell.components.verbal
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            Verbal:
                            ${spell.components.verbal}
                        </p>
                        `
                        :
                        ""
                    }


                    ${
                        spell.components.somatic
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            Somatic:
                            ${spell.components.somatic}
                        </p>
                        `
                        :
                        ""
                    }


                    ${
                        spell.components.material
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            Material:
                            ${spell.components.material}
                        </p>
                        `
                        :
                        ""
                    }


                    ${
                        spell.components.material &&
                        spell.components.materialDescription
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            Material Description:
                            ${spell.components.materialDescription}
                        </p>
                        `
                        :
                        ""
                    }

                    `
                    :
                    ""
                }


                <!-- DURATION -->

                ${
                    spell.duration
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">

                        Duration:

                        ${
                            spell.duration.concentration
                            ?
                            "Concentration - "
                            :
                            ""
                        }

                        ${spell.duration.value || ""}

                    </p>
                    `
                    :
                    ""
                }


                <!-- RITUAL -->

                ${
                    spell.ritual
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">
                        Ritual: Yes
                    </p>
                    `
                    :
                    ""
                }

            </div>


            <!-- ======================================== -->
            <!-- SPELL EFFECTS -->
            <!-- ======================================== -->

            <div class="spell-detail-div">


                <!-- DAMAGE -->

                ${showDamage(effects.damage)}


                <!-- TO HIT -->

                ${
                    effects.toHitThrow
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">
                        To Hit:
                        ${effects.toHitThrow}
                    </p>
                    `
                    :
                    ""
                }


                <!-- SAVING THROW -->

                ${
                    effects.savingThrow
                    ?
                    `
                    <p class="spell-text fantasy-text-normal">
                        Saving Throw:
                        ${effects.savingThrow}
                    </p>
                    `
                    :
                    ""
                }


                <!-- AREA OF EFFECT -->

                ${showAreaOfEffect(
                    effects.areaOfEffect
                )}

            </div>


            <!-- ======================================== -->
            <!-- DESCRIPTION -->
            <!-- ======================================== -->

            <div
                class="spell-detail-div"
                id="description-div">


                <div id="description-div-text">


                    ${
                        Array.isArray(spell.description)
                        ?

                        spell.description
                            .map(paragraph => `
                                <p class="spell-text fantasy-text-normal">
                                    ${paragraph}
                                </p>
                            `)
                            .join("")

                        :

                        spell.description
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            ${spell.description}
                        </p>
                        `
                        :
                        ""
                    }


                    <!-- HIGHER LEVELS -->

                    ${
                        spell.higherLevels
                        ?
                        `
                        <p class="spell-text fantasy-text-normal">
                            ${spell.higherLevels}
                        </p>
                        `
                        :
                        ""
                    }

                </div>


                <!-- SPELL IMAGE -->

                <div id="image-div">

                    ${
                        spell.image
                        ?
                        `
                        <img
                            src="${spell.image}"
                            alt="${spell.name || "Spell"}"
                        >
                        `
                        :
                        `
                        <img
                            src="images/Mythrax-Tempestborn.png"
                            alt="Mythrax Tempestborn"
                        >
                        `
                    }

                </div>

            </div>

        </div>
    `;
}


// ========================================
// SHOW SPELL LEVEL
// ========================================

async function showLevel(level) {

    try {

        const response = await fetch(
            `jsons/level-${level}.json`
        );


        // Check if the JSON file exists

        if (!response.ok) {

            throw new Error(
                `Failed to load level-${level}.json: ${response.status}`
            );

        }


        const spells = await response.json();


        // Find spells the character knows

        const knownSpells = spells.filter(
            spell =>
                character.knownSpells.includes(spell.id)
        );


        currentSpells = knownSpells;


        // Create spell buttons

        const spellButtons = knownSpells
            .map(spell => {

                return `
                    <button
                        onclick="showSpells('${spell.id}', ${level})"
                        class="fantasy-text-normal">

                        ${spell.name}

                    </button>
                `;

            })
            .join("");


        let app = document.getElementById("app");


        app.innerHTML = `

            <img
                id="background-image"
                src="images/spell-book-background.png"
                alt="spell-book-background"
            >


            <h1
                id="spell-book-heading"
                class="fantasy-text-heading"
                onclick="showContents()">

                Mythrax Tempestborn's Book of Spells

            </h1>


            <div id="spell-list">

                ${
                    spellButtons
                    ||
                    `
                    <p class="spell-text fantasy-text-normal">
                        No known spells at this level.
                    </p>
                    `
                }

            </div>

        `;

    }


    catch (error) {

        console.error(
            "Error loading spell level:",
            error
        );

    }
}


// ========================================
// SHOW CONTENTS
// ========================================

function showContents() {

    let app = document.getElementById("app");


    app.innerHTML = `

        <img
            id="background-image"
            src="images/spell-book-background.png"
            alt="spell-book-background"
        >


        <h1
            id="spell-book-heading"
            class="fantasy-text-heading">

            Mythrax Tempestborn's Book of Spells

        </h1>


        <div id="level-list">


            <button
                onclick="showLevel(0)"
                class="fantasy-text-normal">

                Cantrips...

            </button>


            <button
                onclick="showLevel(1)"
                class="fantasy-text-normal">

                Level I Spells...

            </button>


            <button
                onclick="showLevel(2)"
                class="fantasy-text-normal">

                Level II Spells...

            </button>


            <button
                onclick="showLevel(3)"
                class="fantasy-text-normal">

                Level III Spells...

            </button>


            <button
                onclick="showLevel(4)"
                class="fantasy-text-normal">

                Level IV Spells...

            </button>


            <button
                onclick="showLevel(5)"
                class="fantasy-text-normal">

                Level V Spells...

            </button>


            <button
                onclick="showLevel(6)"
                class="fantasy-text-normal">

                Level VI Spells...

            </button>


            <button
                onclick="showLevel(7)"
                class="fantasy-text-normal">

                Level VII Spells...

            </button>


            <button
                onclick="showLevel(8)"
                class="fantasy-text-normal">

                Level VIII Spells...

            </button>


            <button
                onclick="showLevel(9)"
                class="fantasy-text-normal">

                Level IX Spells...

            </button>


        </div>

    `;
}


// ========================================
// START APPLICATION
// ========================================

showContents();


// ========================================
// SERVICE WORKER
// ========================================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register(
        "./service-worker.js"
    );

}