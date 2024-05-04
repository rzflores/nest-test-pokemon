export const EnvConfiguration = () => ({
    enviroment : process.env.NODE_ENV || 'dev',
    mongoDb : process.env.MONGO_URL,
    port: process.env.PORT || 3001,
    defaultLimit : +process.env.DEFAULT_LIMIT || 8
})