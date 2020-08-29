-- Creating our menu, categories and ingredients rows
INSERT INTO categories (name)
VALUES
	('Drinks'), ('Cocktails'), ('Soups'),
    ('Salad'), ('Meals'), ('Desserts');
    
    
INSERT INTO ingredients (name)
VALUES
	('Almonds'), ('Eggs'), ('Flour'), ('Sugar'), ('Salt'), ('Lime Juice'),
    ('White Rum'), ('Mint'), ('Chicken'), ('Potatoes');
    

CALL add_menu_item("Chicken Cake Soup", 3, "/path/image3", "Lovely chicken soup", '10.15', true);
CALL add_menu_item("Mojito", 2, "path/image3", "Mochito for you to chill", 15.30, true);
CALL add_menu_item("Long Island", 2, "path/image3", "Long Island for you to die.", 30.30, true);
CALL add_menu_item("Miracle", 4, "path/image3", "Long Island for you to die.", 30.30, false);

INSERT INTO items_has_ingredients(menu_item_id, ingredient_id)
VALUES 
    (1, 9), (1, 10), (2, 2), (2, 4), (3, 6), (3, 7), (4, 7);

-- Creating the number of tables using stored procedures
CALL add_table_ticket("table_A1", true);
CALL add_table_ticket("table_A2", true);
CALL add_table_ticket("table_B1", true);
CALL add_table_ticket("table_B2", true);


-- PLACING ORDERS ----------------------------------------

-- Placing order will be a transaction since if something fails in between we still want our table to be available
START TRANSACTION;

-- 1. Pick a table that will be the "ticket" for all orders
SELECT @ticket_id:=id FROM table_tickets WHERE available=true 
ORDER BY RAND() LIMIT 1;
-- 2. Insert new orders for customers on table @ticket_id
INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid, created_at)
VALUES
	(@ticket_id, 4, 3, (SELECT price FROM menu_items WHERE id = 4), 1, '2020-08-15 15:30:36'),
    (@ticket_id, 3, 1, (SELECT price FROM menu_items WHERE id = 3), 0, '2020-08-15 15:32:36');
-- 3. Change the status of the table
UPDATE table_tickets SET available = false WHERE (id = @ticket_id);  
      
-- 4. Commit changes    
COMMIT;


CALL update_menu_item(3, 10.20);


-- 2nd TRANSACTION
START TRANSACTION;

SELECT @ticket_id:=id from table_tickets WHERE available=true
ORDER BY RAND() LIMIT 1;
INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid, created_at)
VALUES
    (@ticket_id, 3, 1, (SELECT price FROM menu_items WHERE id = 3), 0, '2020-08-20 12:32:36');
UPDATE table_tickets SET available = false WHERE (id = @ticket_id);  
        
COMMIT;
-- END OF TRANSACTION

CALL update_menu_item(3, 5.20);

-- 3rd TRANSACTION
START TRANSACTION;

SELECT @ticket_id:=id from table_tickets WHERE available=true
ORDER BY RAND() LIMIT 1;
INSERT INTO orders (table_ticket_id, menu_item_id, quantity, price, paid, created_at)
VALUES
    (@ticket_id, 3, 2, (SELECT price FROM menu_items WHERE id = 3), 0, '2020-08-20 12:32:36'),
    (@ticket_id, 2, 5, (SELECT price FROM menu_items WHERE id = 2), 0, '2020-08-20 12:32:36');
UPDATE table_tickets SET available = false WHERE (id = @ticket_id);  
        
COMMIT;
-- END OF TRANSACTION
