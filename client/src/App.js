import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Test from './pages/test'
import './App.css';

export default function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}