import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton } from "@mui/material";
import { Collapse } from '@mui/material';
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const toggle = () => {
        setOpen(!open);
    }
    return (
        <Box sx={{width: 250, backgroundColor: '#ddd'}}>
            <List>
                <ListItem key="">Metaforms Playground 1.0</ListItem>
                <Divider />
                <ListItem key="Home">
                    <ListItemButton>
                        <HomeIcon sx={{
                            marginRight: '12px'
                        }}/>
                        <Link to="/">Home</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Examples">
                    <ListItemButton onClick={toggle}>
                        Examples
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open}>
                    <List sx={{marginLeft: 4}}>
                        {/* <Router> */}
                            <ListItem><ListItemButton><Link to="/example1">Example 1</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to="/example2">Example 2</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to="/example3">Example 3</Link></ListItemButton></ListItem>
                            <ListItem><ListItemButton><Link to="/example4">Example 4</Link></ListItemButton></ListItem>
                        {/* </Router> */}
                    </List>
                </Collapse>
            </List>
        </Box>
    )
}