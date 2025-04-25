 const Sequelize=require('sequelize');
 const path=require('path');
 
 const sequelize=new Sequelize({
    host:'localhost',
    dialect:'sqlite',
    storage:path.join(__dirname,'../db/database.sqlite'),
    logging: false
  });

module.exports={sequelize};