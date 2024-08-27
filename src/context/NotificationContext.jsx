'use client'

import { Notification } from '@/components/Notification'
import { createContext, useState } from 'react'

const defaultState = {
  open: false,
  status: null,
  msj: null
}

export const NotificationContext = createContext({})

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(defaultState)

  const showNotification = (props) => {
    if (props) {
      setNotification(props)

      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null })
      }, 3000)
    }
  }

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open && (
        <>
          <Notification status={notification.status} msj={notification.msj} />
        </>
      )}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
