/// <reference path="../typings/tsd.d.ts" />

module model {
	/**
	 * Menu
	 */
	export class Menu {
		items: MenuItem[];
		constructor() {
			this.items = new Array<MenuItem>();
		}
	}
	
	/**
	 * MenuItem
	 */
	export class MenuItem {
		text: string;
		price: string;
		constructor(text: string, price: string) {
			this.text = text;
			this.price = price;
		}
	}
}