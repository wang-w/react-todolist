import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        console.log(store.getState())
        this.bindInputChange = this.bindInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (
            <div style={{ margin: '10px' }}>
                <Input onChange={this.bindInputChange} value={this.state.inputValue} placeholder="Basic usage" style={{ width: '300px', marginRight: '10px' }}/>
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                <List
                    style={{marginTop: '10px', width: '300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
            </div>
        )
    }

    bindInputChange(e) {
        const action = {
            type: 'input_change',
            value: e.target.value
        }
        store.dispatch(action)
    }

    handleStoreChange() {
        this.setState(store.getState())
    }

    handleSubmit() {
        const action = {
            type: 'add_todo_item'
        }
        store.dispatch(action)
    }
}

export default TodoList