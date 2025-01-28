# Venue Booking System

## Description
This project is a web-based Venue Booking System that allows users to register, log in, and book venues. Users can view their existing bookings, check available venues, and complete payments to finalize bookings. The project uses a React frontend, Flask for backend routing, and SQL for database management, styled with TailwindCSS.

## Features
- User authentication (login and registration).
- View existing bookings.
- Browse available venues.
- Book a venue with payment processing.
- Database-triggered validation for unique emails.

## Technologies Used
- **Frontend:** React
- **Backend:** Flask, SQL
- **Database:** MySQL
- **Styling:** TailwindCSS

## Database Schema
### Tables

#### 1. `users`
| Column     | Type         | Attributes                   |
|------------|--------------|------------------------------|
| `user_id`  | INT          | PRIMARY KEY, AUTO_INCREMENT  |
| `name`     | VARCHAR(100) | NOT NULL                    |
| `email`    | VARCHAR(45)  | UNIQUE, NOT NULL            |
| `password` | VARCHAR(100) | NOT NULL                    |
| `is_admin` | BOOLEAN      | DEFAULT FALSE               |

#### 2. `venues`
| Column               | Type         | Attributes                   |
|----------------------|--------------|------------------------------|
| `venue_id`           | INT          | PRIMARY KEY, AUTO_INCREMENT  |
| `venue_name`         | VARCHAR(100) | NOT NULL                    |
| `capacity`           | INT          | NOT NULL                    |
| `location`           | VARCHAR(100) | NOT NULL                    |
| `booking_date`       | DATE         | NOT NULL                    |
| `start_time`         | DATETIME     | NOT NULL                    |
| `end_time`           | DATETIME     | NOT NULL                    |
| `availability_status`| BOOLEAN      | DEFAULT TRUE               |
| `cost`               | INT          | NOT NULL                    |

#### 3. `bookings`
| Column       | Type  | Attributes                   |
|--------------|-------|------------------------------|
| `booking_id` | INT   | PRIMARY KEY, AUTO_INCREMENT  |
| `user_id`    | INT   | FOREIGN KEY REFERENCES users |
| `venue_id`   | INT   | FOREIGN KEY REFERENCES venues|
| `payment_id` | INT   | FOREIGN KEY REFERENCES payments|

#### 4. `payments`
| Column          | Type         | Attributes                   |
|-----------------|--------------|------------------------------|
| `payment_id`    | INT          | PRIMARY KEY, AUTO_INCREMENT  |
| `venue_id`      | INT          | FOREIGN KEY REFERENCES venues|
| `user_id`       | INT          | FOREIGN KEY REFERENCES users |
| `amount`        | DOUBLE       | NOT NULL                    |
| `payment_method`| VARCHAR(45)  | NOT NULL                    |


