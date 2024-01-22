export const baseUrl = "http://127.0.0.1:8000";
// export const baseUrl = "";


export interface Auth {
    refresh: string;
    access: string;
}
  
export interface Location {
    latitude: number;
    longitude: number;
    speed: number;
}
  
export interface Truck {
    id: number;
    name: string;
    location: Location;
}

export interface User {
    id: number
    first_name: string
    last_name: string
    last_login: string
    username: string
    email: string
    is_active: boolean
    date_joined: string
}

export interface Driver {
    id: number
    user: User
    cdl_number: string
    cdl_state: string
    phone: string
    address: string
    app_version: string
    notes: string
    is_active: boolean
    truck: number
    co_driver: number
}
            
export const STATES = [
    { value: "AK", name: "Alaska"},
    { value: "AL", name: "Alabama"},
    { value: "AR", name: "Arkansas"},
    { value: "AS", name: "American Samoa"},
    { value: "AZ", name: "Arizona"},
    { value: "CA", name: "California"},
    { value: "CO", name: "Colorado"},
    { value: "CT", name: "Connecticut"},
    { value: "DC", name: "District of Columbia"},
    { value: "DE", name: "Delaware"},
    { value: "FL", name: "Florida"},
    { value: "GA", name: "Georgia"},
    { value: "GU", name: "Guam"},
    { value: "HI", name: "Hawaii"},
    { value: "IA", name: "Iowa"},
    { value: "ID", name: "Idaho"},
    { value: "IL", name: "Illinois"},
    { value: "IN", name: "Indiana"},
    { value: "KS", name: "Kansas"},
    { value: "KY", name: "Kentucky"},
    { value: "LA", name: "Louisiana"},
    { value: "MA", name: "Massachusetts"},
    { value: "MD", name: "Maryland"},
    { value: "ME", name: "Maine"},
    { value: "MI", name: "Michigan"},
    { value: "MN", name: "Minnesota"},
    { value: "MO", name: "Missouri"},
    { value: "MS", name: "Mississippi"},
    { value: "MT", name: "Montana"},
    { value: "NC", name: "North Carolina"},
    { value: "ND", name: "North Dakota"},
    { value: "NE", name: "Nebraska"},
    { value: "NH", name: "New Hampshire"},
    { value: "NJ", name: "New Jersey"},
    { value: "NM", name: "New Mexico"},
    { value: "NV", name: "Nevada"},
    { value: "NY", name: "New York"},
    { value: "OH", name: "Ohio"},
    { value: "OK", name: "Oklahoma"},
    { value: "OR", name: "Oregon"},
    { value: "PA", name: "Pennsylvania"},
    { value: "PR", name: "Puerto Rico"},
    { value: "RI", name: "Rhode Island"},
    { value: "SC", name: "South Carolina"},
    { value: "SD", name: "South Dakota"},
    { value: "TN", name: "Tennessee"},
    { value: "TX", name: "Texas"},
    { value: "UT", name: "Utah"},
    { value: "VA", name: "Virginia"},
    { value: "VI", name: "Virgin Islands"},
    { value: "VT", name: "Vermont"},
    { value: "WA", name: "Washington"},
    { value: "WI", name: "Wisconsin"},
    { value: "WV", name: "West Virginia"},
    { value: "WY", name: "Wyoming"},
]