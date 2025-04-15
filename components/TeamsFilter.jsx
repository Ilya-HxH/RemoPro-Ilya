import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import filtersData from "../mock/filtersData.json"; // путь подстрой под проект
const cities = filtersData.cities;
const categories = filtersData.categories;

export default function FilterHeader() {
  const [city, setCity] = useState("Алматы");
  const [cityModalVisible, setCityModalVisible] = useState(false);


  const [categorySearch, setCategorySearch] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <>
     <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  className="flex-row px-4 pt-3 pb-1"
  contentContainerStyle={{ gap: 8 }} // или tailwind → space-x-2
>
  {/* Город с иконкой */}
  <TouchableOpacity
    onPress={() => setCityModalVisible(true)}
    className="border border-black px-4 py-2 rounded-[8px] flex-row items-center space-x-1"
  >
    <Ionicons name="location-outline" size={14} color="#000" />
    <Text className="text-xs font-medium">{city}</Text>
  </TouchableOpacity>

  {/* Фильтры с числом */}
  <TouchableOpacity
    onPress={() => setFilterModalVisible(true)}
    className="border border-black px-4 py-2 rounded-[8px] flex-row items-center space-x-1"
  >
    <Text className="text-xs font-medium">Фильтры</Text>
    {(minRating > 0 || selectedCategories.length > 0) && (
      <View className="w-5 h-5 bg-black rounded-full items-center justify-center ml-1">
        <Text className="text-[10px] text-white font-bold">
          {minRating > 0 ? 1 : 0 + selectedCategories.length}
        </Text>
      </View>
    )}
  </TouchableOpacity>

  {/* Фильтр по рейтингу */}
  {minRating > 0 && (
    <View className="bg-black px-3 py-1 rounded-[8px] flex-row items-center space-x-1">
      <Ionicons name="star" size={12} color="#fff" />
      <Text className="text-xs text-white">{minRating}+</Text>
      <TouchableOpacity onPress={() => setMinRating(0)}>
        <View className="w-4 h-4 bg-white ml-1 rounded-full items-center justify-center">
          <Ionicons name="close" size={10} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  )}

  {/* Категории фильтра */}
  {selectedCategories.map((cat) => (
    <View
      key={cat}
      className="bg-black px-3 py-1 rounded-[8px] flex-row items-center space-x-1"
    >
      <Text className="text-xs text-white">{cat}</Text>
      <TouchableOpacity
        onPress={() =>
          setSelectedCategories((prev) => prev.filter((c) => c !== cat))
        }
      >
        <View className="w-4 h-4 border ml-1 border-white rounded-full items-center justify-center">
        <Ionicons name="close" size={10} color="#fff" />
      </View>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>



      {/* Модалка: выбор города */}
      <Modal
        transparent
        visible={cityModalVisible}
        animationType="fade"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-center items-center px-10"
          onPress={() => setCityModalVisible(false)}
        >
          <View className="bg-white rounded-xl w-full p-4">
            <Text className="text-lg font-semibold mb-3">Выберите город</Text>
            {cities.map((c) => (
              <TouchableOpacity
                key={c}
                className="py-2"
                onPress={() => {
                  setCity(c);
                  setCityModalVisible(false);
                }}
              >
                <Text className="text-base text-black">{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Модалка: фильтры */}
      <Modal
        transparent
        visible={filterModalVisible}
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-center items-center px-6"
          onPress={() => setFilterModalVisible(false)}
        >
          <View className="bg-white rounded-xl w-full p-4 space-y-4">
            <Text className="text-lg font-semibold">Фильтры</Text>

            {/* Рейтинг */}
            <View>
              <Text className="text-sm font-medium mb-1">Минимальный рейтинг</Text>
              <View className="flex-row space-x-2">
                {[0, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => setMinRating(rating)}
                    className={`px-3 py-1 rounded-full border ${
                      minRating === rating ? "bg-black" : "bg-white"
                    }`}
                  >
                    <View className="flex-row items-center space-x-1">
                      <Ionicons
                        name="star"
                        size={14}
                        color={minRating === rating ? "#fff" : "#000"}
                      />
                      <Text
                        className={`text-xs font-medium ${
                          minRating === rating ? "text-white" : "text-black"
                        }`}
                      >
                        {rating === 0 ? "Любой" : `${rating}+`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

           {/* Категории */}
<View>
  <Text className="text-sm font-medium mt-2 mb-2">Категории работ</Text>

  {/* 🔍 Поле поиска */}
  <TextInput
    value={categorySearch}
    onChangeText={setCategorySearch}
    placeholder="Поиск категории..."
    placeholderTextColor="#999"
    className="border border-gray-300 rounded-full px-3 py-1 mb-1 text-m text-black"
  />

  {/* 📋 Фильтрованный список */}
  <View className="flex-row flex-wrap">
    {filteredCategories.map((cat) => {
      const selected = selectedCategories.includes(cat);
      return (
        <TouchableOpacity
          key={cat}
          onPress={() => toggleCategory(cat)}
          className={`px-3 py-1 rounded-full border mr-2 mt-2 ${
            selected ? "bg-black" : "bg-white"
          }`}
        >
          <Text
            className={`text-xs ${
              selected ? "text-white" : "text-black"
            }`}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      );
    })}
    {filteredCategories.length === 0 && (
      <Text className="text-xs text-gray-400 italic mt-2">
        Ничего не найдено
      </Text>
    )}
  </View>
</View>

          </View>
        </Pressable>
      </Modal>
    </>
  );
}
