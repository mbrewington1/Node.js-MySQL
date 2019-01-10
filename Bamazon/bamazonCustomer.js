
const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");
var dbConnection = mysql.createConnection({
	
		host: "localhost",
		user: "root",
		password: "root",
		database: "bamazon"
	  
});
var item_id = 0;
var quantity = 0;
var stock_quantity = 0;
var sales = 0;
var column_name = [];

dbConnection.connect(function(err){
	if (err) throw err;
	display_item(select_item);
});

function display_item(action){
	dbConnection.query("select id, product_name, price from products", function(err, result){
		if (err) throw err;
		console.table(result);
		if(select_item){
			select_item();
		}
	})
};

function select_item(action){
	inquirer.prompt([
	{
		name: "item",
		type: "input",
		message: "which item_id do you want to purchase?",
		validate: function(value){
			if (parseInt(value) <20){
				return true;
			}
			return false;
		}
	},
	{
		name: "quantity",
		type: "input",
		message: "how many do you want to purchase?",
		validate:function(value){
			if(isNaN(value)===false){
				return true;
			}
			return false;
		}
	}]).then(function(result){
		item_id = parseInt(result.item);
		quantity = parseInt(result.quantity);
		if (check_quantity){
			check_quantity();
			}
	});	
};

function check_quantity(action){
	dbConnection.query("select product_quantity from products where id = ?", item_id, function(err, result){
		var quantity_value = JSON.parse(JSON.stringify(result))[0]["product_quantity"];
		if (quantity > quantity_value){
			console.log("Insufficient quantity!");
			dbConnection.end();
		}else{
			stock_quantity = quantity_value - quantity;
			dbConnection.query("update products set product_quantity=? where id=?",[stock_quantity, item_id], function(err){
				if(err) throw err;
			});
			dbConnection.query("select price from products where id=?",[item_id], function(err, result){
				if (err) throw err;
				var price = JSON.parse(JSON.stringify(result))[0]["price"];
				sales = price*quantity;
				console.log("Your total cost is: " + sales);
				if(update_sales){
				//update_sales();
				};
			});
		};
	})
};


function update_sales(){
	dbConnection.query('show columns from products',function(err, result){
		if(err) throw err;
		// JSON.parse(JSON.stringify(result))[0]["stock_quantity"];
		var result = JSON.parse(JSON.stringify(result));
		for (var i =0; i < result.length; i++){
			column_name.push(result[i]["Field"]);
		}
		if(column_name.indexOf("product_sales")===-1){
			dbConnection.query("alter table product add product_sales decimal(11,4) default 0", function(err){
				if(err) throw err;
			});
		}
	});

	dbConnection.query("update product set product_sales=product_sales+? where item_id=?",[sales,item_id], function(err, result){
				if(err) throw err;
				dbConnection.end();
			});
};