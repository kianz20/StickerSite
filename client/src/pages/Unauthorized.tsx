import { NavigationBar, SearchBar } from "../components/";

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
