# HTTP Methods API

A simple Express.js server demonstrating basic HTTP methods.

## Prerequisites

- Node.js installed

## Installation

```bash
npm install
```

## Usage

Start the development server:

```bash
npm run dev
# OR
npm start
```

The server will start at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Description | Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Home route | "Welcome to Our Server" |
| `GET` | `/login` | Login page | "hello this is login page" |
| `POST` | `/` | POST request handler | "Welcome to POST Home Route" |
| `PATCH` | `/` | PATCH request handler | "Welcome to Patch Route" |
| `PUT` | `/` | PUT request handler | "Welcome to Put Route" |
| `DELETE` | `/` | DELETE request handler | "Welcome to Delete Route" |
