import { ImagePicker } from 'antd-mobile';
import Field from './Field';
import { FieldContext } from './context';
import './index.less';
export default ({
  name,
  rules = [],
  title,
  length = 4,
  onChange,
  files = [],
  size = 1,
}) => {
  const handlerOnChange = files => {
    const len = files.length;
    if (len >= size) {
      const newFiles = files.slice(-size);
      newFiles.length && onChange(newFiles);
    }
  };
  return (
    <Field name={name} rules={rules}>
      <div className="imagePicker_common_logo">
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
        <ImagePicker files={files} length={length} onChange={handlerOnChange} />
      </div>
    </Field>
  );
};
