import { Theme } from "@mui/material/styles";

import Drawer from "./Drawer";
import List from "./List";
import Button from "./Button";
import Chip from "./Chip";
import Tabs from "./Tabs";
import TextInput from './TextInput';

// ----------------------------------------------------------------------

const ComponentsOverrides = (theme: Theme) =>
  Object.assign(
    Drawer(theme),
    List(theme),
    Button(theme),
    // InputBase(),
    Tabs(),
    Chip(theme),
    // Select(theme),
    TextInput()

  );

export default ComponentsOverrides;
