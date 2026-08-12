import React, { useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { trips } from "../data/trips";
import { getTripForProfile } from "../utils/countdown";
import { formatArrivalDate, getCountdownMessage } from "../utils/messages";
import { scheduleTripReminders } from "../utils/notifications";
import PlaneAnimation from "../components/PlaneAnimation";

export default function HomeScreen({ person, onChangeProfile }) {
  const trip = getTripForProfile(trips, person);
  const message = getCountdownMessage(person, trip);
  const travelerId = trip?.personId || person.id;

  useEffect(() => {
    if (trip) {
      scheduleTripReminders(trip, person).catch(() => {});
    }
  }, [trip?.id, person?.id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.counterBlock}>
        {message.kind === "countdown" ? (
          <>
            <Text style={styles.small}>{message.eyebrow}</Text>
            <Text style={styles.bigNumber}>{message.daysLeft}</Text>
            <Text style={styles.small}>{message.unit}</Text>
            <Text style={styles.name}>{message.subtitle}</Text>
          </>
        ) : (
          <>
            <Text style={styles.todayTitle}>{message.title}</Text>
            {message.subtitle ? (
              <Text style={styles.emptySubtitle}>{message.subtitle}</Text>
            ) : null}
          </>
        )}
      </View>

      <PlaneAnimation travelerId={travelerId} />

      {trip ? (
        <>
          <Text style={styles.subtitle}>Próxima visita</Text>
          <Text style={styles.date}>{formatArrivalDate(trip.arrivalAt)}</Text>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Próxima visita</Text>
          <Text style={styles.date}>Sin fecha todavía</Text>
        </>
      )}

      <Pressable onPress={onChangeProfile} style={styles.changeButton}>
        <Text style={styles.changeText}>Cambiar perfil</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#5F5E5A",
    textAlign: "center",
    marginTop: 30,
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 2,
  },
  counterBlock: {
    alignItems: "center",
    marginTop: 60,
    minHeight: 160,
    justifyContent: "center",
  },
  small: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#5F5E5A",
  },
  bigNumber: {
    fontSize: 80,
    fontWeight: "700",
    color: "#185FA5",
    marginVertical: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  todayTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#185FA5",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  emptySubtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#5F5E5A",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  changeButton: {
    marginTop: "auto",
    marginBottom: 24,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  changeText: {
    color: "#185FA5",
    fontSize: 15,
    fontWeight: "500",
  },
});
