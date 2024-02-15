const API_KEY = "58d713759dc2ca24ab4120d52e5ed289";
const API_URL = "https://api.openweathermap.org/data/2.5/";

const getGeolocation = async () => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return {
      latitude: null,
      longitude: null,
      error: "Geolocation is not supported by this browser.",
    };
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let response = await fetch(
      `${API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    if (!response.ok) {
      return;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return { latitude: null, longitude: null, error };
  }
};

export default getGeolocation;
