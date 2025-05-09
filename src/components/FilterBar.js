import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

const FilterBar = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSize, setMinSize] = useState('');

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
      minSize: minSize ? parseFloat(minSize) : 0,
    });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Min Price"
        value={minPrice}
        onChangeText={setMinPrice}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Max Price"
        value={maxPrice}
        onChangeText={setMaxPrice}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Min Size (sqft)"
        value={minSize}
        onChangeText={setMinSize}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Button title="Apply" onPress={handleFilter} containerStyle={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f5f5' },
  input: { width: '30%', marginHorizontal: 5 },
  button: { marginVertical: 10 },
});

export default FilterBar;
