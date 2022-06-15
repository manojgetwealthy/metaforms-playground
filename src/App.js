import './App.css';
import Sidebar from './Sidebar';
import schema1 from './examples/example1';
import schema2 from './examples/example2';
import schema3 from './examples/example3';
import schema4 from './examples/example4';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Example from './Example';
import Home from './Home';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/example1" element={<Example schema={schema1}/>} />
          <Route path="/example2" element={<Example schema={schema2}/>} />
          <Route path="/example3" element={<Example schema={schema3}/>} />
          <Route path="/example4" element={<Example schema={schema4}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
