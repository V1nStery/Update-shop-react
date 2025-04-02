import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About/About';
import Header from './components/Header/Header';
import Slider from './components/Slider/Slider';
import IconBlock from './components/IconBlock/IconBlock';
import SliderCard from './components/SliderCard/SliderCard';
import PartnerIcons from './components/PartnerIcons/PartnerIcons';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Footer from './components/Footer/Footer';
import Product from './Components/Product/Product';
import AdminMenu from './components/AdminMenu/AdminMenu';
import AddProduct from './components/AdminMenu/AddProduct';
import SiteTraffic from './components/AdminMenu/SiteTraffic';
import Messages from './components/AdminMenu/Messages';
import Login from './components/AdminMenu/Login';
import { AuthProvider } from './components/AdminMenu/AuthProvider';
import ProtectedRoute from './components/AdminMenu/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/Product/:id" element={<ProductPageWrapped />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/ProductsPage" element={<ProductsPageWrapped />} />

                    {/* Вложенные маршруты для админ-панели */}
                    <Route path="/admin" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>}>
                        <Route index element={<SiteTraffic />} /> {/* Первоначальный компонент */}
                        <Route path="site-traffic" element={<SiteTraffic />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="ProductsPage" element={<ProductsPage/>} /> {/* Страница всех товаров */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

const MainPage = () => (
    <>
        <Header />
        <Slider />
        <IconBlock />
        <SliderCard />
        <PartnerIcons />
        <Footer />
    </>
);

const AboutPage = () => (
    <>
        <Header />
        <IconBlock />
        <About />
        <PartnerIcons />
        <Footer />
    </>
);

const ProductPageWrapped = () => (
    <>
        <Header />
        <Product />
        <Footer />
    </>
);

const ProductsPageWrapped = () => (
    <>
        <Header />
        <ProductsPage />
        <Footer />
    </>
);

export default App;