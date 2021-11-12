import React from 'react';
import {Button} from 'react-native-paper';

const Bar = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NewClient');
  };

  return (
    <Button icon="text-box-plus" color="#fff" onPress={() => handlePress()}>
      Cliente
    </Button>
  );
};

export default Bar;
