import axios from "axios";

// api request function
export const getAddress = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OCAGE_API_KEY}`
  );
  return response.data.results[0].formatted;
};
