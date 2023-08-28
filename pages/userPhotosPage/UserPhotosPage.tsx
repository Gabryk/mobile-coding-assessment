import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  View,
  Picker,
  LoaderScreen,
  PickerValue,
  Toast,
} from "react-native-ui-lib";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import PickerItem from "react-native-ui-lib/src/components/picker/PickerItem";
import { ColorId } from "unsplash-js";
import UserPhotos from "components/UsersPhotos/UserPhotos";
import DimmerMessage from "components/DimmerMessage/DimmerMessage";
import { SEARCH_COLORS } from "constants/unsplash";
import { getUserPhotosApi } from "api/users";

type ColorOption = {
  key: string;
  text: string;
  value: ColorId;
};
const colorOptions: ColorOption[] = SEARCH_COLORS.map((color) => ({
  key: color,
  text: color,
  value: color as ColorId,
}));

const UserPhotosPage = ({}) => {
  const [searchColor, setSearchColor] = useState(colorOptions[0]);

  const { status, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users-photos", searchColor.value],
    queryFn: ({ pageParam = 1 }) =>
      getUserPhotosApi(searchColor.value, pageParam),
    getNextPageParam: ({ page, total_pages }) =>
      page + 1 <= total_pages ? page + 1 : undefined,
    getPreviousPageParam: ({ page }) => page - 1,
  });

  const handleColorChange = (item: PickerValue) => {
    if (typeof item !== "string") return;

    const color = colorOptions.find((color) => color.value === item);
    if (!color) return;

    return setSearchColor(color);
  };

  const isLoading = status === "loading";
  const items =
    data?.pages?.reduce(
      (items, page) => [...items, ...page.results],
      [] as Basic[]
    ) ?? [];
  const isEmpty = !isLoading && !data?.pages[0]?.results?.length;

  return (
    <View flex>
      <Picker
        label="Search Color"
        mode={Picker?.modes?.SINGLE ?? "SINGLE"}
        onChange={handleColorChange}
        placeholder="Color"
        value={searchColor.value}
        fieldType={Picker.fieldTypes.settings}
        marginT-10
        marginH-20
      >
        {colorOptions.map((option) => (
          <PickerItem
            key={option.value}
            value={option.value}
            label={option.text}
          />
        ))}
      </Picker>

      <View>
        {isLoading ? <LoaderScreen message="Loading photos" /> : null}

        {isEmpty ? (
          <DimmerMessage
            icon="meh"
            text="Apparently there are no good matches for your search!"
          />
        ) : null}

        {status === "error" ? (
          <DimmerMessage
            icon="frown"
            text="Something went wrong. Please try again later."
          />
        ) : null}
      </View>
      <UserPhotos
        hasMore={!!hasNextPage}
        images={items}
        onLoadNext={fetchNextPage}
      />

      <Toast
        message="Loading..."
        position="bottom"
        showLoader
        visible={status === "loading"}
      />
    </View>
  );
};

export default UserPhotosPage;
