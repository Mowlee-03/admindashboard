const API_BASE_URL=process.env.REACT_APP_API_BASE_URL




export const LOGIN_ADMIN=`${API_BASE_URL}/api/admin/login`

export const POST_PROPERTY=`${API_BASE_URL}/api/property/post`
export const VIEW_ALL_PROPERTY=`${API_BASE_URL}/api/property/viewallproperties`
export const PROPERTY = (propertyId) => `${API_BASE_URL}/api/property/${propertyId}`


export const USERS_DATA=`${API_BASE_URL}/api/admin/users`