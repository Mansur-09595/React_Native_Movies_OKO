import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, useWindowDimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { fetchSearchMovies } from "@/store/reducers/movies/movieAction";
import { updateSearchCount } from "@/store/reducers/trending/trendingAction";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const logoWidth = width * 0.5;
  const logoHeight = logoWidth * 0.4;

  const { searchResults, isLoading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(fetchSearchMovies({ query: searchQuery }))
          .then((res: any) => {
            const firstMovie = res.payload?.[0];
            if (firstMovie) {
              dispatch(updateSearchCount({ query: searchQuery, movie: firstMovie }));
            }
          });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        className="items-center mt-20 mb-5 mx-auto"
        source={icons.logo}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
      />

      <View className="px-5 my-5">
        <SearchBar
          placeholder="Search for a movie"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color="#fff" className="my-3" />
      )}

      {error && (
        <Text className="text-red-500 text-center px-5 my-3">Error: {error}</Text>
      )}

      {!isLoading && !error && searchQuery.trim() && (
        <>
          {searchResults.length > 0 && (
            <Text className="text-xl text-white font-bold px-5">
              Search Results for <Text className="text-accent">{searchQuery}</Text>
            </Text>
          )}

          <FlatList
            className="px-5 mt-3"
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{ gap: 16, marginVertical: 16 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-10">
                No movies found
              </Text>
            }
          />
        </>
      )}
    </View>
  );
};

export default Search;