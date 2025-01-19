const BASE_URL=process.env.REACT_APP_BACKEND_URL



export const LOGIN_ADMIN=`${BASE_URL}api/admin/login`

export const POST_PROPERTY=`${BASE_URL}api/property/post`
export const VIEW_ALL_PROPERTY=`${BASE_URL}api/property/viewallproperties`
export const PROPERTY = (propertyId) => `${BASE_URL}api/property/${propertyId}`