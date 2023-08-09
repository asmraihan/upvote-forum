

interface Params {
    text : string,
    author : string,    
    path: string
}


export async function createPost({}: Params)