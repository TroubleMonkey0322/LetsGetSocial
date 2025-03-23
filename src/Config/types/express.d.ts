
import * as express from 'express';


declare global {
  namespace Express {
    interface Request {
      params: {
        thoughtId: string;
        reactionId: string;
      };
    }
  }
}
