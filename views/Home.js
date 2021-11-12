import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import { List, FAB, TextInput} from 'react-native-paper';
import globalStyles from '../styles/global';
import axiosClient from '../config/axios';

const Home = ({navigation}) => {
  const [clients, setClient] = useState([]);

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const getClientsApi = async () => {
      try {
        const response = await axiosClient.get('/clients');
        setClient(response.data);
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (update) {
      getClientsApi();
    }
  }, [update]);
  return (
    <View style={globalStyles.container}>
      {/* <Button
        icon="plus-circle"
        onPress={() =>
          navigation.navigate('NewClient', {
            setUpdate: setUpdate,
          })
        }>
        New client 
      </Button>*/}
      {/* <Headline style={globalStyles.title}>
        {clients.length > 0 ? 'Clients' : 'No clients available'}
      </Headline> */}
      <TextInput
        mode="outlined"
        label=""
        placeholder="Search"
        left={<TextInput.Icon name="magnify" />}
      />
      <FlatList
        data={clients}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            style={styles.list}
            onPress={() =>
              navigation.navigate('ClientDetail', {
                item,
                setUpdate,
              })
            }
            title={item.name}
            description={item.company}
            left={props => (
              <List.Icon
                {...props}
                style={styles.avatar}
                icon="account-outline"
              />
            )}
          />
        )}
      />
      <FAB
        icon="plus"
        onPress={() =>
          navigation.navigate('NewClient', {
            setUpdate: setUpdate,
          })
        }
        style={globalStyles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  avatar: {
    backgroundColor: '#000',
    borderRadius: 50,
  },
  searchInput: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#666',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});

export default Home;
