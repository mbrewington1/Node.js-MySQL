CREATE database Bamazon;
use Bamazon;
create table product(
item_id integer(11) not null,
product_name VARCHAR(30) not null,
department_name VARCHAR(30) default null,
price decimal(11,4) default null,
stock_quality integer(11) not null
);

SET SQL_SAFE_UPDATES = 0;

insert into product (item_id, product_name, department_name, price, stock_quality)
values (1, "bracelet", "jewelry", 3088, 2);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (2, "ring", "jewelry", 2194, 3);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (3, "earring", "jewelry", 543, 2);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (4, "purse", "accessory", 108.6, 10);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (5, "shoes", "footware", 80.79, 20);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (6, "socks", "footware", 10.29, 100);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (7, "top", "clothes", 30.97, 30);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (8, "doll", "toy", 23.35, 10);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (9, "skirt", "clothes", 32.89, 20);

insert into product (item_id, product_name, department_name, price, stock_quality)
values (10, "phone", "electronic", 530.28, 8);

select * from product;

create table departments(
department_id integer(11) not null,
department_name varchar(30) not null,
over_head_costs decimal(11,4) default 1000,
product_sales decimal(11,4) default null,
total_profit decimal(11,4) default null,
primary key (department_id)
);
select * from departments;