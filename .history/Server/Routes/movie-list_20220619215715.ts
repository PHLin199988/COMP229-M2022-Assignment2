import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import { DisplayMovieList } from '../Controllers/movie-list';

// Display Movie List Page
router.get('/movie-list', AuthGuard, DisplayMovieList);

// Display Add Page
router.get('/add', AuthGuard, DisplayMovieList);

// Display Edit Page
router.get('/edit/:id', AuthGuard, DisplayMovieList);

// Process Add Page
router.post('/add', AuthGuard, DisplayMovieList);

// Process Edit Page


// Process Delete Page
export default router;