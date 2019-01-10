var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var item_id = 0;
var quality = 0;

var dbConnection = mysql.createConnection({
	
	host: "localhost",
	user: "root",
	password: "root",
	database: "bamazon"
  
});

dbConnection.connect(function(err){
	if(err) throw err;
	list_option();
});

function list_option(){
	inquirer.prompt({
		name: "option",
		type: "rawlist",
		message: "select options list below",
		choices: ["View Products for Sale","View Low Inventory","Add to Inventory", "Add New Product","exit"]
	}).then(function(result){
		switch (result.option){
			case "View Products for Sale":
			view_product();
			break;

			case "View Low Inventory":
			view_lowInventory();
			break;

			case "Add to Inventory":
			add_inventory();
			break;

			case "Add New Product":
			add_new_product();
			break;

			case "exit":
			select_done();
			break;
		}
	})
};

function view_product(){
	dbConnection.query("select id, product_name, price, product_quantity from products", function(err, result){
		if(err) throw err;
		console.table(result);
		list_option();
	})
};

function view_lowInventory(){
	dbConnection.query("select id, product_name, price, product_quantity from products Where product_quantity < 5", function(err, result){
		if(err) throw err;
		console.table(result);
		list_option();
	})
};

function add_inventory(){
	inquirer.prompt([
	{
		name: "item",
		type: "input",
		message: "which item_id do you want to add",
		validate: function(value){
			if (parseInt(value) <12){
				return true;
			}
			return false;
		}
	},
	{
		name: "quantity",
		type: "input",
		message: "how many do you want to add?",
		validate:function(value){
			if(isNaN(value)===false && parseInt(value)>0){
				return true;
			}return false;
		}
	}]).then(function(result){
		item_id = parseInt(result.item);
		quantity = parseInt(result.quantity);
		dbConnection.query("update products set product_quantity=product_quantity+? where id=?",[quantity, item_id], function(err){
				if(err) throw err;
			});
		list_option();
	})
};

function add_new_product(){
	inquirer.prompt([
	// {
	// 	name: "id",
	// 	type: "input",
	// 	message: "what is the id?",
		
	// },
	{
		name: "product_name",
		type:"input",
		message: "what is the product name?"
	},
	{
		name: "department_name",
		type: "input",
		message: "what department does this item belong to?",
	},
	{
		name: "price",
		type: "input",
		message: "what is the price for this item",
	},
	{
		name: "product_quantity",
		type: "input",
		message: "how many do you have",
	}]).then(function(result){
		console.log(result);
		dbConnection.query("insert into products (product_name, department, price, product_quantity) values (?,?,?,?);", [result["product_name"], result["department_name"], result.price, result["product_quantity"]], function(err){
			if(err) throw err;
		});
		list_option();
		})

};

function select_done(){
	dbConnection.end();
};
