import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PEOPLE } from "../data/people";

export default function WhoAreYouScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>¿Quién sos?</Text>
        <Text style={styles.subtitle}>Elegí tu perfil para ver el contador</Text>

        <View style={styles.grid}>
          {PEOPLE.map((person) => (
            <Pressable
              key={person.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => onSelect(person.id)}
            >
              <View style={styles.avatarWrap}>
                <Image
                  source={person.image}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.name}>{person.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FD",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#163A5F",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    textAlign: "center",
    color: "#5F5E5A",
  },
  grid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9E6F2",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  avatarWrap: {
    width: "100%",
    height: 150,
    backgroundColor: "#E6F1FB",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
