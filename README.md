# Express.js RESTful API with Sequelize and MySQL

This project is a RESTful API built with Express.js and Sequelize ORM using MySQL as the database. It provides CRUD operations for a `Course` model.

![Screenshot 2023-11-02 at 1 11 31 AM (2)](https://github.com/Heba-WebDev/courses-api/assets/74996096/d981ddba-8a3a-4f91-964d-a3949a9c1870)


## Features

- CRUD operations for a `Course` model.
- Error handling for existing and non-existing resources.
- Input validation using express-validator.
- API documentation with Swagger.

## Getting Started

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. Install dependencies:
   ```
   cd your-repo-name
   npm install
   ```
3. Create a `.env` file in the root directory of the project and add your MySQL configurations:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdbname
   DIALECT=yoursqldialect
   ```
4. Run the server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /courses`: Fetch all courses.
- `GET /courses/:id`: Fetch a single course by ID.
- `POST /courses`: Create a new course.
- `PUT /courses/:id`: Update a course by ID.
- `DELETE /courses/:id`: Delete a course by ID.

## Error Handling

The API has a global error handling middleware for handling existing and non-existing resources.

## Input Validation

The API uses express-validator to validate user input.

## API Documentation

The API documentation is done using Swagger. You can access it at `/api-docs`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
