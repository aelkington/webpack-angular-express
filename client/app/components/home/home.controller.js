'use strict';

class HomeController {
  constructor($http) {
    this.name = 'home';
    this.carBrands = [];

    // populate carBrands
    $http.get('/cars/brands').success(response => this.carBrands = response.brands);
  }

}

export default HomeController;
