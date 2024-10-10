import express from 'express';

export interface Routerable {
  setupRoutes(app: express.Application): void;
  start(app: express.Application): void;
}
