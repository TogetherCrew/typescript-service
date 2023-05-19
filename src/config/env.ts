import Joi from "joi";

const schema = Joi.object()
  .keys({
    PORT: Joi.number().required().default(3000),
  })
  .unknown();

const { value: env, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default env;
