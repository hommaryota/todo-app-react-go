import s from "./ListWrap.module.css";

interface Props {
  children: React.ReactNode;
}

const ListWrap = (props: Props) => {
  const { children } = props;
  return <div className={s.wrap}>{children}</div>;
};

export default ListWrap;
