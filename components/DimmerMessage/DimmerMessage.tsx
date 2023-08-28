import { View, Text } from "react-native-ui-lib";
import FontAwesomeIcons from "@expo/vector-icons/FontAwesome5";

interface DimmerMessageProps {
  icon: string;
  text: string;
}

const DimmerMessage = ({ icon, text }: DimmerMessageProps) => {
  return (
    <View flex bg-grey70 useSafeArea>
      <View flex center>
        <View marginB-20 center>
          <FontAwesomeIcons name={icon} size={32} color="darkgray" />
        </View>
        <View>
          <Text text20>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default DimmerMessage;
