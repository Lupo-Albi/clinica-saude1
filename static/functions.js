/**
 * Funções
 */

/**
 * Coloca em caixa alta a primeira letra de cada palavra de uma string
 * 
 * @param {*} str string a ser modificada 
 * 
 * @return {string}
 */
exports.TitleCase = function(str) 
{
    if (typeof str !== 'string')
    {
        var splitStr = '';
    } else
    {
        var splitStr = str.toLowerCase().split(' ');

        for (var i = 0; i < splitStr.length; i++)
        {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
    }

    return splitStr.join(' ');
}

/**
 * Retorna uma string com o CPF formatado no formato xxx.xxx.xxx-XX
 * 
 * @param {String} CPF string com os dígitos do CPF
 * 
 * @return {String}
 */
exports.gFormatarCPF = function(CPF)
{
    return CPF.substring(0, 3) + '.' + CPF.substring(3, 6) + '.' + CPF.substring(6, 9) + '-' + CPF.substring(9);
}

/**
 * Retorna uma string somente com os dígitos do CPF, no formato xxxxxxxxxXX
 * 
 * @param {String} CPF 
 * 
 * @return {String}
 */
exports.sFormatarCPF = function(CPF)
{
    // Expressão regular para encontrar os caracteres hífen (-) e ponto (.)
    var re = new RegExp('([-.])', 'g') ;
    // Salva o array com os caracteres encontrados em uma variável
    var arrCPF = CPF.match(re);
    // String que vai ser passada com o CPF formatado
    var strFinal = CPF;
    // Caso o array esteja vazio (não foi encontrado os caracteres), retornar o CPF
    if (arrCPF == null)
    {
        return strFinal;
    }

    var dotArray = strFinal.split('.');
    strFinal = '';

    for (var i = 0; i < dotArray.length; i++)
    {
        strFinal = strFinal + dotArray[i];
    }

    var dashArray = strFinal.split('-');
    strFinal= '';

    for (var i = 0; i < dashArray.length; i++)
    {
        strFinal = strFinal + dashArray[i];
    }

    return strFinal;
}

/**
 * Verifica se o CPF passado é válido
 * 
 * @return {Boolean}
 */
exports.ValidarCPF = function(CPF)
{
    var strCPF = CPF;

    var soma = 0;
    var resto = 0;

    if (strCPF === '00000000000')
    {
        return false;
    }

    // Multiplica, da esquerda para a direita, os nove primeiros dígitos do CPF pelos números 
    // decrescentes de 10 à 2 e soma cada um dos resultados obtidos
    for (var i = 0; i < 9; i++)
    {  
        soma = soma + (parseInt(strCPF.charAt(i)) * (10 - i));
    }

    // Multiplica por 10 e divide por 11 o resultado da soma, considerando apenas o resto
    resto = (soma * 10) % 11;

    // Caso o resto seja 10 ou 11, ele será considerado como 0
    if ((resto == 10) || (resto == 11))
    {
        resto = 0;
    }

    // Se o resto obtido não for igual ao valor do primeiro dígito verificador, 
    // o CPF é inválido, retornando false
    if(resto != parseInt(strCPF.charAt(9)))
    {
        return false;
    } else 
    {
        // Sendo o primeiro dígito válido, faz-se agora a validação do segundo dígito
        soma = 0;

        // Multiplica, da esquerda para a direita, os dez primeiros dígitos do CPF (incluindo o 
        // primeiro dígito verificador) pelos números decrescentes de 11 à 2 e soma cada um dos 
        // resultados obtidos
        for (var i = 0; i < 10; i++)
        {
            soma = soma + (parseInt(strCPF.charAt(i)) * (11 - i));
        }
        
        resto = (soma * 10) % 11;

        if((resto == 10) || (resto == 11))
        {
            resto = 0;
        }

        // Se o resto obtido não for igual ao valor do segundo dígito verificador, 
        // o CPF é inválido, retornando false
        if(resto != parseInt(strCPF.charAt(10)))
        {
            return false;
        }
    }
    // O CPF é válido já que houve correspondência da validação com os dígitos verificadores
    return true;
}

/**
 * Retorna uma string com a data de nascimento no formato dd/mm/yyyy
 * 
 * @param {Date} Data data de nascimento a ser formatada
 * 
 * @return {String}
 */
exports.FormatarData = function(Data)
{
    return Data.getDate() + "/" + (Data.getMonth() + 1) + "/" + Data.getFullYear();
}
/**
 * Retorna a data passada para o Horário Padrão de Brasília no formato yyyy-mm-dd
 * 
 * @param {String} Data 
 * 
 * @return {Date}
 */
 exports.SetarData = function(Data)
{
    if (typeof Data !== 'string')
    {
        return Data;
    }

    var date_components = Data.split('-');
    var year = date_components[0];
    var month = date_components[1];
    var day = date_components[2];
    
    var thisData = year + '-' + month + '-' + day + 'T00:00:00-03:00';       
    var finalData = new Date(thisData);

    return finalData;
}

/**
 * Calcula a idade a partir da data de nascimento
 * 
 * @param {String} Data data de nascimento passada para ser retornada a idade 
 * 
 * @return {Number}
 */
exports.Idade = function(Data)
{
    var date_components = Data.split('/');
    var year = date_components[2];
    var month = date_components[1];
    var day = date_components[0];

    var thisData = year + '-' + month + '-' + day;

    var hoje = new Date();
    var nascimento = new Date(thisData);

    var diaHoje = hoje.getDate();
    var mesHoje = hoje.getMonth() + 1; // Janeiro é 0
    var anoHoje = hoje.getFullYear();

    var diaNascimento = nascimento.getDate();
    var mesNascimento = nascimento.getMonth() + 1;
    var anoNascimento = nascimento.getFullYear();

    var idade = anoHoje - anoNascimento;

    if(mesHoje < mesNascimento)
    {
        idade = idade - 1;
    } else if (mesHoje == mesNascimento)
    {
        if (diaHoje < diaNascimento)
        {
            idade = idade - 1;
        }
    }

    return idade;
}