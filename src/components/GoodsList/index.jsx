import style from "./GoodsList.module.scss";
import GoodsItem from "@components/GoodsItem";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getPaginatedProducts } from "@thunks/getPaginatedProducts";
import { getProducts } from "@thunks/getProducts";
import { useEffect, memo, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import preloaderGif from "@img/preloader.gif";

const GoodsList = () => {
	const dispatch = useDispatch();
	const [params, setParams] = useSearchParams();
	const [preloader, setPreloader] = useState(true);

	const a = useMemo(() => {
		dispatch(getProducts({ ...Object.fromEntries([...params]) }));
	}, [dispatch]);

	const productData = useSelector((state) => state.productSlice.products);

	setTimeout(() => {
		setPreloader(false);
	}, 2000);

	return !preloader ? (
		productData.length ? (
			<div className={style.goods__list}>
				{productData.map((i) => {
					return <GoodsItem key={i.id} {...i} />;
				})}
			</div>
		) : (
			<p>Hello</p>
		)
	) : (
		<div className={style.goods__preloader}>
			<img src={preloaderGif} alt="" />
		</div>
	);
};

export default memo(GoodsList);