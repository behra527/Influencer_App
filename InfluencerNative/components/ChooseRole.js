import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChooseRoleScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back pressed")}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Skip pressed")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <Text style={styles.title}>Join as a Brand or Creator</Text>
      <Text style={styles.subtitle}>
        Select your primary role to get started. You can switch roles later.
      </Text>

      {/* Role Buttons */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.roleBox}
          onPress={() => console.log("Brand selected")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="storefront-outline" size={26} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.roleTitle}>I’m a Brand</Text>
            <Text style={styles.roleDesc}>Find & hire creators for your campaigns.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleBox}
          onPress={() => console.log("Creator selected")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="camera-outline" size={26} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.roleTitle}>I’m a Creator</Text>
            <Text style={styles.roleDesc}>Create offers & collaborate with brands.</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => console.log("Create Account pressed")}
      >
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseRoleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    color: "#8A8A8A",
    fontSize: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A8A8A",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  roleContainer: {
    marginTop: 50,
  },
  roleBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  roleDesc: {
    fontSize: 13,
    color: "#8A8A8A",
    marginTop: 4,
  },
  createButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
