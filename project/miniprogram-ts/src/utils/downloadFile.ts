export default function downloadFile(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success: (res) => {
                const {
                    statusCode,
                    tempFilePath,
                } = res;

                if (statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success: (data) => {
                            resolve(data);
                        },
                        fail: (e) => {
                            reject(e);
                        },
                    });
                } else {
                    reject(res);
                }
            },
            fail: (e) => {
                reject(e);
            },
        });
    });
}
