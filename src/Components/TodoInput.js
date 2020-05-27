import React, { Component } from 'react'
// import { directive } from '@babel/types';

export default class TodoInput extends Component {
    state = {
        title: ''
      }
    
      onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
      }
    
      onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    render() {
        
        return (
            <div className="card card-body my-3">
                <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                <i className="fas fa-book"></i>                                        
                            </div>

                            <input type="text" name="title" className="form-control"
                             placeholder="add a todo item" value={this.title}
                             onChange={this.onChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary mt-3">
                        add item</button>                          
                </form>                    
            </div>
        );
        
    }
}