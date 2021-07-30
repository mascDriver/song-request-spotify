import {styled} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import React from "react";

const CustomButtom = styled(({ color, ...other }) => <Button {...other} />)({
    background: (props) =>
        props.color === 'red'
            ? 'linear-gradient(45deg, #f74343 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #1885db 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
        props.color === 'red'
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
});
export default function AdaptingHook(props) {
    return (
        <React.Fragment>
            <CustomButtom {...props}>{props.value}</CustomButtom>
        </React.Fragment>
    );
}