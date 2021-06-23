### vscode动态生产小模板
* 通过 Vscode 的 Snippets 我们可以自定义 Snippets ，从而实现快捷生成代码片段。

```js
{
	// Place your volunteer-serve-app workspace snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"Form gene": {
		"scope": "javascript,typescript",
		"prefix": "form-r",
		"body": [
			"/**",
			" * @Author: fangyh ",
			" * @Date: $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",		
			" * @Descripttion:'' ",
			" */",
			"import React from 'react';",
			"import { List, InputItem } from 'antd-mobile';",
			"import Form, { Field, useForm } from 'rc-field-form';",
			"import { useTitle } from '@/hooks/useTitle';",
			"import styles from './index.less';",
			"\n",
			"export default ({ route }) => {",
			"\tuseTitle(route.title);",
			"\tconst [form] = useForm();",
			"\n",
			"\tconst onSubmit = () => {",
				"\t\tform.validateFields({ force: true }, error => {",
					"\t\t\tif (!error) {",
					"\t\t\tconsole.log(form.getFieldsValue());$1",
					"\t\t\t} else {",
					"\t\t\t}",
				"\t\t});",
			"\t};",	
			"\n",		  
				"return ("
				  "\t<Form form={form} name='basic'>",
					"\t\t<List>",
					"\t\t<Field name='username' rules={[{ required: true, message: '请输入您的组织名称' }]}>",
						"\t\t<InputItem clear placeholder='请输入您的组织名称' labelNumber={10}>",
						  "\t\t\t组织名称组织名称",
						"\t\t</InputItem>",
					  "\t\t</Field>",
					"\t\t</List>",
				" \t</Form>",
				" \t);",
			 " };"
		],
		"description": "Log output to console"
	}

}
```
* 通过 plop生成模版页面
    * 步骤：
        1. 根目录创建文件 `plopfile.js`  plop将已该文件作为执行入口；
        2.  "scripts": {}下面添加一个命令，比如 "new": "plop"
        3. 编写plopfile.js文件配置
        ```js
        module.exports = function(plop) {
            plop.setGenerator('page', {
                description: 'generate a page',
                prompts: [
                {
                    type: 'input',
                    name: 'form',
                    message: '是否生产表单页面',
                },
                {
                    type: 'input',
                    name: 'pageName',
                    message: '请输入文件夹名称',
                },
                {
                    type: 'input',
                    name: 'less',
                    message: '需要less文件吗？(y/n)',
                },
                ],
                actions: data => {
                const { pageName, less, form } = data;
                const name = '{{pageName}}';
                let actions = [];
                if (form) {
                    actions.push({
                    type: 'add',
                    path: `src/pages/${name}/index.js`, // 文件生成后所在的位置
                    templateFile: 'plop-templates/view/form.hbs', // 模板路径
                    });
                } else if (pageName) {
                    actions.push({
                    type: 'add',
                    path: `src/pages/${name}/index.js`, // 文件生成后所在的位置
                    templateFile: 'plop-templates/view/index.hbs', // 模板路径
                    });
                }
                if (less === 'y') {
                    actions.push({
                    type: 'add',
                    path: `src/pages/${name}/index.less`, // 文件生成后所在的位置
                    templateFile: 'plop-templates/view/index.less', // 模板路径
                    });
                }
                return actions;
                },
            });
            };
        ```
        4. 模版文件
        根目录下创建plop-templates/view 目录，编写对应的模版

        * form.hbs 文件
        ```js
        /**
         * @Author: fangyh
        * @Descripttion:''
        */
        import React from 'react';
        import { List, InputItem } from 'antd-mobile';
        import Form, { Field, useForm } from 'rc-field-form';
        import { useTitle } from '@/hooks/useTitle';
        import styles from './index.less';

        export default ({ route }) => {
        useTitle(route.title);
        const [form] = useForm();

        const onSubmit = () => {
            form.validateFields({ force: true }, error => {
            if (!error) {
                console.log(form.getFieldsValue());
            } else {
            }
            });
        };

        return (
            <Form form={form} name="basic">
            <List>
                <Field
                name="username"
                rules={[{ required: true, message: '请输入您的组织名称' }]}
                >
                <InputItem clear placeholder="请输入您的组织名称" labelNumber={10}>
                    组织名称组织名称
                </InputItem>
                </Field>
            </List>
            </Form>
        );
        };

        ```
        * index.hbs
        ```js
        /**
         * @Author: fangyh
        * @Descripttion:''
        */
        import React from 'react';
        import { useTitle } from '@/hooks/useTitle';
        import styles from './index.less';

        export default ({ route }) => {
            useTitle(route.title); 

            return (<>
            </>
            );
        };
        ```
        * index.less就是一个空文件

