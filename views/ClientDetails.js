import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';

import globalStyles from '../styles/global';
import axiosClient from '../config/axios';

const ClientDetails = ({navigation, route}) => {
  const {setUpdate} = route.params;
  const {id, name, phone, email, company} = route.params.item;

  const showConfirmation = () => {
    Alert.alert('you want to delete this client?', '', [
      {text: 'Yes, Delete it!', onPress: () => deleteClient()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const deleteClient = async () => {
    try {
      await axiosClient.delete(`/clients/${id}`);
    } catch (error) {
      console.log(error);
    }

    // Redirect
    navigation.navigate('Home');

    // Reset home
    setUpdate(true);
  };
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <Text style={styles.text}>
        company: <Subheading>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        phone: <Subheading>{phone}</Subheading>
      </Text>
      <Text style={styles.text}>
        email: <Subheading>{email}</Subheading>
      </Text>

      <Button
        style={styles.button}
        mode="contained"
        icon="cancel"
        onPress={() => showConfirmation()}>
        Delete client
      </Button>

      <FAB
        icon="pencil"
        onPress={() =>
          navigation.navigate('NewClient', {
            client: route.params.item,
            setUpdate: setUpdate,
          })
        }
        style={globalStyles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default ClientDetails;
