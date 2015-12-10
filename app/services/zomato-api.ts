module services {
	export interface IZomatoService {
		loadMenu(rest: model.RestaurantConfig, cache: boolean): ng.IPromise<responses.ServiceResponse>;
		searchAsync(searchTerm: string): ng.IPromise<responses.ServiceResponse>;
	}
}