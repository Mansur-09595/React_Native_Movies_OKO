import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getSavedMovies, removeMovie } from "@/services/savedMovies";
import { Movie } from "@/services/djangoApi";
import { icons } from "@/constants/icons";
import Loading from "@/components/Loading";

const Saved = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const logoWidth = width * 0.5;
  const logoHeight = logoWidth * 0.4;

  const loadSavedMovies = async () => {
    setIsLoading(true);
    const saved = await getSavedMovies();
    setMovies(saved);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const handleRemove = async (movieId: number) => {
    await removeMovie(movieId);
    await loadSavedMovies();
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
        <Loading />
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