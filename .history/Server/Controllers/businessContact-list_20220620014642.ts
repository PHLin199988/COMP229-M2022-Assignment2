import express from 'express';
import { CallbackError } from 'mongoose';

// import the Movie Model
import BusinessContact from '../Models/businessContact';

import { UserDisplayName  } from '../Util';

export function DisplayBusinessContactListPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
    BusinessContact.find(function(err, businessContactsCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      res.render('index', { title: 'BusinessContact List', page: 'businessContact-list', businessContacts: businessContactsCollection, displayName:  UserDisplayName(req)  });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  res.render('index', { title: 'Add', page: 'edit', businessContact: '', displayName:  UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the businessContact into the edit page
  BusinessContact.findById(id, {}, {}, function(err, businessContactToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', businessContact: businessContactToEdit, displayName:  UserDisplayName(req) })
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new bBusinessContact to Add
  let newBusinessContact = new BusinessContact
  ({
    "Name": req.body.movieName,
    "Director": req.body.movieDirector,
    "Year": req.body.movieYear,
    "Rating": req.body.movieRating
  });

  // Insert the new Movie object into the database (movies collection)
  BusinessContact.create(newBusinessContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the movie-list
    res.redirect('/movie-list');
  })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new Movie to Edit
  let updatedMovie = new BusinessContact
  ({
    "_id": id,
    "Name": req.body.movieName,
    "Director": req.body.movieDirector,
    "Year": req.body.movieYear,
    "Rating": req.body.movieRating
  });

  // update the movie in the database
  BusinessContact.updateOne({_id: id}, updatedMovie, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the movie-list page
    res.redirect('/movie-list');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the movie
  BusinessContact.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/movie-list');
  });
}