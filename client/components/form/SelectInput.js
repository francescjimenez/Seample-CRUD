import React from 'react';
import PropTypes from 'prop-types';


const SelectInput = ({input, name, label, options, onChange}) => (
    <div className="form-group">
        <div htmlFor={name}>{label}</div>
        <div className="field">
            <select
                {...input}
                onChange={onChange}
                name={name}
                className="form-control"
            >
                <option key={'_not_selected'} value="">Choose an option</option>
                {
                    options.map((option,i) => {
                        if(typeof option === "string"){
                            return <option key={'_'+i} value={option}>{option}</option>;
                        }else{
                            return <option key={option.value} value={option.value}>{option.text}</option>;
                        }
                    })
                }
            </select>
        </div>
    </div>
);

// It's deprecated, I know. In my opinion it's better to use a static library like flow or typescript, or we can remove it on babel build
SelectInput.propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};

export default SelectInput;
