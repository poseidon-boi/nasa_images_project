import "./App.css";

function App() {
	const today = new Date();

	return (
		<div className="App">
			<header>
				<h1>Nasa Images</h1>
			</header>
			<main></main>
			<footer>
				<p>Copyright &copy; {today.getFullYear()} </p>
			</footer>
		</div>
	);
}

export default App;
