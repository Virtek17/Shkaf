const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root=path.resolve(__dirname,'..','src');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(root).filter(f=>/\.tsx?$/.test(f));
const graph=new Map();
for(const file of files) {
 const ast=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
 const edges=[];
 for(const node of ast.statements) {
  if(!ts.isImportDeclaration(node)&&!ts.isExportDeclaration(node)) continue;
  if(ts.isImportDeclaration(node)&&node.importClause?.isTypeOnly || ts.isExportDeclaration(node)&&node.isTypeOnly) continue;
  if(ts.isImportDeclaration(node) && node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings) &&
    !node.importClause.name && node.importClause.namedBindings.elements.every(e=>e.isTypeOnly)) continue;
  const source=node.moduleSpecifier?.text;
  if(!source || !(source.startsWith('.')||source.startsWith('@/'))) continue;
  const base=source.startsWith('@/')?path.join(root,source.slice(2)):path.resolve(path.dirname(file),source);
  const target=[base+'.ts',base+'.tsx',path.join(base,'index.ts'),path.join(base,'index.tsx')].find(f=>fs.existsSync(f));
  if(target) edges.push(target);
 }
 graph.set(file,edges);
}
const active=new Set(),done=new Set();
function visit(file,stack=[]) {
 if(active.has(file)) throw Error('Циклический импорт: '+[...stack,file].map(f=>path.relative(root,f)).join(' → '));
 if(done.has(file)) return;
 active.add(file);
 for(const dependency of graph.get(file)??[])visit(dependency,[...stack,file]);
 active.delete(file);done.add(file);
}
for(const file of files)visit(file);
console.log('Architecture: no runtime import cycles ('+files.length+' TypeScript files)');

