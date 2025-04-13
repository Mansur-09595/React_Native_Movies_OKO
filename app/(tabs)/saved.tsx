import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loadSavedMovies, removeMovie } from "@/store/reducers/saved/savedAction";
import { icons } from "@/constants/icons";

const Saved = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading } = useAppSelector((state) => state.saved);
  const { width } = useWindowDimensions();
  const logoWidth = width * 0.5;
  const logoHeight = logoWidth * 0.4;

  useEffect(() => {
    dispatch(loadSavedMovies());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeMovie(id));
  };

  return (
    <View className="flex-1 bg-primary p-4">
      <Image
        source={icons.logo}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
        className="mx-auto mb-5 mt-10"
      />

      <Text className="text-white text-xl mb-4 font-bold">Saved Movies</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-6">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="w-full h-60 rounded-md"
                resizeMode="cover"
              />

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-white text-lg font-semibold flex-1">
                  {item.title}
                </Text>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="ml-3 p-2"
                >
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-10">You have no saved movies.</Text>
          }
        />
      )}
    </View>
  );
};

export default Saved;
