import isMatch from 'utilts/isMatch';
import React, { Component } from 'react';


export default class filterHandler extends React.Component {  
    if (filterData) {

        var currentColumn = column

        currentColumn.map(item => {
            if (isMatch(`${item.first_name} ${item.last_name}`, filterData)) {
                item.className = ''
                return item
            } else {
                item.className = 'none'
                return item
            }
        });

        return this.setState({ [column]: currentColumn })
    } else {
        var currentColumn = column

        currentColumn.map(item => {
            item.className = ''
            return item
        });

        return this.setState({ [column]: currentColumn })
    }
}