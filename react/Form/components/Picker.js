import { Picker, List } from 'antd-mobile';
import Field from './Field';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FieldContext } from './context';

export default ({
  name,
  rules = [],
  placeholder = '',
  title,
  arrow = 'horizontal',
  cols = 1,
  data = [],
  onOk,
  help = false,
  handlerHelp,
}) => {
  return (
    <Field name={name} rules={rules}>
      <Picker extra={placeholder} data={data} cols={cols} onOk={onOk}>
        <List.Item arrow={arrow}>
          <FieldContext.Consumer>
            {value => {
              return (
                <>
                  {value && (
                    <span style={{ color: '#ff4d4f', marginRight: '2%' }}>
                      *
                    </span>
                  )}
                  {title}
                  {help && (
                    <span
                      style={{
                        marginLeft: '2px',
                        padding: '5px',
                      }}
                      onClick={handlerHelp}
                    >
                      <QuestionCircleOutlined size="25" />
                    </span>
                  )}
                </>
              );
            }}
          </FieldContext.Consumer>
        </List.Item>
      </Picker>
    </Field>
  );
};
