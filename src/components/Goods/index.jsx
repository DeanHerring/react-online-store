import GoodsList from "@components/GoodsList";
import GoodsSort from "@components/GoodsSort";
import style from "./Goods.module.scss";

const Goods = () => {
	return (
		<div className={style.goods}>
			<GoodsSort />
			<GoodsList />
		</div>
	);
};

export default Goods;