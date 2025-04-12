import { useCallback } from "react";
import { View, Text, Image, ScrollView, FlatList, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/djangoApi";
import { icons } from "@/constants/icons";

import useFetch from "@/services/useFetch";
import TrendingCard from "@/components/TrendingCard";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import Loading from "@/components/Loading";

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const logoWidth = width * 0.5;
  const logoHeight = logoWidth * 0.4;

  // ✅ Оборачиваем функции в useCallback
  const fetchTrending = useCallback(() => getTrendingMovies(), []);
  const fetchLatestMovies = useCallback(() => fetchMovies({ query: "" }), []);

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
  } = useFetch(fetchTrending);

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetch(fetchLatestMovies);

  // 🔄 Пока оба грузятся — показываем лоадер
  if (trendingLoading || moviesLoading) {
    return <Loading />;
  }

  // ⚠️ Обработка ошибок
  if (trendingError || moviesError) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white text-center">
          Error: {trendingError?.message || moviesError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* 🔰 Логотип */}
        <Image
          className="items-center mt-20 mb-5 mx-auto"
          source={icons.logo}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />

        {/* 🔍 Поиск */}
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />

        {/* 🔥 Тренды */}
        {trendingMovies && (
          <View className="mt-10">
            <Text className="text-lg text-white font-bold mb-3">
              Trending Movies
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={trendingMovies}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item, index }) => (
                <TrendingCard
                  movie={{ ...item, searchTerm: item.title }}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          </View>
        )}

        {/* 🎬 Последние */}
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}
