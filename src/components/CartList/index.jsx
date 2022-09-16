import CartItem from "@components/CartItem";
import { useSelector } from "react-redux/es/exports";
import style from "./CartList.module.scss";
import { useState, useEffect } from "react";

const CartList = () => {
	const cartItems = useSelector((state) => state.cartSlice.cartItems);
	let priceArr = [];
	const [priceSum, setPriceSum] = useState(0);
	let sum = priceSum || 0;
	let totalSum = 0;

	if (cartItems) {
		cartItems.forEach((i) => priceArr.push(i.price));
	}

	useEffect(() => {
		cartItems.forEach((i) => {
			i.count ? (totalSum += i.price * i.count) : (totalSum += i.price);
		});

		setPriceSum(totalSum);
	}, []);

	const updatePriceSum = (price, action, count) => {
		if (action === 0) {
			sum -= price;
			setPriceSum(sum);
		}
		if (action === 1) {
			sum += price;
			setPriceSum(sum);
		}

		return sum;
	};

	return (
		<div className={style.cart__content}>
			<ul className={style.cart__list}>
				{cartItems.length ? (
					cartItems.map((i) => {
						return (
							<CartItem
								productCount={i.count ? i.count : 1}
								updatePriceSum={updatePriceSum}
								{...i}
								key={i.name}
							/>
						);
					})
				) : (
					<p>Вы ещё ничего не покупали</p>
				)}
			</ul>
			<div className={style.cart__payment}>
				<button>Оплата ${priceSum.toLocaleString("en-US")}</button>
			</div>
		</div>
	);
	return <p>Hello, world</p>;
};

export default CartList;