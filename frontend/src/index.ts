


export interface Auth {
    refresh: string;
    access: string;
}
  
export interface Location {
    address: string;
    latitude: number;
    longitude: number;
    speed: number;
}
  
export interface Log {
    id: number;
    driver: number;
    truck: null;
    status: 'of' | 'sb' | 'dr' | 'on' | 'pc' | 'ym';
    date: string;
    time: string;
    location: Location;
    odometer: number;
    eng_hours: number;
    notes: string;
    document: string;
    trailer: string;
}

export interface Truck {
    id: number;
    unit_number: string;
    make: string;
    model: string;
    eld_device: string;
    notes: string;
    vin_number: string;
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

export const YEARS = [
    {value: "Y04", name: "2004"},
    {value: "Y05", name: "2005"},
    {value: "Y06", name: "2006"},
    {value: "Y07", name: "2007"},
    {value: "Y08", name: "2008"},
    {value: "Y09", name: "2009"},
    {value: "Y10", name: "2010"},
    {value: "Y11", name: "2011"},
    {value: "Y12", name: "2012"},
    {value: "Y13", name: "2013"},
    {value: "Y14", name: "2014"},
    {value: "Y15", name: "2015"},
    {value: "Y16", name: "2016"},
    {value: "Y17", name: "2017"},
    {value: "Y18", name: "2018"},
    {value: "Y19", name: "2019"},
    {value: "Y20", name: "2020"},
    {value: "Y21", name: "2021"},
    {value: "Y22", name: "2022"},
    {value: "Y23", name: "2023"},
    {value: "Y24", name: "2024"},
    {value: "Y24", name: "2025"},
    {value: "Y24", name: "2026"},
]

export const FUEL_TYPE = [
    {value: "di", name: "Diesel"},
    {value: "ga", name: "Gasoline"},
    {value: "pr", name: "Propane"},
    {value: "li", name: "Liquid Natural Gas"},
    {value: "co", name: "Compressed Natural Gas"},
    {value: "me", name: "Methanol"},
    {value: "e",  name: "E-85"},
    {value: "m",  name: "M-85"},
    {value: "a",  name: "A55"},
    {value: "bi", name: "Biodisel"},
    {value: "o",  name: "Other"},
]