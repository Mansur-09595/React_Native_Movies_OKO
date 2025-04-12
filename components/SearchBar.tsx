import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-light-100 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#000000"
      />
      
      {onPress ? (
        <TouchableOpacity onPress={onPress} className="flex-1 ml-2">
          <TextInput
            pointerEvents="none"
            editable={false}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#000000"
            className="text-black"
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          className="flex-1 ml-2 text-black"
        />
      )}
    </View>
  );
};

export default SearchBar;
