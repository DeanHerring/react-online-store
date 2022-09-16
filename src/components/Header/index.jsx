import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { MainContext } from "../../pages/Main";
import { useState, useContext } from "react";

import style from "./Header.module.scss";

const Header = () => {
	const HeaderContext = useContext(MainContext);

	const showInput = () => {
		if (HeaderContext.showInputState) {
			HeaderContext.showInputState[1](!HeaderContext.showInputState[0]);
		}
	};

	return (
		<header className={style.header}>
			<div className={style.header__logo}>
				<h1>
					<Link to="/">Тётя Груша</Link>
				</h1>
			</div>
			<div className={style.header__icons}>
				<ul>
					<li onClick={showInput}>
						<FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
					</li>
					<li>
						<Link to="/cart">
							<FontAwesomeIcon icon={faCartShopping} className={style.icon} />
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;