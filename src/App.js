import './App.css';
import AppRouting from './Pagerouting/AppRouting';





function App() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Successfully obtained position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        
        // You can use these coordinates as needed
      },
      function(error) {
        // Handle error cases
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  return (
    <div className="App">
     <AppRouting/>
    </div>
  );
}

export default App;
