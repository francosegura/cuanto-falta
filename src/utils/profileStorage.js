import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "faltan-dias:profile-id";

export async function loadProfileId() {
  try {
    return await AsyncStorage.getItem(PROFILE_KEY);
  } catch {
    return null;
  }
}

export async function saveProfileId(personId) {
  await AsyncStorage.setItem(PROFILE_KEY, personId);
}

export async function clearProfileId() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}
