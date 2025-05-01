import s from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;
  return <div className={s.wrap}>{children}</div>;
};

export default Layout;
