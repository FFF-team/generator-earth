Component({
    properties: {
        processList: Array,
        phoneNum: String,
    },
    methods: {
        onCall() {
            wx.makePhoneCall({
                phoneNumber: this.data.phoneNum,
            });
        },
        onShowModel(event:any) {
            wx.showModal({
                title: '备注',
                content: event.target.dataset.remark,
            });
        },
    },
});
