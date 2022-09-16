import classes from "classnames";
import style from "./Search.module.scss";
import { useState, useContext } from "react";
import { MainContext } from "../../pages/Main";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getProducts } from "@thunks/getProducts";

const Search = () => {
	const SearchContext = useContext(MainContext);
	const [show, setShow] = useState(0);
	const dispatch = useDispatch();

	SearchContext.showInputState = [show, setShow];

	const changeInput = (text) => {
		dispatch(getProducts({ page: 0, text }));

		if (SearchContext.updatePageCount) {
			SearchContext.updatePageCount({ text });
		}
	};

	return (
		<div
			className={classes(
				style.search,
				SearchContext.showInputState[0] ? style.active : ""
			)}
		>
			<input
				placeholder="Write..."
				onChange={debounce((e) => changeInput(e.target.value), 2000)}
			/>
		</div>
	);
};

export default Search;