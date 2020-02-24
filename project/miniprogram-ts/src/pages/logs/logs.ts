// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from 'UTILS/util';

Page({
    data: {
        logs: [],
    },
    onLoad() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map((log: string) => formatTime(new Date(log))),
        });
    },
});
