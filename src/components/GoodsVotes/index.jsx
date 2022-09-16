import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classes from "classnames";
import style from "./GoodsVotes.module.scss";

const GoodsVotes = ({ votes, rating }) => {
	const maxStar = 5;

	return (
		<div className={style.goods__votes}>
			<div className={style.goods__stars}>
				<ul>
					{[...new Array(Math.round(rating ? rating : 0))].map((i, index) => {
						return (
							<li key={index}>
								<FontAwesomeIcon
									icon={faStar}
									className={classes(style.icon, style.yellow)}
								/>
							</li>
						);
					})}
					{[...new Array(maxStar - Math.round(rating ? rating : 0))].map(
						(i, index) => {
							return (
								<li key={index}>
									<FontAwesomeIcon
										icon={faStar}
										className={classes(style.icon, style.gray)}
									/>
								</li>
							);
						}
					)}
				</ul>
				<p>{votes ? votes.toLocaleString("en-US") : 0} votes</p>
			</div>
		</div>
	);
};

export default GoodsVotes;