Component({
    options: {
        pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
    },

    externalClasses: ['my-class'],

    properties: {
        // true: 加载中; false: 加载结束
        requesting: {
            type: Boolean,
            value: false,
            observer(newVal: boolean, oldVal: boolean) {
                if (this.data._mode === 'more') return;

                // 加载结束
                if (oldVal === true && newVal === false) {
                    setTimeout(() => {
                        // 显示加载成功toptip
                        this.setData({
                            dSuccessShow: true,
                            dRefreshStatus: 4,
                            dMove: this.properties.topHegiht,
                        });
                        setTimeout(() => {
                            this.setData({
                                dSuccessTran: true,
                                dMove: this.data._srollHeight,
                            });
                            setTimeout(() => {
                                this.setData({
                                    dRefreshStatus: 1,
                                    dSuccessShow: false,
                                    dSuccessTran: false,
                                    dMove: this.data._srollHeight,
                                });
                            }, 350);
                        }, 1500);
                    }, 600);
                } else {
                    // 加载中
                    // eslint-disable-next-line no-lonely-if
                    if (this.data.dRefreshStatus !== 3) {
                        this.setData({
                            dRefreshStatus: 3,
                            dMove: 0,
                        });
                    }
                }
            },
        },
        // 顶部tab高度，如果没有顶部tab一类遮挡组件，则高度为0，单位rpx
        topHegiht: {
            type: Number,
            value: 0,
        },
        // 标记列表全部加载完毕
        end: {
            type: Boolean,
            value: false,
        },
        // 控制空状态的显示
        emptyShow: {
            type: Boolean,
            value: false,
        },
        // 空状态的图片
        emptyUrl: {
            type: String,
            value: '',
        },
        // 空状态的文字提示
        emptyText: {
            type: String,
            value: '未找到数据',
        },
    },

    data: {
        /* 纯数据字段 */
        _srollHeight: 0, // refresh view 高度负值
        _mode: 'refesh', // refresh 和 more 两种模式
        _timer: null,


        /* 未渲染数据 */
        dRefreshStatus: 1, // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
        dMove: -45, // movable-view 偏移量

        dSuccessShow: false, // 显示success
        dSuccessTran: false, // 过度success

        /* 渲染数据 */
        dScrollTop: 0,
        dOverOnePage: false, // 标记滚动超过一屏
    },

    lifetimes: {
        ready() {
            this.init();
        },
    },

    methods: {
        /**
         * 初始化scroll组件参数, 动态获取 下拉刷新区域 和 success 的高度
         *
         */
        init() {
            this.createSelectorQuery().select('#refresh').boundingClientRect((res: any) => {
                this.setData({
                    // 下拽加载loading高度
                    _srollHeight: -res.height,
                });
            }).exec();
        },

        /**
         * movable-view 下拽事件监听
         */
        change(e: any) {
            const { dRefreshStatus } = this.data;
            const diff = e.detail.y;

            // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
            // 如果状态是加载中，则返回
            if (dRefreshStatus >= 3) return;

            if (diff > -10) {
                // 快到尽头了，别往下拉了，松开更新吧，==> 2: 松开更新
                this.setData({
                    dRefreshStatus: 2,
                });
            } else {
                // 往下拽动作执行
                this.setData({
                    dRefreshStatus: 1,
                });
            }
        },

        /* movable-view 下拽结束事件 */
        touchend() {
            const { dRefreshStatus } = this.data;

            // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
            // 如果状态是加载中，则返回
            if (dRefreshStatus >= 3) return;

            if (dRefreshStatus === 2) {
                // 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
                wx.vibrateShort();

                // 更新状态
                this.setData({
                    dRefreshStatus: 3,
                    // 拉倒头了
                    dMove: 0,
                    _mode: 'refresh',
                });

                // 触发父组件更新操作
                this.triggerEvent('refresh');
            } else if (dRefreshStatus === 1) {
                // 没有改变状态则复位，弹回去
                this.setData({
                    dMove: this.data._srollHeight,
                });
            }
        },

        /* 处理 bindscrolltolower 失效情况 */
        scroll(e: any) {
            // 可以触发滚动表示超过一屏
            this.setData({
                dOverOnePage: true,
            });
            if (this.data._timer) {
                clearTimeout(this.data._timer as unknown as number);
            }

            this.setData({
                _timer: setTimeout(() => {
                    this.setData({
                        dScrollTop: e.detail.scrollTop,
                    });
                }, 100) as any,
            });
        },

        /* 加载更多 */
        more() {
            if (!this.properties.end) {
                this.setData({
                    _mode: 'more',
                });
                this.triggerEvent('more');
            }
        },
    },

});
