-- Procedures
DELIMITER //
CREATE PROCEDURE add_table_ticket (IN name VARCHAR(100), IN available BOOLEAN)
BEGIN
    INSERT INTO table_tickets (name, available) VALUES (name, available);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deactivate_table_ticket (IN id INT UNSIGNED)
BEGIN
    UPDATE table_tickets SET available = false WHERE id=id;
END //
DELIMITER ;


INSERT INTO categories (name)
VALUES
	('Drinks'),
    ('Cocktails'),
    ('Soups'),
    ('Salad'),
    ('Meals'),
    ('Desserts');
    
    
INSERT INTO ingredients (name)
VALUES
	('Almonds'),
    ('Eggs'),
    ('Flour'),
    ('Sugar'),
    ('Salt'),
    ('Lime Juice'),
    ('White Rum'),
    ('Mint'),
    ('Chicken'),
    ('Potatoes');
    

INSERT INTO menu_items (name, category_id, picture, description, price, available)
VALUES
	("Chicken Cake Soup", 3, "/path/image3", "Lovely chicken soup", '10.15', true),
    ("Cake", 5, "path/image3", "Lovely cake", 25.15, true),
    ("Mojito", 2, "path/image3", "Mochito for you to chill", 15.30, true),
    ("Long Island", 2, "path/image3", "Long Island for you to die.", 30.30, true),
    ("Miracle", 4, "path/image3", "Long Island for you to die.", 30.30, false);

INSERT INTO items_has_ingredients(menu_item_id, ingredient_id)
VALUES 
    (1, 9), (1, 10), (2, 2), (2, 4), (3, 6), (3, 7), (4, 7), (5, 2), (5, 1);

-- Creating the number of tables 
CALL add_table_ticket("table_A1", true);
INSERT INTO table_tickets(name, available)
VALUES
	("table_A2", true), ("table_B1", true), ("table_B2", true);


-- Add at least 3 orders/recipes with at least one menu item with a changed price at least 2 times 
-- (an order with initial menu item price, an order with the same menu item and fist price update and 
-- other order with the same menu item second price update - no duplicated prices).
INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid)
VALUES
	(1, 4, 3, (SELECT price FROM menu_items WHERE id = 4), 1),
    (2, 3, 1, (SELECT price FROM menu_items WHERE id = 3), 0);
 
-- Just want to have a slight difference for later when I check items
UPDATE orders SET created_at = '2020-05-26 20:40:36' WHERE (id = '1');  

UPDATE menu_items
SET price = 10.20
WHERE id=3;

INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid)
VALUES
    (2, 3, 1, (SELECT price FROM menu_items WHERE id = 3), 1);

UPDATE menu_items SET price = 5.00 WHERE id=3;


INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid)
VALUES
    (3, 3, 2, (SELECT price FROM menu_items WHERE id = 3), 0),
    (1, 2, 1, (SELECT price FROM menu_items WHERE id = 2), 1);
    
-- UPDATE orders SET total = price * quantity WHERE table_ticket_id;

-- Immanuella Busari