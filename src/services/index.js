// import request from '../utils/request';
import axios from 'axios'

// export function query() {
//   return request('/api/users');
// }
export function getProducts(){
  return axios.get("./products.json")
}

