const API_KEY = "58d713759dc2ca24ab4120d52e5ed289";
const API_URL = "https://api.openweathermap.org/data/2.5/";

const getCity = async (city) => {
  try {
    let response = await fetch(
      `${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      return;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default getCity;
