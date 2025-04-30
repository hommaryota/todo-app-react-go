import Avatar from "@mui/material/Avatar";
import s from "./Header.module.css";
import { IconButton } from "@mui/material";

const Header = () => {
  return (
    <header className={s.header}>
      <IconButton>
        <Avatar alt="Cindy Baker" src="/src/assets/Irasutoya.png" />
      </IconButton>
    </header>
  );
};

export default Header;
