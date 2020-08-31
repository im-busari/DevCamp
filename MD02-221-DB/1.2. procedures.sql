-- Procedures
DELIMITER //
CREATE PROCEDURE add_table_ticket (IN name VARCHAR(100), IN available BOOLEAN)
BEGIN
    INSERT INTO table_tickets (name, available) VALUES (name, available);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE add_menu_item (IN name VARCHAR(100), IN category_id INT UNSIGNED, IN picture VARCHAR(200), IN description VARCHAR(500), IN price DECIMAL(5, 2), IN available BOOLEAN)
BEGIN
    INSERT INTO menu_items (name, category_id, picture, description, price, available)
	VALUES
	(name, category_id, picture, description, price, available);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_menu_item (IN input_id INT UNSIGNED, IN input_price DECIMAL(5, 2))
BEGIN
    UPDATE menu_items SET price = input_price WHERE id=input_id;
END //
DELIMITER ;


-- Indicies
CREATE  INDEX table_bill ON orders(table_ticket_id);
CREATE  INDEX menu_items_price ON menu_items(price);

-- SELECT * FROM orders USE INDEX(table_bill) WHERE table_ticket_id=1