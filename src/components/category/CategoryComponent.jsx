import React, {Component} from 'react';
import CategoryFormDialog  from './CategoryFormDialog';
import '../../styles/App.css';
import CircularProgress from '@mui/material/CircularProgress';

class CategoryComponent extends Component {
    //1) setup our state using constructor
    
    constructor(props) {
        super(props);
        this.state={
            styleClass: 'showMe category',
            error: ''
        }
    }
 
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('CategoryComponent componentDidUpdate()');
        if (prevProps.openCategory !== this.props.openCategory) {
           this.setState({openCategory: this.props.openCategory});
        }
        
        if (!this.props.openCategory && this.state.error !== '') {
            this.setState({error: ''});
        }

        if (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    handleError(message) {
        console.log('CategoryComponent handleError()');
        if(this.props.openCategory === true) {
            this.setState({ error: message});
        }
    }

    handleValidationAndSubmit = (category, e) => {
        console.log('stop here');
        if (this.validCategory(category)) {
            this.props.handleCategorySubmit(category, e);
        }
    };

    validCategory = (category) => {
        if (!category.label && !category.value) {
            this.handleError('Please provide Category inputs');
            return false;
        } else if (!category.label) {
            this.handleError('Please provide a label.');    
        } else if (!category.value) {
            this.handleError('Please provide a value');
        }else {
            //make sure any previous error is cleared
            this.setState({error: ''});
            return true;
        }
    }

    render() {
       
        return (
            <div>       
                <div>     
                    <CategoryFormDialog 
                        openCategory={this.props.openCategory} 
                        error={this.state.error} 
                        styleClass={this.state.styleClass} 
                        handleCategoryValSubmit={this.handleValidationAndSubmit}
                        categoryModel={this.props.categoryModel}
                        handleClose={this.props.handleClose}
                    />          
                </div>        
            </div>
        );
    }
}
export default CategoryComponent;