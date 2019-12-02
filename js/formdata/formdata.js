var formdata = {
    dataTable: "#dataTable",

    start: function () {
        // 初始化charts
        formdata.chart()
        // 初始Ajax
        formdata.initAjax()
        // 表格操作
        formdata.formOperation()
    },

    initAjax: function () {
        var test = [{
                "printStatus": "0",
                "barcode": "123",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "乔碧萝殿下",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "1",
                "barcode": "456",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "孙悟空",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "2",
                "barcode": "789",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "阿凡达",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "3",
                "barcode": "abc",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "大王",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "4",
                "barcode": "dafadf",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "屌丝",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "5",
                "barcode": "asdffasd",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "唐僧",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "6",
                "barcode": "ytryre",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "孙悟空",
                "Remarks": "dfasdfasd"
            },
            {
                "printStatus": "7",
                "barcode": "fdevdsfds",
                "personName": "Alphonso Liu",
                "company": "nVent",
                "category": "妹妹",
                "Remarks": "dfasdfasd"
            },
        ]

        // 初始化dataTables
        formdata.dataTables(test)
        // $.ajax({
        //     url: "../../js/formdata/Reglist.ashx?SeaKey=a",
        //     type: "GET",
        //     dataType: "json",
        //     cache: false,
        //     success: function (data) {
        //         console.log(data)
        //         formdata.dataTables(data)
        //     },
        //     error: function () {

        //     }
        // })
    },

    formOperation: function () {
        // 获取dataTable对象
        let tbObj = $(formdata.dataTable).DataTable()

        // 点击该行
        $(formdata.dataTable).on('click', 'tbody tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                tbObj.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        })

        // 编辑框显示的回调方法
        $('#editModal').on('show.bs.modal', function (e) {
            // 该行元素，弹出层表单元素
            let tdArr = tbObj.$('tr.selected').children()
            let eleArr = $('#editModal .modal-body').find('input')

            // 遍历该行元素的原始值，并赋值给弹出层的对应元素
            for (let i = 2; i < tdArr.length; i++) {
                const ele = tdArr[i].innerHTML
                eleArr[i - 2].value = ele
            }
        })

        // 编辑提交
        $("#editModal .modal-footer .btn:last").click(function () {
            // 该行元素，弹出层表单元素
            let newTdArr = tbObj.$('tr.selected').children()
            let newEleArr = $('#editModal .modal-body').find('input')

            // 遍历编辑的数据，重新渲染该行
            for (let i = 2; i < newTdArr.length; i++) {
                newTdArr[i].innerHTML = newEleArr[i - 2].value
                tbObj.row('.selected').draw(false)
            }

            $("#editModal").modal('hide')
        })

        // 删除提交
        $("#delModal .modal-footer .btn:last").click(function () {
            tbObj.row('.selected').remove().draw(false)
            $("#delModal").modal('hide')
        })
    },

    dataTables: function (resultData) {
        var varColumns = [];
        varColumns = [{
                "data": null,
                "title": "操作",
                "defaultContent": "<button class='edit-btn' type='button' data-toggle='modal' data-target='#editModal'>编辑</button><br><button class='del-btn' type='button' data-toggle='modal' data-target='#delModal'>删除</button><br><button class='send-btn' type='button'>发送邮件</button>"
            },
            {
                "data": "barcode"
            },
            {
                "data": "personName"
            },
            {
                "data": "company"
            },
            {
                "data": "category"
            },
            {
                "data": "Remarks"
            }
        ]

        $("#dataTable").dataTable({
            // 默认升序排序
            "order": [1, "asc"],
            // 新增5
            "lengthMenu": [3, 10, 15, 25, 50, 75, 100],
            "destroy": true, //不保存记录 方便重复搜索
            "language": {
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页"
                },
                "emptyTable": "没有数据",
                "sZeroRecords": "找不到相关数据",
                "sSearch": "表内搜索",
                "info": "显示  _START_ - _END_ 共 _TOTAL_ 条",
                "sInfoEmpty": "显示 0 - 0 共 0 条",
                "sInfoFiltered": "",
                "sLengthMenu": "每页显示 _MENU_ 条"
            },
            "columns": varColumns,
            "data": resultData
        });
    },

    chart: function () {
        // 基于准备好的dom，初始化echarts实例
        let categoryChart = echarts.init(document.getElementById('categoryChart'));
        let paymentTypeChart = echarts.init(document.getElementById('paymentTypeChart'));
        let dayRegistrationChart = echarts.init(document.getElementById('dayRegistrationChart'));
        let countryChart = echarts.init(document.getElementById('countryChart'));
        let provinceChart = echarts.init(document.getElementById('provinceChart'));
        let signChart = echarts.init(document.getElementById('signChart'));

        categoryOption = {
            title: {
                text: '人员类别统计',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center'
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [{
                        value: 12,
                        name: '学生'
                    },
                    {
                        value: 19,
                        name: '参会代表'
                    },
                    {
                        value: 3,
                        name: 'VIP'
                    }
                ]
            }]
        };
        paymentTypeOption = {
            title: {
                text: '支付方式统计',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center'
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [{
                        value: 18500,
                        name: '线下银行'
                    },
                    {
                        value: 24000,
                        name: '线上银联'
                    },
                    {
                        value: 20400,
                        name: '支付宝'
                    }
                ]
            }]
        };
        dayRegistrationOption = {
            color: ['#3398DB'],
            title: {
                text: '日注册人数统计',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['11月1日', '11月2日', '11月3日', '11月4日', '11月5日', '11月6日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'line',
                stack: '总量',
                data: [45, 54, 66, 34, 53, 48],
                areaStyle: {
                    color: 'rgba(51,152,219,.5)'
                }
            }]
        };
        countryOption = {
            color: ['#3398DB'],
            title: {
                text: '国家人数统计',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['日本', '韩国', '巴西', '印尼', '美国', '印度', '中国']
            },
            series: [{
                type: 'bar',
                data: [12000, 18203, 23489, 29034, 10970, 20000, 43030]
            }]
        };
        provinceOption = {
            color: ['#3398DB'],
            title: {
                text: '省份地区人数统计',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['上海', '北京', '广东', '深圳', '福建', '江苏', '河南', '陕西', '湖南', '山东'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                type: 'bar',
                barWidth: '60%',
                data: [480, 390, 334, 330, 52, 200, 220, 100, 300, 99]
            }]
        };
        signOption = {
            title: {
                text: '签到人数统计',
                top: 10,
                left: 'center'
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: () => {
                    let res = ''
                    let sum = 0
                    let myseries = signOption.series;
                    for (let i = 0; i < myseries.length; i++) {
                        sum += myseries[i].data[0]
                    }
                    for (let i = 0; i < myseries.length; i++) {
                        if (Number.isInteger(myseries[i].data[0] / sum * 100)) {
                            res += myseries[i].name + ' : ' + (myseries[i].data[0] / sum * 100).toFixed(0) + '%</br>';
                        } else {
                            res += myseries[i].name + ' : ' + (myseries[i].data[0] / sum * 100).toFixed(2) + '%</br>';
                        }
                    }
                    return res;
                }
            },
            legend: {
                left: 'center',
                icon: 'circle',
                itemWidth: 12,
                data: ['未签到', '已签到'],
                bottom: 10
            },
            xAxis: {
                show: false
            },
            yAxis: {
                type: 'category',
                data: [''],
                show: false,
            },
            series: [{
                    type: 'bar',
                    name: '未签到',
                    data: [3],
                    stack: '柱子',
                    barMaxWidth: '36',
                    color: '#f76f34',
                    itemStyle: {
                        barBorderRadius: [8, 0, 0, 8]
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: function (obj) {
                                return obj.value
                            }
                        }
                    }
                }, {
                    type: 'bar',
                    name: '已签到',
                    data: [7],
                    stack: '柱子',
                    barMaxWidth: '36',
                    color: '#3393e2',
                    itemStyle: {
                        barBorderRadius: [0, 8, 8, 0]
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: function (obj) {
                                return obj.value
                            }
                        }
                    }
                },

            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        categoryChart.setOption(categoryOption);
        paymentTypeChart.setOption(paymentTypeOption);
        dayRegistrationChart.setOption(dayRegistrationOption);
        countryChart.setOption(countryOption);
        provinceChart.setOption(provinceOption);
        signChart.setOption(signOption);
    }
}

$(function () {
    formdata.start()
})