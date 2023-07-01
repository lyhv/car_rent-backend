sql
CREATE TABLE Customer (
  customer_id INT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  google_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    expires_in INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE BillingAddress (
  billing_address_id INT PRIMARY KEY,
  customer_id INT,
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  country VARCHAR(255),
  postal_code VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE Car (
  car_id INT PRIMARY KEY,
  name VARCHAR(255),
  brand VARCHAR(255),
  model VARCHAR(255),
  year INT,
  available TINYINT(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE PriceHistory (
  price_id INT PRIMARY KEY,
  car_id INT,
  price_per_day DECIMAL(10,2),
  effective_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES Car(car_id)
);
CREATE TABLE Rental (
  rental_id INT PRIMARY KEY,
  customer_id INT,
  car_id INT,
  location_pick_up VARCHAR(255),
  location_drop VARCHAR(255),
  rental_start_date DATETIME,
  rental_end_date DATETIME,
  return_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status VARCHAR(255),
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (car_id) REFERENCES Car(car_id)
);
CREATE TABLE Payment (
  payment_id INT PRIMARY KEY,
  rental_id INT,
  payment_amount DECIMAL(10,2),
  payment_date DATETIME,
  payment_method VARCHAR(255),
  card_id INT,
  transaction_id INT,
  payment_status VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (rental_id) REFERENCES Rental(rental_id),
  FOREIGN KEY (card_id) REFERENCES CreditCard(card_id),
  FOREIGN KEY (transaction_id) REFERENCES PayPalTransaction(transaction_id)
);
CREATE TABLE CreditCard (
  card_id INT PRIMARY KEY,
  customer_id INT,
  card_number VARCHAR(255),
  card_name VARCHAR(255),
  cvc VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE PayPalTransaction (
  transaction_id INT PRIMARY KEY,
  customer_id INT,
  transaction_details VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE EthTransaction (
  transaction_hash VARCHAR(255) PRIMARY KEY,
  customer_id INT,
  transaction_details VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Session (
  session_id INT PRIMARY KEY,
  customer_id INT,
  car_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expiration_time TIMESTAMP
);