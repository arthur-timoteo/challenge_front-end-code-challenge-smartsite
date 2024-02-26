import { Location } from "./location";

export interface UnitResponse {
    current_country_id: number,
    locations: Location[],
    wp_total: number,
    total: number,
    success: boolean
}