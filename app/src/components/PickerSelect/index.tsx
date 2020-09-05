import React from 'react';
import { IBGE_FORMATED } from '../../models/IbgeDTO';
import { StyleSheet, View,  } from 'react-native';
import { Picker } from '@react-native-community/picker';

interface defaultProps {
    datas:IBGE_FORMATED[],
    selectedValue: any,
    label: string;
    onChangeValue: (value:any) => void;
}

const PickerComponent:React.FC<defaultProps> = (props) => {
    const { datas, label, selectedValue, onChangeValue } = props;

    function renderOptions() {
       return datas.map(element => (
            <Picker.Item
                key={String(element.id)}
                value={String(element.value)}
                label={element.value}
            />
       ));
    };

    return(
        <View  style={styles.input}>
            <Picker 
                style={styles.input}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => onChangeValue(itemValue)}
            >
                <Picker.Item
                    value={''}
                    label={label}
                />
                { renderOptions() }
            </Picker>
        </View>
       
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
});

export default PickerComponent; 