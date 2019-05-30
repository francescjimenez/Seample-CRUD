import React from 'react';
import PropTypes from 'prop-types';


const SelectInput = ({input, name, label, options, onChange}) => {

    return(
        <div className="form-group">
            <div htmlFor={name}>{label}</div>
            <div className="field">
                <select
                    {...input}
                    onChange={onChange}
                    name={name}
                    className="form-control"
                >
                    {
                        options.map((option,i) => {
                            if(typeof option === "string"){
                                return <option key={'_'+i} value={i}>{option}</option>;
                            }else{
                                return <option key={option.value} value={option.value}>{option.text}</option>;
                            }
                        })
                    }
                </select>
            </div>
        </div>
    );
};

// It's deprecated, I know. In my opinion it's better to use a static library like flow or typescript
SelectInput.propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
