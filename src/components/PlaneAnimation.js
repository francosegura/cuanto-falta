import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Image, StyleSheet, View } from "react-native";
import { CHARACTER_IMAGES } from "../data/people";

const screenWidth = Dimensions.get("window").width;
const TRAVELER_WIDTH = 160;
const WALK_DISTANCE = Math.max(screenWidth - TRAVELER_WIDTH - 180, 40);

function loopWave(value, duration) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ])
  );
}

export default function PlaneAnimation({
  travelerId,
  destinationImage = CHARACTER_IMAGES.family,
}) {
  const planeX = useRef(new Animated.Value(-90)).current;
  const walkProgress = useRef(new Animated.Value(0)).current;
  const stepPhase = useRef(new Animated.Value(0)).current;
  const familyWave = useRef(new Animated.Value(0)).current;

  const travelerImage =
    CHARACTER_IMAGES[travelerId] || CHARACTER_IMAGES.nico;

  useEffect(() => {
    const planeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(planeX, {
          toValue: screenWidth - 150,
          duration: 4500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(planeX, {
          toValue: -90,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // Avanza hacia la familia y vuelve a empezar (se lee como caminata).
    const pathAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(walkProgress, {
          toValue: 1,
          duration: 5200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(walkProgress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(400),
      ])
    );

    // Ritmo de pasos suave (sin salto exagerado).
    const stepAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(stepPhase, {
          toValue: 1,
          duration: 360,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(stepPhase, {
          toValue: 0,
          duration: 360,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const waveAnimation = loopWave(familyWave, 700);

    planeAnimation.start();
    pathAnimation.start();
    stepAnimation.start();
    waveAnimation.start();

    return () => {
      planeAnimation.stop();
      pathAnimation.stop();
      stepAnimation.stop();
      waveAnimation.stop();
    };
  }, [planeX, walkProgress, stepPhase, familyWave]);

  const walkX = walkProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, WALK_DISTANCE],
  });

  const stepBob = stepPhase.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -4, 0],
  });

  const stepTilt = stepPhase.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["-1.5deg", "1.5deg", "-1.5deg"],
  });

  const familyTilt = familyWave.interpolate({
    inputRange: [0, 1],
    outputRange: ["-6deg", "6deg"],
  });

  return (
    <View style={styles.scene}>
      <View style={styles.sky} />
      <View style={styles.ground} />

      <Animated.View
        style={[
          styles.travelerWrap,
          {
            transform: [
              { translateX: walkX },
              { translateY: stepBob },
              { rotate: stepTilt },
            ],
          },
        ]}
      >
        <Image source={travelerImage} style={styles.traveler} />
      </Animated.View>

      <Animated.View
        style={[styles.planeWrap, { transform: [{ translateX: planeX }] }]}
      >
        <Image source={CHARACTER_IMAGES.plane} style={styles.plane} />
      </Animated.View>

      <Animated.View
        style={[
          styles.familyWrap,
          {
            transform: [
              { rotate: familyTilt },
              {
                translateY: familyWave.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -4],
                }),
              },
            ],
          },
        ]}
      >
        <Image source={destinationImage} style={styles.family} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    height: 400,
    overflow: "hidden",
    position: "relative",
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: "#D9ECFA",
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#D9ECFA",
  },
  ground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 95,
    backgroundColor: "#E5F0D4",
  },
  travelerWrap: {
    position: "absolute",
    left: 4,
    bottom: 6,
    width: TRAVELER_WIDTH,
    height: 250,
  },
  traveler: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  planeWrap: {
    position: "absolute",
    top: 36,
    width: 120,
    height: 72,
  },
  plane: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  familyWrap: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 160,
    height: 250,
  },
  family: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
