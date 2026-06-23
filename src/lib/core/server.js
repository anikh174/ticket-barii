const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path)=>{
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}

export const serverMutation = async(path, data)=>{
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // handle 401, 403, 404
    return res.json();
}