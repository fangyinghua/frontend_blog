import { Flex, Radio } from 'antd-mobile';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Field from './Field';
import { FieldContext } from './context';
import './index.less';
import { useState } from 'react';

export default ({
  name,
  rules = [],
  title,
  data = [],
  onChange,
  help = false,
  handlerHelp,
}) => {
  const [activeValue, setActiveValue] = useState(undefined);
  return (
    <Field name={name} rules={rules}>
      <div className="consume_radio">
        <Flex className="consume_radio_flex">
          <Flex.Item className="consume_radio_label">
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
          </Flex.Item>
          <Flex.Item className="consume_radio_radio_list">
            {data.map(item => (
              <Radio
                key={item.value}
                className="my-radio"
                style={{ marginRight: '10px' }}
                checked={item.value === activeValue}
                value={item.value}
                onChange={e => {
                  setActiveValue(e.target.value);
                  onChange(e.target.value);
                }}
              >
                <span>{item.label}</span>
              </Radio>
            ))}
          </Flex.Item>
        </Flex>
      </div>
    </Field>
  );
};
