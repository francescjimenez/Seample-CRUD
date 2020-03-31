import React from 'react';
import PropTypes from 'prop-types';

const FieldInput = ({input, type, name, label, placeholder, onChange}) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>

        <div className="field">
            <input
                {...input}
                onChange={onChange}
                type={type}
                name={name}
                className="form-control"
                placeholder={placeholder}
            />

            {/* touched && ((error && <p className="text-danger">{error}</p>) || (warning && <p className="text-danger">{warning}</p>))*/}
        </div>
    </div>
);

// It's deprecated, I know. In my opinion it's better to use a static library like flow or typescript, or we can solve on babel build
FieldInput.propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

export default FieldInput;
