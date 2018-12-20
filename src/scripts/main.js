//main

var data = {
		lists: [{
				id: 1,
				name: 'FeCredit',
				threshold: 50, // ngưỡng tối đa mà công ty tài chính cho phép trả trước
				interestRate: [{
						ls: 3.7,
						so_thang: {
							min: 3,
							max: 12
						}
					},
					{
						ls: 5.6,
						so_thang: {
							min: 12,
							max: 18
						}
					}
				]
			},
			{
				id: 2,
				name: 'Prudential',
				threshold: 60,
				interestRate: [{
						ls: 4,
						so_thang: {
							min: 3,
							max: 12
						}
					},
					{
						ls: 7,
						so_thang: {
							min: 12,
							max: 18
						}
					}
				]
			}
		]
	},


	cuongAPP = {
		init: () => {
			$('#gop').html(cuongAPP.tinh())
			$('input').on('change', function () {
				$('#gop').html(cuongAPP.tinh())
			})
		},
		tinh: () => {
			let result = 0,
				conLai = 0,
				donGia = cuongAPP.check_value('dg'),
				traTruoc = cuongAPP.check_value('tt'),
				soThang = cuongAPP.check_value('thang'),
				laisuat = cuongAPP.check_data_cttc().val_laisuat
			conLai = donGia - traTruoc
			$('#cl').val(conLai)
			if (!cuongAPP.check_traTruoc()) {
				return 'erro'
			} else {
				result = (conLai / soThang) * laisuat / 100 + (conLai / soThang)
				return parseInt(result)
			}
		},
		check_traTruoc: () => {
			// nếu vượt quá số tiền trả trước cho phép thì false
			return (cuongAPP.check_value('tt') / cuongAPP.check_value('dg') * 100) > (cuongAPP.check_data_cttc().val_thresHold) ? false : true
		},
		// hàm trả về id công ty tài chính 
		check_radio: () => {
			let id = 0
			$('input[type="radio"]').each(function () {
				if ($(this).prop('checked')) {
					id = parseInt($(this).val())
				}
			})
			return id
		},
		// hàm get giá trị các input
		check_value: (e) => {
			return parseInt($('#' + e).val())
		},
		// hàm lấy ngưỡng trả trước cho phép và lãi suất theo số tháng công ty tài chính qui định
		check_data_cttc: () => {
			let thang = cuongAPP.check_value('thang'), // get số tháng
				obj = {
					val_thresHold: 0,
					val_laisuat: 0
				}
			for (let key in data.lists) {
				if (data.lists.hasOwnProperty(key)) {
					let element = data.lists[key];
					if (cuongAPP.check_radio() === element.id) {
						obj.val_thresHold = element.threshold //get ngưỡng
						let ds_ls = element.interestRate //get danh sách gói lãi suất theo tháng
						for (let key_interestRate in ds_ls) {
							if (ds_ls.hasOwnProperty(key_interestRate)) {
								let el = ds_ls[key_interestRate];
								if (el.so_thang.min < thang && thang <= el.so_thang.max) {
									obj.val_laisuat = el.ls
								}
							}
						}
					}
				}
			}
			$('#laisuat').html(obj.val_laisuat+' %')
			return obj
		}
	}


cuongAPP.init()
