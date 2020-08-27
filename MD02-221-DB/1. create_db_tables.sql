DROP DATABASE restaurant_dev;
CREATE DATABASE restaurant_dev;

USE restaurant_dev;

CREATE TABLE ingredients (
     ingredient_id INT NOT NULL AUTO_INCREMENT UNIQUE,
     name VARCHAR(200) NOT NULL,
     
     PRIMARY KEY (ingredient_id)
);

CREATE TABLE categories (
     category_id INT NOT NULL AUTO_INCREMENT UNIQUE,
     name VARCHAR(200) NOT NULL,
     
     PRIMARY KEY (category_id)
);

-- The items on the menu that we can order
CREATE TABLE menu_items (
     menu_item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
     name VARCHAR(100) NOT NULL UNIQUE,
     category_id INT, CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(category_id),
     picture VARCHAR(200) NOT NULL,
     description VARCHAR(500),
     price DECIMAL(5, 2),
     available BOOLEAN,
     PRIMARY KEY (menu_item_id)
);

-- Since we have many-to-many relationship
CREATE TABLE items_has_ingredients (
     id INT NOT NULL AUTO_INCREMENT UNIQUE,
     menu_item_id INT, FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id),
     ingredient_id INT, FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
     PRIMARY KEY (id)
);

-- Multiple orders can belong to 1 ticket/bill
CREATE TABLE order_tickets (
	 order_ticket_id INT AUTO_INCREMENT,
     total DECIMAL(5, 2),
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (order_ticket_id)
);

-- 1 Order/Ticket can belong to many menu items
CREATE TABLE orders (
	 order_id INT AUTO_INCREMENT,
	 order_ticket_id INT, FOREIGN KEY (order_ticket_id) REFERENCES order_tickets(order_ticket_id),
     menu_item_id INT, FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id),
     price DECIMAL(5, 2) NOT NULL,
	 quantity INT,
     total DECIMAL(5, 2),
     paid BOOLEAN,

     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (order_id)
);




