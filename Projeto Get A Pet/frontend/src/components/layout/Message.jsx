import styles from './Message.module.css'

import React, { useState } from 'react'

const Message = () => {
    const [type, setType] = useState('')

    const handleClick = () => {
        setType('error')
    }


  return (
    <div className={`${styles.message} ${styles[type]}`} onClick={handleClick}>Mensagem</div>
  )
}

export default Message