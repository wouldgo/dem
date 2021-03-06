/*global module, require*/
(function withNode(module, require) {
  'use strict';

  var jwt = require('jsonwebtoken')
      , jwtSignUser = function jwtSignUser(jwtSalt, sessionExpiration, userToSign) {

        /*jscs: disable disallowDanglingUnderscores*/
        /*eslint-disable no-underscore-dangle*/
        if (!userToSign._id) {

          throw 'manadatory user identifier not provided';
        }

        var underscoreId = userToSign._id.toHexString()
          , toSign = {
            'id': userToSign._id.toHexString(),
            'email': userToSign.email
          };
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/

        return {
          'id': underscoreId,
          'sessionExpiration': sessionExpiration,
          'token': jwt.sign(toSign, jwtSalt, {
            'expiresIn': sessionExpiration
          })
        };
      }
      , handlePostIdent = function handlePostIdent(jwtSalt, sessionExpiration, boom, model, messages, request, reply) {

        if (request &&
          request.payload &&
          request.payload.email) {

          model.users.getByEmail(request.payload.email).then(function onQueryResult(result) {

            if (result) {

              /*jscs: disable disallowDanglingUnderscores*/
              /*eslint-disable no-underscore-dangle*/
              return model.users.updateById(result._id, request.payload);
              /*jscs: enable disallowDanglingUnderscores*/
              /*eslint-enable no-underscore-dangle*/
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

              reply(boom.badImplementation(messages.noData));
            }
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData(messages.invalidData));
        }
      }
      , handleGetIdent = function handleGetIdent(jwtSalt, sessionExpiration, boom, model, messages, request, reply) {

        if (request &&
          request.query &&
          request.query.identifier) {

          model.users.getById(request.query.identifier).then(function onQueryResult(result) {

            if (result) {

              try {
                var userSigned = jwtSignUser(jwtSalt, sessionExpiration, result);

                reply(userSigned);
              } catch (e) {

                reply(boom.badData(e));
              }
            } else {

              reply(boom.unauthorized(messages.accountInexistent));
            }
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData(messages.invalidData));
        }
      }
      , handleDeleteIdent = function handleDeleteIdent(boom, model, messages, request, reply) {

        if (request &&
          request.query &&
          request.query.identifier) {

          model.users.getById(request.query.identifier).then(function onQueryResult(result) {

            if (result) {

              return result;
            }

            reply(boom.badData(messages.identifierInexistent));
          }).then(function onInquirySuccess(result) {

            /*jscs: disable disallowDanglingUnderscores*/
            /*eslint-disable no-underscore-dangle*/
            return model.users.dropById(result._id.toHexString());
            /*jscs: enable disallowDanglingUnderscores*/
            /*eslint-enable no-underscore-dangle*/
          }).then(function onDeletionSuccess() {

            reply({
              'status': 'deleted'
            });
          }).catch(function onError(error) {

            reply(boom.badImplementation(error));
          });
        } else {

          reply(boom.badData(messages.invalidData));
        }
      };

  module.exports = function exportingFunction(jwtSalt, sessionExpiration, model, joi, boom, messages) {

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
        'handler': handlePostIdent.bind(this, jwtSalt, sessionExpiration, boom, model, messages)
      }
      , authGet = {
        'method': 'GET',
        'path': '/ident',
        'config': {
          'auth': false,
          'validate': {
            'query': {
              'identifier': joi.string().token().required()
            }
          }
        },
        'handler': handleGetIdent.bind(this, jwtSalt, sessionExpiration, boom, model, messages)
      }
      , authDelete = {
        'method': 'DELETE',
        'path': '/ident',
        'config': {
          'auth': 'jwt',
          'validate': {
            'query': {
              'identifier': joi.string().token().required()
            }
          }
        },
        'handler': handleDeleteIdent.bind(this, boom, model, messages)
      };

    return [
      authRegister,
      authGet,
      authDelete
    ];
  };
}(module, require));
