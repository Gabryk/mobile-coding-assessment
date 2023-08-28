import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  GridList,
  Card,
  Spacings,
  BorderRadiuses,
  GridListProps,
} from "react-native-ui-lib";

import { Basic } from "unsplash-js/dist/methods/photos/types";

interface UserImageProps {
  image: Basic;
}

const UserImage = ({ image }: UserImageProps) => {
  const { urls, id } = image;
  const navigate = useNavigation();
  return (
    <Card flex onPress={() => navigate.navigate(`PhotoDetails`, image)}>
      <Card.Section
        imageSource={{ uri: urls.thumb }}
        imageStyle={styles.itemImage}
      />
    </Card>
  );
};

interface UserPhotosProps {
  images: Basic[] | undefined;
  onLoadNext: () => void;
  hasMore: boolean;
}

const UserPhotos = ({ images = [], onLoadNext, hasMore }: UserPhotosProps) => {
  const renderItem: GridListProps<Basic>["renderItem"] = ({ item }) => (
    <UserImage key={item.id} image={item} />
  );

  return (
    <GridList
      renderItem={renderItem}
      data={images}
      onEndReached={onLoadNext}
      maxItemWidth={140}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  itemImage: {
    width: "100%",
    height: 150,
    borderRadius: BorderRadiuses.br10,
  },
});
export default UserPhotos;
