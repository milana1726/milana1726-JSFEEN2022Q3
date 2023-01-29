import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '7876c797b8924d90ae70f49a8beeb6e4',
        });
    }
}

export default AppLoader;
