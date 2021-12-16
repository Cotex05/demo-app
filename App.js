import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

//Components
const ItemList = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={{ margin: 10, padding: 8, borderBottomColor: 'grey', borderBottomWidth: 0.5 }}>
      <Text style={styles.text}>{props.item}</Text>
    </TouchableOpacity>
  )
}

// Default App Return
export default function App() {


  //state handling varibales/attributes
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchingActive, setSearchingActive] = useState(false);

  //Scroll View Ref for scrollToTop Function
  const scrollRef = useRef();

  // Keywords for adding random words into the list
  const keyWords = [
    { "food": "Mango" },
    { "food": "Apple" },
    { "food": "Milk" },
    { "food": "Bread" },
    { "food": "Guava" },
    { "food": "Coffee" },
    { "food": "Oranges" }, { "food": "Tea" },
    { "food": "Carrot" },
    { "food": "Papaya" },
    { "food": "Cookies" },
    { "food": "Pineapple" },
    { "food": "Sweets" },
    { "food": "Candy" },
    { "food": "Cake" },
    { "food": "Chocolates" },
    { "food": "Burger" }
  ];

  //Handling the search text inputs
  const handleTextChange = (txt) => {
    setSearchingActive(true);
    setQuery(txt);

    //filtering items
    setSearchedItems(items.filter(e => (
      e.food.toLowerCase().includes(txt.toLowerCase())
    )
    ))
    if (txt.trim().length == 0) {
      setSearchingActive(false);
    }
    // console.log(txt);
  }

  const handleAdd = () => {

    // If below then scrollback to top, then add item.
    scrollRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: true,
    });

    // 200ms delay for adding items
    setTimeout(() => {
      const word = keyWords[Math.floor(Math.random() * (keyWords.length))];
      setItems([...items, word]);
      let itemsCopy = [...items];
      itemsCopy.unshift(word);
      setItems(itemsCopy);
      // console.log(items);
    }, 200);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 25, flexDirection: 'row' }}>
        {/* Search Box for text input query */}
        <TextInput
          style={styles.input}
          onChangeText={(txt) => handleTextChange(txt)}
          value={query}
          placeholder="Search"
        />
        <TouchableOpacity disabled={searchingActive} onPress={handleAdd} style={styles.addBtn}>
          <Text style={{ fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Divider */}
      <View style={{ height: 2, backgroundColor: '#000', marginHorizontal: 25 }} />

      {/* Items Lists */}
      <ScrollView ref={scrollRef}>
        {searchingActive ? (searchedItems.map((val, id) => { //Searched Items
          return (
            <ItemList key={id} item={val.food} />
          )
        })) : (items.map((val, id) => {      //Actual Items
          return (
            <ItemList key={id} item={val.food} />
          )
        }))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  input: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 16,
    width: '75%',
    borderRadius: 5
  },
  addBtn: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderColor: '#121',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'sans-serif',
  }
});
