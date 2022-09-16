import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { removeFromCart, changeProductInCart } from "@slices/cart";

import style from "./CartItem.module.scss";

const CartItem = ({ id, img, name, price, updatePriceSum, productCount }) => {
	let [count, setCount] = useState(productCount ? productCount : 1);
	const dispatch = useDispatch();

	const minus = () => {
		if (count !== 1) {
			setCount((count -= 1));
			updatePriceSum(price, 0);
			recalcCost();
			dispatch(changeProductInCart({ id, count: count }));
		}
	};

	const plus = () => {
		setCount((count += 1));
		updatePriceSum(price, 1);
		recalcCost();
		dispatch(changeProductInCart({ id, count: count }));
	};

	const recalcCost = () => price * count;
	const removeProduct = (id) => {
		updatePriceSum(recalcCost(), 0);
		dispatch(removeFromCart(id));
	};

	return (
		<li className={style.cart__item}>
			<div className={style.cart__img}>
				<img src={img} alt="" />
			</div>
			<div className={style.cart__text}>
				<header className={style.cart__header}>
					<h1>{name}</h1>
					<FontAwesomeIcon
						icon={faXmark}
						className={style.icon}
						onClick={(e) => removeProduct(id)}
					/>
				</header>
				<div className={style.cart__amount}>
					<FontAwesomeIcon
						icon={faMinus}
						className={style.icon}
						onClick={minus}
					/>
					<p className={style.goods__amount}>
						{productCount ? productCount : count}
					</p>
					<FontAwesomeIcon
						icon={faPlus}
						className={style.icon}
						onClick={plus}
					/>
				</div>
				<div className={style.cart__price}>
					<h2>${recalcCost().toLocaleString("en-US")}</h2>
				</div>
			</div>
		</li>
	);
};

export default CartItem;