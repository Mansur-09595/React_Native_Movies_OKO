import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSavedMovies } from '@/components/SavedCard';
import { Movie } from '@/services/djangoApi';

const Saved = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const saved = await getSavedMovies();
      setMovies(saved);
    };

    fetchMovies();
  }, []);

  return (
    <View className="flex-1 bg-primary p-4">
      <Text className="text-white text-xl mb-4 font-bold">Saved Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              className="w-full h-60 rounded-md"
              resizeMode="cover"
            />
            <Text className="text-white text-lg mt-2">{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Saved;
