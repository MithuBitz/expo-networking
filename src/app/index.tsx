import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10",
        );
        const data = await res.json();
        console.log(data.data);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
