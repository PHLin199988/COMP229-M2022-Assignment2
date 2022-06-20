import express from 'express';
import { CallbackError } from 'mongoose';

// import the BusinessContact Model
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
  // instantiate a new businessContact to Add
  let newBusinessContact = new BusinessContact
  ({
    "ContactName": req.body.Name,
    "ContactNumber": req.body.Number,
    "EmailAddress": req.body.businessContactEmailAddress 
  });

  // Insert the new BusinessContact object into the database (businessContacts collection)
  BusinessContact.create(newBusinessContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new businessContact has been added -> refresh the businessContact-list
    res.redirect('/businessContact-list');
  })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new BusinessContact to Edit
  let updatedBusinessContact = new BusinessContact
  ({
    "_id": id,
    "ContactName": req.body.businessContactName,
    "ContactNumber": req.body.businessContactNumber,
    "EmailAddress": req.body.businessContactEmailAddress
  });

  // update the businessContact in the database
  BusinessContact.updateOne({_id: id}, updatedBusinessContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the businessContact-list page
    res.redirect('/businessContact-list');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the businessContact
  BusinessContact.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/businessContact-list');
  });
}