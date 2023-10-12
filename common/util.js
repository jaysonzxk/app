function format(str, ... args){
		for(var i= 0; i <  args.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"),args[i]);
		return str;
}
function paseNum(num,fixed = 0){
		var str;
		if(num > 99999999){
			var b = Math.floor(num / 100000000);
			var t =  (num - b * 100000000)/10000;
			str = format("{0}亿{1}万",b.toFixed(fixed),t.toFixed(fixed));
		}else if( num >= 10000){
			var v =num / 10000;
			str = format("{0}万",v.toFixed(fixed));
		}else {
			str = num;
		}
		return str;
}
//解决手机端无法使用解析yyyy-MM-dd hh:mm:ss直接格式 new Date(dateString)
function string2Date(dateString){
	if(dateString){
		try{
			var arr = dateString.split(' ');
			var ymd = arr[0].split('-');
			var him = arr[1].split(':');
			return new Date(ymd[0],ymd[1],ymd[2],him[0],him[1],him[2]);
		}catch(e){
		}
	}
	return new Date(dateString);
}
// 手机定位
function openGps (openNow) {
	let system = uni.getSystemInfoSync(); // 获取设备类型
	console.log(openNow==="true"),
	console.log(openNow)
	if (system.platform === 'android') {
		/* #ifdef APP-PLUS */
		const context = plus.android.importClass("android.content.Context");
		const locationManager = plus.android.importClass("android.location.LocationManager");
		const main = plus.android.runtimeMainActivity();
		const mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		console.log()
		if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER) && openNow === true) {
			const Intent = plus.android.importClass('android.content.Intent');
			const Settings = plus.android.importClass('android.provider.Settings');
			const intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
			main.startActivity(intent);
			// uni.showModal({
			// 	title: "提示",
			// 	content: "请打开手机定位",
			// 	cancelText: '取消',
			// 	confirmText: '去开启',
			// 	success() {
			// 		const Intent = plus.android.importClass('android.content.Intent');
			// 		const Settings = plus.android.importClass('android.provider.Settings');
			// 		const intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
			// 		main.startActivity(intent);
			// 	}
			// })
		}
		/* #endif */
	}else if (system.platform === 'ios'){
		/* #ifdef APP-PLUS */
		const cllocationManger = plus.ios.import('CLLocationManager');
		const enable = cllocationManger.locationServicesEnabled();
		const status = cllocationManger.authorizationStatus();
		plus.ios.deleteObject(cllocationManger);
		if ((enable && status == 2) && openNow === true) {
			const UIApplication = plus.ios.import('UIApplication');
			const application2 = UIApplication.sharedApplication();
			const NSURL2 = plus.ios.import('NSURL');
			const settings2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION');
			application2.openURL(settings2);
			plus.ios.deleteObject(settings2);
			plus.ios.deleteObject(NSURL2);
			plus.ios.deleteObject(application2);
		}
		// uni.showModal({
		// 	title: '提示',
		// 	content: '请打开手机定位',
		// 	showCancel:false,
		// 	success() {
		// 		const UIApplication = plus.ios.import('UIApplication');
		// 		const application2 = UIApplication.sharedApplication();
		// 		const NSURL2 = plus.ios.import('NSURL');
		// 		const settings2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION');
		// 		application2.openURL(settings2);
		// 		plus.ios.deleteObject(settings2);
		// 		plus.ios.deleteObject(NSURL2);
		// 		plus.ios.deleteObject(application2);
		// 	}
			
		// })
		/* #endif */
	}else{
		uni.showModal({
			title: '提示',
			content: '请打开手机定位',
			showCancel:false,
			success() {
				
			}
			
		})
	}
} 
export {
	format,
	paseNum,
	string2Date,
	openGps
}
