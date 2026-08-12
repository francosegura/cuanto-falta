export function getCountdownMessage(person, trip) {
  if (!trip) {
    const isTraveler = person?.role === "traveler";
    return {
      kind: "empty",
      title: isTraveler
        ? "NO TENÉS VIAJE CARGADO"
        : "NO HAY VIAJES CARGADOS",
      subtitle: isTraveler
        ? "Cuando tengas fecha, va a aparecer acá"
        : "Cuando carguemos una visita, la vas a ver acá",
    };
  }

  const isTraveler = person?.role === "traveler";
  const isToday = trip.daysLeft === 0;

  if (isToday) {
    return {
      kind: "today",
      title: isTraveler
        ? "HOY LLEGAMOS A RIO NEGRO"
        : `HOY VEMOS A ${trip.name.toUpperCase()}`,
      daysLeft: 0,
    };
  }

  return {
    kind: "countdown",
    eyebrow: "FALTAN",
    daysLeft: trip.daysLeft,
    unit: "DIAS",
    subtitle: isTraveler
      ? "PARA VOLVER A RIO NEGRO"
      : `PARA VER A ${trip.name.toUpperCase()}`,
  };
}

export function formatArrivalDate(arrivalAt) {
  return new Date(arrivalAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
