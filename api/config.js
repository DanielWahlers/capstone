import dotenv from 'dotenv';

dotenv.config();

export default {
    db: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    },
    listPerPage: 10,
};