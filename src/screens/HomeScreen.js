import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import useAuth from '../hooks/useAuth';
import { getApartments } from '../services/apartmentService';
import ApartmentCard from '../components/ApartmentCard';
import FilterBar from '../components/FilterBar';
import { auth } from '../services/firebase';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      const data = await getApartments();
      setApartments(data);
      setFilteredApartments(data);
    };
    fetchApartments();
  }, []);

  const handleFilter = ({ minPrice, maxPrice, minSize }) => {
    const filtered = apartments.filter(
      apt => apt.price >= minPrice && apt.price <= maxPrice && apt.size >= minSize
    );
    setFilteredApartments(filtered);
  };

  const handleEdit = (apartment) => {
    navigation.navigate('AddEditApartment', { apartment });
  };

  const handleDelete = () => {
    const fetchApartments = async () => {
      const data = await getApartments();
      setApartments(data);
      setFilteredApartments(data);
    };
    fetchApartments();
  };

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.error('Logout error:', error);
          }
        }}
        containerStyle={styles.backButton}
      />
      <FilterBar onFilter={handleFilter} />
      <FlatList
        data={filteredApartments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ApartmentCard apartment={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />
      {user?.role === 'realtor' && (
        <Button
          title="Add Apartment"
          onPress={() => navigation.navigate('AddEditApartment')}
          containerStyle={styles.addButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  addButton: { margin: 10, marginBottom: 70 },
  backButton: { margin: 10 },
});

export default HomeScreen;
