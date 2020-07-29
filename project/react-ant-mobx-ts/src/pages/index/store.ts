/**
 * Created by Chuans on 2020-04-29
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 17:56
 * Desc:
 */
import DetailsStore from 'INDEX_CONTAINER/Details/store';
import CommonTableStore from 'COMP/common-table-list/store';


export class RootStore {
    detailsStore:DetailsStore;
    commonTableStore:CommonTableStore;

    constructor(){
        this.detailsStore = new DetailsStore(this);
        this.commonTableStore = new CommonTableStore(this);
    }
}



export default new RootStore();
