DROP DATABASE restaurant_dev;
CREATE DATABASE restaurant_dev;

USE restaurant_dev;

CREATE TABLE ingredients (
     id INT UNSIGNED AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     
     PRIMARY KEY (id)
);

CREATE TABLE categories (
     id INT UNSIGNED AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     
     PRIMARY KEY (id)
);

-- The items on the menu that we can order
CREATE TABLE menu_items (
     id INT UNSIGNED AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL UNIQUE,
     category_id INT UNSIGNED,
     picture VARCHAR(200) NOT NULL,
     description VARCHAR(500),
     price DECIMAL(5, 2),
     available BOOLEAN,
     
     FOREIGN KEY (category_id) REFERENCES categories(id),
     PRIMARY KEY (id)
);

-- Since we have many-to-many relationship
CREATE TABLE items_has_ingredients (
     id INT UNSIGNED AUTO_INCREMENT,
     menu_item_id INT UNSIGNED,
     ingredient_id INT UNSIGNED,
     
     FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
     FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
     PRIMARY KEY (id)
);

-- Multiple orders can belong to 1 ticket/bill/table
CREATE TABLE table_tickets (
	 id INT UNSIGNED AUTO_INCREMENT,
     name VARCHAR(100) UNIQUE,
     available BOOLEAN,
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     
     PRIMARY KEY (id)
);

-- 1 Order/Ticket can belong to many menu items
CREATE TABLE orders (
	 id INT UNSIGNED AUTO_INCREMENT,
	 table_ticket_id INT UNSIGNED,
     menu_item_id INT UNSIGNED,
     price DECIMAL(5, 2) NOT NULL,
	 quantity INT,
     paid BOOLEAN,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     
     FOREIGN KEY (table_ticket_id) REFERENCES table_tickets(id),
     FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
     PRIMARY KEY (id)
);




