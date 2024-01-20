import { interceptorService } from "../interceptor";

const AuthApiService = {
    
  login: async (postData: any) => {
    const url = 'https://api.example.com/postData';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    // Use the request interceptor
    const { url: modifiedUrl, options: modifiedOptions } = await interceptorService.post(url, options);

    // Perform the fetch with the modified URL and options
    const response = await fetch(modifiedUrl, modifiedOptions);

    // Use the response interceptor
    const modifiedResponse = await interceptorService.response(response);

    // Handle the response as needed
    if (!modifiedResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await modifiedResponse.json();
    return responseData;
  },
  };
  
  export default AuthApiService;