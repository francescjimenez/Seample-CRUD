import React, { useState, useEffect }  from 'react';
import FieldInput from "../common/FieldInput";
import PropTypes from "prop-types";

const LineInputs = ({line, submitting, handleChange}) => {

    const [_line, setLine] = useState(line);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setLine({ ..._line, [name]: value })
    };

    useEffect(() => {
        handleChange(_line); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_line]);

    return (
        <div className={'row'}>
            <div className={'col-sm-4'}>
                <FieldInput
                    input={{value:_line.itemSKU, disabled: submitting, readOnly: true}}
                    type={'text'}
                    name={'itemSKU'}
                    label={'Item SKU'}
                    placeholder={''}
                    onChange={handleInputChange}
                />
            </div>
            <div className={'col-sm-4'}>
                <FieldInput
                    input={{value:_line.price, disabled: submitting}}
                    type={'number'}
                    name={'price'}
                    label={'Price'}
                    placeholder={''}
                    onChange={handleInputChange}
                />
            </div>
            <div className={'col-sm-4'}>
                <FieldInput
                    input={{value:_line.quantity, disabled: submitting, min:0}}
                    type={'number'}
                    name={'quantity'}
                    label={'Quantity'}
                    placeholder={''}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

FieldInput.defaultProps = {
    submitting: false
};

FieldInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};

export default LineInputs;
