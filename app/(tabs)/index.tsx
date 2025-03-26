import { Image, ScrollView, Text, View, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { 
    data: movies, loading: moviesLoading, error: moviesError
   } = useFetch(() => fetchMovies({ 
    query: "" 
  }));

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        
        <Image source={icons.logo} className="w-40 h-20 mt-20 mb-5 mx-auto flex-shrink-0"  resizeMode="contain"/>

        {moviesLoading ? (
          <ActivityIndicator 
            size="large" 
            color="#2B1D0E" 
            className="mt-10 self-center" 
          />
        ) : moviesError ? (
          <Text className="text-secondary text-lg font-bold">
            Error: {moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <Text className="text-lg text-secondary font-bold mt-5 mb-3">
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}
