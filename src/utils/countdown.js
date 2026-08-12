function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDaysLeft(arrivalAt) {
  const arrival = new Date(arrivalAt);
  const today = startOfLocalDay(new Date());
  const arrivalDay = startOfLocalDay(arrival);
  return Math.round((arrivalDay - today) / (1000 * 60 * 60 * 24));
}

function withDaysLeft(trip) {
  return { ...trip, daysLeft: getDaysLeft(trip.arrivalAt) };
}

export function getNextTrip(trips) {
  const upcoming = trips
    .map(withDaysLeft)
    .filter((trip) => trip.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return upcoming[0] || null;
}

export function getTripForPerson(trips, personId) {
  const upcoming = trips
    .map(withDaysLeft)
    .filter((trip) => trip.personId === personId && trip.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return upcoming[0] || null;
}

// Viajeros: su propio viaje. Hosts (Rio Negro): el más cercano.
export function getTripForProfile(trips, person) {
  if (!person) return null;

  if (person.role === "traveler") {
    return getTripForPerson(trips, person.id);
  }

  return getNextTrip(trips);
}
