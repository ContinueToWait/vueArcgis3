
let utils={
    // 定时获取位置
    setIntervalFn(self,callback){
        self.intervalFn= setInterval(() => {
            utils.getLocal(self,callback)
            // utils.primordialGetLocal(self,callback)
          }, 10000);
    },
    /**
     * 获取位置H5
     */
    getLocal(self,callback){
        let showPosition = (position) => {
          let param={
            lat:position.coords.latitude,
            lon:position.coords.longitude
          }
        //   页面回调
            callback(param)
        }
        /**
         * 如果无法获取定位，停止定时任务
         */
        let showError = (error) => {
        //    清除定时
        //   window.clearInterval(self.intervalFn)
        //  alert(1)
        //   switch (error.code) {
        //     case error.PERMISSION_DENIED:
        //         self.$notify({ type: 'danger', message: '用户拒绝了地理定位请求' });
        //       break;
        //     case error.POSITION_UNAVAILABLE:
        //         self.$notify({ type: 'danger', message: '位置信息不可用。' });
        //       break;
        //     case error.TIMEOUT:
        //         self.$notify({ type: 'danger', message: '获取用户位置的请求超时。' });
        //       break;
        //     case error.UNKNOWN_ERROR:
        //         self.$notify({ type: 'danger', message: '发生未知错误。' });
        //       break;
        //   }
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            self.$notify({ type: 'danger', message: '此浏览器不支持地理位置。' });
               //  清除定时
        //   window.clearInterval(self.intervalFn)
        }
    },
    // 原生获取定位
    primordialGetLocal(self,callBack){
        plus.geolocation.getCurrentPosition((position) => {
            // console.log(JSON.stringify(position));
            // self.getLocalData = position;
            let param={
                lat:position.coords.latitude,
                lon:position.coords.longitude
              }
            callBack(param)
          }, (e) => {
            self.$notify({ type: 'danger', message: '调用失败' });
          }, { geocode: false });
    },
    // 原生监听设备位置变化信息
    primordialGetLocalWatch(self,callBack){
        let option={
            enableHighAccuracy:true , //Boolean 类型 )是否高精确度获取位置信息
            maximumAge:5000, // 获取位置信息的间隔时间
            geocode: true //是否解析地址信息
        }
        plus.geolocation.watchPosition((position) => {
            // console.log(JSON.stringify(position));
            // self.getLocalData = position;
            let param={
                lat:position.coords.latitude,
                lon:position.coords.longitude
              }
            callBack(param)
          }, (e) => {
            self.$notify({ type: 'danger', message: '调用失败' });
          }, option);
    }
    
}

export{
    utils
}