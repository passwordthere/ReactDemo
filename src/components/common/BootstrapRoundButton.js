import {Button} from "react-bootstrap";

const BootstrapRoundButton = ({variant, text, onClick}) => {
    return <Button onClick={onClick} variant={variant} style={{borderRadius: '3rem', width: '100%', fontSize: '1.8rem'}}>{text}</Button>
}

export default BootstrapRoundButton