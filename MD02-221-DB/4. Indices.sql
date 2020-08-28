ALTER TABLE orders ADD INDEX order_ticket_bill (table_ticket_id);

ALTER TABLE menu_items ADD INDEX menu_items_price (price);


SELECT * 
FROM orders USE INDEX(order_ticket_bill)
WHERE order_ticket_id=1