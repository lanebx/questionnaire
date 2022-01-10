# Questionnaire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


###

**Objective:** to develop an application that allows you to create questions and answer questions.

There are three types of questions:

1. Single choice - the ability to choose only one option from the proposed
2. Multiple Choice - the ability to choose several of the proposed options
3. Open - the ability to write (type) your answer

The application should consist of the following pages:

1. Question Management Page
2. Create question page
3. Question edit page
4. Lists of Questions Page

## Pages

### 1. Question Management Page

1.1 The page displays all questions that user created
1.2 List of questions sorted from newest to oldest (newest at the top)
1.3 The page has a button to redirect to the question creation page
1.4 Each question on this page displays the text of the question, the type of question, and the date when the question was created.
1.4.1 The question also has two buttons - delete and edit.
1.4.1.1 Delete button - removes a question from the list of questions.
1.4.1.2 Edit button - redirect to the page for editing this question

### 2. Create question page

2.1 This page allows the user to create a question with any of the three question types
2.2 After creating a question, user should be redirected to the "Question Management Page"
2.3 The page has the ability to return on the "Question Management Page" at any time
2.4 The choice of the question type should be implemented by radio buttons

### 3. Question edit page

3.1. The page allows the user to edit an existing questions.
3.2 After successfully editing a question, user should be redirected to the "Question Management Page"
3.3 The page has the ability to return on the "Question Management Page" at any time

### 4. Lists of Questions Page

4.1 The page allows user to view two lists of questions (answered and unanswered lists of questions).
4.1.1 These lists divide the screen 50/50 vertically (left unanswered, right answered)
4.1.2 Answered questions list displays all answered questions that sorted by answer date (newest on top)
4.1.3 Unanswered questions list displays only unanswered questions (newest on top)

4.2 Each list displays questions in the cards view
4.2.1 When the card is in the list of unanswered questions
4.2.1.1 Question card displays the question text, answer options / text box (depending on the question type) and the button to create an answer for this question
4.2.1.2 The button for creating an answer to the question is available only when the answer for this question is valid
4.2.1.3 After creating an answer to the question, the card is removed from the list of unanswered questions and added to the list of answered questions

4.2.2 When the card is in the list of answered questions
4.2.2.1 If the card is in the list of answered questions, then the fields must be read-only and filled in according to the answer
4.2.3.2 If the card is in the list of answered questions, then it is possible to roll back the answer. In this case, the card will be removed from the list of answered and added to the list of unanswered questions 

## General requirement

All application state and all data must be stored in local storage. That is, after reloading the page, the state of the application must be restored. All previously created questions and answers must be restored.

Everything should to be developed taking into account the fact that in the future it is possible to add other types of questions.

## Validation

### Question

- Question text (required)
- Question type: Single choice, Multiple choice, Open question (required)
- Answer options - at least two (required only for the Single choice, Multiple choice types)

### Answer

- Answer depending on type
    - A single choice - only one option of the proposed
    - Multiple choice - at least one option of the proposed
    - Open question - text (from 1 to 255 characters)
