const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

module.exports = function(passport)
{
    function findCPF(cpf, callback)
    {
        global.db.collection("doctors").findOne({ "cpf": cpf }, function(err, doc)
        {
            callback(err, doc);
        });
    }

    function findUserById(id, callback)
    {
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection("users").findOne({_id: ObjectId(id)}, (err, doc) =>
        {
            callback(err, doc);
        });
    }

    passport.serializeUser(function(user, done)
    {
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done)
    {
        findUserById(id, function(err, user)
        {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy
        ({
            usernameField: 'cpf',
            passwordField: 'password',
        }, 
        (cpf, password, done) => {
            findCPF(cpf, (err, user) => {
                if(err) { return done(err) }

                // Usuário inexistente
                if(!cpf) { return done(null, false) }

                // Comparando as senhas
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if(err) { return done(err) }

                    if(!isValid) { return done(null, false) }

                    return done(null, user);
                })
            })
        })
    );
};