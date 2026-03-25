/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%



\s+                   /* skip whitespace */

// COMENTARIOS
/\/\/.*                     { /* comentario de una línea */ }
/\/\*[^]*?\*\/              { /* comentario multilínea */ }

// CADENA
\"([^\"\\]|\\.)*\"          return 'CADENA';

// ID
[a-zA-Z_][a-zA-Z0-9_]*      return 'ID';

// NÚMEROS 
-?[0-9]+"."[0-9]+           return 'NUMERO_DECIMAL';
-?[0-9]+                    return 'NUMERO';

// TIPOS DE DATOS
"int"                       return 'INT';
"float64"                       return 'FLOAT';
"string"                       return 'STRING';
"bool"                       return 'BOOL';
"rune"                       return 'RUNE';

// TIPOS COMPUESTOS
"slice"                       return 'SLICE';
"struct"                       return 'STRUCT';

// NULL
"nil"                       return 'NULL';

// SECUENCIAS DE ESCAPE
"\""                       return 'COMILLA_DOBLE';
"\\"                       return 'BARRA_INVERTIDA';
"\n"                       return 'SALTO_LINEA';
"\r"                       return 'RETORNO_CARRO';
"\t"                       return 'TABULACION';

// AGRUPACIÓN
"("                       return 'PARENTESIS_A';
")"                       return 'PARENTESIS_B';
"["                       return 'CORCHETE_A';
"]"                       return 'PARENTESIS_C';

// ARITMÉTICA
"/"                       return 'BARRA';
"%"                       return 'MODULO';
"*"                       return 'ASTRISCO';
"+"                       return 'MAS';

// ASIGNACIÓN
"+="                       return 'ASIGNA_MAS';
"-="                       return 'ASIGNA_MENOS';

// NEGACIÓN 
"-"                       return 'MENOS';

// IGUALDAD Y DESIGUALDAD
"=="                       return 'IGUALDAD';
"!="                       return 'DESIGUALDAD;

// RELACIONALES
">="                       return 'MAYOR_IGUAL';
"<="                       return 'MENOR_IGUAL';
">"                       return 'MAYOR';
"<"                       return 'MENOR';

// LÓGICOS
"!"                       return 'NOT';
"&&"                       return 'AND';
"||"                       return 'OR';

//SENTENCIAS
"var"                       return 'VAR';
"if"                        return 'IF';
"else"                       return 'ELSE';
"switch"                       return 'SWITCH';
"case"                       return 'CASE';
"default"                       return 'DEFAULT';
"fmt.Println"                       return 'PRINT';
"for"                       return 'FOR';
"range"                       return 'RANGE';
"break"                       return 'BREAK';
"continue"                       return 'CONTINUE';
"return"                       return 'RETURN';
"slices.Index"                       return 'INDEX';
"strings.Join"                       return 'JOIN';
"len"                       return 'LEN';
"append"                       return 'APPEND';
"func"                       return 'FUNC';
"strconv.Atoi"                       return 'ATOI';
"strconv.ParseFloat"                       return 'PARSEFLOAT';
"reflect.TypeOf"                       return 'TYPEOF';

// OTROS SÍMBOLOS
"="                       return 'IGUAL';
"{"                       return 'LLAVE_A';
"}"                       return 'LLAVE_C';
":"                       return 'DOS_PUNTOS';
":="                       return 'PUNTO_IGUAL';
","                       return 'COMA';
";"                       return 'PUNTO_COMA';
"."                       return 'PUNTO';





<<EOF>>                 return 'EOF';
.                       return 'INVALID';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%token INVALID

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1 + $3;}
    | e '-' e
        {$$ = $1 - $3;}
    | e '*' e
        {$$ = $1 * $3;}
    | e '/' e
        {$$ = $1 / $3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact(n) { return n == 0 ? 1 : fact(n - 1) * n; })($1);
        }}
    | e '%'
        {$$ = $1 / 100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;