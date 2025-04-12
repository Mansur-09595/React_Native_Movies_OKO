import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Movie } from "@/services/djangoApi";
import { FontAwesome } from "@expo/vector-icons";

interface SavedCardProps {
  movie: Movie;
  onRemove: (id: number) => void;
}

const SavedCard = ({ movie, onRemove }: SavedCardProps) => {
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

        <TouchableOpacity onPress={() => onRemove(movie.id)}>
          <FontAwesome name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedCard;