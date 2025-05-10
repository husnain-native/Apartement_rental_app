import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { getApartments } from '../services/apartmentService';
import ApartmentCard from '../components/ApartmentCard';
import FilterModal from '../components/FilterModal';
import { auth } from '../services/firebase';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const fetchApartments = async () => {
    const data = await getApartments();
    setApartments(data);
    setFilteredApartments(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchApartments();
    }, [])
  );

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
    fetchApartments();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Logout"
          onPress={async () => {
            try {
              await auth().signOut();
              navigation.navigate('LoginScreen');
            } catch (error) {
              console.error('Logout error:', error);
            }
          }}
          containerStyle={styles.logoutButton}
          buttonStyle={styles.logoutButtonStyle}
          titleStyle={styles.logoutButtonText}
        />
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.filterButton}
        >
          <Icon name="filter-list" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredApartments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ApartmentCard apartment={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.listContent}
      />
      {user?.role === 'realtor' && (
        <Button
          title="Add Apartment"
          onPress={() => navigation.navigate('AddEditApartment')}
          containerStyle={styles.addButton}
          buttonStyle={styles.addButtonStyle}
        />
      )}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onFilter={handleFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutButton: {
    marginLeft: 5,
  },
  logoutButtonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  logoutButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  filterButton: {
    padding: 10,
  },
  listContent: {
    paddingBottom: 80, // Space for the Add Apartment button
  },
  addButton: {
    margin: 10,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButtonStyle: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
  },
});

export default HomeScreen;