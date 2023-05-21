/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
    RABBITMQ_HOST: Joi.string().required().example("localhost"),
    RABBITMQ_PORT: Joi.number().required().example(5672),
    RABBITMQ_USER: Joi.string().required().example("root"),
    RABBITMQ_PASS: Joi.string().required().example("pass")
  })
  .unknown();

const { value, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

const MONGODB_URL = `mongodb://${value.MONGODB_USER}:${value.MONGODB_PASS}@${
  value.MONGODB_HOST
}:${value.MONGODB_PORT}/${
  value.MONGODB_NAME !== undefined ? value.MONGODB_NAME : ""
}`;

const RABBITMQ_URL = `amqp://${value.RABBITMQ_USER}:${value.RABBITMQ_PASS}@${
  value.RABBITMQ_HOST
}:${value.RABBITMQ_PORT}`;

export const env = {
  ...value,
  MONGODB_URL,
  RABBITMQ_URL
};
