'use strict';
import  {Model, Sequelize} from 'sequelize'
import { ProductAttributes } from '../types/product';


module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string
    storage!: number;
    image!: string;  
    display!: string;
    camera!: string;
    battery!: string;
    ram!: number;
    processor!: string;
    warranty!: number;
    price!: number;
    assured!: boolean;
    discount!: number;
    rating!: number;
    brand!: string;
    popularity!: number;

    static associate(models: any) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    display: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    camera: {
      type: DataTypes.STRING,
      allowNull: false
    },
    battery: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    ram: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    warranty: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    assured: {
      type: DataTypes.BOOLEAN,
      allowNull: false 
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false 
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};   