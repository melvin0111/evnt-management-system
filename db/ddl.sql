CREATE DATABASE new_event_management;
use event_management;
CREATE TABLE `events` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `location` json NOT NULL,
  `user_id` integer NOT NULL,
  `capacity` integer NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'UPCOMING'
  `updated_at` timestamp DEFAULT (now()),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255),
  `role` varchar(255),
  `created_by` int,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `tickets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `description` varchar(255),
  `event_id` integer,
  `ticket_type` varchar(255),
  `quantity` integer,
  `price` decimal,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `event_id` integer NOT NULL,
  `ticket_id` integer,
  `quantity` integer NOT NULL DEFAULT 1,
  `total_amount` float NOT NULL,
  `status` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `expense` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `event_id` integer,
  `category_id` integer,
  `description` varchar(255),
  `amount` float,
  `paid_at` datetime,
  `receipt_url` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

CREATE TABLE `expense_cattegories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

CREATE TABLE `Salaries` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `event_id` integer,
  `name` varchar(255),
  `hourly_rate` decimal,
  `total_amount` decimal,
  `paid_at` datetime,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

ALTER TABLE `events` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `Salaries` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `expense` ADD FOREIGN KEY (`category_id`) REFERENCES `expense_cattegories` (`id`);

ALTER TABLE `expense` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

CREATE INDEX idx_start_date_end_date ON events (start_date, end_date);
CREATE INDEX idx_user_id ON events (user_id);

CREATE INDEX idx_user_id_event_id ON orders (user_id, event_id);


CREATE INDEX idx_order_event_id ON orders (event_id);

CREATE INDEX idx_order_user_id ON orders (user_id);

CREATE INDEX idx_user_email ON users (email);

CREATE INDEX idx_user_created_by ON users (created_by);

CREATE INDEX idx_event_id ON tickets (event_id);




CREATE INDEX idx_sallary_event_id ON Salaries(event_id);



CREATE INDEX idx_expense_event_id ON expense(event_id);

CREATE INDEX idx_expense_cattegory_event_id ON expense(category_id, event_id);


INSERT INTO users (username, email, phone_number, role, created_by, password)
VALUES
('user1', 'user1@example.com', '123456789', 'admin', NULL, 'password1'),
('user2', 'user2@example.com', '987654321', 'user', 1, 'password2'),
('user3', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user4', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user5', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user6', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user7', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user8', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user9', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user10', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user11', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user12', 'user3@example.com', '555555555', 'user', 2, 'password3'),
('user13', 'user13@example.com', '111111111', 'user', 1, 'password13'),
('user14', 'user14@example.com', '999999999', 'user', 2, 'password14'),
('user15', 'user15@example.com', '777777777', 'user', 3, 'password15');

INSERT INTO events (name, description, start_date, end_date, location, user_id, capacity)
VALUES
('Event 1', 'Description 1', '2024-03-01 08:00:00', '2024-03-02 18:00:00', '{"city": "New York"}', 1, 100),
('Event 2', 'Description 2', '2024-05-03 10:00:00', '2024-05-10 20:00:00', '{"city": "Chicago"}', 2, 150),
('Event 3', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 4', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 5', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 6', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 7', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 8', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 9', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 10', 'Description 3', '2024-04-05 12:00:00', '2024-04-10 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 11', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 12', 'Description 3', '2024-03-05 12:00:00', '2024-03-06 22:00:00', '{"city": "Los Angeles"}', 3, 200),
('Event 13', 'Description 13', '2024-03-25 15:00:00', '2024-03-26 01:00:00', '{"city": "Miami"}', 1, 120),
('Event 14', 'Description 14', '2024-03-27 18:00:00', '2024-03-28 04:00:00', '{"city": "San Francisco"}', 2, 180),
('Event 15', 'Description 15', '2024-03-29 21:00:00', '2024-03-30 08:00:00', '{"city": "Seattle"}', 3, 220);


INSERT INTO tickets (description, event_id, ticket_type, quantity, price)
VALUES
('General Admission', 1, 'Standard', 200, 50.00),
('VIP Pass', 1, 'VIP', 50, 100.00),
('Regular Ticket', 2, 'Standard', 150, 40.00),
('Student Pass', 2, 'Student', 50, 30.00),
('Premium Ticket', 3, 'Premium', 180, 80.00),
('Family Package', 3, 'Standard', 200, 120.00),
('General Admission', 2, 'Standard', 200, 50.00),
('VIP Pass', 3, 'VIP', 50, 100.00),
('Regular Ticket', 3, 'Standard', 150, 40.00),
('Student Pass', 4, 'Student', 50, 30.00),
('Premium Ticket', 5, 'Premium', 180, 80.00),
('Family Package', 6, 'Standard', 200, 120.00),
('General Admission', 7, 'Standard', 200, 50.00),
('VIP Pass', 8, 'VIP', 50, 100.00),
('Regular Ticket', 9, 'Standard', 150, 40.00),
('Student Pass', 10, 'Student', 50, 30.00),
('Premium Ticket', 11, 'Premium', 180, 80.00),
('Family Package', 12, 'Standard', 200, 120.00),
('General Admission', 13, 'Standard', 200, 50.00),
('VIP Pass', 14, 'VIP', 50, 100.00),
('Regular Ticket', 15, 'Standard', 150, 40.00),
('Student Pass', 6, 'Student', 50, 30.00),
('Premium Ticket', 5, 'Premium', 180, 80.00),
('Family Package', 4, 'Standard', 200, 120.00);

INSERT INTO orders (user_id, event_id, ticket_id, total_amount, status)
VALUES
(1, 1, 1, 5000.00, 1),
(2, 1, 2, 5000.00, 1),
(3, 2, 3, 6000.00, 1),
(4, 2, 4, 1500.00, 1),
(5, 3, 5, 14400.00, 1),
(6, 3, 6, 24000.00, 1),
(7, 3, 5, 5000.00, 1),
(8, 5, 11, 5000.00, 1),
(9, 6, 12, 6000.00, 1),
(10, 7, 13, 1500.00, 1),
(11, 8, 14, 14400.00, 1),
(12, 9, 15, 24000.00, 1),
(13, 10, 16, 5000.00, 1),
(14, 11, 17, 5000.00, 1),
(15, 12, 18, 6000.00, 1),
(1, 13, 19, 1500.00, 1),
(2, 14, 20, 14400.00, 1),
(3, 15, 21, 24000.00, 1);

INSERT INTO expense_cattegories (name, description)
VALUES
('Category 1', 'Description 1'),
('Category 2', 'Description 2'),
('Category 3', 'Description 3'),
('Category 2', 'Description 13'),
('Category 3', 'Description 14'),
('Category 4', 'Description 1'),
('Category 5', 'Description 2'),
('Category 6', 'Description 3'),
('Category 7', 'Description 13'),
('Category 8', 'Description 14'),
('Category 9', 'Description 1'),
('Category 10', 'Description 2'),
('Category 11', 'Description 3'),
('Category 12', 'Description 13'),
('Category 13', 'Description 14'),
('Category 14', 'Description 15');

INSERT INTO expense (event_id, category_id, description, amount, paid_at, receipt_url)
VALUES
(1, 1, 'Catering', 1000.00, '2024-03-01 12:00:00', 'receipt_url1'),
(1, 2, 'Decorations', 500.00, '2024-03-01 14:00:00', 'receipt_url2'),
(1, 1, 'Audio-Visual', 800.00, '2024-03-03 16:00:00', 'receipt_url3'),
(2, 2, 'Photography', 1200.00, '2024-03-03 18:00:00', 'receipt_url4'),
(2, 1, 'Security', 1500.00, '2024-03-05 20:00:00', 'receipt_url5'),
(2, 1, 'Catering', 1000.00, '2024-03-01 12:00:00', 'receipt_url1'),
(3, 2, 'Decorations', 500.00, '2024-03-01 14:00:00', 'receipt_url2'),
(3, 1, 'Audio-Visual', 800.00, '2024-03-03 16:00:00', 'receipt_url3'),
(3, 2, 'Photography', 1200.00, '2024-03-03 18:00:00', 'receipt_url4'),
(4, 1, 'Security', 1500.00, '2024-03-05 20:00:00', 'receipt_url5'),
(5, 1, 'Catering', 1000.00, '2024-03-01 12:00:00', 'receipt_url1'),
(6, 2, 'Decorations', 500.00, '2024-03-01 14:00:00', 'receipt_url2'),
(7, 1, 'Audio-Visual', 800.00, '2024-03-03 16:00:00', 'receipt_url3'),
(8, 2, 'Photography', 1200.00, '2024-03-03 18:00:00', 'receipt_url4'),
(9, 1, 'Security', 1500.00, '2024-03-05 20:00:00', 'receipt_url5'),
(10, 2, 'Transportation', 2000.00, '2024-03-05 22:00:00', 'receipt_url6');




INSERT INTO Salaries (event_id, name, hourly_rate, total_amount, paid_at)
VALUES
(1, 'John Doe', 25.00, 500.00, '2024-03-02 18:00:00'),
(1, 'Jane Smith', 30.00, 600.00, '2024-03-02 18:00:00'),
(2, 'Alice Johnson', 35.00, 700.00, '2024-03-04 20:00:00'),
(2, 'Bob Brown', 40.00, 800.00, '2024-03-04 20:00:00'),
(3, 'Eva White', 45.00, 900.00, '2024-03-06 22:00:00'),
(3, 'John Doe', 25.00, 500.00, '2024-03-02 18:00:00'),
(4, 'Jane Smith', 30.00, 600.00, '2024-03-02 18:00:00'),
(4, 'Alice Johnson', 35.00, 700.00, '2024-03-04 20:00:00'),
(5, 'Bob Brown', 40.00, 800.00, '2024-03-04 20:00:00'),
(5, 'Eva White', 45.00, 900.00, '2024-03-06 22:00:00'),
(6, 'David Miller', 50.00, 1000.00, '2024-03-06 22:00:00'),
(6, 'David Miller', 50.00, 1000.00, '2024-03-06 22:00:00');




