import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { addApartment, updateApartment } from '../services/apartmentService';

const AddEditApartmentScreen = ({ navigation, route }) => {
  const apartment = route.params?.apartment || {};
  const [description, setDescription] = useState(apartment.description || '');
  const [size, setSize] = useState(apartment.size ? apartment.size.toString() : '');
  const [rooms, setRooms] = useState(apartment.rooms ? apartment.rooms.toString() : '');
  const [price, setPrice] = useState(apartment.price ? apartment.price.toString() : '');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      quality: 0.7,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        setError(response.errorMessage);
      } else {
        setImage(response);
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        description,
        size: parseFloat(size),
        rooms: parseInt(rooms, 10),
        price: parseFloat(price),
        imageUrl: apartment.imageUrl || '',
      };
      if (apartment.id) {
        await updateApartment(apartment.id, data, image);
      } else {
        await addApartment(data, image);
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>{apartment.id ? 'Edit Apartment' : 'Add Apartment'}</Text>
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Size (sqft)"
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Rooms"
        value={rooms}
        onChangeText={setRooms}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Price ($/month)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        containerStyle={styles.input}
      />
      <Button
        title="Pick Image"
        onPress={handlePickImage}
        containerStyle={styles.button}
      />
      {image && <Text style={styles.text}>Image selected</Text>}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={apartment.id ? 'Update' : 'Add'}
        onPress={handleSubmit}
        loading={loading}
        containerStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginVertical: 10 },
  button: { marginVertical: 10 },
  text: { marginVertical: 10, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default AddEditApartmentScreen;
