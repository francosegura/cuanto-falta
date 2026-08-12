// Perfiles de la app. "traveler" = viven en España; "host" = viven en Rio Negro.

export const PEOPLE = [
  {
    id: "nico",
    name: "Nico",
    role: "traveler",
    image: require("../../assets/characters/nico.png"),
  },
  {
    id: "fran",
    name: "Fran",
    role: "traveler",
    image: require("../../assets/characters/fran.png"),
  },
  {
    id: "nacho",
    name: "Nacho",
    role: "traveler",
    image: require("../../assets/characters/nacho.png"),
  },
  {
    id: "mama",
    name: "Mamá",
    role: "host",
    image: require("../../assets/characters/rio-negro.png"),
  },
  {
    id: "jor",
    name: "Jor",
    role: "host",
    image: require("../../assets/characters/rio-negro.png"),
  },
];

export const CHARACTER_IMAGES = {
  nico: require("../../assets/characters/nico.png"),
  fran: require("../../assets/characters/fran.png"),
  nacho: require("../../assets/characters/nacho.png"),
  family: require("../../assets/characters/rio-negro.png"),
  plane: require("../../assets/characters/avion.png"),
};

export function getPersonById(id) {
  return PEOPLE.find((person) => person.id === id) || null;
}
