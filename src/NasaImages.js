const NasaImages = ({ data, currentImage }) => {
	if (!data || data.length === 0) {
		return <h2>No NASA images available</h2>;
	}

	for (let index = 0; index < data.length; index++) {
		const photo = data[index];
		photo.index = index;
	}
	const getPhotos = () => {
		return data.map((photo) => (
			<figure
				key={photo.id}
				style={{ display: photo.index === currentImage ? "block" : "none" }}
        >
          <div className="something">
				<img
					src={photo.img_src}
					alt={`Photo taken by ${photo.camera.name}`}
					className="nasa_image"
				/>
        </div>
				<figcaption>Image ID: {photo.id}</figcaption>
			</figure>
		));
	};

	return (
		<div className="NasaBox">
			<div className="image-grid">
				{getPhotos()}
			</div>
		</div>
	);
};

export default NasaImages;
