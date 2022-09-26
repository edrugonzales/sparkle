function shareUrl(name, url) {
  if (navigator.share) {
    navigator
      .share({
        title: name,
        url: url,
      })
      .then(() => {})
      .catch((err) => {
        alert("Error while sharing")
      })
  } else {
    alert("Browser does not support this api.")
  }
}

export default shareUrl
