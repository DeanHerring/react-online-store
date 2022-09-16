import style from "./Categories.module.scss";
import { useState, useContext } from "react";
import classes from "classnames";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { getProducts } from "@thunks/getProducts";
import { getCountRowsInProduct } from "@thunks/getCountRowsInProduct";
import { MainContext } from "../../pages/Main";

const Categories = () => {
	const categoryItems = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Keyboard" },
		{ id: 2, name: "Mouse" },
		{ id: 3, name: "Headset" },
		{ id: 4, name: "Microphones" },
	];
	const [params, setParams] = useSearchParams();
	const dispatch = useDispatch();
	const CatContext = useContext(MainContext);

	const changeActiveCategory = (e, id) => {
		e.preventDefault();
		setParams({ ...Object.fromEntries([...params]), page: 0, category: id });
		dispatch(
			getProducts({ ...Object.fromEntries([...params]), page: 0, category: id })
		);

		if (CatContext.updatePageCount) {
			CatContext.updatePageCount({ id });
		}
	};

	return (
		<div className={style.categories}>
			<ul>
				{categoryItems.map((i) => {
					return (
						<li
							className={style.all}
							key={i.id}
							onClick={(e) => changeActiveCategory(e, i.id)}
						>
							<a href="/#">{i.name}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;