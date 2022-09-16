import Header from "@components/Header";
import Categories from "@components/Categories";
import Content from "@components/Content";
import Container from "@components/Container";
import Search from "@components/Search";
import Goods from "@components/Goods";
import Pagination from "@components/Pagination";
import { createContext } from "react";

export const MainContext = createContext();

const Main = () => {
	return (
		<MainContext.Provider
			value={{
				updatePageCount: undefined,
				showInputState: false,
			}}
		>
			<Header />
			<Content>
				<Container>
					<Search />
					<Categories />
					<Goods />
					<Pagination />
				</Container>
			</Content>
		</MainContext.Provider>
	);
};

export default Main;