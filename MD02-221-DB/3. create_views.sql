-- Menu list - select all enabled menu items
CREATE VIEW available_Menu_Items AS SELECT * FROM menu_items WHERE available=true;

-- Search by part of a menu item name - select all matching menu items
CREATE VIEW search_by_part_of_name AS SELECT * FROM menu_items WHERE name LIKE '%cake%';

-- Search by order/receipt number - select all matching menu items from that order/recipe
CREATE VIEW search_by_ticket_numeber AS SELECT * FROM orders WHERE table_ticket_id=1;

-- Search sold menu items during a period (hour(s), day(s), month(s), and/or year(s) - select matching menu items) - select all 
-- matching menu items ordered by date and time. Do not group the result.
CREATE VIEW sold_items_for_month AS SELECT menu_items.name, orders.created_at, orders.paid
FROM orders INNER JOIN menu_items
ON orders.menu_item_id=menu_items.id
WHERE orders.paid=1 AND MONTH(orders.created_at) = 8
ORDER BY created_at ASC;
-- Should receive 1 item

-- 3. e)
SELECT menu_items.name, SUM(quantity) as "SUM Quantity", SUM(orders.price) as "SUM Price"
FROM orders INNER JOIN menu_items ON orders.menu_item_id=menu_items.id
WHERE orders.paid=1 AND MONTH(orders.created_at) = 8
GROUP BY menu_items.name;


