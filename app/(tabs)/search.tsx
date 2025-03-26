import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";

import { icons } from "@/constants/icons";

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
// import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
      query: searchQuery,
    }), false);

  useEffect(() => {
    const func = async () => {
      if (searchQuery.trim()) {
       await loadMovies();
      } else {
        reset();
      }
    }
    func();
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">

      <FlatList
        className="px-5"
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
       ListHeaderComponent={
         <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image
                source={icons.logo}
                className="w-40 h-20 flex-shrink-0"
                resizeMode="contain"
              />
            </View>

            <View className="my-5">
              <SearchBar
              placeholder="Search for a movie"
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              />
              </View>
              
              {loading && (
                <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
                />
                )}
                
                {error && (
                  <Text className="text-red-500 px-5 my-3">
                  Error: {error.message}
                  </Text>
                  )}
                  
                  {
                    !loading && !error && searchQuery.trim() 
                    && movies?.length! > 0 && (
                    <Text className="text-xl text-slate-950 font-bold">
                      Search Results for{" "}
                      <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                  )}
          </>
        }
        />
    </View>
  );
};

export default Search;
