const mongoose = require('mongoose');
const functions = require('./static/functions');
const regexp = require('./static/regexp');

mongoose.connect('mongodb://@localhost:27017/clinica-saude');

const Schema = mongoose.Schema;

var receptionSchema = new Schema
({
    name: { type: String, required: [true, '000'], trim: true, match: [regexp.Nome, '001'], set: functions.TitleCase },
    email: { type: String, required: false, trim: true, lowercase: true, match: [regexp.Email, '003'] },
    cpf: { type: String, required: [true, '004'], trim: true, unique: true, minlength: [11, '005'],  maxlength: [14, '005'], match: [regexp.CPF, '005'], validate: [functions.ValidarCPF, '006'], get: functions.gFormatarCPF, set: functions.sFormatarCPF },
    sexo: { type: String, required: [true, '007'], trim: true, set: functions.TitleCase },
    nascimento: { type: Date, required: [true, '008'], get: functions.FormatarData, set: functions.SetarData },
    estadoCivil: { type: String, required: [true, '009'], set: functions.TitleCase },
}, 
{ collection: 'receptions' }
);

module.exports = { Mongoose: mongoose, receptionSchema: receptionSchema }