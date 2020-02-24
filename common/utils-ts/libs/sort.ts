/**
 * 快速排序-不稳定复杂排序
 * @param arr
 * @returns {*}
 */
export function arrSortQuick<T>(arr: T[]): T[] {

    if (Object.prototype.toString.call(arr) !== '[object Array]') throw new Error('arrSortQuick函数参数不为Array')
    if (arr.length <= 1) return arr;
    //找到轴点
    let pivotIndex = Math.floor(arr.length/2);
    //删除轴点
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left: T[] = [];
    let right: T[] = [];

    for (let i = 0, len = arr.length; i < len; i++) {

        if (arr[i] < pivot) {

            left.push(arr[i])

        } else {

            right.push(arr[i])

        }

    }

    return arrSortQuick(left).concat(pivot, arrSortQuick(right));

};
/**
 * 冒泡排序-稳定简单排序
 * @param arr
 * @returns {*}
 */
export function arrSortBubble<T>(arr: T[]): T[] {

    if (Object.prototype.toString.call(arr) !== '[object Array]') throw new Error('arrSortQuick函数参数不为Array')
    if (arr.length <= 1) return arr;

    let tmp: T;
    let len = arr.length;

    for (let i = 0; i <= len; i++) {

        for (let j = 0; j <= len - i; j++) {

            if (arr[j] > arr[j+1]) {

                tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;

            }

        }

    }
    return arr

};
/**
 * 归并排序-稳定复杂排序
 * @param arr
 * @returns {*}
 */
export function arrSortMerge (arr: any[]): any[] {

    if (Object.prototype.toString.call(arr) !== '[object Array]') throw new Error('arrSortQuick函数参数不为Array')
    if (arr.length <= 1) return arr;

    let merge = (left: any[], right: any[]) => {

        let tmp: any[] = [];

        while(left.length && right.length) {

            if (left[0] < right[0]) {

                tmp.push(left.shift());

            } else {

                tmp.push(right.shift());

            }

        }

        return tmp.concat(left, right);

    }

    let pivotIndex = Math.floor(arr.length/2);
    let left = arr.slice(0, pivotIndex);
    let right = arr.slice(pivotIndex);

    return merge(arrSortMerge(left), arrSortMerge(right));

};
