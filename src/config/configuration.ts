import 'dotenv/config';

const isTestEnvironment = process.env.NODE_ENV === 'test';
const isProductionEnvironment = process.env.NODE_ENV === 'production';

export default {
  environment: process.env.NODE_ENV || 'development',
  host: process.env.APP_HOST || '127.0.0.1',
  aliyun: {
    oss: {
      region: process.env.ALIYUN_OSS_REGION,
      accessKeyId: process.env.ALIYUN_OSS_ACCESSKEY_ID,
      accessKeySecret: process.env.ALIYUN_OSS_SECRET,
      bucket: process.env.ALIYUN_OSS_BUCKET,
    },
  },
  port:
    (isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) ||
    '5001',
  auth: {
    secretKey: process.env.JWT_SECRET_KEY || '4C31F7EFD6857D91E729165510520424',
  },
  typeorm: {
    db: {
      host: process.env.DB_HOST || 'localhost',
      type: process.env.DB_TYPE || 'mysql',
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '12345678',
      database:
        (isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME) ||
        'nestjs',
    },
    synchronize: !isProductionEnvironment,
    logging: !isProductionEnvironment,
  },

  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug',
  },
};
