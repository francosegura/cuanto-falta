import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const REMINDER_DAYS = [14, 7, 1];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function ensurePermissions() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

function reminderDate(arrivalAt, daysBefore) {
  const arrival = new Date(arrivalAt);
  const trigger = new Date(arrival);
  trigger.setDate(trigger.getDate() - daysBefore);
  trigger.setHours(10, 0, 0, 0);
  return trigger;
}

function reminderBody(trip, daysBefore, person) {
  if (person.role === "jessi") {
    return `Faltan ${daysBefore} día${daysBefore === 1 ? "" : "s"} para ver a Fran`;
  }
  if (person.role === "traveler") {
    return `Faltan ${daysBefore} día${daysBefore === 1 ? "" : "s"} para volver a Rio Negro`;
  }
  return `Faltan ${daysBefore} día${daysBefore === 1 ? "" : "s"} para ver a ${trip.name}`;
}

export async function scheduleTripReminders(trip, person) {
  if (!trip || !person) return;

  const granted = await ensurePermissions();
  if (!granted) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("trip-reminders", {
      name: "Recordatorios de viaje",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = Date.now();

  for (const daysBefore of REMINDER_DAYS) {
    const when = reminderDate(trip.arrivalAt, daysBefore);
    if (when.getTime() <= now) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Faltan días",
        body: reminderBody(trip, daysBefore, person),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: when,
        channelId: "trip-reminders",
      },
    });
  }
}
