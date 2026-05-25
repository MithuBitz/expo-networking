import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const IndexScreen = () => {
  useEffect(() => {
    async function pingBackend() {
      const res = await fetch("http://192.168.1.2:3000/api/v1/hello-world");
      const data = await res.json();

      console.log(data);
    }
    pingBackend();
  }, []);

  return (
    <View>
      <Text>IndexScreen</Text>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({});
