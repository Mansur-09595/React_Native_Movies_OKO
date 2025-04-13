import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { icons } from "@/constants/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchMovieDetails } from "@/store/reducers/movies/movieAction";
import { saveMovie, removeMovie } from "@/store/reducers/saved/savedAction";

const MovieInfo = ({ label, value }: { label: string; value?: string | number | null }) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { selectedMovie: movie, isLoading } = useAppSelector((state) => state.movies);
  const savedMovies = useAppSelector((state) => state.saved.movies);
  const isSaved = savedMovies.some((m) => String(m.id) === id);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id as string));
    }
  }, [id]);

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handleToggleSave = () => {
    if (!movie?.id || !movie.poster_path) return;

    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(
        saveMovie({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        })
      );
    }

    animateScale();
  };

  if (isLoading || !movie) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
          className="w-full h-[550px]"
          resizeMode="stretch"
        />

        <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
          <Image source={icons.play} className="w-6 h-7 ml-1" resizeMode="stretch" />
        </TouchableOpacity>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-sm">{movie?.release_date?.split("-")[0]} •</Text>
            <Text className="text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className="text-sm text-light-200">({movie?.vote_count} votes)</Text>
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={handleToggleSave}
              className="mt-5 bg-accent px-4 py-3 rounded-lg flex-row items-center justify-center space-x-2"
            >
              <FontAwesome name={isSaved ? "heart" : "heart-o"} size={20} color="#fff" />
              <Text className="text-white font-bold text-base">{isSaved ? "Saved" : "Save"}</Text>
            </TouchableOpacity>
          </Animated.View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map(g => g.name).join(" • ") || "N/A"} />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
            <MovieInfo label="Revenue" value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`} />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies?.map(c => c.name).join(" • ") || "N/A"}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        style={{ bottom: insets.bottom + 10 }}
        onPress={router.back}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
