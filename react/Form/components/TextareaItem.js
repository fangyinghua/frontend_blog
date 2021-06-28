import { TextareaItem } from 'antd-mobile';
import Field from './Field';
import { FieldContext } from './context';

export default ({
  name,
  rules = [],
  placeholder = '',
  title,
  rows = 5,
  count = 50,
  labelNumber = 6,
}) => {
  return (
    <Field name={name} rules={rules}>
      <TextareaItem
        placeholder={placeholder}
        rows={rows}
        title={
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
                </>
              );
            }}
          </FieldContext.Consumer>
        }
        count={count}
        labelNumber={labelNumber}
      ></TextareaItem>
    </Field>
  );
};
