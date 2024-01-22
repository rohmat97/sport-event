import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5166', // Replace with your API base URL
  // timeout: 5000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false   // Allow insecure requests
  }),
  insecureHTTPParser:true,

});

export default axiosInstance;