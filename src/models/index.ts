export type AttributeName = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
export type DamageTypes = "bludgeoning" | "piercing" | "slashing" | "acid" | "cold" | "fire" | "force" | "lightning" | "necrotic" | "poison" | "psychic" | "radiant" | "thunder";
export type CharacterClasses = "barbarian" | "bard" | "cleric" | "druid" | "fighter" | "monk" | "paladin" | "ranger" | "rogue" | "sorcerer" | "warlock" | "wizard";
export type CharacterRaces = "dwarf" | "elf" | "halfling" | "human" | "dragonborn" | "gnome" | "half-elf" | "half-orc" | "tiefling" | "aarakocra" | "genasi" | "goliath" | "aasimar" | "firbolg" | "kenku" | "lizardfolk" | "tabaxi" | "triton" | 'orc';
export type CharacterSkills = "acrobatics" | "animal handling" | "arcana" | "athletics" | "deception" | "history" | "insight" | "intimidation" | "investigation" | "medicine" | "nature" | "perception" | "performance" | "persuasion" | "religion" | "sleight of hand" | "stealth" | "survival";
export type SpellSchools = "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation";
export type WeaponTypes = "melee" | "ranged";
export type WeaponProperties = "ammunition" | "finesse" | "heavy" | "light" | "loading" | "range" | "reach" | "special" | "thrown" | "two-handed" | "versatile";

/** Verbal (V): Some spells require the chanting of mystic words. The verbal component is represented by "V".
Somatic (S): These require specific hand gestures or movements. They are represented by "S".
Material (M): Many spells require particular objects, specified in parentheses, to be held or present. This component is represented by "M". Sometimes, the materials are consumed by the spell, or they might have a cost associated with them.
*/
export type SpellComponents = "V" | "S" | string /** "M (details)" */;

/** In feet */
export type Range = "Self" | number;

export interface Skill {
    name: CharacterSkills;
    attribute: AttributeName;
    proficiency: boolean;
}

export interface Spell {
    name: string;
    level: number;
    range: Range;
    components: SpellComponents[];
    castingTime: string;
    duration: string;
    school: SpellSchools;
}
