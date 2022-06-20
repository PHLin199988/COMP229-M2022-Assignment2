import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import { DisplayMovieList } from '../Controllers/movie-list';

// Display Movie List Page
router.get('/movie-list', AuthGuard, DisplayMovieList);

// Display Add Page

// Display Edit Page

// Process Edit Page

// Process Delete Page
export default router;