import { rbacController } from '@controllers/rbacController';
import { NextFunction, Request, Response } from 'express';

export const authorizations = (resource: string, permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id; // Assume you have some authentication middleware that adds user to the request

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract resource name (endpoint) and action (HTTP method)
    const resourceName = req.path;
    const action = req.method.toLowerCase();

    try {
      const hasPermission = await rbacController.hasPermission(userId, resourceName, action);
      if (hasPermission) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
