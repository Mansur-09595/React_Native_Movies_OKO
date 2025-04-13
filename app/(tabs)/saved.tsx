import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loadSavedMovies, removeMovie } from "@/store/reducers/saved/savedAction";
import { icons } from "@/constants/icons";

const Saved = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    <View className="flex-1 bg-primary px-5 pt-16">
      <Image
        source={icons.logo}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
        className="mx-auto mb-5"
      />

      <Text className="text-lg text-white font-bold mb-3">Saved Movies</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row gap-4 mb-6 items-start"
              onPress={() => router.push(`/movie/${item.id}`)}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="w-48 h-72 rounded-lg"
                resizeMode="cover"
              />

              <View className="flex-1 justify-between">
                <Text
                  className="text-white font-semibold text-base mb-2"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="flex-row items-center mt-auto"
                >
                  <FontAwesome name="trash" size={18} color="red" />
                  <Text className="text-red-400 ml-2">Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-10">
              You have no saved movies.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default Saved;
