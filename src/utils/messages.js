export function getCountdownMessage(person, trip) {
  const isJessi = person?.role === "jessi";
  const isTraveler = person?.role === "traveler";

  if (!trip) {
    return {
      kind: "empty",
      title: isJessi
        ? "PRONTO VAMOS A VERNOS"
        : isTraveler
          ? "NO TENÉS VIAJE CARGADO"
          : "NO HAY VIAJES CARGADOS",
      subtitle: isJessi
        ? "Cuando haya fecha, va a aparecer acá"
        : isTraveler
          ? "Cuando tengas fecha, va a aparecer acá"
          : "Cuando carguemos una visita, la vas a ver acá",
    };
  }

  const isToday = trip.daysLeft === 0;

  if (isToday) {
    return {
      kind: "today",
      title: isJessi
        ? "HOY NOS VEMOS"
        : isTraveler
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
    subtitle: isJessi
      ? "PARA VER A FRAN"
      : isTraveler
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
