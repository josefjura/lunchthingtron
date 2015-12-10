/// <reference path="../typings/tsd.d.ts" />

module responses {
	export class ServiceResponse {
		success: boolean;
		data: any;
		error: string;
		constructor() {

		}
	}

	export class Ok<T> extends ServiceResponse {
		response: T;
		constructor(response: T) {
			super();
			this.data = response;
			this.success = true;
		}
	}

	export class Error extends ServiceResponse {
		constructor(errorMessage: string) {
			super();
			this.error = errorMessage;
			this.success = false;
		}
	}
}