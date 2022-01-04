import Box from '@mui/material/Box';

export default function TopBox(props) {    
    return (
        <Box sx={{ textAlign: 'center' }}> <h1> {props.text} </h1></Box>
    )
}
