export const noNullnoEmpty = (data:any) => {
    if(typeof data === 'object' && !Array.isArray(data) 
        && data !== null && data !== undefined) return true;
    if(Array.isArray(data) || typeof data === 'string') return data.length !== 0;
    return false;
};