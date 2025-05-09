import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore, storage, auth } from './firebase';

export const getApartments = async () => {
  try {
    const snapshot = await firestore().collection('apartments').orderBy('createdAt', 'desc').get();
    const apartments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    await AsyncStorage.setItem('apartments', JSON.stringify(apartments));
    return apartments;
  } catch (error) {
    const cached = await AsyncStorage.getItem('apartments');
    return cached ? JSON.parse(cached) : [];
  }
};

export const addApartment = async (apartment, image) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  let imageUrl = '';
  if (image) {
    const ref = storage().ref(`apartmentImages/${Date.now()}_${image.fileName}`);
    await ref.putFile(image.uri);
    imageUrl = await ref.getDownloadURL();
  }

  const data = { ...apartment, userId: user.uid, imageUrl, createdAt: new Date() };
  await firestore().collection('apartments').add(data);
};

export const updateApartment = async (id, apartment, image) => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  let imageUrl = apartment.imageUrl || '';
  if (image) {
    const ref = storage().ref(`apartmentImages/${Date.now()}_${image.fileName}`);
    await ref.putFile(image.uri);
    imageUrl = await ref.getDownloadURL();
  }

  await firestore().collection('apartments').doc(id).update({
    ...apartment,
    imageUrl,
  });
};

export const deleteApartment = async (id) => {
  await firestore().collection('apartments').doc(id).delete();
};
