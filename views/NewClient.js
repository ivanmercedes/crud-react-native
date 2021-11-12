import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Portal,
  Dialog,
} from 'react-native-paper';
import globalStyles from '../styles/global';

import {LogBox} from 'react-native';
import axiosClient from '../config/axios';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const NewClient = ({navigation, route}) => {
  //   console.log(route);
  const {setUpdate} = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [alert, setAlert] = useState(false);

  //detect if update client
  useEffect(() => {
    if (route.params.client) {
      const {name, email, company, phone} = route.params.client;

      setName(name);
      setPhone(phone);
      setEmail(email);
      setCompany(company);
    }
  }, []);

  const saveClient = async () => {
    // Validate
    if (name === '' || phone === '' || email === '' || company === '') {
      setAlert(true);
      return;
    }

    // Generate client
    const client = {
      name,
      phone,
      email,
      company,
    };

    // Check Create or Update
    if (route.params.client) {
      const {id} = route.params.client;
      client.id = id;

      try {
        await axiosClient.put(`/clients/${client.id}`, client);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Save on API
      try {
        await axiosClient.post(`/clients`, client);
      } catch (error) {
        console.log(error);
      }
    }

    // Redirect
    navigation.navigate('Home');

    // Clear form ( Optional )
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setAlert('');
    setUpdate(true);
  };
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{route.params.client? 'Update Client' : 'Add new Client'}</Headline>

      <TextInput
        label="Name"
        placeholder="John P"
        value={name}
        onChangeText={text => setName(text)}
        style={style.input}
      />
      <TextInput
        label="Phone"
        value={phone}
        placeholder="123 456 7890"
        onChangeText={text => setPhone(text)}
        style={style.input}
      />
      <TextInput
        label="Email"
        value={email}
        placeholder="example@example.com"
        onChangeText={text => setEmail(text)}
        style={style.input}
      />
      <TextInput
        label="company"
        value={company}
        placeholder="Google In"
        onChangeText={text => setCompany(text)}
        style={style.input}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => saveClient()}>
        Save Client
      </Button>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All input are required.</Paragraph>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NewClient;
