import axios from 'axios';
import localStorage from 'localStorage';

const makeRequest = async (BACKEND_URL,apiEndPoint, dynamicConfig = {}, navigate) => {
  // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImF3dzEiLCJpYXQiOjE2NzgyNTE3OTIsImV4cCI6MTY3ODI1MzU5Mn0.HN7Ke5k685_JC6qzmv1J5Cz1qgoqBY7pXuPZWI-MkVI";
const jwtToken = localStorage.getItem('jwtToken');
console.log('jwtToken-makeRequest',jwtToken);
  const requestDetails = {
    baseURL: BACKEND_URL,
    url: apiEndPoint.url,
    method: apiEndPoint.method,
    ...dynamicConfig,
    headers: {
      // add jwt token to header
      authorization: `bearer ${jwtToken}`,
     
    },
  };
  try {
    console.log(`req${JSON.stringify(requestDetails)}`);
    const { data } = await axios(requestDetails);
    // console.log('hi');
    console.log(`data-mr${JSON.stringify(data)}`);
    return data;
  } catch (e) {
    if (navigate) {
      // console.log('es1', e.response);
      const errorStatus = e.response?.status;
      // console.log('es', errorStatus);
      if (errorStatus) {
        navigate(`/error/${errorStatus}`);
      } else {
        navigate('/error');
      }
    }
  }
};
export default makeRequest;
