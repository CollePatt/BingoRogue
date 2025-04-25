function Tile(props) {
    return ( 
    <div
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        key={props.index}
        // add free space styling if freeSpace is true
        style={{
            border: '2px solid black',
            backgroundColor: props.freeSpace ? '#f0f0f0' : '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
            fontSize: props.freeSpace ? '18px' : '22px',
            fontStyle: props.freeSpace ? 'italic' : 'normal',
            cursor: 'pointer'
        }}>
        {props.number}
    </div> 
    );
}

export default Tile;

