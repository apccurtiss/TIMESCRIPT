var esprima = require('esprima');
var fs = require('fs');

let vars = [];
function compile(ast) {
    if (ast.type == 'Program') {
        return 'function __go_back_in_time(arr, index) {\n' +
        '  if(index >= arr.length) throw Error("TemporalError: The requested point in time never happened!");\n' +
        '  return arr[arr.length - 1 - index];\n' +
        '}\n' + ast.body.map(compile).join(';\n') + ';'
    }
    else if(ast.type == 'VariableDeclaration') {
        if (ast.kind == 'const') {
            throw Error('A const declaration, Really? What is this, Haskell?');
        }
        return 'var ' + ast.declarations.map((d) => {
            vars.push(d.id.name);
            if (d.init) {
                return d.id.name + '=[' + compile(d.init) + ']';
            }
            else {
                return d.id.name + '=[]';
            }
        })
    }
    else if(ast.type == 'AssignmentExpression') {
        if(ast.left.type == 'Identifier' && vars.indexOf(ast.left.name) != -1) {
            return ast.left.name + '.push(' + compile(ast.right) + ')'
        }
        return compile(ast.left) + ast.operator + compile(ast.right);
    }
    else if(ast.type == 'BinaryExpression') {
        if(ast.operator == '@') {
            if(ast.left.type != 'Identifier') {
                throw Error('Can only time travel with an identifier!')
            }
            return '__go_back_in_time(' + ast.left.name + ',' + compile(ast.right) + ')'
        }
        return compile(ast.left) + ast.operator + compile(ast.right);
    }
    else if(ast.type == 'ExpressionStatement') {
        return compile(ast.expression);
    }
    else if(ast.type == 'CallExpression') {
        return compile(ast.callee) + '(' + ast.arguments.map(compile).join(',') + ')';
    }
    else if(ast.type == 'MemberExpression') {
        return compile(ast.object) + '.' + compile(ast.property);
    }
    else if(ast.type == 'Identifier') {
        if(vars.indexOf(ast.name) != -1) {
            return '__go_back_in_time(' + ast.name + ',0)'
        }
        return ast.name;
    }
    else if(ast.type == 'Literal') {
        return ast.raw;
    }
    else if(ast.type == 'ForStatement') {
        return 'for(' + compile(ast.init) + ';' + compile(ast.test) + ';' + compile(ast.update) + ')' + compile(ast.body);
    }
    else if(ast.type == 'BlockStatement') {
        return '{' + ast.body.map(compile).join(';\n') + '}'
    }
    console.log(ast)
    throw Error(
            ast.type + ' is an unimplemented langugage feature. ' + 
            'Don\'t be surprised, most of the language is unimplemented.');
}

function main(err, program) {
    if (err != null) {
        console.log(err);
        return;
    }

    var ast = esprima.parseScript(String(program));
    fs.writeFile('a.out', compile(ast), (err) => {
        if (err) throw err;
    });
}

if (process.argv.length != 3) {
    console.log('Usage: node langlang.js source_file');
    process.exit(1);
}
const infile = process.argv[2];
fs.readFile(infile, main);