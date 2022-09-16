import { Link } from "react-router-dom";
import GoodsVotes from "@components/GoodsVotes";

import style from "./GoodsItem.module.scss";

const GoodsItem = (props) => {
	return (
		<div className={style.goods__item}>
			<header className={style.goods__img}>
				<img src={props.img} alt="" />
			</header>
			<div className={style.goods__body}>
				<Link to={`/product/${props.id}`}>{props.name}</Link>
				<p>
					<span>${(props.price + 132).toLocaleString("en-US")}</span>
					<span className={style.discount__price}>
						${props.price.toLocaleString("en-US")}
					</span>
				</p>
				<GoodsVotes votes={props.votes} rating={props.rating} />
			</div>
		</div>
	);
};

export default GoodsItem;