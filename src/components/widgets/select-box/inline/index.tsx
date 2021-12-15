import React from 'react';
import Select, {ActionMeta, OnChangeValue} from 'react-select';

export type Option = {
    value: number,
    label: string
}


interface InlineSelectBoxProps {
    defaultLabel: string,
    instanceId: string,
    selectedOption: Option,
    options: Option[],
    onChange: (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => void,
    shouldUseDefault?: boolean
}

export const InlineSelectBox: React.FC<InlineSelectBoxProps> = ({ defaultLabel, selectedOption, instanceId, options, onChange}) => {
    const initOption = { value: 0, label: defaultLabel }

    return (
        <Select
            instanceId={ instanceId }
            value={ selectedOption || initOption }
            onChange={ onChange }
            options={ options }
            classNamePrefix="react-select"
            className="react-select--inline"
            components={{
                IndicatorsContainer: () => null
            }}
            isSearchable={false}
        />
    )

}