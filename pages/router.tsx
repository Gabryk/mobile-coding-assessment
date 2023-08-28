import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPhotosPage from "pages/userPhotosPage/UserPhotosPage";
import PhotoDetailsPage from "pages/photoDetailsPage/PhotoDetailsPage";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserPhotos">
        <Stack.Screen
          name="UserPhotos"
          component={UserPhotosPage}
          options={{ title: "User Photos" }}
        />
        <Stack.Screen
          name="PhotoDetails"
          component={PhotoDetailsPage}
          options={{ title: "Photo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
