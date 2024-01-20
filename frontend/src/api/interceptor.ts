import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5166', // Replace with your API base URL
  timeout: 5000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // Add any other default headers if needed
    "Authorization": "",   
  },
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false   // Allow insecure requests
  }),
  insecureHTTPParser:true,

});

export default axiosInstance;