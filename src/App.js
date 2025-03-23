import "./App.css";
import NasaImages from "./NasaImages";
import { useEffect } from "react";
import { useState } from "react";

function App() {
	const today = new Date();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
      console.log('NASA API KEY:', NASA_KEY);
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_KEY}`;
      try {
        const response = await fetch(url);
        const apiData = await response.json();

        if (apiData.photos && apiData.photos.length > 0) {
          setData(apiData.photos); 
          console.log(apiData.photos)
        } else {
          console.log('No photos found');
        }
      } catch (err) {
        console.log('Error fetching data:', err.message);
      } finally {
        setLoading(false); 
      }
    }
    fetchAPIData()
  }, [])

	return (
		<div className="App">
			<header>
				<h1>Nasa Images</h1>
			</header>
			<main>
				<div className="image-container">

					{data ? (<NasaImages data={data} />) : 
						<div className='loadingState'>
							loading images...
						</div>
					}
				</div>
				<p className="description">
					This website displays images from the NASA Mars Rover Photos API. NASA is awesome! 
				</p>
			</main>
			<footer>
				Copyright &copy; {today.getFullYear()}
			</footer>
		</div>
	);
}

export default App;
