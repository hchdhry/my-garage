import Footer from '../components/footer';
import Header from '../components/header';
import Hero from '../components/Hero';


const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Hero />
            <Footer />
        </div>
    );
};

export default HomePage;