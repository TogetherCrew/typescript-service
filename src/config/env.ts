import Joi from "joi";

const schema = Joi.object()
  .keys({
    PORT: Joi.number().required().default(3000),
    MONGODB_HOST: Joi.string().required().example("localhost"),
    MONGODB_PORT: Joi.number().required().example(27017),
    MONGODB_USER: Joi.string().required().example("root"),
    MONGODB_PASS: Joi.string().required().example("pass"),
    MONGODB_NAME: Joi.string().optional().example("db"),
    REDIS_QUEUE_HOST: Joi.string().optional().example("localhost"),
    REDIS_QUEUE_PORT: Joi.number().optional().example(6379),
  })
  .unknown();

const { value: env, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const MONGODB_URL = `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASS}@${
  env.MONGODB_HOST
}:${env.MONGODB_PORT}/${
  env.MONGODB_NAME !== undefined ? env.MONGODB_NAME : ""
}`;

export default {
  ...env,
  MONGODB_URL,
};
