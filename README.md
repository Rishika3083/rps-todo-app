

🎮 Rock Paper Scissors Web App

The Rock Paper Scissors Web App is a simple and engaging browser-based game where players can challenge the computer in the classic game of Rock, Paper, Scissors. Designed using HTML, CSS, and JavaScript, the app provides a smooth and responsive experience along with sound effects and animations to make gameplay more enjoyable. It is a great beginner-friendly project that demonstrates the use of basic web technologies and interactive front-end logic.

🔧 About the Project

This project offers a clean and user-friendly interface where users can make their selection by clicking on the corresponding button — Rock, Paper, or Scissors. The computer randomly selects its move, and the result is instantly displayed along with updated scores. The design is styled using CSS to provide visual feedback, and JavaScript powers the core logic behind gameplay, score calculation, and interactions. There's also a reset button to restart the match at any time.

Additionally, sound effects are integrated to provide an interactive touch, enhancing the user experience. The project includes a basic `Dockerfile` for containerizing the application, allowing it to be deployed easily in any Docker-compatible environment.

 📁 Project Structure

The repository contains the following files:

* `index.html` – The main HTML file that structures the content of the app.
* `style.css` – Contains all styling rules and animations for a visually appealing layout.
* `script.js` – Handles game logic, user interaction, and real-time updates.
* `Dockerfile` – Enables the app to be containerized and deployed using Docker.
* `.github/workflows/github-actions-demo.yml` – A sample GitHub Actions workflow file, which can be used to automate tasks like deployments.

🚀 Getting Started

To run the project locally, clone the repository and open the `index.html` file in any modern web browser:

```bash
git clone https://github.com/Rishika3083/rps-todo-app.git
cd rps-todo-app
```

Then open `index.html` manually or use a live server extension (e.g., Live Server in VS Code).

If you want to run the app inside a Docker container:

```bash
docker build -t rps-game .
docker run -p 8080:80 rps-game
```

Then visit `http://localhost:8080` in your browser.

## ⚙️ Technologies Used

* **HTML** – For building the structure and layout of the game interface.
* **CSS** – For designing, layout control, and adding animations and styles.
* **JavaScript** – For implementing game logic, interactivity, and dynamic content updates.
* **Docker** – For optional containerization and deployment.

 📜 License

This project is licensed under the [MIT License](LICENSE), making it free to use, modify, and distribute.





