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
				alert('Học phí đầy đủ nha mấy chế!!!') // :)
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
			if (!cuongAPP.check_traTruoc() || laisuat === null) {
				return 'ERRO'
			} else {
				result = (conLai / soThang) * laisuat / 100 + (conLai / soThang)
				return parseInt(result)
			}
		},
		// Hàm kiểm tra valid số tiền trả trước abc
		check_traTruoc: () => {
			let a = true
			if ((cuongAPP.check_value('tt') / cuongAPP.check_value('dg') * 100) > (cuongAPP.check_data_cttc().val_thresHold)) {
				$('.erro_duatruoc').html('Số tiền đưa trước không hợp lệ')
				$('#tt').focus()
				$('#tt').val('')
				a = false
			} else {
				$('.erro_duatruoc').html('')
				a = true
			}
			// nếu vượt quá số tiền trả trước cho phép thì false
			return a
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
			let obj = {
				val_thresHold: 0,
				val_laisuat: null
			}
			for (let key in data.lists) {
				if (data.lists.hasOwnProperty(key)) {
					let element = data.lists[key];
					if (cuongAPP.check_radio() === element.id) {
						obj.val_thresHold = element.threshold //get ngưỡng
						let ds_ls = element.interestRate //get danh sách gói lãi suất theo tháng
						for (let key_interestRate in ds_ls) {
							if (ds_ls.hasOwnProperty(key_interestRate)) {
								let el = ds_ls[key_interestRate],
									thang = cuongAPP.check_value('thang') // get tháng từ input để so sánh và lấy ra gói lãi suất phù hợp
								if (el.so_thang.min < thang && thang <= el.so_thang.max) { //check lãi suất theo tháng
									obj.val_laisuat = el.ls
									$('.erro_thang').html('')
									$('#laisuat').html(obj.val_laisuat + ' %')
								}
							}

						}
					}
				}
			}
			if (obj.val_laisuat === null) {		// số tháng non-valid -> val_laisuat unset
				$('#laisuat').html("null")
				$('.erro_thang').html('*Kỳ hạn vay không hợp lệ.')
			}
			return obj
		}
	}


cuongAPP.init()
