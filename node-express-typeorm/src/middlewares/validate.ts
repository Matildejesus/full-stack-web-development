import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

// https://www.upgrad.com/blog/password-validation-in-javascript/?_gl=1*9tuot2*_gcl_au*MTMxNzAxNDQ4OC4xNzQ4MDg2ODk5*_ga*MTE0MTk3MjM5MS4xNzQ4ODYyNDQ0*_ga_MBTGG7KX5Y*czE3NDg4NjI0NDMkbzEkZzEkdDE3NDg4NjMyMjQkajMzJGwwJGg0NDQwNTc4MTY.
export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
    }

    // replace body with validated and transformed instance
    req.body = instance;
    next();
  };
}
