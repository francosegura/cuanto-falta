import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import WhoAreYouScreen from "./src/screens/WhoAreYouScreen";
import { getPersonById } from "./src/data/people";
import {
  clearProfileId,
  loadProfileId,
  saveProfileId,
} from "./src/utils/profileStorage";

// Si está seteado, saltea el selector y entra directo con ese perfil.
const FORCE_PROFILE_ID = null;

export default function App() {
  const [profileId, setProfileId] = useState(
    FORCE_PROFILE_ID ? FORCE_PROFILE_ID : null
  );
  const [ready, setReady] = useState(Boolean(FORCE_PROFILE_ID));

  useEffect(() => {
    if (FORCE_PROFILE_ID) return;

    loadProfileId().then((id) => {
      setProfileId(id);
      setReady(true);
    });
  }, []);

  async function handleSelect(personId) {
    await saveProfileId(personId);
    setProfileId(personId);
  }

  async function handleChangeProfile() {
    if (FORCE_PROFILE_ID) return;
    await clearProfileId();
    setProfileId(null);
  }

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  const person = getPersonById(profileId);

  if (!person) {
    return <WhoAreYouScreen onSelect={handleSelect} />;
  }

  return (
    <HomeScreen
      person={person}
      onChangeProfile={FORCE_PROFILE_ID ? null : handleChangeProfile}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
