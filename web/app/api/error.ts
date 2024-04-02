// @/app/api/error.ts

interface ApiResponse {
  status: number;
  data?: any; // Making data optional to account for potential undefined scenarios
}

interface ApiError {
  response?: ApiResponse;
  request?: any;
  message: string;
}

const handleApiError = (error: ApiError): any => {
  if (error.response) {
    // The request was made, but the server responded with an error
    console.error('Error status:', error.response.status);

    if (error.response.data !== undefined) {
      console.error('Error data:', error.response.data);
      return error.response.data;
    } else {
      console.error('Error data is undefined');
      return 'Error data is undefined';
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received');
    return 'No response received';
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Request error:', error.message);
    return error.message;
  }
};

export default handleApiError;
