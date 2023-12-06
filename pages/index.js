import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setuserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setuserInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Chatbot</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Chatbot
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/index.html"
                  id="navbarDropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Menu
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/html/AskForHelp.html">
                      Ask For Help
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/html/Meditation.html">
                      Meditation
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Chatbot
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/html/Inspiration.html">
                      Inspiration
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/html/Exercises.html">
                      Exercises
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/html/CreativeRelease.html">
                      Creative Release
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      {/* Dark-themed "Chat" div */}
      <div className="bg-dark text-white p-3 text-center">
        <div className="container">
          <h1 class="display-4 fw-bolder">Chat</h1>
          <p class="lead fw-normal text-white-50 mb-0">
            Ask for help and get advice
          </p>
        </div>
      </div>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="user"
            placeholder="How can I help you?"
            value={userInput}
            onChange={(e) => setuserInput(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>

      {/* Dark-themed footer */}
        <footer className="bg-dark text-white p-3">
        {/* Add your footer content here */}
      </footer>
      {/* Bootstrap JS and Popper.js for Bootstrap 5 */}
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
    </div>
  );
}
