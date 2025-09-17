import { InjectionToken } from "@angular/core";
import BookingRulesConfig from "@core/business/interfaces/bookingRulesConfig.interface";

export const  BOOKING_RULES = new InjectionToken<BookingRulesConfig>('BOOKING_RULES');