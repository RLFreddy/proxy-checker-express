import { Router } from 'express';
import { joiValidatorMiddleware } from '../middlewares';
import { validateConfigProxy, IConfigProxy } from '../validators';
import { proxyChecker, main, author } from '../controllers';
const router = Router();

router.get(
    '/',
    main,
);
router.get(
    '/author',
    author,
);
/**
 * @swagger
 * /proxy-checker
 */
router.post(
    '/proxy-checker',
    joiValidatorMiddleware<IConfigProxy>(validateConfigProxy),
    proxyChecker,
);

export default router;