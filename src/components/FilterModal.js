import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterModal = ({ isVisible, onClose, onFilter }) => {
  const [minRoom, setminRoom] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSize, setMinSize] = useState('');

  const handleApply = () => {
    onFilter({
      minRoom: minRoom ? parseFloat(minRoom) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
      minSize: minSize ? parseFloat(minSize) : 0,
    });
    onClose();
  };

  const handleReset = () => {
    setminRoom('');
    setMaxPrice('');
    setMinSize('');
    onFilter({ minRoom: 0, maxPrice: Infinity, minSize: 0 });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.3}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text h4 style={styles.headerText}>Filter Apartments</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <Input
          placeholder="Min Rooms "
          value={minRoom}
          onChangeText={setminRoom}
          keyboardType="numeric"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="bed" size={20} color="#666" />}
        />
        <Input
          placeholder="Max Price ($)"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="attach-money" size={20} color="#666" />}
        />
        <Input
          placeholder="Min Size (sqft)"
          value={minSize}
          onChangeText={setMinSize}
          keyboardType="numeric"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="square-foot" size={20} color="#666" />}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            onPress={handleReset}
            buttonStyle={styles.resetButton}
            titleStyle={styles.resetButtonText}
            containerStyle={styles.button}
          />
          <Button
            title="Apply"
            onPress={handleApply}
            buttonStyle={styles.applyButton}
            containerStyle={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#007AFF',
  },
});

export default FilterModal;
