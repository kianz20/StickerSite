import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";

const Unauthorized = (): JSX.Element => {
	return (
		<>
			<NavigationBar />
			<SearchBar />
			<p>Unauthorized</p>
		</>
	);
};

export default Unauthorized;
