import React, { Component } from 'react'
import { View, StyleSheet, TextInput, ActivityIndicator, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

export default class SearchInput extends Component {
   
        state = {
            text : ''
        }
        static propTypes ={
            onSubmit: PropTypes.func.isRequired,
            placeholder: PropTypes.string,
        }
        
        static defaultProps = {
            placeholder: ' '
        }

    handleLocationChange  = text => {
       this.setState({ text })
    }

    handleSubmit = () => {
        const {onSubmit } = this.props;
        const { text } = this.state

        if (!text) return;

        onSubmit(text)
        this.setState({ text: ''})
    }

    render() {
        const { container, textInput } = styles
        const { placeholder } = this.props
        const { text } = this.state
        return (
                <View>
                <TextInput 
                    autoCorrect={false}
                    placeholder={placeholder}
                    placeholderTextColor='white'
                    underlineColorAndroid="transparent"
                    style={container}
                    clearButtonMode='always'
                    onChangeText={this.handleLocationChange}
                    onSubmitEditing={this.handleSubmit}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#666',
        color: 'white',
        height: 40,
        width: 300,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center'
      }, 
      textInput: {
          flex: 1,
          color: 'white'
      }
})
