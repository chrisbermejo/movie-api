import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Demo from './pages/demo'
import API from './pages/api'
import './App.css';

const queryClient = new QueryClient();

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<API />} />
                        <Route path='/demo' element={<Demo />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}
