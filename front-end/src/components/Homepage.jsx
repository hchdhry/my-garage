import React from 'react';

const HomePage = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section>
                    <h1>My garage</h1>
                    <p>the online car talk community</p>
                </section>
                <section>
                    <h2>Featured Services</h2>
                    <ul>
                        <li>Service 1</li>
                        <li>Service 2</li>
                        <li>Service 3</li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;