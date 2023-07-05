import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Main from './pages/main'
import Test from './pages/test'
import './App.css';

const queryClient = new QueryClient();


export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Main />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}
