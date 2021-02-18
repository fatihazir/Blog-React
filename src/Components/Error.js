import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
export class Error extends Component {
    render() {
        return (
            <div>
                <>
                    <Button variant="danger" size="lg" block>
                        Page Not Found 404 <i className="fas fa-ban"></i>
                    </Button>

                </>
            </div>
        );
    }
}

