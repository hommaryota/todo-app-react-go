import Avatar from "@mui/material/Avatar";
import s from "./Header.module.css";
import { IconButton, Slider } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const [size, setSize] = useState(50);

  const onChangeSlider = (e: any) => {
    console.log(e);

    setSize(e.target.value);
  };
  return (
    <header className={s.header}>
      <IconButton>
        <Avatar
          alt="Cindy Baker"
          src="/src/assets/Irasutoya.png"
          sx={{ width: size, height: size }}
        />
      </IconButton>
      <div>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={onChangeSlider}
        />
      </div>
    </header>
  );
};

export default Header;
