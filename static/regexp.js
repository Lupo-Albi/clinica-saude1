/**
 * Expressões regulares
 */
// Expressão regular para validar os nomes
// Explicação dessa RegExp: http://tinyurl.com/y9hpd9jv
var Nome = new RegExp(/^[a-záàâãéêíïóôõöúüçñ\s]+$/, 'i');
// Expressão regular pra validar o email, que deve corresponder ao critérios dessa expressão
// Explicação dessa RegExp: http://tinyurl.com/yaptcjo4
var Email = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/);
// Essa expressão regular procura por caracteres que são números (0-9), hífen(-) e ponto(.)
// Explicação dessa RegExp: http://tinyurl.com/ycea5h5s
var CPF = new RegExp(/^([0-9]{11})|([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/);
// Expressão regular para validar o tipo sanguíneo, aceitando apenas os valores O, A, B ou AB
// Explicação dessa RegExp: http://tinyurl.com/y8jgtxa9
var Sangue = new RegExp(/^([o]|[a]|[b]|[a][b])$/, 'i');

exports.Nome = Nome;
exports.Email = Email;
exports.CPF = CPF;
exports.Sangue = Sangue;