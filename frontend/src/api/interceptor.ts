
export const interceptorService = {
    get: async (url: any, options: any) => {
      // Add your custom logic for modifying requests
      // For example, you can add authentication headers or handle token refresh
  
      // In this example, we don't modify the request
      return { url, options };
    },
    post: async (url: any, options: { method: string; headers: any; }) => {
        // Add your custom logic for modifying requests
        // For example, you can add authentication headers or handle token refresh
    
        // Modify the request based on the HTTP method
        if (options.method === 'POST') {
          // Add additional headers or logic specific to POST requests
          options.headers = {
            ...options.headers,
            'Content-Type': 'application/json', // Adjust as needed
          };
        }
    
        // In this example, we don't modify the request further
        return { url, options };
      },
    response: async (response: any) => {
      // Add your custom logic for modifying responses
      // For example, you can handle global error responses or extract data
  
      // In this example, we don't modify the response
      return response;
    },
  };

