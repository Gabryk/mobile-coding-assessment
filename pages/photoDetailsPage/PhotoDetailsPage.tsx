import { useState } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { View, Card, Text, Button, Toast } from "react-native-ui-lib";
import FontAwesomeIcons from "@expo/vector-icons/FontAwesome5";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import DimmerMessage from "components/DimmerMessage/DimmerMessage";
import useDownload from "../../hooks/useDownload";

type PhotoDetailsProps = {
  route: { params: Basic };
};

const PhotoDetailsPage = ({ route }: PhotoDetailsProps) => {
  const image = route.params;
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const { download, openFile, status } = useDownload(image.urls.raw, () =>
    setToastIsVisible(true)
  );

  return (
    <ImageBackground
      blurRadius={20}
      imageStyle={{ flex: 1, alignSelf: "stretch" }}
      resizeMode="cover"
      source={{ uri: image.urls.regular }}
      style={{ flex: 1, alignSelf: "stretch" }}
    >
      <Toast
        action={{ label: "Open photo", onPress: openFile }}
        message="Photo saved on the device"
        onDismiss={() => setToastIsVisible(false)}
        position="bottom"
        visible={toastIsVisible}
      />

      <View>
        {!image?.id ? (
          <DimmerMessage
            icon="frown"
            text="Something went wrong. Please try again later."
          />
        ) : null}

        {image?.id ? (
          <Card style={{ marginBottom: 15 }} marginH-20 marginV-40>
            <Card.Section
              imageSource={{ uri: image.urls.regular }}
              imageStyle={{ height: 300 }}
            />

            <View padding-20>
              <Text text40 $textDefault>
                {`${image?.user?.first_name} ${image?.user?.last_name}`}
              </Text>

              <View row>
                <Text text90>Created in</Text>
                <Text text90 $textDefault>
                  {" "}
                  | {new Date(image?.created_at).getUTCFullYear()}
                </Text>
              </View>

              <Text text70 $textDefault>
                {image.description ?? image.alt_description}
              </Text>

              <View>
                <View row right>
                  <Button
                    style={{ marginRight: 10 }}
                    text90
                    link
                    iconSource={() => (
                      <FontAwesomeIcons name="heart" size={24} />
                    )}
                    label="Likes"
                  />
                  <Button
                    text90
                    link
                    iconSource={() =>
                      status !== "loading" ? (
                        <FontAwesomeIcons name="save" size={24} />
                      ) : (
                        <ActivityIndicator size="small" />
                      )
                    }
                    label="Download"
                    onPress={download}
                  />
                </View>
              </View>
            </View>
          </Card>
        ) : null}
      </View>
    </ImageBackground>
  );
};

export default PhotoDetailsPage;
