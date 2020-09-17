import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

module.exports = {
    
    async saveItem(tag,value){

        await AsyncStorage.setItem(tag,JSON.stringify(value))
    },

    async getItem(tag)
    {
        return await AsyncStorage.getItem(tag)
    },

    async deleteItem(tag)
    {
        return await AsyncStorage.removeItem(tag)
    },

    async clearCore()
    {
        return await AsyncStorage.clear()
    },
    
}