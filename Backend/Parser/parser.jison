%{
    const Token = require('../Reports/Tokens');
    const Simbolo = require('../Reports/Simbolos');
    const ErrorL = require('../Reports/Errores');
    const TablaTokens = require('../Reports/TablaTokens');
    const TablaSimbolos = require('../Reports/TablaSimbolos');
    const TablaErrores = require('../Reports/TablaErrores');
    const Comparacion=require('../Logica/Comparacion');
    const Logica=require('../Logica/Logica');
    const Not=require('../Logica/Not');
    const Aritmetica=require('../Aritmetica/Aritmetica');
    const Negativo=require('../Aritmetica/Negativo');

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
                                TablaTokens.crearReporteTokens();
                                TablaErrores.crearReporteErrores();
                                TablaTokens.imprimirTabla();
                                TablaErrores.imprimirTabla();
                                return 'EOF';
                            }

/* ERRORES */
.                           {   const errorL = new ErrorL("Error léxico","El carácter " + yytext +" no pertenece al lenguaje", yylineno, yylloc.first_column);
                                TablaErrores.agregarError(errorL);
                                /* return 'INVALID' */
                            }

/lex
%locations 
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



programa: funciones EOF { 
    $$ = $1;
    TablaSimbolos.crearReporteSimbolos();
    TablaSimbolos.imprimirTabla();
}
;

funciones: funciones funcion
{
    $1.push($2);
    $$ = $1;
}
| funcion 
{
    $$ = [$1];
}
;

/* FUNCIONES */ 

funcion: FUNC ID PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
{
    const simbolo = new Simbolo($2,"Función","Función","Global", @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simbolo);
    ambito=$2;
}
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A instrucciones retorno LLAVE_C
{
    const simboloT = new Simbolo($2,"Función",$6,"Global",@2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simboloT);
    ambito=$2;
}
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A retorno LLAVE_C
{
    const simboloR = new Simbolo($2,"Función",$6,"Global",@2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(simboloR);
    ambito=$2;
}
| struct
;

parametros: parametros COMA parametro
| parametro
| /* vacío */
;

parametro: ID tipo
;

instrucciones: instrucciones instruccion { $1.push($2); $$ = $1; }
| instrucciones instruccion PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccion { $$ = [$1];}
| instruccion PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccion: variable
| ifs
| switch
| for
| modificacionslice
| slice
| append
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
| mento
| accesofunc
| bloqueindependiente
| break
| continue
;

/* RETURN */
retorno: RETURN valor
| RETURN
;



/* BLOQUE INDEPENDIENTE */
bloqueindependiente: LLAVE_A instrucciones LLAVE_C
{
    contadorBloques=contadorBloques+1;
    ambito="bloque"+String(contadorBloques);
}
;

/* VARIABLES */
variable: VAR ID tipo IGUAL valor
{
    const variableI = new Simbolo($2,"Variable",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(variableI);
}
| VAR ID tipo
{
    const variable = new Simbolo($2,"Variable",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(variable);
}
| ID PUNTO_IGUAL valor
{
    const variableST = new Simbolo($1,"Variable","",ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(variableST);
}
;

tipo: INT { $$ = "int"; }
| FLOAT { $$ = "float64"; }
| STRING { $$ = "string"; }
| BOOL { $$ = "bool"; }
| RUNE { $$ = "rune"; }
| CORCHETE_A CORCHETE_C tipo { $$ = "[]" + $3; }
;

valor: operacion
{ $$ = $1;
    console.log("Condición: " + $1);
    }
| CADENA
{ $$ = yytext; }
| funcionesestructura
;

/* OPERACIONES */
operacion: operacion MAS operacionsimple
{ $$ = new Aritmetica($1, "+", $3); }
| operacion MENOS operacionsimple
{ $$ = new Aritmetica($1, "-", $3); }
| operacionsimple
{ $$ = $1; }
;

operacionsimple: operacionsimple ASTERISCO operacionmenossimple
 { $$ = new Aritmetica($1, "*", $3); }
| operacionsimple BARRA operacionmenossimple
 { $$ = new Aritmetica($1, "/", $3); }
| operacionsimple MODULO operacionmenossimple
{ $$ = new Aritmetica($1, "%", $3); }
| operacionmenossimple
{ $$ = $1; }
;

operacionmenossimple: MENOS operacionmenossimple %prec UMINUS
{ $$ = new Negativo($2); }
| PARENTESIS_A operacion PARENTESIS_C
{ $$ = $2; }
| NUMERO
 { $$ = Number(yytext); }
| NUMERO_DECIMAL
{ $$ = Number(yytext); }
| ID
{ $$ = $1; } 
| funcionesestructura
| CADENA
{ $$ = yytext; }
;

/* ASIGNACIONES VARIABLES */
asignacion: ID IGUAL operacion
| ID ASIGNA_MAS operacion
| ID ASIGNA_MENOS operacion
;

/* IF */
ifs: if elseif else
| if elseif 
| if else
| if
;

if: IF expresionRelacional codigo
| IF ID codigo
;

else: ELSE codigo
;

elseif: ELSE IF expresionRelacional codigo
| ELSE IF ID codigo
;

codigo: LLAVE_A instrucciones LLAVE_C
;

condicion: expresionRelacional
{ $$ = $1; 
    //console.log("Condición: " + $1);
}
| ID 
{ $$ = $1; }
;

expresionRelacional: expresionRelacional OR expresionRelacional
{ $$ = new Logica($1, "OR", $3); }
| expresionRelacional AND expresionRelacional
{ $$ = new Logica($1, "AND", $3); }
| NOT expresionRelacional
{ $$ = new Not($2); }
| PARENTESIS_A expresionRelacional PARENTESIS_C
{ $$ = $2; }
| comparacion
{ $$ = $1; }
;

comparacion: valor IGUALDAD valor
{ $$ = new Comparacion($1, "==", $3);}
| valor DESIGUALDAD valor
{ $$ = new Comparacion($1, "!=", $3); }
| valor MAYOR_IGUAL valor
{ $$ = new Comparacion($1, ">=", $3); }
| valor MENOR_IGUAL valor
{ $$ = new Comparacion($1, "<=", $3); }
| valor MAYOR valor
{ $$ = new Comparacion($1, ">", $3); }
| valor MENOR valor
{ $$ = new Comparacion($1, "<", $3); }
;

/* SWITCH */
switch: SWITCH condicion LLAVE_A cases default LLAVE_C
| SWITCH PARENTESIS_A condicion PARENTESIS_C LLAVE_A cases default LLAVE_C
| SWITCH condicion LLAVE_A cases LLAVE_C
| SWITCH PARENTESIS_A condicion PARENTESIS_C LLAVE_A cases LLAVE_C
;

cases: cases case
| case
;

case: CASE valor DOS_PUNTOS instruccionesswitch
;

default: DEFAULT DOS_PUNTOS instruccionesswitch 
;

instruccionesswitch: instruccionesswitch instruccionswitch { $1.push($2); $$ = $1; }
| instruccionesswitch instruccionswitch PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccionswitch { $$ = [$1];}
| instruccionswitch PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccionswitch: variable
| ifs
| switch
| for
| modificacionslice
| slice
| append
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
| mento
| accesofunc
| break
| continue
;

/* FOR */ 
for: FOR expresionRelacional LLAVE_A instruccionesfor LLAVE_C
| FOR ID LLAVE_A instruccionesfor LLAVE_C
| FOR inicializacion PUNTO_COMA expresionRelacional PUNTO_COMA mento LLAVE_A instruccionesfor LLAVE_C
| FOR inicializacion PUNTO_COMA ID PUNTO_COMA mento LLAVE_A instruccionesfor LLAVE_C
| FOR ID COMA valor PUNTO_IGUAL RANGE ID LLAVE_A instruccionesfor LLAVE_C
;
inicializacion: ID PUNTO_IGUAL valor
;

instruccionesfor: instruccionesfor instruccionfor { $1.push($2); $$ = $1; }
| instruccionesfor instruccionfor PUNTO_COMA { $1.push($2); $$ = $1; }
| instruccionfor { $$ = [$1];}
| instruccionfor PUNTO_COMA { $$ = [$1];}
| /* vacío */ { $$ = [];}
; 

instruccionfor: variable
| ifs
| switch
| for
| modificacionslice
| slice
| append
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
| mento
| accesofunc
| break
| continue
;

mento: ID INCREMENTO
| ID DECREMENTO
;

/* BREAK */
break: BREAK
;

/* CONTINUE */
continue: CONTINUE
;

/* SLICE */
slice: ID IGUAL tipo LLAVE_A elementos LLAVE_C
{
    const slice = new Simbolo($1,"Slice",$3,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(slice);
}
| ID PUNTO_IGUAL tipo LLAVE_A elementos LLAVE_C
{
    const slice = new Simbolo($1,"Slice",$3,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(slice);
}
| VAR ID tipo
{
    const sliceV = new Simbolo($2,"Slice",$3,ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(sliceV);
}
;

elementos: elementos COMA valor
| valor
;

/* FUNCIONES DE ESTRUCTURAS */
funcionesestructura: index 
| join 
| len 
| accesoslice
| accesomatriz
| structacceso
| atoi 
| parsefloat 
| typeof 
| accesofunc
;

/* SLICE.INDEX */
index: INDEX PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* STRING.JOIN */
join: JOIN PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* LEN */
len: LEN PARENTESIS_A ID PARENTESIS_C
;

/* APPEND */
append: ID IGUAL APPEND PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* ACCESO SLICE */
accesoslice: ID posicionslice
;

/* MODIFICACION SLICE */
modificacionslice: ID posicionslice IGUAL valor
;

posicionslice: CORCHETE_A NUMERO CORCHETE_C
;

/* MATRICES INICIALIZACION MULTIDIMENSIONAL */
matrices: ID PUNTO_IGUAL CORCHETE_A CORCHETE_C CORCHETE_A CORCHETE_C tipo LLAVE_A filas LLAVE_C
{
    const matriz = new Simbolo($1,"Matriz",$6,ambito, @1.first_line, @1.first_column);
    TablaSimbolos.agregarSimbolo(matriz);
}
;

filas: filas COMA fila
| filas COMA
| fila
;

fila: LLAVE_A elementos LLAVE_C
;

/* ASIGNACIÓN MATRICES */
asignacionmatriz: accesomatriz IGUAL valor
;

/* ACCESO MATRIZ */
accesomatriz: ID CORCHETE_A NUMERO CORCHETE_C CORCHETE_A NUMERO CORCHETE_C
;

/* STRUCT */
struct: STRUCT ID LLAVE_A atributos LLAVE_C
{
    const struct = new Simbolo($2,"Struct","struct",ambito, @2.first_line, @2.first_column);
    TablaSimbolos.agregarSimbolo(struct);
}
;

atributos: atributos atributo
| atributo
;

atributo: tipo ID PUNTO_COMA
;

/* USO STRUCT */
structuso: ID ID IGUAL LLAVE_A datos LLAVE_C PUNTO_COMA
;

datos: datos COMA dato
| dato
;

dato: ID DOS_PUNTOS valor
;

/* ACCESO STRUCT */
structacceso: ID PUNTO ID
;

/* MODIFICACION STRUCT */
structmodificacion: structacceso IGUAL valor PUNTO_COMA
;

/* PRINT */
print: PRINT PARENTESIS_A elementos PARENTESIS_C
;

/* ATOI */
atoi: ATOI PARENTESIS_A valor PARENTESIS_C
;

/* PARSEFLOAT */
parsefloat: PARSEFLOAT PARENTESIS_A valor PARENTESIS_C
;

/* TYPEOF */
typeof: ID PUNTO TYPEOF PARENTESIS_A valor PARENTESIS_C
;

/* ACCESO FUNC */
accesofunc: ID PARENTESIS_A elementos PARENTESIS_C
;