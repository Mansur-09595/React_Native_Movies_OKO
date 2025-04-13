import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { icons } from "@/constants/icons";
import { fetchMovies } from "@/store/reducers/movies/movieAction";
import { getTrendingMovies } from "@/store/reducers/trending/trendingAction";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const logoWidth = width * 0.5;
  const logoHeight = logoWidth * 0.4;

  const {
    latestMovies,
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useAppSelector((state) => state.movies);

  const {
    items: trending,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useAppSelector((state) => state.trending);

  useEffect(() => {
    dispatch(fetchMovies())
    dispatch(getTrendingMovies());
  }, [dispatch]);

  const isLoading = isMoviesLoading || isTrendingLoading;
  const hasError = moviesError || trendingError;

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View className="flex-1 bg-primary items-center justify-center px-5">
        <Text className="text-white text-center">
          {moviesError || trendingError}
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
        {/* 🔰 Logo */}
        <Image
          className="items-center mt-20 mb-5 mx-auto"
          source={icons.logo}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />

        {/* 🔍 Search */}
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />

        {/* 🔥 Trending Movies */}
        {trending.length > 0 && (
          <View className="mt-10">
            <Text className="text-lg text-white font-bold mb-3">
              Trending Movies
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={trending}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          </View>
        )}


        {/* 🎬 Latest Movies */}
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>
        <FlatList
          data={latestMovies}
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
