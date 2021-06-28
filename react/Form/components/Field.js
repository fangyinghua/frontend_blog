import React from 'react';
import { Field } from 'rc-field-form';
import { FieldContext } from './context';

export default props => {
  const shouldUpdate = (prevValue, nextValue) => {
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    return prevValue !== nextValue;
  };

  const isRequired =
    props.required !== undefined
      ? props.required
      : !!(
          props.rules &&
          props.rules.some(rule => {
            if (rule && typeof rule === 'object' && rule.required) {
              return true;
            }
            if (typeof rule === 'function') {
              const ruleEntity = rule(context);
              return ruleEntity && ruleEntity.required;
            }
            return false;
          })
        );

  return (
    <FieldContext.Provider value={isRequired}>
      <Field {...props} shouldUpdate={shouldUpdate}>
        {props.children}
      </Field>
    </FieldContext.Provider>
  );
};
