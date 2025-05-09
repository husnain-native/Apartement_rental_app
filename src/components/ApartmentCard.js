import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import useAuth from '../hooks/useAuth';
import { deleteApartment } from '../services/apartmentService';

const ApartmentCard = ({ apartment, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isRealtor = user?.role === 'realtor' && user?.uid === apartment.userId;

  return (
    <View style={styles.card}>
      {apartment.imageUrl ? (
        <Image source={{ uri: apartment.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{apartment.description}</Text>
      <Text style={styles.text}>Size: {apartment.size} sqft</Text>
      <Text style={styles.text}>Rooms: {apartment.rooms}</Text>
      <Text style={styles.text}>Price: ${apartment.price}/month</Text>
      {isRealtor && (
        <View style={styles.buttons}>
          <Button title="Edit" onPress={() => onEdit(apartment)} type="outline" />
          <Button
            title="Delete"
            onPress={async () => {
              await deleteApartment(apartment.id);
              onDelete();
            }}
            type="outline"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 2 },
  image: { width: '100%', height: 150, marginBottom: 10, borderRadius: 5 },
  placeholder: { width: '100%', height: 150, backgroundColor: '#e0e0e0', marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  text: { color: '#555', marginBottom: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default ApartmentCard;
