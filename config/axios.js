import axios from 'axios';

let url;

if (Platform.OS === 'ios') {
  url = 'http://localhost:3000/';
} else {
  url = 'http://10.0.2.2:3000/';
}

const axiosClient = axios.create({
  baseURL: url,
});

export default axiosClient;
