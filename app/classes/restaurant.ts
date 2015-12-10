/// <reference path="../typings/tsd.d.ts" />

module model {
	export class RestaurantConfig {
		name: string;
		url: string;
		id: string;
		avatarUrl: string;


		constructor(name: string, url: string, id: string, avatar?: string) {
			this.name = name;
			this.url = url;
			this.id = id;
			this.avatarUrl = avatar;
		}
	}

	export class Restaurant {
		name: string;
		url: string;
		id: string;
		avatarUrl: string;
		loaded: boolean;
		success: boolean;
		menu: Menu;

		constructor(config: RestaurantConfig) {
			this.name = config.name;
			this.url = config.url;
			this.id = config.id;
			this.avatarUrl = config.avatarUrl;
			this.loaded = false;
			this.success = true;
			this.menu = new Menu();
		}
	}
}