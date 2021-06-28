/**
 * 上传pdf文件
 */
import { useRef } from 'react';
import Field from './Field';

import { FieldContext } from './context';

import './index.less';

export default ({
  name,
  rules = [],
  placeholder = '',
  title,
  filename = '',
  onchange,
  help = false,
  helpText = '',
  handlerHelp,
}) => {
  const inputRef = useRef();
  const handlerClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const target = inputRef.current;

    target.click();
    target.onchange = onchange;
  };
  return (
    <Field name={name} rules={rules}>
      <div className="common_uploader_wrap">
        <div className="common_input_row_wrap">
          <FieldContext.Consumer>
            {value => {
              return (
                <>
                  {value && (
                    <span style={{ color: '#ff4d4f', marginRight: '1%' }}>
                      *
                    </span>
                  )}
                  <div className="common_input_title">{title}</div>
                </>
              );
            }}
          </FieldContext.Consumer>

          {help && (
            <a onClick={handlerHelp} className="common_uploader_help">
              {helpText}
            </a>
          )}

          <div className="common_input_wrap">
            <input
              type="file"
              name="applyFile"
              accept="application/pdf"
              style={{ display: 'none' }}
              ref={inputRef}
            />
            <button onClick={handlerClick} className="common_uploader_btn">
              {placeholder}
              <i className="common_uploader_btn_icon"></i>
              <span>{filename}</span>
            </button>
          </div>
        </div>
      </div>
    </Field>
  );
};
