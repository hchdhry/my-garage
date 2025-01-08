import React from 'react';
import Header from '../components/header';
const About = () => {
    return (
        
        <main className="bg-gray-900 text-white min-h-screen">
            <Header />
            <section className="py-10">
                <h1 className="text-3xl font-bold text-center mb-4">About My Garage</h1>
                <p className="text-lg text-gray-400 text-center">
                    My Garage is a community for car enthusiasts to connect, share ideas, and discuss all things automotive. Whether you're a seasoned expert or just starting your journey into the world of cars, you'll find like-minded individuals here who share your passion.
                </p>
            </section>
        </main>
    );
};

export default About;
