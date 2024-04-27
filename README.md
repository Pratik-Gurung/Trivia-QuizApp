# Trivia Games Project


## Description
Trivia Games Project is a web application developed using Django framework for creating and managing quizzes. It allows users to create quizzes with different topics, set the number of questions, duration, and required score to pass. Users can then take these quizzes, receive instant feedback on their performance, and view their scores.


## File Contents
### settings.py
The settings.py file contains all the configurations for the Django project, including database settings, static files configuration, installed apps, middleware, and more. It defines crucial settings like SECRET_KEY, DEBUG, ALLOWED_HOSTS, and database settings.

### urls.py (in "quizes" app)
The urls.py file in the "quizes" app defines the URL patterns for the quiz-related views. It maps URLs to corresponding view functions, such as the main_quiz_view, quiz_data_view, and save_quiz_view.

### views.py (in "quizes" app)
The views.py file in the "quizes" app contains the view functions for rendering quiz-related pages and handling quiz data. It includes functions for rendering the main quiz view, retrieving quiz data, and saving quiz results.

### models.py (in "quizes" app)
The models.py file in the "quizes" app defines the Quiz model, which represents a quiz in the database. It includes fields such as name, topic, number of questions, duration, required score to pass, and difficulty level.

### base.html (in "templates" folder)
The base.html file in the "templates" folder serves as the base template for all HTML pages in the project. It includes common HTML structure, Bootstrap CSS, and JavaScript imports. Other templates extend this base template to maintain consistency in layout and styling.

### styles.css (in "static" folder)
The styles.css file in the "static" folder contains custom CSS styles used to customize the appearance of the web application. It includes styles for elements such as modal dialogs, cards, time-bar, score-box, and result-box.


## To run the Trivia Games Project application, follow these steps:

1. Clone the Repository: Start by cloning the project repository to your local machine using Git. You can do this by running the following command in your terminal:
```bash
git clone <repository_url>
```

2. Navigate to Project Directory: Move into the project directory using the cd command:
```bash
cd project_name
```

3. Install Dependencies: Ensure you have Python installed on your machine. Then, install the required Python packages by running:
```bash
pip install -r requirements.txt
```

4. Run Migrations: Apply database migrations to set up the database schema. Run the following command:
```bash
python manage.py migrate
```

5. Start the Development Server: Launch the Django development server by executing:
```bash
python manage.py runserver
```
This will start the server locally, and you should see output indicating that the server is running.

6. Access the Application: Open a web browser and navigate to http://127.0.0.1:8000/ or http://localhost:8000/ to access the application. You should see the homepage of the Trivia Games Project.

7. Explore the Application: Feel free to explore the various features of the application, including quiz creation, quiz-taking, and result viewing.


## Conclusion
The Trivia Games Project's complexity lies in its ability to offer customizable quizzes with real-time feedback, dynamic timer functionality, and responsive design while addressing various technical challenges. By employing advanced techniques, algorithms, and technologies, I successfully tackled these challenges and created a robust and user-friendly quiz platform.
