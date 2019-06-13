import * as Auth from './AuthActions';
import * as Mobile from './MobAuthAction';
import * as zone from './ZoneActions';
import * as newuser from './NewCustomer';
import * as allproducts from './ProductsAction';
export default {
    ...Auth,
    ...Mobile,
    ...zone,
    ...newuser,
    ...allproducts
};