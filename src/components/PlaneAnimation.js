import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Image, StyleSheet, View } from "react-native";
import { CHARACTER_IMAGES } from "../data/people";

const screenWidth = Dimensions.get("window").width;

function loopTiming(value, toValue, duration) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue,
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

export default function PlaneAnimation({ travelerId }) {
  const planeX = useRef(new Animated.Value(-90)).current;
  const walkBob = useRef(new Animated.Value(0)).current;
  const walkTilt = useRef(new Animated.Value(0)).current;
  const walkStep = useRef(new Animated.Value(0)).current;
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

    const walkAnimation = Animated.parallel([
      loopTiming(walkBob, -10, 380),
      loopTiming(walkTilt, 1, 280),
      loopTiming(walkStep, 6, 280),
    ]);

    const waveAnimation = loopTiming(familyWave, 1, 700);

    planeAnimation.start();
    walkAnimation.start();
    waveAnimation.start();

    return () => {
      planeAnimation.stop();
      walkAnimation.stop();
      waveAnimation.stop();
    };
  }, [planeX, walkBob, walkTilt, walkStep, familyWave]);

  const travelerTilt = walkTilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["-3deg", "3deg"],
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
              { translateY: walkBob },
              { translateX: walkStep },
              { rotate: travelerTilt },
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
        <Image source={CHARACTER_IMAGES.family} style={styles.family} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    height: 300,
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
    width: 130,
    height: 190,
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
    right: 2,
    bottom: 10,
    width: 180,
    height: 180,
  },
  family: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
