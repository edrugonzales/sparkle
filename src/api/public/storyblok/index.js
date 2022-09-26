

async function getVersion() {
    return await fetch(`https://api.storyblok.com/v1/cdn/spaces/sparkbanner?version=published&token=${process.env.REACT_APP_STORYBLOK_KEY}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json()
        })
        .catch((err) => {
          
        })
    
}


export const  getBanners = async () =>{
    let version = await getVersion()

    return await fetch(`https://api.storyblok.com/v1/cdn/stories/sparkbanner?version=published&token=${process.env.REACT_APP_STORYBLOK_KEY}&cv=${version.space.version}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
          
        })
    
}