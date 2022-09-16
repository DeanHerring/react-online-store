import style from "./Content.module.scss";

const Content = ({ children }) => {
	return <div className={style.container}>{children}</div>;
};

export default Content;