import "./App.css";
import NasaImages from "./NasaImages";
import { useEffect, useState } from "react";

function App() {
	const today = new Date();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		async function fetchAPIData() {
			const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
			const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_KEY}`;
			try {
				const response = await fetch(url);
				const apiData = await response.json();

				if (apiData.photos && apiData.photos.length > 0) {
					setData(apiData.photos);
					console.log(apiData.photos);
				} else {
					console.log("No photos found");
				}
			} catch (err) {
				console.log("Error fetching data:", err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchAPIData();
	}, []);

	const handleClick = (isRightArrow) => {
		console.log("click");
		if (isRightArrow) setCurrentImage((currentImage + 1) % 856);
		else setCurrentImage((currentImage + 855) % 856);
		console.log(currentImage);
	};

	return (
		<div className="App">
			<header>
				<h1>NASA Images</h1>
			</header>
			<main>
				<div className="main-container">
					<div className="left-arrow" onClick={() => handleClick(false)}></div>
					{data ? (
						<NasaImages data={data} currentImage={currentImage} />
					) : (
						<div className="loadingState">loading images...</div>
					)}
					<div className="right-arrow" onClick={() => handleClick(true)}></div>
				</div>

			</main>
			<footer>Copyright &copy; {today.getFullYear()}</footer>
		</div>
	);
}

export default App;
