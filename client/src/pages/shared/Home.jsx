import React from "react";

const Home = () => {

    return (
        <>
            <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "2px" }}>
                <header style={{ backgroundColor: "#282c34", padding: "10rem", color: "white" }}>
                    <h1>Welcome to world of unlimited shopping</h1>
                    <p>Your one-stop solution to awesome experiences!</p>
                </header>
                <main style={{ marginTop: "20px" }}>
                    <section>
                        <h2>About Us</h2>
                        <p>
                            We are a team dedicated to bringing you the best solutions for your
                            personal and professional needs.
                        </p>
                    </section>
                    <section style={{ marginTop: "20px" }}>
                        <h2>Get Started</h2>
                        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                            Join Now
                        </button>
                    </section>
                </main>
                <footer style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
                    &copy; 2025 My Landing Page. All rights reserved.
                </footer>
            </div>
        </>
    )
}

export default Home;