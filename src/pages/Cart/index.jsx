import Header from "@components/Header";
import Content from "@components/Content";
import Container from "@components/Container";
import CartList from "@components/CartList";

import style from "./Cart.module.scss";

const Cart = () => {
	return (
		<>
			<Header />
			<Content>
				<Container>
					<div className={style.cart}>
						<h1>Корзина</h1>
						<CartList />
					</div>
				</Container>
			</Content>
		</>
	);
};

export default Cart;