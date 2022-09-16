import style from "./GoodsSort.module.scss";
import { useState } from "react";
import classes from "classnames";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { getProducts } from "@thunks/getProducts";

const GoodsSort = () => {
	const sortItems = [
		{ id: 1, name: "цене" },
		{ id: 2, name: "рейтингу" },
		{ id: 3, name: "кол-ву голосов" },
	];

	const [sort, setSort] = useState(false);
	const [params, setParams] = useSearchParams();
	const [activeSort, setActiveSort] = useState(sortItems);
	const [activeSortItem, setActiveSortItem] = useState(sortItems[0].name);
	const dispatch = useDispatch();

	const changeActiveSort = (id) => {
		setActiveSort(id);
		setSort(false);
		setParams({ ...Object.fromEntries([...params]), page: 0, sort: id });
		setActiveSortItem(sortItems[id].name);
		dispatch(
			getProducts({ ...Object.fromEntries([...params]), page: 0, sort: id })
		);
	};

	return (
		<div className={style.goods__sort}>
			<p onClick={(e) => setSort(!sort)}>Сортировать по: {activeSortItem}</p>
			<ul className={classes(style.goods__sort_list, sort ? style.active : "")}>
				{sortItems.map((i) => {
					return (
						<li
							key={i.id}
							className={style.goods__sort_item}
							onClick={(e) => changeActiveSort(i.id - 1)}
						>
							{i.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default GoodsSort;