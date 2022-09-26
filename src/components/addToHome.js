// var pwaEnabled = true // activate the PWA and all settings below
// var pwaRemind = 1 // how many days after the user rejects / clicks maybe later to re-show the install pwa window. set 0 to always.

// var isMobile = {
//   Android: function () {
//     return (
//       typeof window !== 'undefined' && navigator.userAgent.match(/Android/i)
//     )
//   },
//   iOS: function () {
//     return (
//       typeof window !== 'undefined' &&
//       navigator.userAgent.match(/iPhone|iPad|iPod/i)
//     )
//   },
//   Windows: function () {
//     return (
//       typeof window !== 'undefined' && navigator.userAgent.match(/IEMobile/i)
//     )
//   },
//   any: function () {
//     return (
//       typeof window !== 'undefined' &&
//       (isMobile.Android() || isMobile.iOS() || isMobile.Windows())
//     )
//   },
// }

// if (!isMobile.any()) {
//   $('body').addClass('is-not-ios')
//   $('.show-ios, .show-android').addClass('disabled')
//   $('.show-no-device').removeClass('disabled')
// }

// if (isMobile.Android()) {
//   $('body').addClass('is-not-ios')
//   $('head').append('<meta name="theme-color" content="#FFFFFF"> />')
//   $('.show-android').removeClass('disabled')
//   $(
//     '.show-ios, .show-no-device, .simulate-android, .simulate-iphones'
//   ).addClass('disabled')
// }

// if (isMobile.iOS()) {
//   $('body').addClass('is-ios')
//   $('.show-ios').removeClass('disabled')
//   $(
//     '.show-android, .show-no-device, .simulate-android, .simulate-iphones'
//   ).addClass('disabled')
// }

// if (pwaEnabled === true) {
//   //Setting Timeout Before Prompt Shows Again if Dismissed
//   var now = new Date()
//   var start = new Date(now.getFullYear(), 0, 0)
//   var diff = now - start
//   var oneDay = 1000 * 60 * 60 * 24
//   var day = Math.floor(diff / oneDay)
//   var dismissDate = localStorage.getItem('Appkit-PWA-Timeout-Value')

//   if (day - dismissDate > pwaRemind) {
//     localStorage.removeItem('Appkit-PWA-Prompt')
//   }

//   //Dismiss Prompt Button
//   $('.pwa-dismiss').on('click', function () {
//
//     localStorage.setItem('Appkit-PWA-Prompt', 'install-rejected')
//     $('body')
//       .find('#menu-install-pwa-android, #menu-install-pwa-ios, .menu-hider')
//       .removeClass('menu-active')
//     localStorage.setItem('Appkit-PWA-Timeout-Value', day)
//   })

//   var isInWebAppiOS = window.navigator.standalone === true

//   //Trigger Install Prompt for Android
//   if (isMobile.Android()) {
//     function showInstallPrompt() {
//       if ($('#menu-install-pwa-android, .add-to-home').length) {
//         if (localStorage.getItem('Appkit-PWA-Prompt') !== 'install-rejected') {
//           setTimeout(function () {
//             $('.add-to-home').addClass(
//               'add-to-home-visible add-to-home-android'
//             )
//             $('#menu-install-pwa-android, .menu-hider').addClass('menu-active')
//           }, 4500)
//
//         } else {
//
//             'PWA Install Rejected. Will Show Again in ' +
//               (dismissDate - day + pwaRemind) +
//               ' Days'
//           )
//         }
//       } else {
//
//           'The div #menu-install-pwa-android was not found. Please add this div to show the install window'
//         )
//       }
//     }
//     let deferredPrompt
//     window.addEventListener('beforeinstallprompt', (e) => {
//       e.preventDefault()
//       deferredPrompt = e
//       showInstallPrompt()
//     })
//     $('.pwa-install').on('click', function (e) {
//       deferredPrompt.prompt()
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           //
//         } else {
//           //
//         }
//         deferredPrompt = null
//       })
//     })
//     window.addEventListener('appinstalled', (evt) => {
//       $('#menu-install-pwa-android, .menu-hider').removeClass('menu-active')
//     })
//   }

//   //Trigger Install Guide iOS
//   if (isMobile.iOS()) {
//     if (!isInWebAppiOS) {
//       if ($('#menu-install-pwa-ios, .add-to-home').length) {
//         if (localStorage.getItem('Appkit-PWA-Prompt') !== 'install-rejected') {
//
//           setTimeout(function () {
//             $('.add-to-home').addClass('add-to-home-visible add-to-home-ios')
//             $('#menu-install-pwa-ios, .menu-hider').addClass('menu-active')
//           }, 4500)
//         } else {
//
//             'PWA Install Rejected. Will Show Again in ' +
//               (dismissDate - day + pwaRemind) +
//               ' Days'
//           )
//         }
//       } else {
//
//           'The div #menu-install-pwa-ios was not found. Please add this div to show the install window'
//         )
//       }
//     }
//   }
// }

// const loadScript = () => window.addEventListener('load', () => isMobile())

// export default loadScript
