/*global module, require*/
(function withNode(module, require) {
  'use strict';

  var jwt = require('jsonwebtoken')
      , jwtSignUser = function jwtSignUser(jwtSalt, sessionExpiration, userToSign) {

        /*jscs: disable disallowDanglingUnderscores*/
        /*eslint-disable no-underscore-dangle*/
        var underscoreId = userToSign._id;

        if (!userToSign._id) {

          throw 'manadatory user identifier not provided';
        }

        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/

        if (userToSign.email) {

          delete userToSign.email;
        }

        return {
          'id': underscoreId,
          'sessionExpiration': sessionExpiration,
          'token': jwt.sign(userToSign, jwtSalt, {
            'expiresIn': sessionExpiration
          })
        };
      }
      , handlePostIdent = function handlePostIdent(jwtSalt, sessionExpiration, boom, model, request, reply) {

        if (request &&
          request.payload &&
          request.payload.email) {

          model.users.getByEmail(request.payload.email).then(function onQueryResult(result) {

            if (result) {

              return model.users.updateById(result.id, request.payload);
            }

            return model.users.insertNew(request.payload);
          }).then(function onModelUpdatedOrInsert(newModel) {

            if (newModel) {

              try {
                var userSigned = jwtSignUser(jwtSalt, sessionExpiration, newModel);

                reply(userSigned);
              } catch (e) {

                reply(boom.badData(e));
              }
            } else {

              reply(boom.badImplementation('No data from model inquiry'));
            }
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData('Given data are invalid'));
        }
      }
      , handleGetIdent = function handleGetIdent(jwtSalt, sessionExpiration, boom, model, request, reply) {

        if (request &&
          request.query &&
          request.query.email) {

          model.users.getByEmail(request.query.email).then(function onQueryResult(result) {

            if (result) {

              try {
                var userSigned = jwtSignUser(jwtSalt, sessionExpiration, result);

                reply(userSigned);
              } catch (e) {

                reply(boom.badData(e));
              }
            } else {

              reply(boom.unauthorized('You must first create an account'));
            }
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData('Given data are invalid'));
        }
      }
      , handleDeleteIdent = function handleDeleteIdent(boom, model, request, reply) {

        if (request &&
          request.query &&
          request.query.email) {

          model.users.getByEmail(request.query.email).then(function onQueryResult(result) {

            if (result) {

              return result;
            }

            reply(boom.badData('You must provide an email stored'));
          }).then(function onInquirySuccess(result) {

            return model.users.dropById(result.id);
          }).then(function onDeletionSuccess() {

            reply({
              'status': 'deleted'
            });
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData('Given data are invalid'));
        }
      };

  module.exports = function exportingFunction(jwtSalt, sessionExpiration, model, joi, boom) {

    var authRegister = {
        'method': 'POST',
        'path': '/ident',
        'config': {
          'auth': false,
          'validate': {
            'payload' : {
              'email': joi.string().email().required()
            }
          }
        },
        'handler': handlePostIdent.bind(this, jwtSalt, sessionExpiration, boom, model)
      }
      , authGet = {
        'method': 'GET',
        'path': '/ident',
        'config': {
          'auth': false,
          'validate': {
            'query': {
              'email': joi.string().email().required()
            }
          }
        },
        'handler': handleGetIdent.bind(this, jwtSalt, sessionExpiration, boom, model)
      }
      , authDelete = {
        'method': 'DELETE',
        'path': '/ident',
        'config': {
          'auth': 'jwt',
          'validate': {
            'query': {
              'email': joi.string().email().required()
            }
          }
        },
        'handler': handleDeleteIdent.bind(this, boom, model)
      };

    return [
      authRegister,
      authGet,
      authDelete
    ];
  };
}(module, require));
