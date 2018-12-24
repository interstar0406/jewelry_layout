'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
//main

var data = {
	lists: [{
		id: 1,
		name: 'FeCredit',
		threshold: 50, // ngưỡng tối đa mà công ty tài chính cho phép trả trước
		interestRate: [{ // các gói ls ùy theo kỳ hạn trả góp 
			ls: 3.7,
			so_thang: {
				min: 3,
				max: 12
			}
		}, {
			ls: 5.6,
			so_thang: {
				min: 12,
				max: 18
			}
		}]
	}, {
		id: 2,
		name: 'Prudential',
		threshold: 60,
		interestRate: [{
			ls: 4,
			so_thang: {
				min: 3,
				max: 12
			}
		}, {
			ls: 7,
			so_thang: {
				min: 12,
				max: 18
			}
		}]
	}]
},
    cuongAPP = {
	init: function init() {
		$('#gop').html(cuongAPP.tinh());
		$('input').on('change', function () {
			$('#gop').html(cuongAPP.tinh());
		});
	},
	tinh: function tinh() {
		var result = 0,
		    conLai = 0,
		    donGia = cuongAPP.check_value('dg'),
		    traTruoc = cuongAPP.check_value('tt'),
		    soThang = cuongAPP.check_value('thang'),
		    laisuat = cuongAPP.check_data_cttc().val_laisuat;
		conLai = donGia - traTruoc;
		$('#cl').val(conLai);
		if (!cuongAPP.check_traTruoc() || laisuat === null) {
			return 'ERRO';
		} else {
			result = conLai / soThang * laisuat / 100 + conLai / soThang;
			return parseInt(result);
		}
	},
	// Hàm kiểm tra valid số tiền trả trước abc
	check_traTruoc: function check_traTruoc() {
		var a = true;
		if (cuongAPP.check_value('tt') / cuongAPP.check_value('dg') * 100 > cuongAPP.check_data_cttc().val_thresHold) {
			$('.erro_duatruoc').html('Số tiền đưa trước không hợp lệ');
			$('#tt').focus();
			$('#tt').val('');
			a = false;
		} else {
			$('.erro_duatruoc').html('');
			a = true;
		}
		// nếu vượt quá số tiền trả trước cho phép thì false
		return a;
	},
	// hàm trả về id công ty tài chính 
	check_radio: function check_radio() {
		var id = 0;
		$('input[type="radio"]').each(function () {
			if ($(this).prop('checked')) {
				id = parseInt($(this).val());
			}
		});
		return id;
	},
	// hàm get giá trị các input
	check_value: function check_value(e) {
		return parseInt($('#' + e).val());
	},
	// hàm lấy ngưỡng trả trước cho phép và lãi suất theo số tháng công ty tài chính qui định
	check_data_cttc: function check_data_cttc() {
		var obj = {
			val_thresHold: 0,
			val_laisuat: null
		};
		for (var key in data.lists) {
			if (data.lists.hasOwnProperty(key)) {
				var element = data.lists[key];
				if (cuongAPP.check_radio() === element.id) {
					obj.val_thresHold = element.threshold; //get ngưỡng
					var ds_ls = element.interestRate; //get danh sách gói lãi suất theo tháng
					for (var key_interestRate in ds_ls) {
						if (ds_ls.hasOwnProperty(key_interestRate)) {
							var el = ds_ls[key_interestRate],
							    thang = cuongAPP.check_value('thang'); // get tháng từ input để so sánh và lấy ra gói lãi suất phù hợp
							if (el.so_thang.min < thang && thang <= el.so_thang.max) {
								//check lãi suất theo tháng
								obj.val_laisuat = el.ls;
								$('.erro_thang').html('');
								$('#laisuat').html(obj.val_laisuat + ' %');
							}
						}
					}
				}
			}
		}
		if (obj.val_laisuat === null) {
			// số tháng non-valid -> val_laisuat unset
			$('#laisuat').html("null");
			$('.erro_thang').html('*Kỳ hạn vay không hợp lệ.');
		}
		return obj;
	}
};

cuongAPP.init();
//# sourceMappingURL=main.js.map
