/*global require,module,Promise*/
(function withNode(require, module, Promise) {
  'use strict';

  module.exports = function exportingFunction(db, Schema, ObjectId) {

    var userSchema = new Schema({
        'email': String,
        'insertDatetime': Date
      })
      , UserModel = db.model('user', userSchema)
      , getByEmail = function getByEmail(email) {

        return new Promise(function deferred(resolve, reject) {

          UserModel.findOne({
            'email': email
          }, function onResponse(err, data) {

            if (err) {

              reject(err);
            } else {

              resolve(data);
            }
          });
        });
      }
      , getById = function getById(identifier) {

        return new Promise(function deferred(resolve, reject) {

          if (identifier) {
            var theIdentifier = new ObjectId(identifier);

            UserModel.findOne({
              '_id': theIdentifier
            }, function onResponse(err, data) {

              if (err) {

                reject(err);
              } else {

                resolve(data);
              }
            });
          } else {

            reject('Manadatory identifier not provided');
          }
        });
      }
      , insertNew = function insertNew(newUser) {

        return new Promise(function deferred(resolve, reject) {
          var User = new UserModel(newUser);

          User.save(function onSave(err, data) {

            if (err) {

              reject(err);
            } else {

              resolve(data);
            }
          });
        });
      }
      , updateById = function updateById(idUser, newUser) {

        return new Promise(function deferred(resolve, reject) {

          UserModel.update({
            '_id': idUser
          }, {
            '$set': newUser
          }, function onResponse(err) {

            if (err){

              reject(err);
            } else {

              /*jscs: disable disallowDanglingUnderscores*/
              /*eslint-disable no-underscore-dangle*/
              if (!newUser._id) {

                newUser._id = idUser;
              }
              /*jscs: enable disallowDanglingUnderscores*/
              /*eslint-enable no-underscore-dangle*/

              resolve(newUser);
            }
          });
        });
      }
      , dropById = function dropById(idUser) {

        return new Promise(function deferred(resolve, reject) {

          UserModel.remove({
            '_id': idUser
          }, function onResponse(err, data) {
            if (err) {

              reject(err);
            } else {

              resolve(data);
            }
          });
        });
      };

    return {
      'getByEmail': getByEmail,
      'getById': getById,
      'insertNew': insertNew,
      'updateById': updateById,
      'dropById': dropById
    };
  };
}(require, module, Promise));
