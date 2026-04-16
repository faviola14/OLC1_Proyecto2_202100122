%{
    const Token = require('../Reports/Tokens');
    const Simbolo = require('../Reports/Simbolos');
    const ErrorL = require('../Reports/Errores');
    const TablaTokens = require('../Reports/TablaTokens');
    const TablaSimbolos = require('../Reports/TablaSimbolos');
    const TablaErrores = require('../Reports/TablaErrores');
    /*const Comparacion=require('../Logica/Comparacion');
    const Logica=require('../Logica/Logica');
    const Not=require('../Logica/Not');
    const Aritmetica=require('../Aritmetica/Aritmetica');
    const Negativo=require('../Aritmetica/Negativo');
    const {Declaracion, Asignacion, Imprimir, If, For, Switch, Slice, Struct, Matriz, Funcion,} = require('../Instrucciones/Instrucciones');
    */
    let ambito= "";
    let contadorBloques=0;
%}
/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

/* COMENTARIOS*/
"//".*                    { /* comentario de una línea */ }
"/*"[^]*?"*/"             { /* comentario multi-línea */ }

/* TIPOS DE DATOS */
"int"                       {   const intToken = new Token("INT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(intToken);
                                return 'INT';
                            }
"float64"                   {   const float64Token = new Token("FLOAT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(float64Token);
                                return 'FLOAT';
                            }
"string"                    {   const stringToken = new Token("STRING", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(stringToken);
                                return 'STRING';
                            }
"bool"                      {   const boolToken = new Token("BOOL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(boolToken);
                                return 'BOOL';
                            }
"rune"                      {   const runeToken = new Token("RUNE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(runeToken);
                                return 'RUNE';
                            }

/* BOOLEANOS */
"true"                      {   const trueToken = new Token("TRUE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(trueToken);
                                return 'TRUE';
                            }
"false"                      {   const falseToken = new Token("FALSE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(falseToken);
                                return 'FALSE';
                            }
/* TIPOS COMPUESTOS */
"slice"                     {   const sliceToken = new Token("SLICE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(sliceToken);
                                return 'SLICE';
                            }
"struct"                    {   const structToken = new Token("STRUCT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(structToken);
                                return 'STRUCT';
                            }

/* NULL */
"nil"                       {   const nullToken = new Token("NULL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(nullToken);
                                return 'NULL';
                            }

/* AGRUPACIÓN */
"("                         {   const parentesisAToken = new Token("PARENTESIS_A", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(parentesisAToken);
                                return 'PARENTESIS_A';
                            }
")"                         {   const parentesisCToken = new Token("PARENTESIS_C", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(parentesisCToken);
                                return 'PARENTESIS_C';
                            }
"["                         {   const corcheteAToken = new Token("CORCHETE_A", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(corcheteAToken);
                                return 'CORCHETE_A';
                            }
"]"                         {   const corcheteCToken = new Token("CORCHETE_C", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(corcheteCToken);
                                return 'CORCHETE_C';
                            }

/* ASIGNACIÓN */
"+="                        {   const asignaMasToken = new Token("ASIGNA_MAS", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(asignaMasToken);
                                return 'ASIGNA_MAS';
                            }
"-="                        {   const asignaMenosToken = new Token("ASIGNA_MENOS", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(asignaMenosToken);
                                return 'ASIGNA_MENOS';
                            }

/* PARA FOR */
"++"                        {   const incrementoToken = new Token("INCREMENTO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(incrementoToken);
                                return 'INCREMENTO';
                            }
"--"                        {   const decrementoToken = new Token("DECREMENTO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(decrementoToken);
                                return 'DECREMENTO';
                            }

/* ARITMÉTICA */
"/"                         {   const barraToken = new Token("BARRA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(barraToken);
                                return 'BARRA';
                            }
"%"                         {   const moduloToken = new Token("MODULO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(moduloToken);
                                return 'MODULO';
                            }
"*"                         {   const asteriscoToken = new Token("ASTERISCO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(asteriscoToken);
                                return 'ASTERISCO';
                            }
"+"                         {   const masToken = new Token("MAS", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(masToken);
                                return 'MAS';
                            }

/* NEGACIÓN */
"-"                         {   const menosToken = new Token("MENOS", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(menosToken);
                                return 'MENOS';
                            }

/* IGUALDAD Y DESIGUALDAD */
"=="                        {   const igualdadToken = new Token("IGUALDAD", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(igualdadToken);
                                return 'IGUALDAD';
                            }
"!="                        {   const desigualdadToken = new Token("DESIGUALDAD", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(desigualdadToken);
                                return 'DESIGUALDAD';
                            }

/* RELACIONALES */
">="                        {   const mayorIgualToken = new Token("MAYOR_IGUAL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(mayorIgualToken);
                                return 'MAYOR_IGUAL';
                            }
"<="                        {   const menorIgualToken = new Token("MENOR_IGUAL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(menorIgualToken);
                                return 'MENOR_IGUAL';
                            }
">"                         {   const mayorToken = new Token("MAYOR", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(mayorToken);
                                return 'MAYOR';
                            }
"<"                         {   const menorToken = new Token("MENOR", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(menorToken);
                                return 'MENOR';
                            }

/* LÓGICOS */
"!"                         {   const notToken = new Token("NOT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(notToken);
                                return 'NOT';
                            }
"&&"                        {   const andToken = new Token("AND", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(andToken);
                                return 'AND';
                            }
"||"                        {   const orToken = new Token("OR", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(orToken);
                                return 'OR';
                            }

/* SENTENCIAS */
"var"                       {   const varToken = new Token("VAR", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(varToken);
                                return 'VAR';
                            }
"if"                        {   const ifToken = new Token("IF", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(ifToken);
                                return 'IF';
                            }
"else"                      {   const elseToken = new Token("ELSE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(elseToken);
                                return 'ELSE';
                            }
"switch"                    {   const switchToken = new Token("SWITCH", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(switchToken);
                                return 'SWITCH';
                            }
"case"                      {   const caseToken = new Token("CASE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(caseToken);
                                return 'CASE';
                            }
"default"                   {   const defaultToken = new Token("DEFAULT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(defaultToken);
                                return 'DEFAULT';
                            }
"fmt.Println"               {   const printToken = new Token("PRINT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(printToken);
                                return 'PRINT';
                            }
"for"                       {   const forToken = new Token("FOR", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(forToken);
                                return 'FOR';
                            }
"range"                     {   const rangeToken = new Token("RANGE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(rangeToken);
                                return 'RANGE';
                            }
"break"                     {   const breakToken = new Token("BREAK", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(breakToken);
                                return 'BREAK';
                            }
"continue"                  {   const continueToken = new Token("CONTINUE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(continueToken);
                                return 'CONTINUE';
                            }
"return"                    {   const returnToken = new Token("RETURN", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(returnToken);
                                return 'RETURN';
                            }
"slices.Index"              {   const indexToken = new Token("INDEX", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(indexToken);
                                return 'INDEX';
                            }
"strings.Join"              {   const joinToken = new Token("JOIN", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(joinToken);
                                return 'JOIN';
                            }
"len"                       {   const lenToken = new Token("LEN", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(lenToken);
                                return 'LEN';
                            }
"append"                    {   const appendToken = new Token("APPEND", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(appendToken);
                                return 'APPEND';
                            }
"func"                      {   /*console.log("Función encontrada: " + yytext); */
                                const funcToken = new Token("FUNC", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(funcToken);
                                return 'FUNC';
                            }
"strconv.Atoi"              {   const atoiToken = new Token("ATOI", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(atoiToken);
                                return 'ATOI';
                            }
"strconv.ParseFloat"        {   const parseFloatToken = new Token("PARSEFLOAT", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(parseFloatToken);
                                return 'PARSEFLOAT';
                            }
"reflect.TypeOf"            {   const typeOfToken = new Token("TYPEOF", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(typeOfToken);
                                return 'TYPEOF';
                            }

/* OTROS SÍMBOLOS */
"{"                         {   const llaveAToken = new Token("LLAVE_A", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(llaveAToken);
                                return 'LLAVE_A';
                            }
"}"                         {   const llaveCToken = new Token("LLAVE_C", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(llaveCToken);
                                return 'LLAVE_C';
                            }
":="                        {   const puntoIgualToken = new Token("PUNTO_IGUAL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(puntoIgualToken);
                                return 'PUNTO_IGUAL';
                            }
"="                         {   const igualToken = new Token("IGUAL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(igualToken);
                                return 'IGUAL';
                            }
":"                         {   const dosPuntosToken = new Token("DOS_PUNTOS", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(dosPuntosToken);
                                return 'DOS_PUNTOS';
                            }
","                         {   const comaToken = new Token("COMA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(comaToken);
                                return 'COMA';
                            }
";"                         {   const puntoComaToken = new Token("PUNTO_COMA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(puntoComaToken);
                                return 'PUNTO_COMA';
                            }
"."                         {   const puntoToken = new Token("PUNTO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(puntoToken);
                                return 'PUNTO';
                            }

/* CADENA */
\"([^\"\\]|\\.)*\"          {   const cadenaToken = new Token("CADENA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(cadenaToken);
                                return 'CADENA';
                            }


/* NÚMEROS */
[0-9]+"."[0-9]+           {   const numeroDecimalToken = new Token("NUMERO_DECIMAL", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(numeroDecimalToken);
                                return 'NUMERO_DECIMAL';
                            }
[0-9]+                    {   const numeroToken = new Token("NUMERO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(numeroToken);
                                return 'NUMERO';
                            }

/* SECUENCIAS DE ESCAPE */
"\""                        {   const comillaDobleToken = new Token("COMILLA_DOBLE", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(comillaDobleToken);
                                return 'COMILLA_DOBLE';
                            }
"\\"                        {   const barraInvertidaToken = new Token("BARRA_INVERTIDA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(barraInvertidaToken);
                                return 'BARRA_INVERTIDA';
                            }
"\n"                        {   const saltoLineaToken = new Token("SALTO_LINEA", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(saltoLineaToken);
                                return 'SALTO_LINEA';
                            }
"\r"                        {   const retornoCarroToken = new Token("RETORNO_CARRO", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(retornoCarroToken);
                                return 'RETORNO_CARRO';
                            }
"\t"                        {   const tabulacionToken = new Token("TABULACION", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(tabulacionToken);
                                return 'TABULACION';
                            }

/* ID */
[a-zA-Z_][a-zA-Z0-9_]*      {   const idToken = new Token("ID", yytext, yylineno, yylloc.first_column);
                                TablaTokens.agregarToken(idToken);
                                return 'ID';
                            }

/* FIN DE DOCUMENTO */
<<EOF>>                     {   
                                /*TablaTokens.crearReporteTokens();
                                TablaErrores.crearReporteErrores();
                                TablaTokens.imprimirTabla();
                                TablaErrores.imprimirTabla();*/
                                return 'EOF';
                            }

/* ERRORES */
.                           {   const errorL = new ErrorL("Error léxico","El carácter: " + yytext +" no pertenece al lenguaje", yylineno, yylloc.first_column);
                                TablaErrores.agregarError(errorL);
                                /* return 'INVALID' */
                            }

/lex
%locations 
/* operator associations and precedence */
%token CADENA ID NUMERO NUMERO_DECIMAL 
%token INT FLOAT STRING RUNE BOOL TRUE FALSE
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



programa: funciones instrucciones EOF { 
    /*console.log("Program:",$1);*/
    return { tipo: "Programa", funciones: $1, instrucciones: $2 };
    /*TablaSimbolos.crearReporteSimbolos();
    TablaSimbolos.imprimirTabla();*/
}
;

funciones: funciones funcion{ $1.push($2); $$ = $1; }
| funcion { $$ = [$1]; }
;

/* FUNCIONES */ 

funcion: FUNC ID PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
{
    const simbolo = new Simbolo($2,"Función","Función","Global", @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simbolo);
    ambito=$2;
    $$={ tipo: 'Funcion', id: $2, parametros: $4, tipoRetorno: null, instrucciones: $7 };
}
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A instrucciones retorno LLAVE_C
{
    const simboloT = new Simbolo($2,"Función",$6,"Global",@2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simboloT);
    ambito=$2;
    $$={ tipo: 'Funcion', id: $2, parametros: $4, tipoRetorno: $6, instrucciones: $8};
}
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A retorno LLAVE_C
{
    const simboloR = new Simbolo($2,"Función",$6,"Global",@2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simboloR);
    ambito=$2;
    $$={ tipo: 'Funcion', id: $2, parametros: $4, tipoRetorno: $6, instrucciones: []};
}
| struct { $$ = $1;}
;

parametros: parametros COMA parametro { $1.push($3); $$ = $1; }
| parametro { $$ = [$1];}
| /* vacío */ { $$ = [];}
;

parametro: ID tipo {$$ = { id: $1, tipoDato: $2 }; }
;

instrucciones: instrucciones instruccion { $1.push($2); $$ = $1; }
| instrucciones instruccion PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccion { $$ = [$1];}
| instruccion PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccion: variable {$$ = $1;}
| ifs {$$ = $1;}
| switch {$$ = $1;}
| for {$$ = $1;}
| modificacionslice {$$ = $1;}
| slice {$$ = $1;}
| append {$$ = $1;}
| matrices {$$ = $1;}
| asignacionmatriz {$$ = $1;}
| struct {$$ = $1;}
| structuso {$$ = $1;}
| structmodificacion {$$ = $1;}
| print {$$ = $1;}
| asignacion {$$ = $1;}
| mento {$$= $1;}
| accesofunc {$$= $1;}
| bloqueindependiente {$$ = $1;}
| break {$$ = $1; }
| continue {$$ = $1; }
;

/* RETURN */
retorno: RETURN valor
{$$ = { tipo: 'Return', valor: $2 };}
| RETURN
{$$ = { tipo: 'Return', valor: null }; }
;



/* BLOQUE INDEPENDIENTE */
bloqueindependiente: LLAVE_A instrucciones LLAVE_C
{
    contadorBloques=contadorBloques+1;
    ambito="bloque"+String(contadorBloques);
    $$ = { tipo: 'BloqueIndependiente', instrucciones: $2 };
}
;

/* VARIABLES */
variable: VAR ID tipo IGUAL valor
{
    const variableI = new Simbolo($2,"Variable",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(variableI);
    $$={ tipo: 'Declaracion', id: $2, tipoDato: $3, valor: $5 };
}
| VAR ID tipo
{
    const variable = new Simbolo($2,"Variable",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(variable);
    $$={ tipo: 'Declaracion', id: $2, tipoDato: $3, valor: null };
}
| ID PUNTO_IGUAL valor
{
    const variableST = new Simbolo($1,"Variable","",ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(variableST);
    $$={ tipo: 'Declaracion', id: $1, tipoDato: "", valor: $3 };
}
;

tipo: INT { $$ = "int"; }
| FLOAT { $$ = "float64"; }
| STRING { $$ = "string"; }
| BOOL { $$ = "bool"; }
| RUNE { $$ = "rune"; }
| CORCHETE_A CORCHETE_C tipo { $$ = "[]" + $3; }
;

valor: operacion { $$ = $1; }
| CADENA {$$= { tipo: 'Cadena', valor: yytext };}
| funcionesestructura {$$ = $1;}
;

/* OPERACIONES */
operacion: operacion MAS operacionsimple
{ $$ = { tipo: 'Aritmetica', izquierda: $1, operador: '+', derecha: $3 }; }
| operacion MENOS operacionsimple
{ $$ = { tipo: 'Aritmetica', izquierda: $1, operador: '-', derecha: $3 }; }
| operacionsimple
{ $$ = $1; }
;

operacionsimple: operacionsimple ASTERISCO operacionmenossimple
{ $$ = { tipo: 'Aritmetica', izquierda: $1, operador: '*', derecha: $3 }; }
| operacionsimple BARRA operacionmenossimple
 { $$ = { tipo: 'Aritmetica', izquierda: $1, operador: '/', derecha: $3 }; }
| operacionsimple MODULO operacionmenossimple
{ $$ = { tipo: 'Aritmetica', izquierda: $1, operador: '%', derecha: $3 }; }
| operacionmenossimple
{ $$ = $1; }
;

operacionmenossimple: MENOS operacionmenossimple %prec UMINUS
{ $$ = { tipo: 'Negativo', valor: $2 }; }
| PARENTESIS_A operacion PARENTESIS_C
{ $$ = $2; }
| NUMERO
{ $$ = { tipo: 'Numero', valor: Number(yytext) }; }
| NUMERO_DECIMAL
{ $$ = { tipo: 'Numero', valor: Number(yytext) }; }
| ID
{ $$ = { tipo: 'Identificador', valor: $1 }; } 
| funcionesestructura
{ $$ = $1; }
| CADENA
{ $$ = { tipo: 'Cadena', valor: yytext }; }
| TRUE
{ $$ = { tipo: 'Booleano', valor: true }; }
| FALSE
{ $$ = { tipo: 'Booleano', valor: false }; }
;

/* ASIGNACIONES VARIABLES */
asignacion: ID IGUAL operacion
{ $$ = { tipo: 'Asignacion', id: $1, valor: $3 }; }
| ID ASIGNA_MAS operacion
{ $$ = { tipo: 'Asignacion', id: $1, valor: $3 }; }
| ID ASIGNA_MENOS operacion
{ $$ = { tipo: 'Asignacion', id: $1, valor: $3 }; }
;

/* IF */
ifs: if elseif else
{ $$ = { tipo: 'IfCompleto', if: $1, elseif: $2, else: $3 }; }
| if elseif 
{ $$ = { tipo: 'IfElseIf', if: $1, elseif: $2 }; }
| if else
{ $$ = { tipo: 'IfElse', if: $1, else: $2 }; }
| if
{ $$ = $1; }
;

if: IF expresionRelacional codigo
{ $$ = { tipo: 'If', condicion: $2, instrucciones: $4 }; }
| IF ID codigo
{ $$ = { tipo: 'If', condicion: { tipo: 'Identificador', valor: $2 }, instrucciones: $3 }; }
;

else: ELSE codigo
{ $$ = { tipo: 'Else', instrucciones: $2 }; }
;

elseif: ELSE IF expresionRelacional codigo
{$$ = { tipo: 'ElseIf', condicion: $3, instrucciones: $4 };}
| ELSE IF ID codigo
{$$ = { tipo: 'ElseIf', condicion: { tipo: 'Identificador', valor: $3 }, instrucciones: $4 };}
;

codigo: LLAVE_A instrucciones LLAVE_C
{$$=$2;}
;

condicion: expresionRelacional
{ $$ = $1; 
    //console.log("Condición: " + $1);
}
| ID 
{ $$= {tipo: 'Identificador', valor: $1}; }
;

expresionRelacional: expresionRelacional OR expresionRelacional
{ $$= { tipo: 'Logica', izquierda: $1, operador: 'OR', derecha: $3 }; }
| expresionRelacional AND expresionRelacional
{ $$ = { tipo: 'Logica', izquierda: $1, operador: 'AND', derecha: $3 }; }
| NOT expresionRelacional
{ $$ = { tipo: 'Logica', izquierda: null, operador: 'NOT', derecha: $2 }; }
| PARENTESIS_A expresionRelacional PARENTESIS_C
{ $$ = $2; }
| comparacion
{ $$ = $1; }
;

comparacion: valor IGUALDAD valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '==', derecha: $3 }; }
| valor DESIGUALDAD valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '!=', derecha: $3 }; }
| valor MAYOR_IGUAL valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '>=', derecha: $3 }; }
| valor MENOR_IGUAL valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '<=', derecha: $3 }; }
| valor MAYOR valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '>', derecha: $3 }; }
| valor MENOR valor
{ $$ = { tipo: 'Comparacion', izquierda: $1, operador: '<', derecha: $3 }; }
;

/* SWITCH */
switch: SWITCH condicion LLAVE_A cases default LLAVE_C 
{ $$ = { tipo: 'Switch', condicion: $2, cases: $4, default: $5 };}
| SWITCH PARENTESIS_A condicion PARENTESIS_C LLAVE_A cases default LLAVE_C
{ $$ = { tipo: 'Switch', condicion: $3, cases: $6, default: $7 };}
| SWITCH condicion LLAVE_A cases LLAVE_C
{ $$ = { tipo: 'Switch', condicion: $2, cases: $4, default: null };}
| SWITCH PARENTESIS_A condicion PARENTESIS_C LLAVE_A cases LLAVE_C
{ $$ = { tipo: 'Switch', condicion: $3, cases: $6, default: null };}
;

cases: cases case { $1.push($2); $$ = $1; }
| case { $$ = [$1];}
;

case: CASE valor DOS_PUNTOS instruccionesswitch 
{$$ = { tipo: 'Case', valor: $2, instrucciones: $4 };}
;

default: DEFAULT DOS_PUNTOS instruccionesswitch 
{$$ = { tipo: 'Default', instrucciones: $3 };}
;

instruccionesswitch: instruccionesswitch instruccionswitch { $1.push($2); $$ = $1; }
| instruccionesswitch instruccionswitch PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccionswitch { $$ = [$1];}
| instruccionswitch PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccionswitch: variable {$$ = $1;}
| ifs {$$ = $1;}
| switch {$$ = $1;}
| for {$$ = $1;}
| modificacionslice {$$ = $1;}
| slice {$$ = $1;}
| append {$$ = $1;}
| matrices {$$ = $1;}
| asignacionmatriz {$$ = $1;}
| struct {$$ = $1;}
| structuso {$$ = $1;}
| structmodificacion {$$ = $1;}
| print {$$ = $1;}
| asignacion {$$ = $1;}
| mento {$$ = $1;}
| accesofunc {$$ = $1;}
| break {$$ = $1;}
| continue {$$ = $1;}
;

/* FOR */ 
for: FOR expresionRelacional LLAVE_A instruccionesfor LLAVE_C
{ $$ = { tipo: 'For', condicion: $2, instrucciones: $4 }; }
| FOR ID LLAVE_A instruccionesfor LLAVE_C
{ $$ = { tipo: 'For', condicion: { tipo: 'Identificador', valor: $2 }, instrucciones: $4 }; }
| FOR inicializacion PUNTO_COMA expresionRelacional PUNTO_COMA mento LLAVE_A instruccionesfor LLAVE_C
{ $$ = { tipo: 'For', condicion: $4,inicializacion: $2, instrucciones: $7 }; }
| FOR inicializacion PUNTO_COMA ID PUNTO_COMA mento LLAVE_A instruccionesfor LLAVE_C
{ $$ = { tipo: 'For', condicion: { tipo: 'Identificador', valor: $4 }, inicializacion: $2, instrucciones: $7 }; }
| FOR ID COMA valor PUNTO_IGUAL RANGE ID LLAVE_A instruccionesfor LLAVE_C
{ $$ = { tipo: 'ForRange', indice: { tipo: 'Identificador', valor: $2 }, valor: { tipo: 'Identificador', valor: $4 }, slice: { tipo: 'Identificador', valor: $7 }, instrucciones: $8 }; }
;
inicializacion: ID PUNTO_IGUAL valor 
{ $$={ tipo: 'Inicializacion', id: { tipo: 'Identificador', valor: $1 }, valor: $3 }; }
;

instruccionesfor: instruccionesfor instruccionfor { $1.push($2); $$ = $1; }
| instruccionesfor instruccionfor PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccionfor { $$ = [$1];}
| instruccionfor PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccionfor: variable {$$ = $1;}
| ifs {$$ = $1;}
| switch {$$ = $1;}
| for {$$ = $1;}
| modificacionslice {$$ = $1;}
| slice {$$ = $1;}
| append {$$ = $1;}
| matrices {$$ = $1;}
| asignacionmatriz {$$ = $1;}
| struct {$$ = $1;}
| structuso {$$ = $1;}
| structmodificacion {$$ = $1;}
| print {$$ = $1;}
| asignacion {$$ = $1;}
| mento {$$ = $1;}
| accesofunc {$$ = $1;}
| break {$$ = $1;}
| continue {$$ = $1;}
;

mento: ID INCREMENTO
{ $$ = { tipo: 'Mento', id: { tipo: 'Identificador', valor: $1 }, operador: '++' }; }
| ID DECREMENTO
{ $$ = { tipo: 'Mento', id: { tipo: 'Identificador', valor: $1 }, operador: '--' }; }
;

/* BREAK */
break: BREAK
{$$ = { tipo: 'Break' }; }
;

/* CONTINUE */
continue: CONTINUE 
{$$ = { tipo: 'Continue' }; }
;

/* SLICE */
slice: ID IGUAL tipo LLAVE_A elementos LLAVE_C
{
    const slice = new Simbolo($1,"Slice",$3,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(slice);
    $$={ tipo: 'Slice', id: $1, tipoDato: $3, valor: $5 };
}
| ID PUNTO_IGUAL tipo LLAVE_A elementos LLAVE_C
{
    const slice = new Simbolo($1,"Slice",$3,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(slice);
    $$={ tipo: 'Slice', id: $1, tipoDato: $3, valor: $5 };
}
| VAR ID tipo
{
    const sliceV = new Simbolo($2,"Slice",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(sliceV);
    $$={ tipo: 'Slice', id: $2, tipoDato: $3, valor: null };
}
;

elementos: elementos COMA valor { $1.push($3); $$ = $1; }
| valor { $$ = [$1]; }
;

/* FUNCIONES DE ESTRUCTURAS */
funcionesestructura: index {$$ = $1;}
| join {$$ = $1;}
| len {$$ = $1;}
| accesoslice{$$ = $1;}
| accesomatriz{$$ = $1;}
| structacceso{$$ = $1;}
| atoi {$$ = $1;}
| parsefloat {$$ = $1;}
| typeof {$$ = $1;}
| accesofunc {$$ = $1;}
;

/* SLICE.INDEX */
index: INDEX PARENTESIS_A ID COMA valor PARENTESIS_C
{ $$ = { tipo: 'Index', id: $3, valor: $5 }; }
;

/* STRING.JOIN */
join: JOIN PARENTESIS_A ID COMA valor PARENTESIS_C
{ $$ = { tipo: 'Join', id: $3, valor: $5 }; }
;

/* LEN */
len: LEN PARENTESIS_A ID PARENTESIS_C
{ $$ = { tipo: 'Len', id: $3 }; }
;

/* APPEND */
append: ID IGUAL APPEND PARENTESIS_A ID COMA valor PARENTESIS_C
{ $$ = { tipo: 'Append', id: $1, slice: $5, valor: $6 }; }
;

/* ACCESO SLICE */
accesoslice: ID posicionslice
{ $$ = { tipo: 'AccesoSlice', id: $1, posicion: $2.posicion }; }
;

/* MODIFICACION SLICE */
modificacionslice: ID posicionslice IGUAL valor
{ $$ = { tipo: 'ModificacionSlice', id: $1, posicion: $2.posicion, valor: $5 }; }
;

posicionslice: CORCHETE_A NUMERO CORCHETE_C
{ $$ = { posicion: Number(yytext) } }
;

/* MATRICES INICIALIZACION MULTIDIMENSIONAL */
matrices: ID PUNTO_IGUAL CORCHETE_A CORCHETE_C CORCHETE_A CORCHETE_C tipo LLAVE_A filas LLAVE_C
{
    const matriz = new Simbolo($1,"Matriz",$6,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(matriz);
    $$={ tipo: 'Matriz', id: $1, tipoDato: $6, valor: $9 };
}
;

filas: filas COMA fila { $1.push($3); $$ = $1; }
| filas COMA { $$ = $1; }
| fila { $$ = [$1]; }
;

fila: LLAVE_A elementos LLAVE_C { $$ = $2; }
;

/* ASIGNACIÓN MATRICES */
asignacionmatriz: accesomatriz IGUAL valor
{ $$ = { tipo: 'AsignacionMatriz', id: $1.id, fila: $1.fila, columna: $1.columna, valor: $3 }; }
;

/* ACCESO MATRIZ */
accesomatriz: ID CORCHETE_A NUMERO CORCHETE_C CORCHETE_A NUMERO CORCHETE_C
{ $$ = { tipo: 'AccesoMatriz', id: $1, fila: Number($3), columna: Number($6) }; }
;

/* STRUCT */
struct: STRUCT ID LLAVE_A atributos LLAVE_C
{
    const struct = new Simbolo($2,"Struct","struct",ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(struct);
    $$={ tipo: 'Struct', id: $2, tipoDato: "struct", valor: $4 };
}
;

atributos: atributos atributo { $1.push($2); $$ = $1; }
| atributo { $$ = [$1]; }
;

atributo: tipo ID PUNTO_COMA { $$ = {id: $2, tipoDato: $1 }; }
;

/* USO STRUCT */
structuso: ID ID IGUAL LLAVE_A datos LLAVE_C PUNTO_COMA {
    $$={ tipo: 'UsoStruct', id: $1, tipoDato: $2, valor: $6 };
}
;

datos: datos COMA dato { $1.push($3); $$ = $1; }
| dato { $$ = [$1]; }
;

dato: ID DOS_PUNTOS valor { $$ = { id: $1, valor: $3 }; }
;

/* ACCESO STRUCT */
structacceso: ID PUNTO ID
{ $$ = { tipo: 'AccesoStruct', id: $1, atributo: $3 }; }
;

/* MODIFICACION STRUCT */
structmodificacion: structacceso IGUAL valor PUNTO_COMA
{ $$ = { tipo: 'ModificacionStruct', id: $1, atributo: $3, valor: $5 }; }
;

/* PRINT */
print: PRINT PARENTESIS_A elementos PARENTESIS_C 
{ $$ = {tipo: 'Imprimir',expresiones: $3};}
;

/* ATOI */
atoi: ATOI PARENTESIS_A valor PARENTESIS_C
{ $$ = { tipo: 'Atoi', valor: $3 }; }
;

/* PARSEFLOAT */
parsefloat: PARSEFLOAT PARENTESIS_A valor PARENTESIS_C
{ $$ = { tipo: 'ParseFloat', valor: $3 }; }
;

/* TYPEOF */
typeof: ID PUNTO TYPEOF PARENTESIS_A valor PARENTESIS_C
{ $$ = { tipo: 'TypeOf', id: $1, valor: $5 }; }
;

/* ACCESO FUNC */
accesofunc: ID PARENTESIS_A elementos PARENTESIS_C 
{$$ = { tipo: 'AccesoFuncion', id: $1, argumentos: $3 }; }
| ID PARENTESIS_A PARENTESIS_C 
{ $$ = { tipo: 'AccesoFuncion', id: $1, argumentos: [] }; }
;