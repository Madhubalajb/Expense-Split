import React from 'react'

const Notification = (props) => {
    if(props.msg === null) {
        return null
    }

    return (
        props.msg
    )
}

export default Notification