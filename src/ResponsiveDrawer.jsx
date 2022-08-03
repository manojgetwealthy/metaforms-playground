import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Example from './Example';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';
import Tests from './tests/Tests';
import Builder from './builder/Builder';
import FormType from './builder/FormBuilder';

const drawerWidth = 240;
const basepath = '/metaforms-playground';

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <Sidebar />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#006699'
        }}
      >
         <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Metaforms Playground 1.0
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path={basepath} element={<Home/>} /> */}
            <Route path={"/example1"} element={<Example />} />
            <Route path={"/example2"} element={<Example2 />} />
            <Route path={"/example3"} element={<Example3 />} />
            <Route path={"/example4"} element={<Example4 />} />
            <Route path={"/tests/:id"} element={<Tests />} />
            <Route path={"/form-builder"} element={<FormType />}>
              <Route path={"simple"} element={<Builder type="simple" />} />
              <Route path={"grouped"} element={<Builder type="grouped" />} />
            </Route>
        </Routes>
      </Box>
    </Box>
  );
}
