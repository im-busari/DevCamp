ALTER TABLE orders ADD INDEX order_ticket_bill (order_ticket_id);

SELECT * 
FROM orders USE INDEX(order_ticket_bill)
WHERE order_ticket_id=1