import './App.css';
import Sidebar from './Sidebar';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Example from './Example';
import Example2 from './Example2';
import Home from './Home';
import { AppBar, Box } from '@mui/material';
import ResponsiveDrawer from './ResponsiveDrawer';

function App() {
  return (
    <Router>
      <ResponsiveDrawer />
    </Router>
  )
  // return (
  //   <Box sx={{
  //     display: 'flex'
  //   }}>
  //     <AppBar position="fixed" sx={{
  //       width: { sm: `calc(100% - ${drawerWidth}px)` },
  //       ml: { sm: `${drawerWidth}px` },
  //     }}>       
  //       <Router>
  //         <Sidebar />
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path={basepath} element={<Home/>} />
  //           <Route path={basepath+"/example1"} element={<Example />} />
  //           <Route path={basepath+"/example2"} element={<Example2 />} />
  //         </Routes>
  //       </Router>
  //     </AppBar>
  //   </Box>
  // );
}

export default App;

