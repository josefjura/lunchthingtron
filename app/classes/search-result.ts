/// <reference path="../typings/tsd.d.ts" />

module model {
	export class APISearchResponse {
		restaurants: Array<RestaurantSourceEnvelope>;
		constructor() {

		}
	}

	export class ScrapeSearchResponse {
		constructor() {

		}
	}

	export class RestaurantSourceEnvelope {
		restaurant: RestaurantSourceData;
	}

	export class RestaurantSourceData {
		name: string;
		url: string;
		thumb: string;
		id: number;
	}
}