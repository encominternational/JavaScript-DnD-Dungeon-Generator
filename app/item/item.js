
import { rarity } from '/app/attribute/rarity';

const defaults = {
    rarity: rarity.average,
};

const config = [
    {
        name: 'Abacus',
    },
    {
        name: 'Acid',
        containers: [ 'vial', 'jar', 'flask', 'jug', 'barrel', 'vat' ],
    },
    {
        name: 'Alchemist’s fire',
        containers: [ 'jar', 'flask', 'barrel' ],
    },
    {
        name: 'Antitoxin',
        containers: [ 'jar', 'flask', 'barrel' ],
    },
    {
        name: 'Arcane focus',
        variants: [ 'Crystal', 'Orb', 'Rod', 'Staff', 'Wand' ],
    },
    {
        name: 'Backpack',
        capacity: 30,
    },
    {
        name: 'Ball bearings',
        quantity: [ 1, 1000 ],
    },
    { name: 'Barrel', },
    { name: 'Basket', },
    { name: 'Bedroll', },
    { name: 'Bell', },
    { name: 'Blanket', },
    { name: 'Block and tackle', },
    { name: 'Book', },
    { name: 'Bottle, glass', },
    { name: 'Bucket', },
    { name: 'Caltrops (bag of 20)', },
    { name: 'Candle', },
    { name: 'Case, crossbow bolt', },
    { name: 'Case, map or scroll', },
    { name: 'Chain', },
    { name: 'Chalk', },
    { name: 'Chest', },
    { name: 'Climber’s kit', },
    { name: 'Clothes, common', },
    { name: 'Clothes, costume', },
    { name: 'Clothes, fine', },
    { name: 'Clothes, traveler’s', },
    { name: 'Component pouch', },
    { name: 'Crowbar', },
    { name: 'Druidic focus', },
    { name: 'Sprig of mistletoe', },
    { name: 'Totem', },
    { name: 'Wooden staff', },
    { name: 'Yew wand', },
    { name: 'Fishing tackle', },
    { name: 'Flask or tankard', },
    { name: 'Grappling hook', },
    { name: 'Hammer', },
    { name: 'Hammer, sledge', },
    { name: 'Healer’s kit', },
    { name: 'Holy symbol Amulet Emblem', },
    { name: 'Reliquary', },
    { name: 'Holy water (flask)', },
    { name: 'Hourglass', },
    { name: 'Hunting trap', },
    { name: 'Ink (1 ounce bottle)', },
    { name: 'Ink pen', },
    { name: 'Jug or pitcher', },
    { name: 'Ladder (10-foot)', },
    { name: 'Lamp', },
    { name: 'Lantern, bullseye', },
    { name: 'Lantern, hooded', },
    { name: 'Lock', },
    { name: 'Magnifying glass', },
    { name: 'Manacles', },
    { name: 'Mess kit', },
    { name: 'Mirror, steel', },
    { name: 'Oil (flask)', },
    { name: 'Paper (one sheet)', },
    { name: 'Parchment (one sheet)', },
    { name: 'Perfume (vial)', },
    { name: 'Pick, miner’s', },
    { name: 'Piton', },
    { name: 'Poison, basic (vial)', },
    { name: 'Pole (10-foot)', },
    { name: 'Pot, iron', },
    { name: 'Potion of healing', },
    { name: 'Pouch', },
    { name: 'Quiver', },
    { name: 'Ram, portable', },
    { name: 'Rations (1 day)', },
    { name: 'Robes', },
    { name: 'Rope, hempen (50 feet)', },
    { name: 'Rope, silk (50 feet)', },
    { name: 'Sack', },
    { name: 'Scale, merchant’s', },
    { name: 'Sealing wax', },
    { name: 'Shovel', },
    { name: 'Signal whistle', },
    { name: 'Signet ring', },
    { name: 'Soap', },
    { name: 'Spellbook', },
    { name: 'Spikes, iron (10)', },
    { name: 'Spyglass', },
    { name: 'Tent, two-person', },
    { name: 'Tinderbox', },
    { name: 'Torch', },
    { name: 'Vial', },
    { name: 'Waterskin', },
    { name: 'Whetstone', },
];

export const items = config.map((item) => ({ ...defaults, ...item }));
