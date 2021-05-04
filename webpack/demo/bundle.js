const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const getModuleInfo = (file)=>{
    const body = fs.readFileSync('./src/index.js','utf-8');
    console.log(body);
    const ast = parser.parse(body,{
        sourceType:'module' //表示我们要解析的是ES模块
    });
    // const deps = {}
    // traverse(ast,{
    //     ImportDeclaration({node}){
    //         const dirname = path.dirname(file)
    //         const abspath = "./" + path.join(dirname,node.source.value)
    //         deps[node.source.value] = abspath
    //     }
    // })
    // const {code} = babel.transformFromAst(ast,null,{
    //     presets:["@babel/preset-env"]
    // })
    // const moduleInfo = {file,deps,code}
    // return moduleInfo
}

// 新增代码
const parseModules = (file) =>{
    const entry =  getModuleInfo(file);
    // const temp = [entry]
    // for (let i = 0;i<temp.length;i++){
    //     const deps = temp[i].deps
    //     if (deps){
    //         for (const key in deps){
    //             if (deps.hasOwnProperty(key)){
    //                 temp.push(getModuleInfo(deps[key]))
    //             }
    //         }
    //     }
    // }
    // console.log(temp)
}

parseModules('./src/index.js')