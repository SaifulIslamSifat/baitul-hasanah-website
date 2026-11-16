import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Activities from './pages/Activities.jsx';
import QardHasan from './pages/QardHasan.jsx';
import Transparency from './pages/Transparency.jsx';
import Constitution from './pages/Constitution.jsx';
import News from './pages/News.jsx';
import Contact from './pages/Contact.jsx';
import { Login, Register } from './pages/Auth.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="activities" element={<Activities />} />
        <Route path="qard-hasan" element={<QardHasan />} />
        <Route path="transparency" element={<Transparency />} />
        <Route path="constitution" element={<Constitution />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
