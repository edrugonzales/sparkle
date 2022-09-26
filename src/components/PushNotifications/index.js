import React, { useEffect } from 'react'
import * as serviceWorker from '../../notificationServiceWorkerRegistration'
import firebase from '../../services/firebase'


const PushNotifications = ({ file }) => {
	useEffect(() => {
		let mounted = true


		if (mounted) {
			if (typeof window === 'undefined') return
			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
			if (isSafari) return
			navigator.serviceWorker.getRegistrations().then(async registrations => {
				try {
					let existed = registrations.find((registration) => registration.active.scriptURL.includes('static'))

					if (existed) {
						console.log('existed, will delete')
						let a = await existed.unregister()
						console.log(a)
					}

					Notification.requestPermission().then(permission => {
						console.log('permission is ')
						console.log(permission)
						if (permission === 'granted') {
							serviceWorker.register({
								file: file,
								onSuccess: (registration) => {
									console.log('subscribing to firebase')
									firebase.messaging.onMessage(({ notification }) => {
										console.log('message received on front end')
										registration.showNotification(notification.title, {
											body: notification.body
										})
									})
								},
							})
						}
					})
				} catch (err) {
					console.log(err)
				}
			})
		}


	}, [])

	return <></>
}


export default PushNotifications