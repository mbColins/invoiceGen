import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type buttonProps = {
    title: string,
     onPress?: (event: GestureResponderEvent) => void
    
}

const Button: React.FC<buttonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container}
        onPress={onPress}
        >
            <Text style={{ color: "#ccc" }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: { borderColor: '#ccc', borderWidth: 1, width: 200, borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center' }
})