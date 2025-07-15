import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    await main();

    await MongoDatabase.disconnect();
})();

const randomBetween0andX = (x: number) => {
    return Math.floor(Math.random() * x);
}

async function main() {
    if (envs.NODE_ENV === 'production') {
        console.log('Cannot seed in production');
        return;
    }
    
    // clear db
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ]);

    // create users
    const users = await UserModel.insertMany(seedData.users);

    // create categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })
    );

    // create products
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0andX(seedData.users.length - 1)]._id,
                category: categories[randomBetween0andX(seedData.categories.length - 1)]._id
            }
        })
    );

    console.log('Seeded!');
}
