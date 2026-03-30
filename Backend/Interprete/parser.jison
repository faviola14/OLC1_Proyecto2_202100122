/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

/* COMENTARIOS*/
/\/\/.*                     { /* comentario de una línea */ }
/\/\*[^]*?\*\/              { /* comentario multilínea */ }

/* TIPOS DE DATOS */
"int"                       return 'INT';
"float64"                   return 'FLOAT';
"string"                    return 'STRING';
"bool"                      return 'BOOL';
"rune"                      return 'RUNE';

/* TIPOS COMPUESTOS */
"slice"                     return 'SLICE';
"struct"                    return 'STRUCT';

/* NULL */
"nil"                       return 'NULL';

/* AGRUPACIÓN */
"("                         return 'PARENTESIS_A';
")"                         return 'PARENTESIS_C';
"["                         return 'CORCHETE_A';
"]"                         return 'CORCHETE_C';

/* ASIGNACIÓN */
"+="                        return 'ASIGNA_MAS';
"-="                        return 'ASIGNA_MENOS';

/* PARA FOR */
"++"                        return 'INCREMENTO';
"--"                        return 'DECREMENTO';

/* ARITMÉTICA */
"/"                         return 'BARRA';
"%"                         return 'MODULO';
"*"                         return 'ASTERISCO';
"+"                         return 'MAS';

/* NEGACIÓN */
"-"                         return 'MENOS';

/* IGUALDAD Y DESIGUALDAD */
"=="                        return 'IGUALDAD';
"!="                        return 'DESIGUALDAD';

/* RELACIONALES */
">="                        return 'MAYOR_IGUAL';
"<="                        return 'MENOR_IGUAL';
">"                         return 'MAYOR';
"<"                         return 'MENOR';

/* LÓGICOS */
"!"                         return 'NOT';
"&&"                        return 'AND';
"||"                        return 'OR';

/* SENTENCIAS */
"var"                       return 'VAR';
"if"                        return 'IF';
"else"                      return 'ELSE';
"switch"                    return 'SWITCH';
"case"                      return 'CASE';
"default"                   return 'DEFAULT';
"fmt.Println"               return 'PRINT';
"for"                       return 'FOR';
"range"                     return 'RANGE';
"break"                     return 'BREAK';
"continue"                  return 'CONTINUE';
"return"                    return 'RETURN';
"slices.Index"              return 'INDEX';
"strings.Join"              return 'JOIN';
"len"                       return 'LEN';
"append"                    return 'APPEND';
"func"                      return 'FUNC';
"strconv.Atoi"              return 'ATOI';
"strconv.ParseFloat"        return 'PARSEFLOAT';
"reflect.TypeOf"            return 'TYPEOF';

/* OTROS SÍMBOLOS */
"="                         return 'IGUAL';
"{"                         return 'LLAVE_A';
"}"                         return 'LLAVE_C';
":"                         return 'DOS_PUNTOS';
":="                        return 'PUNTO_IGUAL';
","                         return 'COMA';
";"                         return 'PUNTO_COMA';
"."                         return 'PUNTO';

/* CADENA */
\"([^\"\\]|\\.)*\"          return 'CADENA';


/* NÚMEROS */
[0-9]+"."[0-9]+           return 'NUMERO_DECIMAL';
[0-9]+                    return 'NUMERO';

/* SECUENCIAS DE ESCAPE */
"\""                        return 'COMILLA_DOBLE';
"\\"                        return 'BARRA_INVERTIDA';
"\n"                        return 'SALTO_LINEA';
"\r"                        return 'RETORNO_CARRO';
"\t"                        return 'TABULACION';

/* ID */
[a-zA-Z_][a-zA-Z0-9_]*      return 'ID';

/* FIN DE DOCUMENTO */
<<EOF>>                     return 'EOF';

/* ERRORES */
.                           return 'INVALID';

/lex

/* operator associations and precedence */
%token CADENA ID NUMERO NUMERO_DECIMAL 
%token INT FLOAT STRING RUNE BOOL 
%token SLICE STRUCT 
%token NULL
%token COMILLA_DOBLE BARRA_INVERTIDA SALTO_LINEA RETORNO_CARRO TABULACION
%token PARENTESIS_A PARENTESIS_C CORCHETE_A CORCHETE_C 
%token ASIGNA_MAS ASIGNA_MENOS
%token BARRA MODULO ASTERISCO MAS 
%token MENOS
%token IGUALDAD DESIGUALDAD 
%token MAYOR MAYOR_IGUAL MENOR MENOR_IGUAL
%token NOT AND OR
%token VAR IF ELSE SWITCH CASE DEFAULT PRINT FOR RANGE BREAK CONTINUE RETURN INDEX JOIN LEN APPEND FUNC ATOI PARSEFLOAT TYPEOF
%token IGUAL LLAVE_A LLAVE_C DOS_PUNTOS PUNTO_IGUAL COMA PUNTO_COMA PUNTO INCREMENTO DECREMENTO 
%token EOF
%token INVALID 


%left PARENTESIS_A PARENTESIS_C CORCHETE_A CORCHETE_C 
%right NOT UMINUS
%left BARRA MODULO ASTERISCO
%left MAS MENOS 
%left MENOR MENOR_IGUAL MAYOR_IGUAL MAYOR
%left IGUALDAD DESIGUALDAD
%left AND



%start programa

%% /* language grammar */



programa: funciones EOF {}
;

funciones: funciones funcion
| funcion 
;

funcion: ID
;


