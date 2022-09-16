import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getCountRowsInProduct } from "@thunks/getCountRowsInProduct";
import { useSelector, useDispatch } from "react-redux/es/exports";
import classes from "classnames";
import { getProducts } from "@thunks/getProducts";
import { MainContext } from "../../pages/Main";

import style from "./Pagination.module.scss";

const Pagination = () => {
	const dispatch = useDispatch();
	const [params, setParams] = useSearchParams();
	const pageId = parseInt(params.get("page"));
	const PagContext = useContext(MainContext);

	const updateCountPage = (setting) => {
		dispatch(getCountRowsInProduct(setting));
	};

	PagContext.updatePageCount = updateCountPage;

	const productPerPage = 3;

	useEffect(() => {
		if (!pageId) {
			setParams({ ...Object.fromEntries([...params]), page: 0 });
		}
		dispatch(getCountRowsInProduct());
	}, [dispatch]);

	let productCount = useSelector((state) => state.productSlice.productsCount);
	let pageCount = Math.ceil(productCount / productPerPage);

	const goToPage = (e, id) => {
		e.preventDefault();
		setParams({ ...Object.fromEntries([...params]), page: id });
		dispatch(getProducts({ ...Object.fromEntries([...params]), page: id }));
	};

	return (
		<div className={style.pagination}>
			<ul className={style.pagination__list}>
				{pageCount > 0 ? (
					[...new Array(pageCount)].map((i, index) => {
						return (
							<li className={style.pagination__item} key={index}>
								<a
									href={"/page=" + index}
									className={classes(
										pageId === index ? style.active : "",
										index > pageId + 3 || index < pageId - 3 ? style.hidden : ""
									)}
									onClick={(e) => goToPage(e, index)}
								>
									{index + 1}
								</a>
							</li>
						);
					})
				) : (
					<p>Hello, world</p>
				)}
			</ul>
			<div className={style.pagination__eigenvalue}>
				<input min="0" defaultValue="1" />
			</div>
		</div>
	);
};

export default Pagination;