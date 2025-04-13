// ✅ SavedCard.tsx с использованием Redux Toolkit
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/hooks";
import { removeMovie } from "@/store/reducers/saved/savedAction";
import { Movie } from "@/types/IMovie";

interface SavedCardProps {
  movie: Movie;
}

const SavedCard = ({ movie }: SavedCardProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeMovie(movie.id));
  };

  return (
    <View className="mb-5 bg-dark-100 rounded-xl overflow-hidden shadow-md">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        className="w-full h-60"
        resizeMode="cover"
      />

      <View className="p-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-semibold w-4/5">
          {movie.title}
        </Text>

        <TouchableOpacity onPress={handleRemove}>
          <FontAwesome name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedCard;