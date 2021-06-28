import { InputItem } from 'antd-mobile';
import Field from './Field';
import { FieldContext } from './context';

export default ({
  name,
  rules = [],
  placeholder = '',
  title,
  labelNumber = 6,
}) => {
  return (
    <Field name={name} rules={rules}>
      <InputItem clear placeholder={placeholder} labelNumber={labelNumber}>
        <FieldContext.Consumer>
          {value => {
            return (
              <>
                {value && (
                  <span style={{ color: '#ff4d4f', marginRight: '2%' }}>*</span>
                )}
                {title}
              </>
            );
          }}
        </FieldContext.Consumer>
      </InputItem>
    </Field>
  );
};
