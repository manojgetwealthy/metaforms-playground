import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, Toolbar } from "@mui/material";
import { Collapse } from '@mui/material';
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const basepath = '/metaforms-playground';

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
    const toggle2 = () => {
        setOpen2(!open2);
    }
    return (
        <Fragment>
            <Toolbar></Toolbar>
            <List>
                {/* <ListItem key="">Metaforms Playground 1.0</ListItem> */}
                {/* <Divider /> */}
                <ListItem key="Home">
                    <ListItemButton>
                        <HomeIcon sx={{
                            marginRight: '12px'
                        }}/>
                        <Link to="/">Home</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem key="Examples">
                    <ListItemButton onClick={toggle}>
                        Examples
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open}>
                    <List sx={{marginLeft: 4}}>
                        {/* <Router> */}
                            <ListItem><ListItemButton><Link to={"/example1"}>Example 1</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to={"/example2"}>Example 2</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to="/example3">Example 3</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to="/example4">Example 4</Link></ListItemButton></ListItem>
                            {/* <ListItem><ListItemButton><Link to="/example4">Example 4</Link></ListItemButton></ListItem> */}
                        {/* </Router> */}
                    </List>
                </Collapse>
                {/* <ListItem key="Term Insurance">
                    <ListItemButton onClick={toggle2}>
                        Term Insurance
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open2}>
                    <List sx={{marginLeft: 4}}>
                            <ListItem><ListItemButton><Link to="/form1">Form 1</Link></ListItemButton></ListItem>
                    </List>
                </Collapse> */}
            </List>
            </Fragment>
    )
}