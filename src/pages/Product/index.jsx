import Header from "@components/Header";
import Content from "@components/Content";
import Container from "@components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "classnames";
import GoodsVotes from "@components/GoodsVotes";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getProductById } from "@thunks/getProductById";
import { addToCart } from "@slices/cart";
import style from "./Product.module.scss";

const Product = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	let deliveryArr = [];
	const cartItems = useSelector((state) => state.cartSlice.cartItems);

	const isBuy = cartItems.some((i) => i.id === id);

	useEffect(() => {
		dispatch(getProductById({ id }));
	}, [dispatch]);

	const product = useSelector((state) => state.productSlice.products);

	if (product.delivery) {
		const parseDelivery = JSON.parse(product.delivery);

		if (parseDelivery.pickup) {
			deliveryArr.push("Самовывоз");
		}
		if (parseDelivery.nova_poshta) {
			deliveryArr.push("Новая почта");
		}
	}

	const productBuy = () => {
		dispatch(
			addToCart({
				id,
				name: product.name,
				price: product.price,
				img: product.img,
			})
		);
	};

	return (
		<>
			<Header />
			<Content>
				<Container>
					{product ? (
						<div className={style.entire__goods}>
							<div className={style.goods__preview}>
								<img src={product.img} alt="" />
							</div>
							<div className={style.goods__description}>
								<header className={style.goods__header}>
									<GoodsVotes votes={product.votes} rating={product.rating} />
									<div
										className={classes(
											style.goods__available,
											!product.available ? style.not : ""
										)}
									>
										<FontAwesomeIcon
											icon={product.available ? faCircleCheck : faXmark}
											className={classes(style.icon, style.yellow)}
										/>
										<p>
											{product.available ? "Are available" : "Not available"}
										</p>
									</div>
								</header>
								<div className={style.goods__info}>
									<h1>
										{product.name} {product.id}
									</h1>
									<p>
										<span>$99.99</span>
										<span className={style.discount__price}>
											$
											{product.price
												? product.price.toLocaleString("en-US")
												: 0}
										</span>
									</p>
								</div>
								<div className={style.goods__buy}>
									{product.available ? (
										isBuy ? (
											<Link to="/cart">
												<button>Перейти в корзину</button>
											</Link>
										) : (
											<button onClick={productBuy}>Купить</button>
										)
									) : (
										<button className={style.not}>Comming soon...</button>
									)}
								</div>
								<div className={style.goods__feature}>
									<ul>
										<li>
											<p>Производитель</p>
											<p>{product.producer}</p>
										</li>
										<li>
											<p>Год выпуска</p>
											<p>{product.year}</p>
										</li>
										<li>
											<p>Доставка</p>
											<p>
												{deliveryArr.length
													? deliveryArr.map((i) => `${i} `)
													: "Нет информации"}
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					) : (
						<p>Hello, world</p>
					)}
				</Container>
			</Content>
		</>
	);
};

export default Product;